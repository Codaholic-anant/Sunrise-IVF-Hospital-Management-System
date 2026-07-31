using HospitalManagement.API.Data;
using HospitalManagement.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospitalManagement.API.Controllers
{
    [Route("api/patients")]
    [ApiController]
    [Authorize]
    public class PatientController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public PatientController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PatientDto>>> Get()
        {
            var patients = await _context.Patients
                .Include(p => p.Addresses)
                .Where(p => p.IsDeleted != true)
                .OrderByDescending(p => p.PatientId)
                .ToListAsync();

            return Ok(patients.Select(ToDto));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PatientDto>> GetById(string id)
        {
            var patient = await FindPatient(id);
            if (patient is null)
            {
                return NotFound(new { success = false, message = "Patient record not found." });
            }

            return Ok(ToDto(patient));
        }

        [HttpPost]
        public async Task<ActionResult<PatientDto>> Create([FromBody] PatientDto request)
        {
            var hospitalId = GetDefaultHospitalId();
            var hospitalExists = await _context.Database
                .SqlQueryRaw<int>("SELECT COUNT(1) AS Value FROM [Hospital].[Hospitals] WHERE [HospitalId] = {0} AND [IsDeleted] = 0", hospitalId)
                .SingleAsync();

            if (hospitalExists == 0)
            {
                return BadRequest(new
                {
                    success = false,
                    message = $"Default hospital id {hospitalId} does not exist. Add a row in Hospital.Hospitals or update Defaults:HospitalId."
                });
            }

            var names = SplitName(request.Name);
            var patient = new PatientRecord
            {
                HospitalId = hospitalId,
                RegistrationNo = await GenerateRegistrationNo(),
                FirstName = names.firstName,
                LastName = names.lastName,
                Gender = request.Gender,
                DateOfBirth = DateTime.Today.AddYears(-Math.Max(request.Age, 0)),
                BloodGroup = request.BloodGroup,
                MobileNumber = request.Phone,
                Email = request.Email,
                RegistrationDate = DateTime.Now,
                Status = ToStatusCode(request.Status),
                IsActive = true,
                IsDeleted = false,
                CreatedDate = DateTime.Now
            };

            if (!string.IsNullOrWhiteSpace(request.Address))
            {
                patient.Addresses.Add(new PatientAddress
                {
                    AddressLine1 = request.Address,
                    IsPrimary = true,
                    CreatedDate = DateTime.Now
                });
            }

            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = patient.RegistrationNo }, ToDto(patient));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<PatientDto>> Update(string id, [FromBody] PatientDto request)
        {
            var patient = await FindPatient(id);
            if (patient is null)
            {
                return NotFound(new { success = false, message = "Patient record not found." });
            }

            var names = SplitName(request.Name);
            patient.FirstName = names.firstName;
            patient.LastName = names.lastName;
            patient.Gender = request.Gender;
            patient.DateOfBirth = DateTime.Today.AddYears(-Math.Max(request.Age, 0));
            patient.BloodGroup = request.BloodGroup;
            patient.MobileNumber = request.Phone;
            patient.Email = request.Email;
            patient.Status = ToStatusCode(request.Status);
            patient.UpdatedDate = DateTime.Now;

            var primaryAddress = patient.Addresses.FirstOrDefault(a => a.IsPrimary == true)
                ?? patient.Addresses.FirstOrDefault();

            if (string.IsNullOrWhiteSpace(request.Address))
            {
                if (primaryAddress is not null)
                {
                    _context.PatientAddresses.Remove(primaryAddress);
                }
            }
            else if (primaryAddress is null)
            {
                patient.Addresses.Add(new PatientAddress
                {
                    AddressLine1 = request.Address,
                    IsPrimary = true,
                    CreatedDate = DateTime.Now
                });
            }
            else
            {
                primaryAddress.AddressLine1 = request.Address;
                primaryAddress.IsPrimary = true;
            }

            await _context.SaveChangesAsync();
            return Ok(ToDto(patient));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var patient = await FindPatient(id);
            if (patient is null)
            {
                return NotFound(new { success = false, message = "Patient record not found." });
            }

            patient.IsDeleted = true;
            patient.IsActive = false;
            patient.UpdatedDate = DateTime.Now;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private async Task<PatientRecord?> FindPatient(string id)
        {
            var query = _context.Patients
                .Include(p => p.Addresses)
                .Where(p => p.IsDeleted != true);

            if (long.TryParse(id, out var patientId))
            {
                return await query.FirstOrDefaultAsync(p => p.PatientId == patientId);
            }

            return await query.FirstOrDefaultAsync(p => p.RegistrationNo == id);
        }

        private int GetDefaultHospitalId()
        {
            return int.TryParse(_configuration["Defaults:HospitalId"], out var hospitalId)
                ? hospitalId
                : 1;
        }

        private async Task<string> GenerateRegistrationNo()
        {
            var nextId = await _context.Patients.CountAsync() + 1;
            return $"P{DateTime.Now:yyyyMMdd}{nextId:D4}";
        }

        private static PatientDto ToDto(PatientRecord patient)
        {
            var address = patient.Addresses.FirstOrDefault(a => a.IsPrimary == true)
                ?? patient.Addresses.FirstOrDefault();

            return new PatientDto
            {
                Id = patient.RegistrationNo,
                PatientId = patient.PatientId,
                Name = string.Join(" ", new[] { patient.FirstName, patient.MiddleName, patient.LastName }
                    .Where(part => !string.IsNullOrWhiteSpace(part))),
                Age = CalculateAge(patient.DateOfBirth),
                Gender = patient.Gender,
                Phone = patient.MobileNumber ?? string.Empty,
                Email = patient.Email,
                Address = address?.AddressLine1,
                BloodGroup = patient.BloodGroup,
                Doctor = string.Empty,
                Status = FromStatusCode(patient.Status),
                Date = patient.RegistrationDate?.ToString("d")
            };
        }

        private static int CalculateAge(DateTime dateOfBirth)
        {
            var today = DateTime.Today;
            var age = today.Year - dateOfBirth.Year;
            return dateOfBirth.Date > today.AddYears(-age) ? age - 1 : age;
        }

        private static (string firstName, string lastName) SplitName(string name)
        {
            var parts = (name ?? string.Empty)
                .Trim()
                .Split(' ', StringSplitOptions.RemoveEmptyEntries);

            if (parts.Length == 0)
            {
                return ("Unknown", "Patient");
            }

            if (parts.Length == 1)
            {
                return (parts[0], "Patient");
            }

            return (parts[0], string.Join(" ", parts.Skip(1)));
        }

        private static byte ToStatusCode(string? status)
        {
            return status?.ToLowerInvariant() switch
            {
                "inactive" => 2,
                "discharged" => 3,
                _ => 1
            };
        }

        private static string FromStatusCode(byte? status)
        {
            return status switch
            {
                2 => "Inactive",
                3 => "Discharged",
                _ => "Active"
            };
        }
    }
}

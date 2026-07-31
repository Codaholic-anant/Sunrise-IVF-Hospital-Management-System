using HospitalManagement.Core.Models;
using HospitalManagement.Domain.DTO;
using HospitalManagement.Infra.Reposiories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace HospitalManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly IPatientRepository _patientRepo;

        public PatientController(IPatientRepository patientRepo)
        {
            _patientRepo = patientRepo;
        }

        // POST: api/patient
        [HttpPost]
        public async Task<IActionResult> PateintRegistration([FromBody] PatientRegisterDTO model)
        {
            if (model == null)
                return BadRequest(new { success = false, message = "Patient data is required." });

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Set defaults
            model.IsActive = model.IsActive ?? true;
            model.IsDeleted = model.IsDeleted ?? false;
            model.CreatedDate = DateTime.UtcNow;

            var created = await _patientRepo.RegisterPatientAsync(model);

            // Return created resource with its id
            return CreatedAtAction(nameof(GetById), new { id = created.PatientId }, created);
        }

        // GET: api/patient/{id}
        [HttpGet("{id:long}")]
        public async Task<IActionResult> GetById(long id)
        {
            var patient = await _patientRepo.GetByIdAsync(id);
            if (patient == null)
                return NotFound();
            return Ok(patient);
        }
    }
}

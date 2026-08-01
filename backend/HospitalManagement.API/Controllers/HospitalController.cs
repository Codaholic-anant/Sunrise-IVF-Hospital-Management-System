using HospitalManagement.API.Helpers;
using HospitalManagement.Core.Interfaces;
using HospitalManagement.Core.Models;
using HospitalManagement.Domain.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace HospitalManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize]
    public class HospitalController : ControllerBase
    {
        private readonly IHospitalRepository _hospitalRepo;

        public HospitalController(IHospitalRepository hospitalRepo)
        {
            _hospitalRepo = hospitalRepo;
        }

        // POST: api/hospital
     [HttpPost]
        public async Task<IActionResult> AddHospitals([FromBody] HospitalRegisterDTO model)
        {
            if (model == null)
                return BadRequest(new { success = false, message = "Hospital data is required." });

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (string.IsNullOrWhiteSpace(model.HospitalCode) || string.IsNullOrWhiteSpace(model.HospitalName) || string.IsNullOrWhiteSpace(model.RegistrationNumber))
                return BadRequest(new { success = false, message = "Hospital code, name, and registration number are required." });

            // var currentYear = DateTime.UtcNow.Year;
            // if (model.EstablishedYear.HasValue)
            // {
            //     var establishedYear = model.EstablishedYear.Value;
            //     if (establishedYear < 1800 || establishedYear > currentYear + 1)
            //         return BadRequest(new { success = false, message = "Established year is out of range." });
            // }

            var created = await _hospitalRepo.RegisterHospitalAsync(model);

            return CreatedAtAction(nameof(GetById), new { id = created.HospitalId }, created);
        }

        [HttpGet]
public async Task<IActionResult> GetAll()
{
    var hospitals = await _hospitalRepo.GetAllAsync();
    return Ok(hospitals);
}
        // GET: api/hospital/{id}
        [HttpGet("{id:long}")]
        public async Task<IActionResult> GetById(long id)
        {
            if (id <= 0)
                return BadRequest(new { success = false, message = "Invalid hospital id." });

            var hospital = await _hospitalRepo.GetByIdAsync(id);
            if (hospital == null)
                return NotFound();
            return Ok(hospital);
        }
    }
}

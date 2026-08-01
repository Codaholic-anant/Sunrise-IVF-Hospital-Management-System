using HospitalManagement.Domain.DTO;
using HospitalManagement.Core.Interfaces;
using HospitalManagement.Core.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;
using System.Linq;

namespace HospitalManagement.Infra.Services
{
    public class HospitalRegisterService : IHospitalRepository
    {
        private readonly IUnitOfWork _uow;

        public HospitalRegisterService(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<Hospital> RegisterHospitalAsync(HospitalRegisterDTO model)
        {
            if (model == null)
                throw new ArgumentNullException(nameof(model));

            // Ensure Status is within allowed values (DB has a CHECK constraint). Adjust allowed values as needed.
            var allowedStatuses = new byte[] { 0, 1 };

            var hospital = new Hospital
            {
                // generate id on backend using ticks to ensure a unique long value
               // HospitalId = DateTime.UtcNow.Ticks,
                HospitalCode = model.HospitalCode,
                HospitalName = model.HospitalName,
                RegistrationNumber = model.RegistrationNumber,
                HospitalType = model.HospitalType,
                EstablishedYear = model.EstablishedYear,
                TotalBeds = model.TotalBeds,
                EmergencyAvailable = model.EmergencyAvailable,
                ICUAvailable = model.ICUAvailable,
                AmbulanceAvailable = model.AmbulanceAvailable,
                BloodBankAvailable = model.BloodBankAvailable,
                LogoUrl = model.LogoUrl,
                Description = model.Description,
                Status = model.Status,
                IsActive = true,
                IsDeleted = false,
                CreatedBy = 1,
                CreatedDate = DateTime.UtcNow,
                UpdatedBy = 1,
                UpdatedDate = DateTime.UtcNow
            };

            await _uow.Repository<Hospital>().AddAsync(hospital);
            await _uow.SaveChangesAsync();

            return hospital;
        }

        public async Task<Hospital?> GetByIdAsync(long id)
        {
            return await _uow.Repository<Hospital>().GetByIdAsync(id);
        }

        public async Task<List<Hospital>> GetAllAsync()
        {
            var items = await _uow.Repository<Hospital>().GetAllAsync();
            return items.ToList();
        }

        
    }
}

using HospitalManagement.Domain.DTO;
using HospitalManagement.Infra.Reposiories;
using HospitalManagement.Core.Interfaces;
using HospitalManagement.Core.Models;
using System.Threading.Tasks;
using System;

namespace HospitalManagement.Infra.Services
{
    public class ParientRegisterService : IPatientRepository
    {
        private readonly IUnitOfWork _uow;

        public ParientRegisterService(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<Patient> RegisterPatientAsync(PatientRegisterDTO model)
        {
            if (model == null)
                throw new ArgumentNullException(nameof(model));

            var patient = new Patient
            {
                HospitalId = model.CreatedBy ?? 0, // adjust mapping as appropriate
                RegistrationNo = model.RegistrationNo,
                FirstName = model.FirstName,
                MiddleName = model.MiddleName,
                LastName = model.LastName,
                Gender = model.Gender,
                DateOfBirth = model.DateOfBirth,
                BloodGroup = model.BloodGroup,
                MaritalStatus = model.MaritalStatus,
                Nationality = model.Nationality,
                AadhaarNumber = model.AadhaarNumber,
                PassportNumber = model.PassportNumber,
                MobileNumber = model.MobileNumber,
                AlternateMobile = model.AlternateMobile,
                Email = model.Email,
                PhotoUrl = model.PhotoUrl,
                RegistrationDate = model.RegistrationDate ?? DateTime.UtcNow,
                RegistrationType = model.RegistrationType,
                ReferredBy = model.ReferredBy,
                Status = model.Status,
                IsActive = model.IsActive ?? true,
                IsDeleted = model.IsDeleted ?? false,
                CreatedBy = model.CreatedBy,
                CreatedDate = model.CreatedDate ?? DateTime.UtcNow,
                UpdatedBy = model.UpdatedBy,
                UpdatedDate = model.UpdatedDate
            };

            await _uow.Repository<Patient>().AddAsync(patient);
            await _uow.SaveChangesAsync();

            return patient;
        }

        public async Task<Patient?> GetByIdAsync(long id)
        {
            return await _uow.Repository<Patient>().GetByIdAsync(id);
        }
    }
}

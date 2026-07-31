using HospitalManagement.Domain.DTO;
using HospitalManagement.Core.Models;
using System.Threading.Tasks;

namespace HospitalManagement.Infra.Reposiories
{
    public interface IPatientRepository
    {
        Task<Patient> RegisterPatientAsync(PatientRegisterDTO model);
        Task<Patient?> GetByIdAsync(long id);
    }
}

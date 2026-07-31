using System.Threading.Tasks;
using HospitalManagement.Core.Models;
using HospitalManagement.Domain.DTO;

namespace HospitalManagement.Core.Interfaces
{
    public interface IHospitalRepository
    {
        Task<Hospital> RegisterHospitalAsync(HospitalRegisterDTO model);
        Task<Hospital?> GetByIdAsync(long id);
    }
}

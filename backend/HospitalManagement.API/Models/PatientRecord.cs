namespace HospitalManagement.API.Models
{
    public class PatientRecord
    {
        public long PatientId { get; set; }
        public long HospitalId { get; set; }
        public string RegistrationNo { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string? MiddleName { get; set; }
        public string LastName { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public string? BloodGroup { get; set; }
        public string? MobileNumber { get; set; }
        public string? Email { get; set; }
        public DateTime? RegistrationDate { get; set; }
        public byte? Status { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDeleted { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public ICollection<PatientAddress> Addresses { get; set; } = new List<PatientAddress>();
    }
}

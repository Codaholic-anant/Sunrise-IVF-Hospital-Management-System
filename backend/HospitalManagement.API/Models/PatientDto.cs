namespace HospitalManagement.API.Models
{
    public class PatientDto
    {
        public string Id { get; set; } = string.Empty;
        public long PatientId { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Age { get; set; }
        public string Gender { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string? Email { get; set; }
        public string? Address { get; set; }
        public string? BloodGroup { get; set; }
        public string? Doctor { get; set; }
        public string Status { get; set; } = "Active";
        public string? Date { get; set; }
    }
}

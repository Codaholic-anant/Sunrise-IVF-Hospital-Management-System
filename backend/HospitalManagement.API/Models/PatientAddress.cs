namespace HospitalManagement.API.Models
{
    public class PatientAddress
    {
        public long AddressId { get; set; }
        public long PatientId { get; set; }
        public string AddressLine1 { get; set; } = string.Empty;
        public string? AddressLine2 { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Country { get; set; }
        public string? PinCode { get; set; }
        public bool? IsPrimary { get; set; }
        public DateTime? CreatedDate { get; set; }
        public PatientRecord? Patient { get; set; }
    }
}

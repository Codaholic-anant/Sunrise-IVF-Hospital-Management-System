using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalManagement.Core.Models
{
    [Table("Patients", Schema = "Patient")]
    public class Patient
    {
        [Key]
        public long PatientId { get; set; }

        [Required]
        public long HospitalId { get; set; }

        [Required]
        [StringLength(30)]
        public string RegistrationNo { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string FirstName { get; set; } = string.Empty;

        [StringLength(100)]
        public string? MiddleName { get; set; }

        [Required]
        [StringLength(100)]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [StringLength(20)]
        public string Gender { get; set; } = string.Empty;

        [Required]
        public DateTime DateOfBirth { get; set; }

        [StringLength(10)]
        public string? BloodGroup { get; set; }

        [StringLength(30)]
        public string? MaritalStatus { get; set; }

        [StringLength(100)]
        public string? Nationality { get; set; }

        [StringLength(20)]
        public string? AadhaarNumber { get; set; }

        [StringLength(30)]
        public string? PassportNumber { get; set; }

        [Required]
        [StringLength(20)]
        public string MobileNumber { get; set; } = string.Empty;

        [StringLength(20)]
        public string? AlternateMobile { get; set; }

        [StringLength(150)]
        public string? Email { get; set; }

        [StringLength(500)]
        public string? PhotoUrl { get; set; }

        public DateTime? RegistrationDate { get; set; }

        [StringLength(30)]
        public string? RegistrationType { get; set; }

        [StringLength(150)]
        public string? ReferredBy { get; set; }

        public byte? Status { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDeleted { get; set; }

        public long? CreatedBy { get; set; }

        public DateTime? CreatedDate { get; set; }

        public long? UpdatedBy { get; set; }

        public DateTime? UpdatedDate { get; set; }

        // Navigation Property
        //[ForeignKey(nameof(HospitalId))]
        //public virtual Hospital? Hospital { get; set; }
    }
}

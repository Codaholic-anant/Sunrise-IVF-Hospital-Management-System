using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace HospitalManagement.Domain.DTO
{
    public class PatientRegisterDTO
    {
      
      
        public string RegistrationNo { get; set; } = string.Empty;

       
       
        public string FirstName { get; set; } = string.Empty;

       
        public string? MiddleName { get; set; }

       
       
        public string LastName { get; set; } = string.Empty;

       
       
        public string Gender { get; set; } = string.Empty;

       
        public DateTime DateOfBirth { get; set; }

      
        public string? BloodGroup { get; set; }

      
        public string? MaritalStatus { get; set; }

      
        public string? Nationality { get; set; }

        [StringLength(20)]
        public string? AadhaarNumber { get; set; }

        [StringLength(30)]
        public string? PassportNumber { get; set; }

       
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
    }
}

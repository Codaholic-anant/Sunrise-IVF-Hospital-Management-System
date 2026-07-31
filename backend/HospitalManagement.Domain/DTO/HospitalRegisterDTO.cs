using System;
using System.Collections.Generic;
using System.Text;

namespace HospitalManagement.Domain.DTO
{
    public class HospitalRegisterDTO
    {
        public string HospitalCode { get; set; } = string.Empty;

        public string HospitalName { get; set; } = string.Empty;

        public string RegistrationNumber { get; set; } = string.Empty;

        public string HospitalType { get; set; } = string.Empty;

        public short? EstablishedYear { get; set; }

        public int? TotalBeds { get; set; }

        public bool EmergencyAvailable { get; set; }

        public bool ICUAvailable { get; set; }

        public bool AmbulanceAvailable { get; set; }

        public bool BloodBankAvailable { get; set; }

        public string? LogoUrl { get; set; }

        public string? Description { get; set; }

        //public byte Status { get; set; }

        //public bool IsActive { get; set; }

        //public bool IsDeleted { get; set; }

        //public long? CreatedBy { get; set; }

        //public DateTime CreatedDate { get; set; }

        //public long? UpdatedBy { get; set; }

        //public DateTime? UpdatedDate { get; set; }
    }
}

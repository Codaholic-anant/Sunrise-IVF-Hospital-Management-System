using System;

namespace HospitalManagement.Core.Models
{
    // Represents the tbl_AdminLogin table row. Property names match database columns.
    public class AdminLogin
    {
        public int Id { get; set; }

        // Database column name is `Username`
        public string Username { get; set; } = string.Empty;

        // Database column has a typo `Pasword` - preserve to match schema
        public string Pasword { get; set; } = string.Empty;

        public bool IsActive { get; set; }
    }
}

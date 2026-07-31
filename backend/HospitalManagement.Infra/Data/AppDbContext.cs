using Microsoft.EntityFrameworkCore;
using HospitalManagement.Core.Models;

namespace HospitalManagement.Infra.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<AdminLogin> AdminLogins { get; set; } = null!;
        public DbSet<Patient> Patients { get; set; } = null!;
        public DbSet<Hospital> Hospitals { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<AdminLogin>(entity =>
            {
                entity.ToTable("tbl_AdminLogin", "dbo");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Username).HasColumnName("Username").HasMaxLength(50).IsRequired();
                entity.Property(e => e.Pasword).HasColumnName("Pasword").HasMaxLength(50).IsRequired();
                entity.Property(e => e.IsActive).HasColumnName("IsActive");
            });

            modelBuilder.Entity<Patient>(entity =>
            {
                entity.ToTable("Patients", "Patient");
                entity.HasKey(e => e.PatientId);
                entity.Property(e => e.PatientId).HasColumnName("PatientId");
                entity.Property(e => e.HospitalId).HasColumnName("HospitalId");
                entity.Property(e => e.RegistrationNo).HasColumnName("RegistrationNo").HasMaxLength(30).IsRequired();
                entity.Property(e => e.FirstName).HasColumnName("FirstName").HasMaxLength(100).IsRequired();
                entity.Property(e => e.MiddleName).HasColumnName("MiddleName").HasMaxLength(100);
                entity.Property(e => e.LastName).HasColumnName("LastName").HasMaxLength(100).IsRequired();
                entity.Property(e => e.Gender).HasColumnName("Gender").HasMaxLength(20).IsRequired();
                entity.Property(e => e.DateOfBirth).HasColumnName("DateOfBirth");
                entity.Property(e => e.BloodGroup).HasColumnName("BloodGroup").HasMaxLength(10);
                entity.Property(e => e.MaritalStatus).HasColumnName("MaritalStatus").HasMaxLength(30);
                entity.Property(e => e.Nationality).HasColumnName("Nationality").HasMaxLength(100);
                entity.Property(e => e.AadhaarNumber).HasColumnName("AadhaarNumber").HasMaxLength(20);
                entity.Property(e => e.PassportNumber).HasColumnName("PassportNumber").HasMaxLength(30);
                entity.Property(e => e.MobileNumber).HasColumnName("MobileNumber").HasMaxLength(20).IsRequired();
                entity.Property(e => e.AlternateMobile).HasColumnName("AlternateMobile").HasMaxLength(20);
                entity.Property(e => e.Email).HasColumnName("Email").HasMaxLength(150);
                entity.Property(e => e.PhotoUrl).HasColumnName("PhotoUrl").HasMaxLength(500);
                entity.Property(e => e.RegistrationDate).HasColumnName("RegistrationDate");
                entity.Property(e => e.RegistrationType).HasColumnName("RegistrationType").HasMaxLength(30);
                entity.Property(e => e.ReferredBy).HasColumnName("ReferredBy").HasMaxLength(150);
                entity.Property(e => e.Status).HasColumnName("Status");
                entity.Property(e => e.IsActive).HasColumnName("IsActive");
                entity.Property(e => e.IsDeleted).HasColumnName("IsDeleted");
                entity.Property(e => e.CreatedBy).HasColumnName("CreatedBy");
                entity.Property(e => e.CreatedDate).HasColumnName("CreatedDate");
                entity.Property(e => e.UpdatedBy).HasColumnName("UpdatedBy");
                entity.Property(e => e.UpdatedDate).HasColumnName("UpdatedDate");
            });

            modelBuilder.Entity<Hospital>(entity =>
            {
                entity.ToTable("Hospitals", "Hospital");
                entity.HasKey(e => e.HospitalId);
                entity.Property(e => e.HospitalId).HasColumnName("HospitalId");

                entity.Property(e => e.HospitalCode).HasColumnName("HospitalCode").HasMaxLength(50).IsRequired();
                entity.Property(e => e.HospitalName).HasColumnName("HospitalName").HasMaxLength(200).IsRequired();
                entity.Property(e => e.RegistrationNumber).HasColumnName("RegistrationNumber").HasMaxLength(100).IsRequired();
                entity.Property(e => e.HospitalType).HasColumnName("HospitalType").HasMaxLength(100).IsRequired();

                entity.Property(e => e.EstablishedYear).HasColumnName("EstablishedYear");
                entity.Property(e => e.TotalBeds).HasColumnName("TotalBeds");

                entity.Property(e => e.EmergencyAvailable).HasColumnName("EmergencyAvailable");
                entity.Property(e => e.ICUAvailable).HasColumnName("ICUAvailable");
                entity.Property(e => e.AmbulanceAvailable).HasColumnName("AmbulanceAvailable");
                entity.Property(e => e.BloodBankAvailable).HasColumnName("BloodBankAvailable");

                entity.Property(e => e.LogoUrl).HasColumnName("LogoUrl").HasMaxLength(500);
                entity.Property(e => e.Description).HasColumnName("Description").HasMaxLength(2000);

                entity.Property(e => e.Status).HasColumnName("Status");
                entity.Property(e => e.IsActive).HasColumnName("IsActive");
                entity.Property(e => e.IsDeleted).HasColumnName("IsDeleted");

                entity.Property(e => e.CreatedBy).HasColumnName("CreatedBy");
                entity.Property(e => e.CreatedDate).HasColumnName("CreatedDate");
                entity.Property(e => e.UpdatedBy).HasColumnName("UpdatedBy");
                entity.Property(e => e.UpdatedDate).HasColumnName("UpdatedDate");
            });
        }
    }
}

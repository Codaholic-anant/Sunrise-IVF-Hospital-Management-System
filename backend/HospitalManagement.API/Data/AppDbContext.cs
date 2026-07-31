using Microsoft.EntityFrameworkCore;
using HospitalManagement.API.Models;

namespace HospitalManagement.API.Data
{
    // EF Core DbContext for the application
    // Tables (DbSets) represented here:
    // - tbl_AdminLogin -> AdminLogins
    // Add additional DbSet<T> properties for other tables as needed (Patients, Doctors, Appointments, etc.)
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {

            // EF Core does not have Database.SetInitializer (that's EF6).
            // Tables already exist in the database; do not call Database.Migrate() here.
        }

        // Represents dbo.tbl_AdminLogin
        public DbSet<AdminLogin> AdminLogins { get; set; } = null!;
        public DbSet<PatientRecord> Patients { get; set; } = null!;
        public DbSet<PatientAddress> PatientAddresses { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Map AdminLogin entity to dbo.tbl_AdminLogin and preserve column names
            modelBuilder.Entity<AdminLogin>(entity =>
            {
                entity.ToTable("tbl_AdminLogin", "dbo");
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Username).HasColumnName("Username").HasMaxLength(50).IsRequired();
                // Column in DB is named `Pasword` (typo) - map property to that column name
                entity.Property(e => e.Pasword).HasColumnName("Pasword").HasMaxLength(50).IsRequired();
                entity.Property(e => e.IsActive).HasColumnName("IsActive");
            });

            modelBuilder.Entity<PatientRecord>(entity =>
            {
                entity.ToTable("Patients", "Patient");
                entity.HasKey(e => e.PatientId);

                entity.Property(e => e.PatientId).HasColumnName("PatientId");
                entity.Property(e => e.RegistrationNo).HasMaxLength(30).IsRequired();
                entity.Property(e => e.FirstName).HasMaxLength(100).IsRequired();
                entity.Property(e => e.MiddleName).HasMaxLength(100);
                entity.Property(e => e.LastName).HasMaxLength(100).IsRequired();
                entity.Property(e => e.Gender).HasMaxLength(20).IsRequired();
                entity.Property(e => e.BloodGroup).HasMaxLength(10);
                entity.Property(e => e.MobileNumber).HasMaxLength(20);
                entity.Property(e => e.Email).HasMaxLength(150);
            });

            modelBuilder.Entity<PatientAddress>(entity =>
            {
                entity.ToTable("PatientAddresses", "Patient");
                entity.HasKey(e => e.AddressId);

                entity.Property(e => e.AddressLine1).HasMaxLength(250).IsRequired();
                entity.Property(e => e.AddressLine2).HasMaxLength(250);
                entity.Property(e => e.City).HasMaxLength(100);
                entity.Property(e => e.State).HasMaxLength(100);
                entity.Property(e => e.Country).HasMaxLength(100);
                entity.Property(e => e.PinCode).HasMaxLength(10);

                entity.HasOne(e => e.Patient)
                    .WithMany(e => e.Addresses)
                    .HasForeignKey(e => e.PatientId);
            });
        }
    }
}

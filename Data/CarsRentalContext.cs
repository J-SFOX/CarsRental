using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using CarsRental.Models;

namespace CarsRental.Data
{
    public partial class CarsRentalContext : DbContext
    {
        public CarsRentalContext()
        {
        }

        public CarsRentalContext(DbContextOptions<CarsRentalContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<User>()
                .HasMany(c => c.Rents)
                .WithOne(e => e.User);

            modelBuilder.Entity<Rent>()
                .HasOne(e => e.User)
                .WithMany(c => c.Rents);

            modelBuilder.Entity<Car>()
                .HasOne(a => a.Rent)
                .WithOne(b => b.Car)
                .HasForeignKey<Rent>(b => b.CarId);

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

        public DbSet<CarsRental.Models.User>? User { get; set; }

        public DbSet<CarsRental.Models.Car>? Car { get; set; }

        public DbSet<CarsRental.Models.Rent>? Rent { get; set; }
    }
}

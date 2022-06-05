using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarsRental.Models
{
    public class Car
    { 
        [Key]
        public int CarId { get; set; }
        public string? Brand { get; set; }
        public double? Amount { get; set; }
        public Boolean? Available { get; set; }
        public double? Amount { get; set; }
        public Rent? Rent {get; set;}
    }
}

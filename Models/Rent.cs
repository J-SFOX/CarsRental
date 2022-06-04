using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarsRental.Models
{
    public class Rent
    {
        [Key]
        public int RentId { get; set; }
        public String? Type { get; set; }
        public DateTime PickUpDate { get; set; }
        public DateTime ReturnDate { get; set; }

        [Display(Name ="User")]
        public virtual int UserId{get; set;}

        [ForeignKey("UserId")]
        public virtual User? User { get; set; }
        [Display(Name ="Car")]
        public int? CarId {get; set;}
        [ForeignKey("CarId")]
        public Car? Car {get; set;}
    } 
}

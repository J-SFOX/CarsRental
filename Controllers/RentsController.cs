using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarsRental.Data;
using CarsRental.Models;

namespace CarsRental.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentsController : ControllerBase
    {
        private readonly CarsRentalContext _context;

        public RentsController(CarsRentalContext context)
        {
            _context = context;
        }

        // GET: api/Rents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Rent>>> GetRent()
        {
          if (_context.Rent == null)
          {
              return NotFound();
          }
            return await _context.Rent.ToListAsync();
        }

        // GET: api/Rents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Rent>> GetRent(int id)
        {
          if (_context.Rent == null)
          {
              return NotFound();
          }
            var rent = await _context.Rent.FindAsync(id);

            if (rent == null)
            {
                return NotFound();
            }

            return rent;
        }

        // PUT: api/Rents/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRent(int id, Rent rent)
        {
            if (id != rent.RentId)
            {
                return BadRequest();
            }

            _context.Entry(rent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
 
        // POST: api/Rents
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // [HttpPost]
        // public async Task<ActionResult<Rent>> PostRent(Rent rent)
        // {
            
        //   if (_context.Rent == null)
        //   {
        //       return Problem("Entity set 'CarsRentalContext.Rent'  is null.");
        //   }
        //     _context.Rent.Add(rent);
        //     await _context.SaveChangesAsync();

        //     // return CreatedAtAction("GetRent", new { id = rent.RentId }, rent);
        //     return Ok(rent); // i do changes here
            
        // }
        // POST: api/Rents
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Rent>> PostRent(Rent rent)
        {
            // rent.Car.Available = false;
            _context.Rent.Add(rent);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRent", new { id = rent.RentId }, rent);
        }
       

        // DELETE: api/Rents/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRent(int id)
        {
            if (_context.Rent == null)
            {
                return NotFound();
            }
            var rent = await _context.Rent.FindAsync(id);
            if (rent == null)
            {
                return NotFound();
            }

            _context.Rent.Remove(rent);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RentExists(int id)
        {
            return (_context.Rent?.Any(e => e.RentId == id)).GetValueOrDefault();
        }
    }
}

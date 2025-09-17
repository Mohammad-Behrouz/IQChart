using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using my_backend_app.Models.Entity;
using my_backend_app.Models.MyDBContext;

namespace my_backend_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiscountCodeController : ControllerBase
    {
        private readonly DBConnection _context;
        public DiscountCodeController(DBConnection context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> add([FromForm] DiscountCode newDiscount)
        {
            if (ModelState.IsValid)
            {
                var existingCode = await _context.discounts.FirstOrDefaultAsync(x => x.discountCode == newDiscount.discountCode);
                if (existingCode != null)
                {
                    return BadRequest(new { message = "این کد از قبل موجود است" });
                }

                _context.discounts.Add(newDiscount);
                await _context.SaveChangesAsync();
                return Ok(newDiscount);
            }
            else
            {
                return BadRequest(new { message = "مشکلی پیش آمده" });

            }
        }
        [HttpGet]
        public async Task<IActionResult> getAll()
        {
            try
            {
                var codes = await _context.discounts.ToListAsync();
                return Ok(codes);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return BadRequest(new { message = "مشکلی پیش اومده" });
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> delete(int id)
        {
            var code = await _context.discounts.FindAsync(id);
            if(code== null)
            {
                return BadRequest(new { message = "کد مدنظر پیدا نشد" });
            }
            try
            {
                _context.discounts.Remove(code);
                await _context.SaveChangesAsync();
                return Ok(code);
            }
            catch (Exception ex) {
                Console.WriteLine(ex);
                return BadRequest(new { message = "مشکلی در سرور پیش آمده" });
            }
        }
    }
}

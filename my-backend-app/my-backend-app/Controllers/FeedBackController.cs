using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using my_backend_app.Models.Entity;
using my_backend_app.Models.MyDBContext;

namespace my_backend_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedBackController : ControllerBase
    {
        private readonly DBConnection _context;
        public FeedBackController(DBConnection context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> add([FromBody] Suggestions suggestions)
        {
            try
            {
                await _context.suggestions.AddAsync(suggestions);
                await _context.SaveChangesAsync();

                return Ok(suggestions);
            }
            catch (Exception ex) { 
                return BadRequest(ex.Message);
            }
        }
    }
}

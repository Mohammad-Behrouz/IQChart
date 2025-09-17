using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using my_backend_app.Models.DTO;
using my_backend_app.Models.Entity;
using my_backend_app.Models.MyDBContext;

namespace my_backend_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        public UsersController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet("all")]
        public async Task<IActionResult> getAll()
        {
            try
            {
                var users = await _userManager.Users
                    .Select(user => new
                    {
                        user.Id,
                        user.UserName ,
                        user.PhoneNumber ,
                        user.Email , 

                    })
                   .ToListAsync();

                if (users != null)
                {

                    return Ok(users);
                }
                return NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

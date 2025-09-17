using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using my_backend_app.Models.Entity;
using my_backend_app.Models.DTO;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;


namespace my_backend_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ITokenService _tokenService;
        public AuthController(UserManager<User> userManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }
        [HttpPost("register")]
        public async Task<IActionResult> register([FromForm] CreateUserDTO newUser)
        {
            if (ModelState.IsValid)
            {
                var user = new User
                {

                    UserName = newUser.UserName,
                    PhoneNumber = newUser.Phone
                };
                var result = await _userManager.CreateAsync(user, newUser.Password);
                if (result.Succeeded)
                {
                    return Ok(user);

                }
                return BadRequest(new { message = "افزودن کاربر موفقیت آمیز نبود " });
            }
            else
            {

                return BadRequest(new { message = "موارد ارسالی صحیح نمیباشند " });
            }
        }
        [HttpPost("login")]
        public async Task<IActionResult> login([FromForm] LoginDTOClass login)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.PhoneNumber == login.Phone);
            if (user == null)
            {
                return BadRequest(new { message = "کاربر یافت نشد" });
            }
            var isPasswordValid = await _userManager.CheckPasswordAsync(user, login.Password);
            if (!isPasswordValid)
            {
                return BadRequest(new { message = "شماره یا رمز اشتباه است" });
            }
            var roles = await _userManager.GetRolesAsync(user);

            // پاس دادن نقش‌ها به توکن
            var token = _tokenService.CreateToken(user, roles);

            return Ok(new { token });
        }

    }
}

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using my_backend_app.Models.MyDBContext;

namespace my_backend_app.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly DBConnection _connection;

        public LoginController(DBConnection connection)
        {
            _connection = connection;
        }

        //[HttpPost]
        //public async Task<IActionResult> addUser([FromForm] string phone, [FromForm] string password)
        //{
        //    try
        //    {
        //        Console.WriteLine($"[addUser] Received phone: {phone}, password: {password}");

        //        var person = await _connection.users.FirstOrDefaultAsync(x => x.phone == phone && x.password == password);
        //        Console.WriteLine($"[addUser] User found: {person != null}, Phone: {phone}");

        //        if (person == null)
        //        {
        //            Console.WriteLine("[addUser] User not found!");
        //            return NotFound(new { error = "نام کاربری یا پسورد اشتباه میباشد" });
        //        }

        //        Console.WriteLine($"[addUser] User details - Phone: {person.phone}, Token: {person.Token ?? "null"}");

        //        var cookieOptions = new CookieOptions
        //        {
        //            HttpOnly = false,                
        //            Secure = false,                
        //            SameSite = SameSiteMode.None,    
        //            Path = "/",
        //            Expires = DateTimeOffset.UtcNow.AddDays(7),
        //        };

             

        //        if (string.IsNullOrEmpty(person.Token))
        //        {
        //            Console.WriteLine("[addUser] Token is null or empty!");
        //            return StatusCode(500, new { error = "توکن کاربر نامعتبر است" });
        //        }

        //        Response.Cookies.Append("role", "user", cookieOptions);
        //        Response.Cookies.Append("auth_id", person.Token, cookieOptions);

        //        Console.WriteLine("[addUser] Cookies set successfully");
        //        return Ok(new {token = person.Token, message = "لاگین موفق" });
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine($"[addUser] Error: {ex.Message}, StackTrace: {ex.StackTrace}");
        //        return StatusCode(500, new {error = "خطای داخلی سرور", detail = ex.Message });
        //    }
        //}

        //[HttpGet]
        //public async Task<IActionResult> CheckLogin()
        //{
        //    try
        //    {
        //        string? role = Request.Cookies["role"];
        //        Console.WriteLine($"[CheckLogin] Role from cookie: {role ?? "null"}");

        //        if (string.IsNullOrEmpty(role))
        //        {
        //            return Ok(new { loggedIn = "n", message = "کاربر لاگین نکرده", Role = role });
        //        }

        //        if (role.Equals("user"))
        //        {
        //            var userToken = Request.Cookies["auth_id"];
        //            Console.WriteLine($"[CheckLogin] auth_id from cookie: {userToken ?? "null"}");

        //            if (string.IsNullOrEmpty(userToken))
        //            {
        //                return Ok(new { loggedIn = "n", message = "آیدی معتبر نیست" });
        //            }

        //            var user = await _connection.users.FirstOrDefaultAsync(x => x.Token == userToken);
        //            Console.WriteLine($"[CheckLogin] User found with token: {user != null}");

        //            if (user == null)
        //            {
        //                return Ok(new { loggedIn = "n", message = "یوزر یافت نشد" });
        //            }

        //            return Ok(new { loggedIn = "y", Name = user.name, Phone = user.phone });
        //        }

        //        return Ok(new { loggedIn = "n", message = "نقش نامعتبر" });
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine($"[CheckLogin] Error: {ex.Message}, StackTrace: {ex.StackTrace}");
        //        return StatusCode(500, new { error = "خطای داخلی سرور", detail = ex.Message });
        //    }
        //}
    }
}
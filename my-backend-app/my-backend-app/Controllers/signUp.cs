using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using my_backend_app.Models.DTO;
using my_backend_app.Models.Entity;
using my_backend_app.Models.MyDBContext;
using System.Numerics;
using System.Xml;

namespace my_backend_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class signUp : ControllerBase
    {
        private readonly DBConnection _connection;

        public signUp (DBConnection connection)
        {
             _connection = connection;
        }

        //[HttpPost]
        //[Consumes("application/x-www-form-urlencoded")]
        //public async Task<IActionResult> signUpUser([FromForm] CreateUserDTO dto)
        //{
        //    try
        //    {
        //        if (string.IsNullOrEmpty(dto.name) || string.IsNullOrEmpty(dto.phone) || string.IsNullOrEmpty(dto.password))
        //        {
        //            return BadRequest(new { errors = new { general = new[] { "مقادیر مورد نیاز را پر کنید !" } } });
        //        }

        //        var searchPerson = await _connection.users.FirstOrDefaultAsync(x => x.phone == dto.phone);
        //        if (searchPerson != null)
        //        {
        //            return BadRequest(new { errors = new { phone = new[] { "شماره قبلا ثبت شده" } } });
        //        }

        //        if (dto.pass_repeat != dto.password)
        //        {
        //            return BadRequest(new { errors = new { pass_repeat = new[] { "پسورد مطابقت ندارد" } } });
        //        }

        //        string token = Guid.NewGuid().ToString();

        //        var user = new User
        //        {
        //            name = dto.name,
        //            Token = token,
        //            phone = dto.phone,
        //            password = dto.password // بهتره رمز رو هش کنید!
        //        };

        //        _connection.users.Add(user);
        //        await _connection.SaveChangesAsync();
        //        return Ok();
        //    }
        //    catch (Exception ex)
        //    {
        //        // لاگ کردن خطا
        //        Console.WriteLine($"خطا در ذخیره‌سازی: {ex.Message}");
        //        return StatusCode(500, new { errors = new { general = new[] { "خطا در ذخیره‌سازی کاربر در دیتابیس" } } });
        //    }
        //}
    }
}

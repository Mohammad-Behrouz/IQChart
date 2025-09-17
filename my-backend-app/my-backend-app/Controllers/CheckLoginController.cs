using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using my_backend_app.Models.MyDBContext;

namespace my_backend_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckLoginController : ControllerBase
    {
        //private readonly DBConnection _connection;
        //public CheckLoginController(DBConnection connection)
        //{
        //    _connection = connection;
        //}
        //[HttpGet]
        //public async Task<IActionResult> CheckLogin ()
        //{
        //    string role = Request.Cookies["role"];
        //    if (role == null)
        //    {
        //        return Ok(new { loggedIn="n" , message = "کاربر لاگین نکرده" , Role = role});
        //    }
        //    else if (role.Equals("user"))
        //    {
        //        var userToken = Request.Cookies["auth_id"];

        //        if (userToken == null)
        //        {
        //            return Ok(new { loggedIn = "n", message = "آیدی معتبر نیست" });
        //        }

        //        var user = await _connection.users.FirstOrDefaultAsync(x => x.Token ==  userToken);

        //        if (user == null) {
        //            return Ok(new { loggedIn = "n", message = "یوزر یافت نشد" });

        //        }

        //        return Ok(new { loggedIn = "y" , Name = user.name, Phone = user.phone  });

        //    }
        //    return Ok();
        //}
    }
}

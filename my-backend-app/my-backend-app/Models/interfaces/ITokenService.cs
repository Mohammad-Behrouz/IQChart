using Microsoft.AspNetCore.Identity;
using my_backend_app.Models.Entity;

public interface ITokenService
{
    string CreateToken(IdentityUser<int> user, IList<string> roles);
}

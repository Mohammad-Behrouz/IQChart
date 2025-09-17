using Microsoft.AspNetCore.Identity;
using my_backend_app.Models.Entity;

namespace my_backend_app.Models.Services
{
    public static class SeedData
    {
        public static async Task SeedRoles(RoleManager<Role> roleManager)
        {
            string[] roles = { "Admin", "User" };

            foreach (var role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    await roleManager.CreateAsync(new Role { Name = role });
                }
            }
        }


    }
}

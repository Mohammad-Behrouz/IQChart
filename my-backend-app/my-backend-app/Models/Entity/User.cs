using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace my_backend_app.Models.Entity
{
    public class User : IdentityUser<int>
    {

        public  string? FullName { get; set; }

        public ICollection<Analysis> Analyses { get; set; }
        public ICollection<Comment> Comments { get; set; }

    }
}

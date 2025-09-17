using System.ComponentModel.DataAnnotations;

namespace my_backend_app.Models.Entity
{
    public class Suggestions
    {
        [Key]
        public int id { get; set; }
        [Required]
        [Display(Name = "متن")]
        public required string text { get; set; }
        [Required]
        [Display(Name = "ارسال کننده")]
        public required int UserId { get; set; }
    }
}

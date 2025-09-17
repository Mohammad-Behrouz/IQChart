using System.ComponentModel.DataAnnotations;

namespace my_backend_app.Models.Entity
{
    public class DiscountCode
    {
        [Key]
        public int DiscountCodeId { get; set; }
        [Required]
        [Display(Name = "کد تخفیف")]
        public required string discountCode{ get; set; }
        [Required]
        [Display(Name = "درصد تخفیف")]
        public int discountPercent { get; set; }
    }
}

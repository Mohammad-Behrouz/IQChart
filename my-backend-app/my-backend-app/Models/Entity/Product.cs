using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace my_backend_app.Models.Entity
{
    public class Product
    {
        [Key]
        public int id { get; set; }
        [Required]
        public required string Name { get; set; }
        [Required]
        public int count { get; set; }
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }
        [Required]
        public required string Description { get; set; }

        public int discount { get; set; } = 0;

        public ICollection<ProductImage>  images { get; set; }
    }
}

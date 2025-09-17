using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace my_backend_app.Models.Entity
{
    public class ProductImage
    {
        [Key]
        public int Id { get; set; }
        public int ProductId { get; set; }

        [JsonIgnore]
        public Product product { get; set; }

        public required string url { get; set; }
    }
}

using System.Text.Json.Serialization;

namespace my_backend_app.Models.DTO
{
    public class EditProductDTO
    {

        public required string Name { get; set; }
        public required string Description { get; set; }
        public required decimal  Price { get; set; }
        public required int count   { get; set; }
    }
}

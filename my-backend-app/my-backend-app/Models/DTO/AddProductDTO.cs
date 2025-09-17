namespace my_backend_app.Models.DTO
{
    public class AddProductDTO
    {
        public required string Name { get; set; }
        public required int count { get; set; }
        public required decimal price { get; set; }
        public required string Description { get; set; }
        public List<IFormFile>? Images { get; set; }
    }
}

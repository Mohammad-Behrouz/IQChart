namespace my_backend_app.Models.DTO
{
    public class ShowProductClass
    {
        public required int id { get; set; }
        public required string Name { get; set; }
        public required int count { get; set; }
        public required decimal price { get; set; }
        public required string Description { get; set; }
        public List<string>? Images { get; set; }
        public required int discount { get; set; }

    }
}

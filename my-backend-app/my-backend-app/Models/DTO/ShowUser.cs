namespace my_backend_app.Models.DTO
{
    public class ShowUser
    {
        public required int id { get; set; }
        public required string name { get; set; }
        public required string email { get; set; }
        
        public required string phone { get; set; }

    }
}

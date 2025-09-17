namespace my_backend_app.Models.DTO
{
    public class ArticleCreateDto
    {
        public required string Title { get; set; }
        public required string Slug { get; set; }
        public required string Summary { get; set; }
        public required string ContentJson { get; set; }
        public required IFormFile CoverImageUrl { get; set; }  
    }

}

public class Article
{
    public Guid Id { get; set; }
    public required string Title { get; set; }
    public required string Slug { get; set; }  
    public required string Summary { get; set; } 
    public required string ContentJson { get; set; } 
    public required string CoverImageUrl { get; set; }
    public required DateTime PublishedAt { get; set; }
    public required DateTime UpdatedAt { get; set; }
    public required string AuthorName { get; set; }
}

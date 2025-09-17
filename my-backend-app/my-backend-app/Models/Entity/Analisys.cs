namespace my_backend_app.Models.Entity
{
    public class Analysis
    {
        public int Id { get; set; }
        public string Content { get; set; } = null!;
        public string? ImageUrl { get; set; } // آدرس عکس آپلود شده
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public int UserId { get; set; }
        public User User { get; set; }

        public decimal SymbolId { get; set; }
        public Symbol Symbol { get; set; }

        public ICollection<Comment> Comments { get; set; }
        public ICollection<AnalysisVote> Votes { get; set; }
    }
}

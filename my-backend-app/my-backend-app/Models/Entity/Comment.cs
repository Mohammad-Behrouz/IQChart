namespace my_backend_app.Models.Entity
{
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public int UserId { get; set; }
        public User User { get; set; }

        public int AnalysisId { get; set; }
        public Analysis Analysis { get; set; }
    }
}

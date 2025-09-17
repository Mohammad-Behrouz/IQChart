namespace my_backend_app.Models.Entity
{
    public class AnalysisVote
    {
        public int Id { get; set; }
        public bool IsUpvote { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public int AnalysisId { get; set; }
        public Analysis Analysis { get; set; }
    }
}

namespace my_backend_app.Models.DTO
{
    // برای ایجاد تحلیل جدید
    public class AnalysisCreateDto
    {
        public string Content { get; set; } = null!;
        public IFormFile? Image { get; set; }
        public int UserId { get; set; }
        public decimal SymbolId { get; set; }
    }

    // برای ویرایش تحلیل
    public class AnalysisUpdateDto
    {
        public string Title { get; set; } = null!;
        public string Content { get; set; } = null!;
        public string? ImageUrl { get; set; }
    }

    // برای برگردوندن اطلاعات تحلیل
    public class AnalysisReadDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Content { get; set; } = null!;
        public string? ImageUrl { get; set; }
        public DateTime CreatedAt { get; set; }

        public int UserId { get; set; }
        public string UserName { get; set; } = null!; // برای نمایش اسم کاربر

        public int SymbolId { get; set; }
        public string SymbolName { get; set; } = null!; // برای نمایش نماد

        public int CommentCount { get; set; }
        public int VoteCount { get; set; }
    }
}

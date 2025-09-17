namespace my_backend_app.Models.Entity
{
    public class Symbol
    {
        public int Id { get; set; }
        public string InsCode { get; set; } = null!; // کد منحصر به فرد بورس
        public string Ticker { get; set; } = null!; // مثلا "وبملت"
        public string FullName { get; set; } = null!; // مثلا "بانک ملت"
        public string Sector { get; set; } = null!; // گروه صنعتی

        public ICollection<Analysis> Analyses { get; set; }
    }
}

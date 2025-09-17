using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using my_backend_app.Models.Entity;

namespace my_backend_app.Models.MyDBContext
{
    public class DBConnection : IdentityDbContext< User , Role , int>
    {
        public DBConnection(DbContextOptions<DBConnection> option):base(option) { }

        public DbSet<User> users { get; set; }
        public DbSet<DiscountCode> discounts { get; set; }
        public DbSet<Suggestions> suggestions { get; set; }
        public DbSet<Article> articles { get; set; }
        public DbSet<Product> products { get; set; }
        public DbSet<Symbol> Symbols { get; set; }
        public DbSet<Analysis> Analyses { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<AnalysisVote> AnalysisVotes { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>()
                .HasMany(p => p.images)
                .WithOne(pi => pi.product)
                .HasForeignKey(pi => pi.ProductId)
                .OnDelete(DeleteBehavior.Cascade);



            modelBuilder.Entity<AnalysisVote>()
                .HasOne(av => av.User)
                .WithMany()
                .HasForeignKey(av => av.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Comment>()
                .HasOne(c => c.User)
                .WithMany()
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Restrict);

        }


    }
}

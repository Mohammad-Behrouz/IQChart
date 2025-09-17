using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using my_backend_app.Models.MyDBContext;
using Microsoft.EntityFrameworkCore;
using my_backend_app.Models.DTO;
using Microsoft.Extensions.Logging.Abstractions;

namespace my_backend_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly DBConnection _context;
        public ArticleController(DBConnection context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] ArticleCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "articles");


            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);


            var uniqueFileName = $"{Guid.NewGuid()}{Path.GetExtension(dto.CoverImageUrl.FileName)}";
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await dto.CoverImageUrl.CopyToAsync(stream);
            }

            string imagePath = $"/uploads/articles/{uniqueFileName}"; 

            var article = new Article
            {
                Id = Guid.NewGuid(),
                AuthorName = "حسین آبگون",
                Title = dto.Title,
                Slug = dto.Slug,
                Summary = dto.Summary,
                ContentJson = dto.ContentJson,
                CoverImageUrl = imagePath,
                PublishedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.articles.Add(article);
            await _context.SaveChangesAsync();

            return Ok(article);
        }

        [HttpGet("slug/{slug}")]
        public async Task<IActionResult> getSlug(string slug)
        {
            var decodedSlug = System.Net.WebUtility.UrlDecode(slug);

            var article = await _context.articles
                .FirstOrDefaultAsync(a => a.Slug == decodedSlug);

            if (article == null) return NotFound();

            return Ok(article);
        }
        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            var articles = await _context.articles
                .OrderByDescending(a => a.PublishedAt)
                .ToListAsync();

            return Ok(articles);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> delete( Guid id)
        {
            var weblog = await _context.articles.FirstOrDefaultAsync(a => a.Id == id);
            if(weblog == null) return NotFound();

            _context.articles.Remove(weblog);
            await _context.SaveChangesAsync();

            return Ok(weblog);

        }

    }
}

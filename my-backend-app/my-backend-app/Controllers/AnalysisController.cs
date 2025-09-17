using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using my_backend_app.Models.DTO;
using my_backend_app.Models.Entity;
using my_backend_app.Models.MyDBContext;

namespace my_backend_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnalysisController : ControllerBase
    {
        private readonly DBConnection _context;
        public AnalysisController(DBConnection context)
        {
            _context = context; 
        }

        [HttpPost]
        public async Task<IActionResult> addAnalysis([FromForm] AnalysisCreateDto newAnalysis)
        {
            var Analysis_user = await _context.users.FindAsync(newAnalysis.UserId);
            if (Analysis_user == null)
            {
                return BadRequest(new { message = "خطا در لاگین" });
            }

            string? imagePath = null;

            if (newAnalysis.Image != null)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Analysis");

                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(newAnalysis.Image.FileName);
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await newAnalysis.Image.CopyToAsync(stream);
                }

                // فقط اسم فایل در URL
                imagePath = $"/Analysis/{uniqueFileName}";
            }

            var analysis = new Analysis()
            {
                Content = newAnalysis.Content,
                UserId = newAnalysis.UserId,
                SymbolId = newAnalysis.SymbolId,
                ImageUrl = imagePath
            };

            _context.Analyses.Add(analysis);
            await _context.SaveChangesAsync();

            return Ok(new { message = "تحلیل با موفقیت ذخیره شد", analysisId = analysis.Id });
        }

    }
}

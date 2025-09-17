using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using my_backend_app.Models.DTO;
using my_backend_app.Models.Entity;
using my_backend_app.Models.MyDBContext;

namespace my_backend_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly DBConnection _context;
        public ProductController(DBConnection context)
        {
            _context = context;
        }
        [HttpPost]
        public async Task<IActionResult> add([FromForm] AddProductDTO newProduct)
        {
            if (ModelState.IsValid)
            {

                var product = new Product
                {
                    Name = newProduct.Name,
                    Description = newProduct.Description,
                    count = newProduct.count,
                    Price = newProduct.price,
                    images = new List<ProductImage>()
                };
                if (newProduct.Images != null)
                {
                    foreach (var image in newProduct.Images)
                    {
                        var fileName = $"{Guid.NewGuid()}{Path.GetExtension(image.FileName)}";
                        var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images/products", fileName);

                        using (var stream = new FileStream(path, FileMode.Create))
                        {
                            await image.CopyToAsync(stream);
                        }

                        product.images.Add(new ProductImage
                        {
                            url = $"/images/products/{fileName}"
                        });
                    }
                }

                await _context.products.AddAsync(product);
                await _context.SaveChangesAsync();

                var returningP = new ShowProductClass
                {
                    id = product.id,
                    Name = product.Name,
                    count = product.count,
                    price = product.Price,
                    Description = product.Description,
                    Images = product.images.Select(img => img.url).ToList(),
                    discount = product.discount,
                };

                return Ok(returningP);
            }
            else
            {
                return BadRequest(new { message = "مدل استیت ولید نیست" });
            }
        }
        [HttpGet("all")]
        public async Task<IActionResult> getAll()
        {
            try
            {
                var products = await _context.products.Include(p => p.images).Select(p => new ShowProductClass
                {
                    id = p.id,
                    Name = p.Name,
                    count = p.count,
                    price = p.Price,
                    Description = p.Description,
                    Images = p.images.Select(img => img.url).ToList(),
                    discount = p.discount,

                }).ToListAsync();

                return Ok(products);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> getProduct(int id)
        {
            var product = await _context.products.Include(p => p.images) .FirstOrDefaultAsync(p => p.id == id);
            if (product == null)
            {
                return BadRequest(new { message = "کالا یافت نشد" });
            }
            var showP = new ShowProductClass
            {
                id = product.id,
                Name = product.Name,
                count = product.count,
                price = product.Price,
                Description = product.Description,
                Images = product.images.Select(img => img.url).ToList(),
                discount = product.discount,

            };
            return Ok(showP);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> edit(int id, [FromForm] AddProductDTO newP)
        {
            var product = await _context.products.FindAsync(id);
            if (product == null)
            {
                return BadRequest(new { message = "کالا یافت نشد" });
            }
            product.Description = newP.Description;
            product.Name = newP.Name;
            product.Price = newP.price;
            product.count = newP.count;

            await _context.SaveChangesAsync();

            return Ok(product);
        }

        [HttpPut("setdiscount/{id}")]
        public async Task<IActionResult> setDiscount(int id, [FromBody] SetDiscountDTO newDiscount)
        {
            var product = await _context.products.FindAsync(id);
            if (product == null)
            {
                return BadRequest(new { message = "کالا یافت نشد" });
            }
            product.discount = newDiscount.discount;
            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> delete(int id)
        {
            var product = await _context.products.FindAsync(id);
            if (product == null)
            {
                return BadRequest(new { message = "کالا یافت نشد" });
            }
            try
            {
                _context.products.Remove(product);
                await _context.SaveChangesAsync();
                return Ok(product);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "خطای سمت سرور" });

            }
        }
        [HttpPost("{id}")]
        public async Task<IActionResult> edit(int id, [FromForm] EditProductDTO newP)
        {
            var product = await _context.products.FindAsync(id);
            if (product == null)
            {
                return BadRequest(new { message = "کالا یافت نشد" });
            }
            product.Name = newP.Name;
            product.Price = newP.Price;
            product.count = newP.count;
            product.Description = newP.Description;
            try
            {
                await _context.SaveChangesAsync();
                return Ok(product);
            }
            catch (Exception ex) { 
                return BadRequest(new {message = ex.Message}); 
            }
        }
    }
}

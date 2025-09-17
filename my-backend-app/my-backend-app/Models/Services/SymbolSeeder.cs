using my_backend_app.Models.DTO;
using my_backend_app.Models.Entity;
using my_backend_app.Models.MyDBContext;
using System;

namespace my_backend_app.Models.Services
{
    public class SymbolSeeder
    {
        private readonly DBConnection _context;
        private readonly HttpClient _http;

        public SymbolSeeder(DBConnection context, HttpClient http)
        {
            _context = context;
            _http = http;
        }

        public async Task SeedSymbolsAsync()
        {
            var url = "https://cdn.tsetmc.com/api/ClosingPrice/GetMarketMap?market=0&size=1360&sector=0&typeSelected=1";
            var data = await _http.GetFromJsonAsync<List<TsetmcSymbolDto>>(url);

            if (data == null) return;

            foreach (var item in data)
            {
                if (!_context.Symbols.Any(s => s.InsCode == item.insCode))
                {
                    _context.Symbols.Add(new Symbol
                    {
                        InsCode = item.insCode,
                        Ticker = item.lVal18AFC,
                        FullName = item.lVal30,
                        Sector = item.lSecVal
                    });
                }
            }

            await _context.SaveChangesAsync();
        }
    }
}

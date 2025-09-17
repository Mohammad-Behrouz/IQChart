using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using my_backend_app.Models.Entity;
using my_backend_app.Models.MyDBContext;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using my_backend_app.Models.Services;

var builder = WebApplication.CreateBuilder(args);

// ?? Binding JwtSettings section from appsettings.json
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));
var jwtSettings = builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>();
var key = Encoding.UTF8.GetBytes(jwtSettings.SecretKey);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DBConnection>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Connection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhosts", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:3001")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddIdentity<User, Role>(option =>
{
    option.Password.RequireDigit = false;
    option.Password.RequireLowercase = false;
    option.Password.RequiredLength = 6;
    option.Password.RequireUppercase = false;
    option.Password.RequireNonAlphanumeric = false;
})
    .AddEntityFrameworkStores<DBConnection>()
    .AddDefaultTokenProviders();

builder.Services.AddScoped<ITokenService, TokenService>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidIssuer = jwtSettings.Issuer,
            ValidAudience = jwtSettings.Audience
        };
    });

    //builder.Services.AddHttpClient<SymbolSeeder>();

    var app = builder.Build();



using (var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<Role>>();
    await SeedData.SeedRoles(roleManager);

    //var symbolSeeder = scope.ServiceProvider.GetRequiredService<SymbolSeeder>();
    //await symbolSeeder.SeedSymbolsAsync();
}

app.UseCors("AllowLocalhosts");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.UseStaticFiles();

app.MapControllers();
app.Run();

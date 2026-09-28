using Microsoft.EntityFrameworkCore;
using PlatoMatchBackend.Data;
using PlatoMatchBackend.Repositories;

var builder = WebApplication.CreateBuilder(args);

// 1. Configurar conexión a SQL Server
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

// 2. Registrar el repositorio (Inyección de dependencias)
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();

// 3. Configurar CORS para React
var politicaCors = "PermitirFrontendReact";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: politicaCors,
        policy =>
        {
            policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 4. Configurar Swagger para .NET 8
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(politicaCors);
app.UseAuthorization();
app.MapControllers();

app.Run();
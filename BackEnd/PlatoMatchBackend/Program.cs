using Microsoft.EntityFrameworkCore;
using PlatoMatchBackend.Data;
using PlatoMatchBackend.Repositories;

var builder = WebApplication.CreateBuilder(args);

//Configuración de la bd 
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseSqlServer(connectionString));

//registrar patron repository (invesion de dependencias)
builder.Services.AddScoped<IUsuarioRepository,UsuarioRepository>();

// habilitacion de CORS para react
var politicaCORS = "PermitirFrontReact";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: politicaCORS,
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
if(app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();
app.UseCors(politicaCORS);
app.UseAuthorization();
app.MapControllers();

app.Run();
// agrega servicios

builder.Services.AddControllers();

builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

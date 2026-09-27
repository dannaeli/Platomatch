using Microsoft.EntityFrameworkCore;
using PlatoMatchBackend.Models;

namespace PlatoMatchBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<Usuario> Usuarios {get; set;}
        public DbSet<InventarioUsuario> InventarioUsuarios {get; set;}
    }
}
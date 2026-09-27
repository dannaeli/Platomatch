using Microsoft.EntityFrameworkCore;
using PlatoMatchBackend.Data;
using PlatoMatchBackend.Models;


namespace PlatoMatchBackend.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly AppDbContext _context;
        public UsuarioRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Usuario?> ObtenerPorCorreoAsync(string correo)
        {
            return await _context.Usuarios.FirstOrDefaultAsync(u => u.Correo == correo);
        }

        //Obtener usuario por ID
        public async Task<Usuario?> ObtenerPorIdAsync(int id)
        {
            return await _context.Usuarios.FindAsync(id);
        }

        public async Task RegistrarUsuarioAsync(Usuario usuario)
        {
            await _context.Usuarios.AddAsync(usuario);
            await _context.SaveChangesAsync();
        }

        public async Task GuardarIngredientesAsync(int usuarioId, List<string> ingredientes)
        {
            var registros = ingredientes.Select(ing => new InventarioUsuario
            {
                UsuarioId = usuarioId,
                NombreIngrediente = ing.Trim() 
            }).ToList();

            await _context.InventarioUsuarios.AddRangeAsync(registros);
            await _context.SaveChangesAsync();
        }

        //Obtener lista de ingredientes que el usuario tiene

        public async Task<List<string>> ObtenerIngredientesPorUsuarioAsync(int usuarioId)
        {
            return await _context.InventarioUsuarios
            .Where(i => i.UsuarioId == usuarioId)
            .Select(i => i.NombreIngrediente)
            .ToListAsync();
        }
    }
}
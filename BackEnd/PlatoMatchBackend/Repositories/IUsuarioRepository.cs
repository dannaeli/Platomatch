using PlatoMatchBackend.Models;

namespace PlatoMatchBackend.Repositories
{
    public interface IUsuarioRepository
    {
        Task<Usuario?> ObtenerPorCorreoAsync(string correo);
        Task<Usuario?> ObtenerPorIdAsync(int id);
        Task RegistrarUsuarioAsync(Usuario usuario);
        Task GuardarIngredientesAsync(int usuarioId, List<string> ingredientes);
        Task<List<string>> ObtenerIngredientesPorUsuarioAsync(int usuarioId);
    }
}
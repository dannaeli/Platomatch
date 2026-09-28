using Microsoft.AspNetCore.Mvc;
using PlatoMatchBackend.Builders;
using PlatoMatchBackend.Models;
using PlatoMatchBackend.Repositories;

namespace PlatoMatchBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuarioRepository _repository;

        public UsuariosController(IUsuarioRepository repository)
        {
            _repository = repository;
        }

        // HU01 a HU04: Registro de usuario y perfil inicial
        [HttpPost("registro")]
        public async Task<IActionResult> Registrar([FromBody] RegistroUsuarioDto dto)
        {
            try
            {
                var existente = await _repository.ObtenerPorCorreoAsync(dto.Correo);
                if (existente != null)
                {
                    return BadRequest(new { mensaje = "Ya existe una cuenta asociada a este correo electrónico" });
                }

                var nuevoUsuario = new UsuarioBuilder()
                    .ConCredenciales(dto.Nombre, dto.Correo, dto.Contrasena)
                    .ConPresupuesto(dto.Presupuesto)
                    .ConCantidadPersonas(dto.CantidadPersonas)
                    .ConRestricciones(dto.RestriccionesSalud)
                    .Build();

                await _repository.RegistrarUsuarioAsync(nuevoUsuario);

                return Ok(new { mensaje = "Usuario registrado exitosamente", usuarioId = nuevoUsuario.Id });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        // Login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var usuario = await _repository.ObtenerPorCorreoAsync(dto.Correo);
            if (usuario == null || usuario.Contrasena != dto.Contrasena)
            {
                return Unauthorized(new { mensaje = "Credenciales incorrectas" });
            }

            return Ok(new 
            { 
                id = usuario.Id,
                nombre = usuario.Nombre,
                correo = usuario.Correo,
                presupuesto = usuario.Presupuesto,
                cantidadPersonas = usuario.CantidadPersonas,
                restricciones = usuario.RestriccionesSalud
            });
        }

        // HU05: Guardar ingredientes disponibles
        [HttpPost("{usuarioId}/ingredientes")]
        public async Task<IActionResult> RegistrarIngredientes(int usuarioId, [FromBody] List<string> ingredientes)
        {
            if (ingredientes == null || !ingredientes.Any())
            {
                return BadRequest(new { mensaje = "Debe enviar al menos un ingrediente" });
            }

            await _repository.GuardarIngredientesAsync(usuarioId, ingredientes);
            return Ok(new { mensaje = "Ingredientes guardados correctamente" });
        }

        // HU05 Consultar ingredientes disponibles
        [HttpGet("{usuarioId}/ingredientes")]
        public async Task<IActionResult> ObtenerIngredientes(int usuarioId)
        {
            var lista = await _repository.ObtenerIngredientesPorUsuarioAsync(usuarioId);
            return Ok(lista);
        }
    }

    // DTOs con todas las propiedades requeridas
    public class RegistroUsuarioDto
    {
        public string Nombre { get; set; } = string.Empty;
        public string Correo { get; set; } = string.Empty;
        public string Contrasena { get; set; } = string.Empty;
        public decimal Presupuesto { get; set; }
        public int CantidadPersonas { get; set; }
        public string? RestriccionesSalud { get; set; }
    }

    public class LoginDto
    {
        public string Correo { get; set; } = string.Empty;
        public string Contrasena { get; set; } = string.Empty;
    }
}
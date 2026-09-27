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

        //dependecias
        public UsuariosController(IUsuarioRepository repository)
        {
            _repository = repository;
        }

        //HU01 a HU04: Registro del usuario completo
        [HttpPost("registro")]
        public async Task<IActionResult> Registrar([FromBody] RegistroUsuarioDto dto)
        {
            try
            {
                /// validacion de que no exista el correo (Escenario 2 del HU01)
                var existente = await _repository.ObtenerPorCorreoAsync(dto.Correo);
                if(existente != null)
                {
                    return BadRequest(new { mensaje = "Ya existe una cuenta asociada a este correo"});
                }

                ///EL patron builder para crear y validar el modelo de dominio
                var nuevoUsuario = new UsuarioBuilder()
                    .ConCredenciales(dto.Nombre, dto.Correo, dto.Contrasena)
                    .ConPresupuesto(dto.Presupuesto)
                    .ConCantidadPersonas(dto.CantidadPersonas)
                    .ConRestricciones(dto.RestriccionesSalud)
                    .Build();
                await _repository.RegistrarUsuarioAsync(nuevoUsuario);

                return Ok(new { mensaje = "Usuario registrado exitosamente", usuarioId = nuevoUsuario.Id});
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { mensaje = ex.Message});
            }
        }

        ///Login de sesion
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var usuario = await _repository.ObtenerPorCorreoAsync(DataTokensMetadata.Correo);
            if(usuario == null || usuario.Contrasena != DataTokensMetadata.Contrasena)
            {
                return Unauthorized(new { mensaje = "Credenciales incorrectas"});
            }

            return Ok(new
            {
                id = usuario.id,
                nombre = usuario.Nombre,
                correo = usuario.Correo,
                presupuesto = usuario.Presupuesto,
                cantidadPersonas = usuario.CantidadPersonas,
                restricciones = usuario.RestriccionesSalud
            });
        }
        ///HU05 Guardar ingredientes disponibles del hogar
        [HttpPost("{usuarioId}/ingredientes")]
        public async Task<IActionResult> RegistrarIngredientes(int usuarioId, [FromBody] List<string> ingredientes)
        {
            if (ingredientes == null || !ingredientes.Any())
            {
                return BadRequest(new { mensaje = "Debe enviar al menos un ingrediente o lista"});
            }
            await _repository.GuardarIngredientesAsync(usuarioId, ingredientes);
            return Ok(new {mensaje = "Ingredientes guardados correctamente en tu despesa"});
        }

        ///HU05 Consulta de los ingredientes que esten disponibles
        [HttpGet("{usuarioId}/ingredientes")]
        public async Task<IActionResult> ObtenerIngredientes(int usuarioId)
        {
            var lista = await _repository.ObtenerIngredientesPorUsuarioAsync(usuarioId);
            return Ok(lista);
        }

    }

    ///DTOs Data transfer objects para las peticiones de react
    public class RegistroUsuarioDto
    {
        public string Nombre {get; set;} = string.Empty;
        public string Correo {get; set;} = string.Empty;
        public string Contrasena {get; set;} = string.Empty;
        public decimal Presupuesto {get; set;}
        public int CantidadPersonas {get; set;}
        public string? restriccionesSalud {get; set;}
    }

    public class LoginDto
    {
        public string Correo {get; set; } = string.Empty;
        public string Contrasena { get; set;} = string.Empty;
    }
}


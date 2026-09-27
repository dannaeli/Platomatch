using PlatoMatchBackend.Models;

namespace PlatoMatchBackend.Builders
{
    public class UsuarioBuilder
    {
        private readonly Usuario _usuario = new Usuario();

        public UsuarioBuilder ConCredenciales(string nombre, string correo, string contrasena)
        {
            if(string.IsNullOrWhiteSpace(correo) || !correo.Contains('@'))
                throw new ArgumentException("Ingrese un correco electrónico válido");

            if(string.IsNullOrWhiteSpace(contrasena) || contrasena.Length < 6)
                throw new ArgumentException("La contraseña debe tener al menos 6 caracteres");

            _usuario.Nombre = nombre;
            _usuario.Correo = correo;
            _usuario.Contrasena = contrasena;
            return this;
        }

        //Validacion del presupuesto mayor a 0
        public UsuarioBuilder ConPresupuesto(decimal presupuesto)
        {
            if(presupuesto <= 0 )
                throw new ArgumentException("El presupuesto debe ser mayor a 0");
            
            _usuario.Presupuesto = presupuesto;
            return this;
        }

        //validacion de la cantidad de personas positiva
        public UsuarioBuilder ConCantidadPersonas(int cantidad)
        {
            if (cantidad <= 0)
                throw new ArgumentException("La cantidad debe ser mayor a 0");
            
            _usuario.CantidadPersonas = cantidad;
            return this;
        }

        /// restriciones y salud del usuario
        public UsuarioBuilder ConRestricciones(string? restricciones)
        {
            _usuario.RestriccionesSalud = string.IsNullOrWhiteSpace(restricciones)
                ? "Ninguna"
                : restricciones;
            return this;
        }

        public Usuario Build()
        {
            return _usuario;
        }
    }
}
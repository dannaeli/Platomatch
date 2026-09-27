using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;

namespace PlatoMatchBackend.Models
{
    [Table("Usuario")]
    public class Usuario
    {
        [Key]
        [Column("id_usuario")]
        public int Id {get; set;}

        [Required]
        [Column("nombre")]
        public string Nombre {get; set;} = string.Empty;

        [Required]
        [EmailAddress]
        [Column("correo")]
        public string Correo {get; set;} = string.Empty;

        [Required]
        [Column("contrasena")]
        public string Contrasena {get; set;} = string.Empty;

        [Column("presupuesto")]
        public decimal Presupuesto {get; set;}

        [Column("cantidad_personas")]
        public int CantidadPersonas {get; set;}

        [Column("restricciones_salud")]
        public string? RestriccionesSalud {get; set;}

        [Column("fecha_registro")]
        public DateTime FechaRegistro {get; set;} = DateTime.UtcNow;
    }
}
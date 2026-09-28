using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace PlatoMatchBackend.Models
{
    [Table("Usuarios")]
    public class Usuario
    {
        [Key]
        public int Id {get; set;}

        [Required]
        public string Nombre {get; set;} = string.Empty;

        [Required]
        [EmailAddress]
        public string Correo {get; set;} = string.Empty;

        [Required]
        public string Contrasena {get; set;} = string.Empty;

        public decimal Presupuesto {get; set;}

        public int CantidadPersonas {get; set;}

        public string? RestriccionesSalud {get; set;}

        public DateTime FechaRegistro {get; set;} = DateTime.UtcNow;
    }

}
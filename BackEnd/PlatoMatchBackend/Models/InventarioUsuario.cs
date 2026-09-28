using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlatoMatchBackend.Models
{
    [Table("InventarioUsuarios")]
    public class InventarioUsuario
    {
        [Key]
        public int Id {get; set;}

        public int UsuarioId {get; set;}

        [Required]
        public string NombreIngrediente {get; set;} = string.Empty;
    }
}
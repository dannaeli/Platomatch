using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlatoMatchBackend.Models
{
    [Table("InventarioUsuario")]
    public class InventarioUsuario
    {
        [Key]
        [Column("id_inventario")]
        public int Id {get; set;}

        [Column("id_usuario")]
        public int UsuarioId {get; set;}

        [Required]
        [Column("nombre_ingrediente")]
        public string NombreIngrediente {get; set;} = string.Empty;
    }
}
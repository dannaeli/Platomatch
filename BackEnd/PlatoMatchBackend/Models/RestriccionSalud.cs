namespace PlatoMatchBackend.Models
{
    //Clase abstracta (contrato base)
    public abstract class RestriccionSalud
    {
        public int Id{get; set; }
        public String Nombre { get; set; } = string.Empty;
        public abstract string Tipo {get;}

        public abstract bool EsCompatible(string ingrediente);
    }

    //Alergia (al gluten o lacteos o etc)
    public class Alergia : RestriccionSalud
    {
        public override string Tipo => "Alergia";

        public override bool EsCompatible(string ingrediente)
        {
            return !ingrediente.Contains(Nombre, StringComparison.OrdinalIgnoreCase);
        }
    }

    //Condicion medica, anemia, etc
    public class CondicionMedica : RestriccionSalud
    {
        public override string Tipo => "CondicionMedica";

        public override bool EsCompatible(string ingrediente)
        {
            return true; // anemia y otras condiciones aplican  a reglas nutricionales especificas
        }
    }
}
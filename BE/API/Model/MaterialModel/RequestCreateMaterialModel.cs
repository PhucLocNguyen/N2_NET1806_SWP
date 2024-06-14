using Repository.Entity;

namespace API.Model.MaterialModel
{
    public class RequestCreateMaterialModel
    {
        public string Name { get; set; } = null!;

        public decimal Price { get; set; }

        public int ManagerId { get; set; }
    }
}

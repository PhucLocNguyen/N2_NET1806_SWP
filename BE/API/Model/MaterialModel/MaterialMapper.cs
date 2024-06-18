using Repository.Entity;

namespace API.Model.MaterialModel
{
    public static class MaterialMapper
    {
        public static Material toMaterialEntity(this RequestCreateMaterialModel requestCreateMaterialModel)
        {
            return new Material()
            {
                Name = requestCreateMaterialModel.Name,
                Price = requestCreateMaterialModel.Price,
                ManagerId = requestCreateMaterialModel.ManagerId,
            };
        }
    }
}

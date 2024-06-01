using Repository.Entity;

namespace API.Model.MasterGemstoneModel
{
    public static class MasterGemstoneMapper
    {
        public static MasterGemstone toMasterGemstonesEntity(this RequestCreateMasterGemstoneModel requestCreateMasterGemstoneModel)
        {
            return new MasterGemstone()
            {
                Kind = requestCreateMasterGemstoneModel.Kind,
                Size = requestCreateMasterGemstoneModel.Size,
                Price = requestCreateMasterGemstoneModel.Price,
                Clarity = requestCreateMasterGemstoneModel.Clarity,
                Cut = requestCreateMasterGemstoneModel.Cut,
                Weight = requestCreateMasterGemstoneModel.Weight,
                Shape = requestCreateMasterGemstoneModel.Shape,
            };
        }
    }
}

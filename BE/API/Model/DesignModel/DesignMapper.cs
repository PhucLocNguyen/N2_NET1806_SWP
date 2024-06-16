using Repository.Entity;

namespace API.Model.DesignModel
{
    public static class DesignMapper
    {
        public static Design toDesignEntity(this RequestCreateDesignModel requestCreateDesignModel)
        {
            return new Design()
            {
                ParentId = requestCreateDesignModel.ParentId,
                Image = requestCreateDesignModel.Image,
                DesignName = requestCreateDesignModel.DesignName,
                WeightOfMaterial = requestCreateDesignModel.WeightOfMaterial,
                StoneId = requestCreateDesignModel.StoneId,
                MasterGemstoneId = requestCreateDesignModel.MasterGemstoneId,
                ManagerId = requestCreateDesignModel.ManagerId,
                TypeOfJewelleryId = requestCreateDesignModel.TypeOfJewelleryId,
                MaterialId = requestCreateDesignModel.MaterialId,
            };
        }
    }
}

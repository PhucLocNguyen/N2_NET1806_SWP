using API.Model.MasterGemstoneModel;
using API.Model.MaterialModel;
using API.Model.StonesModel;
using API.Model.TypeOfJewellryModel;
using Repositories;

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

        public static DesignDTO toDesignDTO(this Design design)
        {
            return new DesignDTO()
            {
                DesignId = design.DesignId,
                ParentId = design.ParentId,
                Image = design.Image,
                DesignName = design.DesignName,
                WeightOfMaterial = design.WeightOfMaterial,
                Stone = StonesMapper.toCreateStones(design.Stone),
                MasterGemstone = MasterGemstoneMapper.toCreateMasterGemstones(design.MasterGemstone),
                Manager = design.Manager,
                TypeOfJewellery = new RequestCreateTypeOfJewelleryModel() { Name = design.TypeOfJewellery.Name},
                Material = MaterialMapper.toCreateMaterial(design.Material),
            };
        }

        public static RequestCreateDesignModel toCreateDesign(this Design design)
        {
            return new RequestCreateDesignModel()
            {
                ParentId = design.ParentId,
                Image = design.Image,
                DesignName = design.DesignName,
                WeightOfMaterial = design.WeightOfMaterial,
                StoneId = design.StoneId,
                MasterGemstoneId = design.MasterGemstoneId,
                ManagerId = design.ManagerId,
                TypeOfJewelleryId = design.TypeOfJewelleryId,
                MaterialId = design.MaterialId,
            };
        }
    }
}

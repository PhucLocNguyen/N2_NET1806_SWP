using Repository.Entity;
using System.Runtime.CompilerServices;

namespace API.Model.RequirementModel
{
     public static class RequirementMapper
    {
         public static Requirement toRequirementEntity(this RequestCreateRequirementModel requestCreateRequirementModel)
        {
            return new Requirement()
            {
                Status = requestCreateRequirementModel.Status,

                ExpectedDelivery = requestCreateRequirementModel.ExpectedDelivery,

                Size = requestCreateRequirementModel.Size,

                DesignId = requestCreateRequirementModel.DesignId,

                Design3D = requestCreateRequirementModel.Design3D,

                GoldPriceAtMoment = requestCreateRequirementModel.GoldPriceAtMoment,

                StonePriceAtMoment = requestCreateRequirementModel.StonePriceAtMoment,

                MachiningFee = requestCreateRequirementModel.MachiningFee,

                TotalMoney = requestCreateRequirementModel.TotalMoney,

                CustomerNote = requestCreateRequirementModel.CustomerNote,

                StaffNote = requestCreateRequirementModel.StaffNote,
            };
        }
    }
}

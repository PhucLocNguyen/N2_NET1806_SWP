﻿using API.Model.TypeOfJewellryModel;
using API.Model.WarrantyCardModel;
using Repositories.Entity;

namespace API.Model.HaveModel
{
    public static class HaveMapper
    {
        public static Have ToHaveEntity(this RequestCreateHaveModel requestCreateHaveModel)
        {
            return new Have
            {
                WarrantyCardId = requestCreateHaveModel.WarrantyCardId,
                RequirementId = requestCreateHaveModel.RequirementId,
                DateCreated = requestCreateHaveModel.DateCreated,
                ExpirationDate = requestCreateHaveModel.ExpirationDate,
            };
        }
        public static ResponseHave toHaveDTO(this Have have)
        {
            return new ResponseHave()
            {
                RequirementId = have.RequirementId,
                //WarrantyCardId = have.WarrantyCardId,
                WarrantyCard = have.WarrantyCard != null ? WarrantyCardMapper.ToWarrantyCardDTO(have.WarrantyCard) : null,
                DateCreated = have.DateCreated,
                ExpirationDate = have.ExpirationDate
            };
        }
    }
}

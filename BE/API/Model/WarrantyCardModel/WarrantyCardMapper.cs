﻿using Repository.Entity;

namespace API.Model.WarrantyCardModel
{
    public static class WarrantyCardMapper
    {
        public static WarrantyCard ToWarrantyCardEntity(this RequestWarrantyCardModel requestWarrantyCardModel)
        {
            return new WarrantyCard
            {
                Title = requestWarrantyCardModel.Title,
                Description = requestWarrantyCardModel.Description
            };
        }
    }
}
﻿using API.Model.MasterGemstoneModel;
using API.Model.MaterialModel;
using API.Model.StonesModel;
using API.Model.TypeOfJewellryModel;
using Repositories;

namespace API.Model.DesignModel
{
    public class DesignDTO
    {
        public int DesignId { get; set; }

        public int? ParentId { get; set; }

        public string? Image { get; set; }

        public string? Description { get; set; }

        public string? DesignName { get; set; }

        public decimal? WeightOfMaterial { get; set; }

        public virtual AppUser Manager { get; set; }

        public virtual RequestCreateMasterGemstoneModel? MasterGemstone { get; set; }

        public virtual RequestCreateMaterialModel? Material { get; set; }

        public virtual RequestCreateStonesModel? Stone { get; set; }

        public virtual RequestCreateTypeOfJewelleryModel TypeOfJewellery { get; set; }
    }
}

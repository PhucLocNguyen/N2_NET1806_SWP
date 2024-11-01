﻿using API.Model.WarrantyCardModel;
using Repositories.Entity;

namespace API.Model.HaveModel
{
    public class ResponseHave
    {
        //public int WarrantyCardId { get; set; }
        public virtual WarrantyCardDTO? WarrantyCard { get; set; }
        public int RequirementId { get; set; }
        public DateOnly? DateCreated { get; set; }
        public DateOnly? ExpirationDate { get; set; }
    }
}

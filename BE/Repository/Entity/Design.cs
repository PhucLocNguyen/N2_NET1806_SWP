﻿using System;
using System.Collections.Generic;

namespace Repository.Entity;

public partial class Design
{
    public int DesignId { get; set; }

    public int? ParentId { get; set; }

    public string? Image { get; set; }

    public string? DesignName { get; set; }

    public decimal? WeightOfMaterial { get; set; }

    public int? StoneId { get; set; }

    public int? MasterGemstoneId { get; set; }

    public int ManagerId { get; set; }

    public int TypeOfJewelleryId { get; set; }

    public int? MaterialId { get; set; }

    public virtual ICollection<Design> InverseParent { get; set; } = new List<Design>();

    public virtual User Manager { get; set; }

    public virtual MasterGemstone? MasterGemstone { get; set; }

    public virtual Material? Material { get; set; }

    public virtual Design? Parent { get; set; }

    public virtual ICollection<Requirement> Requirements { get; set; } = new List<Requirement>();

    public virtual Stones? Stone { get; set; }

    public virtual TypeOfJewellery TypeOfJewellery { get; set; }
}
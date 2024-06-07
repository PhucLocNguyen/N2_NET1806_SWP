using Repositories.Entity;
using System;
using System.Collections.Generic;

namespace Repositories;

public partial class TypeOfJewellery
{
    public int TypeOfJewelleryId { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Design> Designs { get; set; } = new List<Design>();

    public virtual DesignRule DesignRule { get; set; }
}

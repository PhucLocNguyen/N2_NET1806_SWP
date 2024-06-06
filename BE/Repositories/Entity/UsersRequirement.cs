using System;
using System.Collections.Generic;

namespace Repositories;

public partial class UsersRequirement
{
    public int UsersRequirementId { get; set; }

    public string? UsersId { get; set; }

    public int? RequirementId { get; set; }

    public virtual Requirement? Requirement { get; set; }

    public virtual AppUser? Users { get; set; }
}

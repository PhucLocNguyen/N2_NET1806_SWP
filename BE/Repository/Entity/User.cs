using System;
using System.Collections.Generic;

namespace Repository.Entity;

public partial class User
{
    public int UsersId { get; set; }

    public string Name { get; set; } = null!;

    public string? Email { get; set; }

    public string? Phone { get; set; }

    public int? RoleId { get; set; }

    public virtual ICollection<Blog> Blogs { get; set; } = new List<Blog>();

    public virtual ICollection<Design> Designs { get; set; } = new List<Design>();

    public virtual ICollection<Material> Materials { get; set; } = new List<Material>();

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual Role? Role { get; set; }

    public virtual ICollection<UserRequirement> UsersRequirements { get; set; } = new List<UserRequirement>();

    public object Select(Func<object, object> value)
    {
        throw new NotImplementedException();
    }
}

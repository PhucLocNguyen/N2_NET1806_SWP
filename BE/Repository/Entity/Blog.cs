using System;
using System.Collections.Generic;

namespace Repository.Entity;

public partial class Blog
{
    public int BlogId { get; set; }

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public string? Image { get; set; }

    public int? ManagerId { get; set; }

    public virtual User? Manager { get; set; }
}

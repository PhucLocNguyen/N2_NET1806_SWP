using System;
using System.Collections.Generic;

namespace Repository.Entity;

public partial class Payment
{
    public int PaymentId { get; set; }

    public decimal? Amount { get; set; }

    public string? Method { get; set; }

    public DateOnly? CompletedAt { get; set; }

    public int? CustomerId { get; set; }

    public int? RequirementId { get; set; }

    public virtual User? Customer { get; set; }

    public virtual Requirement? Requirement { get; set; }
}

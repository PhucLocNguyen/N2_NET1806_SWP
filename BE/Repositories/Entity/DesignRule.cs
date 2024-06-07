using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Entity
{
    public partial class DesignRule
    {
        public int DesignRuleId { get; set; }
        public int TypeOfJewelleryId { get; set; }
        public decimal MinSizeMasterGemstone { get; set; }
        public decimal MaxSizeMasterGemstone { get; set; }
        public decimal MinSizeJewellery { get; set; }
        public decimal MaxSizeJewellery { get; set; }
        public virtual TypeOfJewellery TypeOfJewellery { get; set; }
    }
}

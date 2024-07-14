using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SWP391Project.Services.Model.RequestCreatePaymentByStaff
{
    public class RequestCreatePaymentByStaff
    {
        public string PaymentContent { get; set; } ="Pay by cash for order";

        public int? RequirementsId { get; set; }
    }
}

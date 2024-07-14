using API.Model.VnPayModel;
using Repositories.Entity;
using SWP391Project.Services.Model.RequestCreatePaymentByStaff;

namespace API.Model.PaymentModel
{
    public static class PaymentMapper
    {
        public static Payment ToPaymentEntity(this RequestCreateVnpay vnpayDTO, int userId, int requirementId)
        {
            return new Payment
            {
                Amount = vnpayDTO.RequiredAmount,
                CompletedAt = vnpayDTO.PaymentDate,
                Content = vnpayDTO.PaymentContent,
                Method = "Vnpay",
                CustomerId = userId,
                RequirementsId = requirementId,
            };
        }
        public static Payment ToPaymentEntityCreateByStaff(this RequestCreatePaymentByStaff paymentStaff, int customerId, decimal amount)
        {
            return new Payment
            {
                Amount = amount,
                CompletedAt = DateTime.Now,
                Content = paymentStaff.PaymentContent,
                Method = "Cash",
                Status="Paid",
                CustomerId = customerId,
                RequirementsId = paymentStaff.RequirementsId,
            };
        }
    }
}

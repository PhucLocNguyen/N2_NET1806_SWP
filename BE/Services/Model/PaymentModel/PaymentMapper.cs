using API.Model.VnPayModel;
using Repositories.Entity;

namespace API.Model.PaymentModel
{
    public static class PaymentMapper
    {
        public static Payment ToPaymentEntity(this RequestCreateVnpay vnpayDTO, int userId, int requirementId)
        {
            return new Payment
            {
                Amount = (decimal)vnpayDTO.PaidAmount,
                CompletedAt = vnpayDTO.PaymentDate,
                Method = "Vnpay",
                CustomerId = userId,
                RequirementsId = requirementId,
            };
        }
    }
}

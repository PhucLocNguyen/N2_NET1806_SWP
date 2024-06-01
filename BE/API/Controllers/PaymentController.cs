using API.Model.PaymentModel;
using Microsoft.AspNetCore.Mvc;
using Repository;
using Repository.Entity;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;

        public PaymentController(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("{id}")]
        public IActionResult GetPaymentById(int id)
        {
            var Payment = _unitOfWork.PaymentRepository.GetByID(id);

            if (Payment == null)
            {
                return NotFound();
            }

            return Ok(Payment);
        }

        [HttpPost]
        public IActionResult CreatePayment(RequestCreatePaymentModel requestCreatePaymentModel)
        {
            var Payment = requestCreatePaymentModel.ToPaymentEntity();
            _unitOfWork.PaymentRepository.Insert(Payment);
            _unitOfWork.Save();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult UpdatePayment(int id, RequestCreatePaymentModel requestCreatePaymentModel)
        {
            var ExistPayment = _unitOfWork.PaymentRepository.GetByID(id);

            if (ExistPayment == null)
            {
                return NotFound();
            }

            ExistPayment.Amount = requestCreatePaymentModel.Amount;
            ExistPayment.Method = requestCreatePaymentModel.Method;
            ExistPayment.CustomerId = requestCreatePaymentModel.CustomerId;
            ExistPayment.RequirementsId = requestCreatePaymentModel.RequirementsId;

            _unitOfWork.PaymentRepository.Update(ExistPayment);
            _unitOfWork.Save();
            return Ok();
        }

        [HttpDelete]
        public IActionResult DeletePayment(int id)
        {
            var ExistPayment = _unitOfWork.PaymentRepository.GetByID(id);

            if (ExistPayment == null)
            {
                return NotFound();
            }

            _unitOfWork.PaymentRepository.Delete(ExistPayment);
            _unitOfWork.Save();
            return Ok();
        }
    }
}

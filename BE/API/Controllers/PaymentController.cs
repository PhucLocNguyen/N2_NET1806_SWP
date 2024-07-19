using API.Model.PaymentModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Repositories;
using Repositories.Entity;
using SWP391Project.Services.Model.RequestCreatePaymentByStaff;
using System.Linq.Expressions;

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

        [HttpGet]
        public IActionResult SearchPayment([FromQuery] RequestSearchPaymentModel requestSearchPaymentModel)
        {
            try
            {
                var sortBy = requestSearchPaymentModel.SortContent != null ? requestSearchPaymentModel.SortContent?.sortPaymentBy.ToString() : null;
                var sortType = requestSearchPaymentModel.SortContent != null ? requestSearchPaymentModel.SortContent?.sortPaymentType.ToString() : null;
                Expression<Func<Payment, bool>> filter = x =>
                    (string.IsNullOrEmpty(requestSearchPaymentModel.Method) || x.Method.Contains(requestSearchPaymentModel.Method)) &&
                    (x.CustomerId == requestSearchPaymentModel.CustomerId || requestSearchPaymentModel.CustomerId == null) &&
                    (x.RequirementsId == requestSearchPaymentModel.RequirementsId || requestSearchPaymentModel.RequirementsId == null) &&
                    x.Amount >= requestSearchPaymentModel.FromAmount &&
                    (x.Amount <= requestSearchPaymentModel.ToAmount || requestSearchPaymentModel.ToAmount == null);
                Func<IQueryable<Payment>, IOrderedQueryable<Payment>> orderBy = null;

                if (!string.IsNullOrEmpty(sortBy))
                {
                    if (sortType == SortPaymentTypeEnum.Ascending.ToString())
                    {
                        orderBy = query => query.OrderBy(p => EF.Property<object>(p, sortBy));
                    }
                    else if (sortType == SortPaymentTypeEnum.Descending.ToString())
                    {
                        orderBy = query => query.OrderByDescending(p => EF.Property<object>(p, sortBy));
                    }
                }
                var reponseDesign = _unitOfWork.PaymentRepository.Get(
                    filter,
                    orderBy,
                    includeProperties: "",
                    pageIndex: requestSearchPaymentModel.pageIndex,
                    pageSize: requestSearchPaymentModel.pageSize
                    );
                return Ok(reponseDesign);
            }
            catch (Exception ex)
            {
                return BadRequest("Something wrong in SearchPayment");
            }
           
        }

        [HttpGet("{id}")]
        public IActionResult GetPaymentById(int id)
        {
            try
            {
                var Payment = _unitOfWork.PaymentRepository.GetByID(id);

                if (Payment == null)
                {
                    return NotFound("Payment is not existed");
                }

                return Ok(Payment);
            }
            catch (Exception ex)
            {
                return BadRequest("Something wrong in GetPaymentById");
            }
            
        }

        [HttpGet("GetAllPaymentByRequirementId")]
        public IActionResult GetPaymentByRequirementId([FromQuery] int requirementId)
        {
            try
            {
                var Payment = _unitOfWork.PaymentRepository.Get((x) => x.RequirementsId == requirementId && (x.Status.Equals("Paid") || x.Status.Equals("Failed"))).ToList();

                if (Payment == null)
                {
                    return NotFound("Payment is not existed");
                }

                return Ok(Payment);
            }
            catch (Exception ex)
            {
                return BadRequest("Something wrong in GetPaymentByRequirementId");
            }
            
        }

        [HttpPost]
        public IActionResult CreatePayment(RequestCreatePaymentByStaff requestCreatePaymentByStaff)
        {
            Requirement requirement = _unitOfWork.RequirementRepository.GetByID((int)requestCreatePaymentByStaff.RequirementsId);

            Design design = _unitOfWork.DesignRepository.Get((Design x) => x.DesignId == requirement.DesignId, null, null, null, (Design x) => x.MasterGemstone, (Design x) => x.Stone, (Design x) => x.Material).FirstOrDefault();

            if (requirement == null)
            {
                return BadRequest("Invalid requirement Id");
            }
            var users = _unitOfWork.UserRequirementRepository.Get(filter: x => x.RequirementId == requestCreatePaymentByStaff.RequirementsId, includeProperties: "User")
            .Select(ur => ur.User).Where(x => x.RoleId == 6).FirstOrDefault();
            decimal MaterialPriceAtMoment2 = Math.Ceiling((requirement.MaterialPriceAtMoment * requirement.WeightOfMaterial).Value);
            decimal? MasterGemStonePriceAtMoment2 = requirement.MasterGemStonePriceAtMoment;
            decimal? StonePriceAtMoment2 = requirement.StonePriceAtMoment;
            decimal? MachiningFee2 = requirement.MachiningFee;
            decimal? TotalMoney2 = (decimal?)MaterialPriceAtMoment2 + MasterGemStonePriceAtMoment2 + StonePriceAtMoment2 + MachiningFee2;
            var amount = Decimal.Zero; // money will pay
            if (requirement.Status.Equals("4"))
            {
                amount = Math.Ceiling((TotalMoney2 / (decimal?)2).Value);
            }
            if (requirement.Status.Equals("10"))
            {
                Payment paymentDeposit = _unitOfWork.PaymentRepository.Get((Payment x) => x.RequirementsId == requestCreatePaymentByStaff.RequirementsId && x.Status.Equals("Paid")).FirstOrDefault();

                amount = (decimal)(TotalMoney2 - (decimal)paymentDeposit.Amount);

            }

            var Payment = requestCreatePaymentByStaff.ToPaymentEntityCreateByStaff(users.UsersId, amount);
            if (Payment != null)
            {
                if (requirement.Status == "4")
                {
                    requirement.Status = "5";

                }
                if (requirement.Status == "10")
                {
                    requirement.Status = "11";
                }
            }


            _unitOfWork.RequirementRepository.Update(requirement);
            _unitOfWork.PaymentRepository.Insert(Payment);
            _unitOfWork.Save();
            return Ok("Create successfully");
        }

        [HttpPut("{id}")]
        public IActionResult UpdatePayment(int id, RequestCreatePaymentModel requestCreatePaymentModel)
        {
            try
            {
                var ExistPayment = _unitOfWork.PaymentRepository.GetByID(id);

                if (ExistPayment == null)
                {
                    return NotFound("Payment is not existed");
                }

                ExistPayment.Amount = (decimal)requestCreatePaymentModel.Amount;
                ExistPayment.Method = requestCreatePaymentModel.Method;
                ExistPayment.CustomerId = requestCreatePaymentModel.CustomerId;
                ExistPayment.RequirementsId = requestCreatePaymentModel.RequirementsId;

                _unitOfWork.PaymentRepository.Update(ExistPayment);
                _unitOfWork.Save();
                return Ok("Update payment successfully");
            }
            catch (Exception ex)
            {
                return BadRequest("Update payment failed");
            }
            
        }

        [HttpDelete]
        public IActionResult DeletePayment(int id)
        {
            var ExistPayment = _unitOfWork.PaymentRepository.GetByID(id);

            if (ExistPayment == null)
            {
                return NotFound("Payment is not existed");
            }
            try
            {
                _unitOfWork.PaymentRepository.Delete(ExistPayment);
                _unitOfWork.Save();
            }
            catch (DbUpdateException ex)
            {
                if (_unitOfWork.IsForeignKeyConstraintViolation(ex))
                {
                    return BadRequest("Cannot delete this item because it is referenced by another entity");
                }
                else
                {
                    throw;
                }
            }
            
            return Ok("Delete payment successfully");
        }
    }
}

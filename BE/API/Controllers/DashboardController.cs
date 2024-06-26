using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repositories;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;

        public DashboardController(UnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        [HttpGet("Revenue")]
        public IActionResult GetRevenue(int? year, Month monthFromRequest)
        {
            try
            {
                var PaymentByMonth = _unitOfWork.PaymentRepository.Get(filter:
               x => x.CompletedAt.Value.Month.Equals((int)monthFromRequest) && x.CompletedAt.Value.Year.Equals(year)).ToList();
                var RevenueByMonth = PaymentByMonth.GroupBy(x => x.CompletedAt.Value.Month).Select(x => new
                {
                    month = monthFromRequest.ToString(),
                    Revenue = x.Sum(x => x.Amount)
                });
                return Ok(RevenueByMonth);
            }
            catch (Exception ex)
            {
                return BadRequest("Something wrong");
            }
        }
        [HttpGet("CountType")]
        public IActionResult GetCountByType(Month monthFromRequest, int year, string TypeJewelleryFromRquest)
        {
            try
            {
                var TypeJewelleryObject = _unitOfWork.TypeOfJewellryRepository.Get(filter: x => x.Name.Equals(TypeJewelleryFromRquest)).FirstOrDefault();

                var RequirementCurrentMonth = _unitOfWork.RequirementRepository.Get(filter: x => x.CreatedDate.Value.Month.Equals((int)monthFromRequest)
                && x.CreatedDate.Value.Year.Equals(year)).ToList();

                var DesignHaveRequirement = _unitOfWork.DesignRepository.Get(filter:
                    x => x.TypeOfJewelleryId == TypeJewelleryObject.TypeOfJewelleryId).Select(x => x.DesignId).ToList();
                if ((int)monthFromRequest == 1)
                {
                    var RequirementLastMonth = _unitOfWork.RequirementRepository.Get(filter: x => x.CreatedDate.Value.Month.Equals(12)
                    && x.CreatedDate.Value.Year.Equals(year - 1)).ToList();

                    var CountTypeCurrentMonth = RequirementCurrentMonth.Where(requirement => DesignHaveRequirement.Contains(requirement.DesignId)).ToList().Count;
                    var CountTypeLastMonth = RequirementLastMonth.Where(requirement => DesignHaveRequirement.Contains(requirement.DesignId)).ToList().Count;
                    return Ok(new
                    {
                        TypeJewellery = TypeJewelleryFromRquest,
                        LastMonth = CountTypeLastMonth,
                        CurrentMonth = CountTypeCurrentMonth
                    });
                }
                else
                {
                    var RequirementLastMonth = _unitOfWork.RequirementRepository.Get(filter: x => x.CreatedDate.Value.Month.Equals((int)monthFromRequest - 1)
                    && x.CreatedDate.Value.Year.Equals(year)).ToList();

                    var CountTypeCurrentMonth = RequirementCurrentMonth.Where(requirement => DesignHaveRequirement.Contains(requirement.DesignId)).ToList().Count;
                    var CountTypeLastMonth = RequirementLastMonth.Where(requirement => DesignHaveRequirement.Contains(requirement.DesignId)).ToList().Count;
                    return Ok(new
                    {
                        TypeJewellery = TypeJewelleryFromRquest,
                        LastMonth = CountTypeLastMonth,
                        CurrentMonth = CountTypeCurrentMonth
                    });
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Something wrong");
            }
        }
    }
    public enum Month
    {
        January = 1,
        February = 2,
        March = 3,
        April = 4,
        May = 5,
        June = 6,
        July = 7,
        August = 8,
        September = 9,
        October = 10,
        November = 11,
        December = 12,
    }
}

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
               x => x.CompletedAt.Value.Month.Equals((int)monthFromRequest) && x.CompletedAt.Value.Year.Equals(year)&&x.Status.Equals("Paid")).ToList();
                var RevenueByMonth = PaymentByMonth.GroupBy(x => x.CompletedAt.Value.Month).Select(x => new
                {
                    month = monthFromRequest.ToString(),
                    Revenue = x.Sum(x => x.Amount)
                });
                return Ok(RevenueByMonth);
            }
            catch (Exception ex)
            {
                return BadRequest("Something wrong in GetRevenue");
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
                return BadRequest("Something wrong in GetCountByType");
            }

        }
        [HttpGet("NumberRequirementInMonth")]
        public IActionResult GetNumberRequirementInMonth(int? year, Month monthFromRequest)
        {
            try
            {
                var RequirementInMonth = _unitOfWork.RequirementRepository.Get(filter: x => x.CreatedDate.Value.Month.Equals((int)monthFromRequest)
                && x.CreatedDate.Value.Year.Equals(year)).ToList().Count();
                return Ok(new
                {
                    month = monthFromRequest.ToString(),
                    NumberSelling = RequirementInMonth,
                });
            }
            catch (Exception ex)
            {
                return BadRequest("Something wrong in GetNumberRequirementInMonth");
            }
            
        }

        [HttpGet("MostDesign")]
        public IActionResult GetMostDesign()
        {
            try
            {
                //Đếm số bản desgin mà requirement dùng
                var designCounts = _unitOfWork.DesignRepository.Get(filter: x => x.ParentId == null)
                    .GroupJoin(
                        _unitOfWork.RequirementRepository.Get(),
                        design => design.DesignId,
                        requirement => requirement.DesignId,
                        (design, requirements) => new
                        {
                            DesignId = design.DesignId,
                            Count = requirements.Count()
                        })
                        .OrderByDescending(x => x.Count);

                //Đếm design cha có bao nhiêu con 
                var parentDesigns = _unitOfWork.DesignRepository.Get(filter: x => x.ParentId == null).Select(x => x.DesignId);
                var childDesignCounts = _unitOfWork.DesignRepository.Get()
                    .GroupBy(x => x.ParentId)
                    .Select(x => new
                    {
                        ParentId = x.Key,
                        Count = x.Count()
                    }).ToList();

                var allParentDesignCounts = parentDesigns.GroupJoin(
                    childDesignCounts,
                    parent => parent,
                    child => child.ParentId,
                    (parent, children) => new
                    {
                        ParentId = parent,
                        Count = children.FirstOrDefault()?.Count ?? 0
                    })
                    .OrderByDescending(x => x.Count);
                // Đếm tổng 
                var Result = designCounts.GroupJoin(
                    allParentDesignCounts,
                    designCount => designCount.DesignId,
                    allParent => allParent.ParentId,
                    (designCounts, allParentCount) => new
                    {
                        DesignId = designCounts.DesignId,
                        Count = designCounts.Count + allParentCount.FirstOrDefault()?.Count ?? 0
                    }
                    ).OrderByDescending(x => x.Count).Take(3);
                return Ok(Result);
            }
            catch (Exception ex)
            {
                return BadRequest("Something wrong in GetMostDesign");
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

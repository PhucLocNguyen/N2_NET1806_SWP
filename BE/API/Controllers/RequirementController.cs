using API.Model.DesignModel;
using API.Model.MasterGemstoneModel;
using API.Model.RequirementModel;
using API.Model.UserModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Repositories;
using Repositories.Entity;
using SWP391Project.Services.WorkingBoard.Hubs;
using System.Linq;
using System.Linq.Expressions;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequirementController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IHubContext<WorkingHub> _hubContext;
        public RequirementController(UnitOfWork unitOfWork, IHubContext<WorkingHub> hubContext)
        {
            _unitOfWork = unitOfWork;
            _hubContext = hubContext;
        }

        [HttpGet]
        public IActionResult SearchBlog([FromQuery] RequestSearchRequirementModel requestSearchRequirementModel)
        {
            var sortBy = requestSearchRequirementModel.SortContent != null ? requestSearchRequirementModel.SortContent?.sortRequirementBy.ToString() : null;
            var sortType = requestSearchRequirementModel.SortContent != null ? requestSearchRequirementModel.SortContent?.sortRequirementType.ToString() : null;
            Expression<Func<Requirement, bool>> filter = x =>
                (string.IsNullOrEmpty(requestSearchRequirementModel.Status) || x.Status.Contains(requestSearchRequirementModel.Status)) &&
                (x.Size == requestSearchRequirementModel.Size|| requestSearchRequirementModel.Size == null) &&
                (x.DesignId == requestSearchRequirementModel.DesignId || requestSearchRequirementModel.DesignId == null) &&
                x.MaterialPriceAtMoment >= requestSearchRequirementModel.FromMaterialPriceAtMoment &&
                (x.MaterialPriceAtMoment <= requestSearchRequirementModel.ToMaterialPriceAtMoment || requestSearchRequirementModel.ToMaterialPriceAtMoment == null) &&
                x.WeightOfMaterial >= requestSearchRequirementModel.FromWeightOfMaterial &&
                (x.WeightOfMaterial <= requestSearchRequirementModel.ToWeightOfMaterial || requestSearchRequirementModel.ToWeightOfMaterial == null) &&
                x.StonePriceAtMoment >= requestSearchRequirementModel.FromStonePriceAtMoment &&
                (x.StonePriceAtMoment <= requestSearchRequirementModel.ToStonePriceAtMoment || requestSearchRequirementModel.ToStonePriceAtMoment == null) &&
                x.MachiningFee >= requestSearchRequirementModel.FromMachiningFee &&
                (x.MachiningFee <= requestSearchRequirementModel.ToMachiningFee || requestSearchRequirementModel.ToMachiningFee == null) &&
                x.TotalMoney >= requestSearchRequirementModel.FromTotalMoney &&
                (x.TotalMoney <= requestSearchRequirementModel.ToTotalMoney || requestSearchRequirementModel.ToTotalMoney == null);
            Func<IQueryable<Requirement>, IOrderedQueryable<Requirement>> orderBy = null;

            if (!string.IsNullOrEmpty(sortBy))
            {
                if (sortType == SortRequirementTypeEnum.Ascending.ToString())
                {
                    orderBy = query => query.OrderBy(p => EF.Property<object>(p, sortBy));
                }
                else if (sortType == SortDesignTypeEnum.Descending.ToString())
                {
                    orderBy = query => query.OrderByDescending(p => EF.Property<object>(p, sortBy));
                }
            }
            var reponseDesign = _unitOfWork.RequirementRepository.Get(
                filter,
                orderBy,
                includeProperties: "",
                pageIndex: requestSearchRequirementModel.pageIndex,
                pageSize: requestSearchRequirementModel.pageSize
                ).Select(x => x.toRequirementDTO());
            return Ok(reponseDesign);
        }

        [HttpGet("{id}")]
        public IActionResult GetRequirementById(int id)
        {
            var Requirement = _unitOfWork.RequirementRepository.GetByID(id);
            if (Requirement == null)
            {
                return NotFound("Requiremnet is not existed");
            }

            return Ok(Requirement.toRequirementDTO());
        }

        [HttpPost]
        public IActionResult CreateRequirement(RequestCreateRequirementModel requestCreateRequirementModel)
        {
            var error = "";
            var properties = typeof(RequestCreateRequirementModel).GetProperties();

            foreach (var property in properties)
            {
                if (property.PropertyType == typeof(decimal))
                {
                    var value = property.GetValue(requestCreateRequirementModel);
                    if ((decimal)value < 0)
                    {
                        error = property.Name + " must be positive number";
                        break;
                    }
                }
            }
            if (!string.IsNullOrEmpty(error))
            {
                return BadRequest(error);
            }
            var Requirement = requestCreateRequirementModel.toRequirementEntity();
            _unitOfWork.RequirementRepository.Insert(Requirement);
            _unitOfWork.Save();
            var requirementId = Requirement.RequirementId;
            _hubContext.Clients.All.SendAsync("ReceiveOrderCreate", requirementId);
            return Ok("Create requirement successfully");
        }

        
        [HttpPut("{id}")]
        public IActionResult UpdateRequirement([FromRoute]int id,RequestCreateRequirementModel requestCreateRequirementModel)
        {
            var existedRequirement = _unitOfWork.RequirementRepository.GetByID(id);
            if (existedRequirement == null)
            {
                return NotFound("Requiremnet is not existed");
            }
            existedRequirement.Status = requestCreateRequirementModel.Status;
            existedRequirement.ExpectedDelivery = requestCreateRequirementModel.ExpectedDelivery!=null? DateOnly.FromDateTime((DateTime)requestCreateRequirementModel.ExpectedDelivery):null;
            existedRequirement.Size = requestCreateRequirementModel.Size;
            existedRequirement.DesignId = (int)requestCreateRequirementModel.DesignId;
            existedRequirement.Design3D = requestCreateRequirementModel.Design3D;
            existedRequirement.WeightOfMaterial = requestCreateRequirementModel.WeightOfMaterial;
            existedRequirement.MaterialPriceAtMoment = requestCreateRequirementModel.MaterialPriceAtMoment;
            existedRequirement.StonePriceAtMoment = requestCreateRequirementModel.StonePriceAtMoment;
            existedRequirement.MachiningFee = requestCreateRequirementModel.MachiningFee;
            existedRequirement.TotalMoney = requestCreateRequirementModel.TotalMoney;
            existedRequirement.CustomerNote = requestCreateRequirementModel.CustomerNote;
            existedRequirement.StaffNote = requestCreateRequirementModel.StaffNote;
            _unitOfWork.RequirementRepository.Update(existedRequirement);
            _unitOfWork.Save();
            _hubContext.Clients.All.SendAsync("ReceiveOrderUpdate", id);
            return Ok("Update Requirement successfully");
        }

        [HttpDelete]
        public IActionResult DeleteRequirement(int id)
        {
            var existedRequirement = _unitOfWork.RequirementRepository.GetByID(id);
            if (existedRequirement == null)
            {
                return NotFound("Requiremnet is not existed");
            }
            _unitOfWork.RequirementRepository.Delete(existedRequirement);
            _unitOfWork.Save();
            return Ok();
        }

        [HttpGet("GetRequirementByRole")]

        public IActionResult GetRequirement(int userId, string status)
        {
            var RequirementByStatus = _unitOfWork.RequirementRepository.Get(filter: x=>x.Status.Equals(status)).ToList();
            var UserRequirementByUserId = _unitOfWork.UserRequirementRepository.Get(filter: x=>x.UsersId == userId).Select(x=>x.RequirementId).ToList();
            var Result = RequirementByStatus.Where(x=>UserRequirementByUserId.Contains(x.RequirementId)).Select(x=>x.toRequirementDTO()).ToList();
            return Ok(Result);
        }

        
    }
}

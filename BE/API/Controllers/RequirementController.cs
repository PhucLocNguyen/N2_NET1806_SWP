﻿using API.Model.DesignModel;
using API.Model.MasterGemstoneModel;
using API.Model.RequirementModel;
using API.Model.UserModel;
using MailKit.Search;
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
            try
            {
                var sortBy = requestSearchRequirementModel.SortContent != null ? requestSearchRequirementModel.SortContent?.sortRequirementBy.ToString() : null;
                var sortType = requestSearchRequirementModel.SortContent != null ? requestSearchRequirementModel.SortContent?.sortRequirementType.ToString() : null;
                Expression<Func<Requirement, bool>> filter = x =>
                    (string.IsNullOrEmpty(requestSearchRequirementModel.Status) || x.Status.Equals(requestSearchRequirementModel.Status)) &&
                    (x.Size == requestSearchRequirementModel.Size || requestSearchRequirementModel.Size == null) &&
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
            catch (Exception ex)
            {
                return BadRequest("Something wrong in SearchBlog");
            }
           
        }

        [HttpGet("{id}")]
        public IActionResult GetRequirementById(int id, [FromQuery]int? userId)
        {
            try
            {
                if (userId != null)
                {
                    var userRequirement = _unitOfWork.UserRequirementRepository.Get(filter: x => x.UsersId == userId && x.RequirementId == id).FirstOrDefault();
                    if (userRequirement == null)
                    {
                        return BadRequest("You don't not allow to see detail this requirement");
                    }
                }
                var Requirement = _unitOfWork.RequirementRepository.GetByID(id);
                if (Requirement == null)
                {
                    return NotFound("Requiremnet is not existed");
                }

                return Ok(Requirement.toRequirementDTO());
            }
            catch (Exception ex)
            {
                return BadRequest("Something wrong in GetRequirementById");
            }
            
        }

        [HttpPost]
        public IActionResult CreateRequirement(RequestCreateRequirementModel requestCreateRequirementModel)
        {
            try
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
                return Ok(Requirement);

            }
            catch (Exception ex)
            {
                return BadRequest("Create Requirement failed");
            }
            
        }

        
        [HttpPut("{id}")]
        public IActionResult UpdateRequirement([FromRoute]int id,RequestCreateRequirementModel requestCreateRequirementModel)
        {
            try
            {
                var existedRequirement = _unitOfWork.RequirementRepository.GetByID(id);
                if (existedRequirement == null)
                {
                    return NotFound("Requiremnet is not existed");
                }
                existedRequirement.Status = requestCreateRequirementModel.Status;
                if (requestCreateRequirementModel.Status.Equals("4"))
                {
                    existedRequirement.ExpectedDelivery = DateOnly.FromDateTime(DateTime.Now.AddDays(14));
                }
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
                existedRequirement.MasterGemStonePriceAtMoment = requestCreateRequirementModel.MasterGemStonePriceAtMoment;
                _unitOfWork.RequirementRepository.Update(existedRequirement);
                _unitOfWork.Save();
                _hubContext.Clients.All.SendAsync("ReceiveOrderUpdate", id);
                return Ok("Update Requirement successfully");
            }
            catch (Exception ex)
            {
                return BadRequest("Update Requirement failed");
            }
            
        }

        [HttpDelete]
        public IActionResult DeleteRequirement(int id)
        {

            var existedRequirement = _unitOfWork.RequirementRepository.GetByID(id);
            if (existedRequirement == null)
            {
                return NotFound("Requiremnet is not existed");
            }
            try
            {
                _unitOfWork.RequirementRepository.Delete(existedRequirement);
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

            return Ok("Delete Requirement successfully");
            
        }

        [HttpGet("GetRequirementByRole")]

        public IActionResult GetRequirement(int userId, string status)
        {
            try
            {
                var RequirementByStatus = _unitOfWork.RequirementRepository.Get(filter: x => x.Status.Equals(status)).ToList();
                var UserRequirementByUserId = _unitOfWork.UserRequirementRepository.Get(filter: x => x.UsersId == userId).Select(x => x.RequirementId).ToList();
                var Result = RequirementByStatus.Where(x => UserRequirementByUserId.Contains(x.RequirementId)).Select(x => x.toRequirementDTO()).ToList();
                return Ok(Result);
            }
            catch (Exception ex)
            {
                return BadRequest("Something wrong in GetRequirement");
            }
           
        }

        [HttpGet("PriceOfRequirement")]
        public IActionResult GetPrice(int requirementId)
        {
            try
            {
                Requirement requirement = _unitOfWork.RequirementRepository.GetByID(requirementId);
                Design design = _unitOfWork.DesignRepository.Get((Design x) => x.DesignId == requirement.DesignId, null, null, null, (Design x) => x.MasterGemstone, (Design x) => x.Stone, (Design x) => x.Material).FirstOrDefault();
                if (requirement.Status.Equals("3") || requirement.Status.Equals("-2") || requirement.Status.Equals("-3"))
                {
                    decimal price = design.Material.Price;
                    decimal? weightOfMaterial = requirement.WeightOfMaterial;
                    decimal MaterialPriceAtMoment = Math.Ceiling(((decimal?)price * weightOfMaterial).Value);
                    decimal MasterGemStonePriceAtMoment = ((design.MasterGemstone != null) ? design.MasterGemstone.Price : 0m);
                    decimal StonePriceAtMoment = ((design.Stone != null) ? design.Stone.Price : 0m);
                    decimal? MachiningFee = requirement.MachiningFee;
                    decimal? TotalMoney = (decimal?)(MaterialPriceAtMoment + MasterGemStonePriceAtMoment + StonePriceAtMoment) + MachiningFee;
                    return Ok(new
                    {
                        RequirementId = requirementId,
                        MaterialPriceAtMomentAnon = MaterialPriceAtMoment,
                        MasterGemStonePriceAtMomentAnon = MasterGemStonePriceAtMoment,
                        StonePriceAtMomentAnon = StonePriceAtMoment,
                        MachiningFeeAnon = MachiningFee,
                        TotalMoneyAnon = TotalMoney
                    });
                }
                decimal MaterialPriceAtMoment2 = Math.Ceiling((requirement.MaterialPriceAtMoment * requirement.WeightOfMaterial).Value);
                decimal? MasterGemStonePriceAtMoment2 = requirement.MasterGemStonePriceAtMoment;
                decimal? StonePriceAtMoment2 = requirement.StonePriceAtMoment;
                decimal? MachiningFee2 = requirement.MachiningFee;
                decimal? TotalMoney2 = (decimal?)MaterialPriceAtMoment2 + MasterGemStonePriceAtMoment2 + StonePriceAtMoment2 + MachiningFee2;
                if (requirement.Status.Equals("4"))
                {
                    var anonymousRequirementDeposit = new
                    {
                        RequirementId = requirementId,
                        MaterialPriceAtMomentAnon = MaterialPriceAtMoment2,
                        MasterGemStonePriceAtMomentAnon = MasterGemStonePriceAtMoment2,
                        StonePriceAtMomentAnon = StonePriceAtMoment2,
                        MachiningFeeAnon = MachiningFee2,
                        TotalMoneyAnon = TotalMoney2,
                        Deposit = Math.Ceiling((TotalMoney2 / (decimal?)2).Value)
                    };
                    return Ok(anonymousRequirementDeposit);
                }
                Payment paymentDeposit = _unitOfWork.PaymentRepository.Get((Payment x) => x.RequirementsId == (int?)requirementId && x.Status.Equals("Paid")).FirstOrDefault();
                var anonymousRequirement = new
                {
                    RequirementId = requirementId,
                    MaterialPriceAtMomentAnon = MaterialPriceAtMoment2,
                    MasterGemStonePriceAtMomentAnon = MasterGemStonePriceAtMoment2,
                    StonePriceAtMomentAnon = StonePriceAtMoment2,
                    MachiningFeeAnon = MachiningFee2,
                    TotalMoneyAnon = TotalMoney2,
                    Deposit = paymentDeposit.Amount,
                    PayTheRest = TotalMoney2 - (decimal?)paymentDeposit.Amount
                };
                return Ok(anonymousRequirement);
            }
            catch (Exception)
            {
                return BadRequest("Something wrong in GetPrice");
            }
        }

        [HttpGet("requirementWaitingToPay")]
        public IActionResult GetRequirementWaitingToPay([FromQuery] int pageIndex, [FromQuery] int pageSize)
        {
            try
            {
                var Requirement = _unitOfWork.RequirementRepository.Get(
                    filter: (x) => x.Status.Equals("4") || x.Status.Equals("10"), null, pageIndex: pageIndex, pageSize: pageSize)
                    .Select((x) => x.toRequirementDTO()).ToList();
                return Ok(Requirement);
            }
            catch (Exception ex)
            {
                return BadRequest("Something wrong in GetRequirementById");
            }

        }

        [HttpPost("ConfirmPrice")]
        public IActionResult ConfirmPrice([FromBody] int requirementId)
        {
            try
            {
                Requirement requirement = _unitOfWork.RequirementRepository.GetByID(requirementId);
                Design design = _unitOfWork.DesignRepository.Get((Design x) => x.DesignId == requirement.DesignId, null, null, null, (Design x) => x.MasterGemstone, (Design x) => x.Stone, (Design x) => x.Material).FirstOrDefault();
                if (requirement.Status.Equals("3"))
                {
                    var MasterGemstonePrice = design.MasterGemstone != null ? design.MasterGemstone.Price : 0;
                    var StonePrice = design.Stone != null ? design.Stone.Price : 0;
                    var MaterialPrice = design.Material.Price;
                    requirement.MasterGemStonePriceAtMoment = MasterGemstonePrice;
                    requirement.StonePriceAtMoment = StonePrice;
                    requirement.MaterialPriceAtMoment = MaterialPrice;
                    requirement.Status = "4";

                    requirement.TotalMoney = (decimal?)(Math.Ceiling((decimal)(MaterialPrice * requirement.WeightOfMaterial)) + MasterGemstonePrice + StonePrice) + requirement.MachiningFee;
                    requirement.ExpectedDelivery = DateOnly.FromDateTime(DateTime.Now.AddDays(14));
                }

                _unitOfWork.RequirementRepository.Update(requirement);
                _unitOfWork.Save();
                _hubContext.Clients.All.SendAsync("ReceiveOrderUpdate", requirementId);
                return Ok("Update Requirement successfully");
            }
            catch (Exception ex)
            {
                return BadRequest("Something wrong in GetRequirementById");
            }
        }

    }
}

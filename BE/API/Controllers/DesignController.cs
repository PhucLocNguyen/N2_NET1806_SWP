using API.Model.BlogModel;
using API.Model.DesignModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Repository;
using Repository.Entity;
using System.Linq.Expressions;
using static System.Net.Mime.MediaTypeNames;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DesignController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;

        public DesignController(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public IActionResult SearchBlog([FromQuery] RequestSearchDesignModel requestSearchDesignModel)
        {
            var sortBy = requestSearchDesignModel.SortContent != null ? requestSearchDesignModel.SortContent?.sortDesignBy.ToString() : null;
            var sortType = requestSearchDesignModel.SortContent != null ? requestSearchDesignModel.SortContent?.sortDesignType.ToString() : null;
            Expression<Func<Design, bool>> filter = x =>
                (string.IsNullOrEmpty(requestSearchDesignModel.DesignName) || x.DesignName.Contains(requestSearchDesignModel.DesignName)) &&
                (x.ParentId == requestSearchDesignModel.ParentId || requestSearchDesignModel.ParentId == null) &&
                (x.StoneId == requestSearchDesignModel.StoneId || requestSearchDesignModel.StoneId == null) &&
                (x.MasterGemstoneId == requestSearchDesignModel.MasterGemstoneId || requestSearchDesignModel.MasterGemstoneId == null) &&
                (x.ManagerId == requestSearchDesignModel.ManagerId || requestSearchDesignModel.ManagerId == null) &&
                (x.TypeOfJewelleryId == requestSearchDesignModel.TypeOfJewelleryId || requestSearchDesignModel.TypeOfJewelleryId == null) &&
                (x.MaterialId == requestSearchDesignModel.MaterialId || requestSearchDesignModel.MaterialId == null) &&
                x.WeightOfMaterial >= requestSearchDesignModel.FromWeightOfMaterial &&
                (x.WeightOfMaterial <= requestSearchDesignModel.ToWeightOfMaterial || requestSearchDesignModel.ToWeightOfMaterial == null);
            Func<IQueryable<Design>, IOrderedQueryable<Design>> orderBy = null;

            if (!string.IsNullOrEmpty(sortBy))
            {
                if (sortType == SortDesignTypeEnum.Ascending.ToString())
                {
                    orderBy = query => query.OrderBy(p => EF.Property<object>(p, sortBy));
                }
                else if (sortType == SortDesignTypeEnum.Descending.ToString())
                {
                    orderBy = query => query.OrderByDescending(p => EF.Property<object>(p, sortBy));
                }
            }
            var reponseDesign = _unitOfWork.DesignRepository.Get(
                filter,
                orderBy,
                includeProperties: "",
                pageIndex: requestSearchDesignModel.pageIndex,
                pageSize: requestSearchDesignModel.pageSize
                );
            return Ok(reponseDesign);
        }

        [HttpGet("{id}")]
        public IActionResult GetDesignById(int id)
        {
            var Design = _unitOfWork.DesignRepository.GetByID(id);
            if (Design == null)
            {
                return NotFound();
            }

            return Ok(Design);
        }

        [HttpPost]
        public IActionResult CreateDesign(RequestCreateDesignModel requestCreateDesignModel)
        {
            var Design = requestCreateDesignModel.toDesignEntity();
            _unitOfWork.DesignRepository.Insert(Design);
            _unitOfWork.Save();
            return Ok();
        }

        [HttpPut]
        public IActionResult UpdateDesign(int id, RequestCreateDesignModel requestCreateDesignModel)
        {
            var existedDesign = _unitOfWork.DesignRepository.GetByID(id);
            if (existedDesign == null)
            {
                return NotFound();
            }
            existedDesign.ParentId = requestCreateDesignModel.ParentId;
            existedDesign.Image = requestCreateDesignModel.Image;
            existedDesign.DesignName = requestCreateDesignModel.DesignName;
            existedDesign.WeightOfMaterial = requestCreateDesignModel.WeightOfMaterial;
            existedDesign.StoneId = requestCreateDesignModel.StoneId;
            existedDesign.MasterGemstoneId = requestCreateDesignModel.MasterGemstoneId;
            existedDesign.ManagerId = requestCreateDesignModel.ManagerId;
            existedDesign.TypeOfJewelleryId = requestCreateDesignModel.TypeOfJewelleryId;
            existedDesign.MaterialId = requestCreateDesignModel.MaterialId;
            _unitOfWork.DesignRepository.Update(existedDesign);
            _unitOfWork.Save();
            return Ok();
        }

        [HttpDelete]
        public IActionResult DeleteBlog(int id)
        {
            var existedDesign = _unitOfWork.DesignRepository.GetByID(id);
            if (existedDesign == null)
            {
                return NotFound();
            }
            _unitOfWork.DesignRepository.Delete(existedDesign);
            _unitOfWork.Save();
            return Ok();
        }
    }
}

using API.Model.TypeOfJewellryModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Repositories;
using Repositories.Entity;
using System.Linq.Expressions;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypeOfJewelleryController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;

        public TypeOfJewelleryController(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public IActionResult SearchJewellery([FromQuery] RequestSearchTypeOfJewelleryModel requestSearchTypeOfJewelleryModel)
        {

            var sortBy = requestSearchTypeOfJewelleryModel.SortContent != null ? requestSearchTypeOfJewelleryModel.SortContent?.sortTypeOfJewelleryBy.ToString() : null;
            var sortType = requestSearchTypeOfJewelleryModel.SortContent != null ? requestSearchTypeOfJewelleryModel.SortContent?.sortTypeOfJewelleryType.ToString() : null;
            Expression<Func<TypeOfJewellery, bool>> filter = x =>
                (string.IsNullOrEmpty(requestSearchTypeOfJewelleryModel.Name) || x.Name.Contains(requestSearchTypeOfJewelleryModel.Name));
            Func<IQueryable<TypeOfJewellery>, IOrderedQueryable<TypeOfJewellery>> orderBy = null;

            if (!string.IsNullOrEmpty(sortBy))
            {
                if (sortType == SortTypeOfJewelleryTypeEnum.Ascending.ToString())
                {
                    orderBy = query => query.OrderBy(p => EF.Property<object>(p, sortBy));
                }
                else if (sortType == SortTypeOfJewelleryTypeEnum.Descending.ToString())
                {
                    orderBy = query => query.OrderByDescending(p => EF.Property<object>(p, sortBy));
                }
            }
            var reponseJewellery = _unitOfWork.TypeOfJewellryRepository.Get(filter,
                orderBy,
                pageIndex: requestSearchTypeOfJewelleryModel.pageIndex,
                pageSize: requestSearchTypeOfJewelleryModel.pageSize,
                includes: m =>m.Designs).Select(x=>x.toTypeOfJewelleryDTO());
            return Ok(reponseJewellery);
        }

        [HttpGet("{id}")]
        public IActionResult GetTypeOfJewelleryById(int id)
        {
            var TypeOfJewellery = _unitOfWork.TypeOfJewellryRepository.GetByID(id,p=>p.Designs);
            if (TypeOfJewellery == null)
            {
                return NotFound("Type of jewellery is not existed");
            }

            return Ok(TypeOfJewellery.toTypeOfJewelleryDTO());
        }

        [HttpPost]
        public IActionResult CreateTypeOfJewellery(RequestCreateTypeOfJewelleryModel requestTypeOfJewelleryModel)
        {
            try
            {
                var ExistTypeOfJewellery = _unitOfWork.TypeOfJewellryRepository.Get(filter: x => x.Name.Equals(requestTypeOfJewelleryModel.Name)).FirstOrDefault();
                if (ExistTypeOfJewellery != null)
                {
                    return BadRequest("This Jewellery does exist");
                }
                var TypeOfJewellery = new TypeOfJewellery()
                {
                    Name = requestTypeOfJewelleryModel.Name,
                    Image = requestTypeOfJewelleryModel.Image,
                };
                _unitOfWork.TypeOfJewellryRepository.Insert(TypeOfJewellery);
                _unitOfWork.Save();
                return Ok("Create successfully");
            }
            catch (Exception ex)
            {
                return BadRequest("Create failed");
            }
           
        }

        [HttpPut]
        public IActionResult UpdateTypeOfJewellery(int id, RequestCreateTypeOfJewelleryModel requestTypeOfJewelleryModel)
        {
            try
            {
                var existedTypeOfJewellery = _unitOfWork.TypeOfJewellryRepository.GetByID(id);
                if (existedTypeOfJewellery == null)
                {
                    return NotFound("Type of jewellery is not existed");
                }
                existedTypeOfJewellery.Name = requestTypeOfJewelleryModel.Name;
                _unitOfWork.TypeOfJewellryRepository.Update(existedTypeOfJewellery);
                _unitOfWork.Save();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Update failed");
            }
            
        }

        [HttpDelete]
        public IActionResult DeleteTypeOfJewellery(int id)
        {
            var existedTypeOfJewellery = _unitOfWork.TypeOfJewellryRepository.GetByID(id);
            if (existedTypeOfJewellery == null)
            {
                return NotFound("Type of jewellery is not existed");
            }
            _unitOfWork.TypeOfJewellryRepository.Delete(existedTypeOfJewellery);
            try
            {
                _unitOfWork.Save();
            }
            catch (DbUpdateException ex)
            {
                if (_unitOfWork.IsForeignKeyConstraintViolation(ex))
                {
                    return BadRequest("Cannot delete this item because it is referenced by another entity.");
                }
                else
                {
                    throw;
                }
            }

            return Ok("Delete Successfully");
        }
    }
}

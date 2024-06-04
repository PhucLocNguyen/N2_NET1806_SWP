using API.Model.DesignModel;
using API.Model.StonesModel;
using API.Model.StonesModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Repository;
using Repository.Entity;
using System.Drawing;
using System.Linq.Expressions;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StonesController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;

        public StonesController(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public IActionResult SearchBlog([FromQuery] RequestSearchStonesModel requestSearchStonesModel)
        {
            var sortBy = requestSearchStonesModel.SortContent != null ? requestSearchStonesModel.SortContent?.sortStonestBy.ToString() : null;
            var sortType = requestSearchStonesModel.SortContent != null ? requestSearchStonesModel.SortContent?.sortStonestType.ToString() : null;
            Expression<Func<Stones, bool>> filter = x =>
                (string.IsNullOrEmpty(requestSearchStonesModel.Kind) || x.Kind.Contains(requestSearchStonesModel.Kind)) &&
                (string.IsNullOrEmpty(requestSearchStonesModel.Size) || x.Size.Contains(requestSearchStonesModel.Size)) &&
                x.Quantity >= requestSearchStonesModel.FromQuantity &&
                (x.Quantity <= requestSearchStonesModel.ToQuantity || requestSearchStonesModel.ToQuantity == null) &&
                x.Price >= requestSearchStonesModel.FromPrice &&
                (x.Price <= requestSearchStonesModel.ToPrice || requestSearchStonesModel.ToPrice == null);
            Func<IQueryable<Stones>, IOrderedQueryable<Stones>> orderBy = null;

            if (!string.IsNullOrEmpty(sortBy))
            {
                if (sortType == SortStonestTypeEnum.Ascending.ToString())
                {
                    orderBy = query => query.OrderBy(p => EF.Property<object>(p, sortBy));
                }
                else if (sortType == SortStonestTypeEnum.Descending.ToString())
                {
                    orderBy = query => query.OrderByDescending(p => EF.Property<object>(p, sortBy));
                }
            }
            var reponseDesign = _unitOfWork.StoneRepository.Get(
                filter,
                orderBy,
                includeProperties: "",
                pageIndex: requestSearchStonesModel.pageIndex,
                pageSize: requestSearchStonesModel.pageSize
                );
            return Ok(reponseDesign);
        }

        [HttpGet("{id}")]
        public IActionResult GetStonesById(int id)
        {
            var Stones = _unitOfWork.StoneRepository.GetByID(id,p=>p.Designs);
            if(Stones == null)
            {
                return NotFound();
            }
            return Ok(Stones);
        }
        [HttpPost]
        public IActionResult CreateStones(RequestCreateStonesModel requestCreateStonesModel)
        {
            var Stones = requestCreateStonesModel.toStonesEntity();
            _unitOfWork.StoneRepository.Insert(Stones);
            _unitOfWork.Save();
            return Ok();
        }
        [HttpPut]
        public IActionResult UpdateStones(int id, RequestCreateStonesModel requestCreateStonesModel)
        {
            var existedStonesUpdate = _unitOfWork.StoneRepository.GetByID(id);
            if (existedStonesUpdate == null)
            {
                return NotFound();
            }
            existedStonesUpdate.Kind = requestCreateStonesModel.Kind;
            existedStonesUpdate.Price = requestCreateStonesModel.Price;
            existedStonesUpdate.Quantity = requestCreateStonesModel.Quantity;
            existedStonesUpdate.Size = requestCreateStonesModel.Size;
            _unitOfWork.StoneRepository.Update(existedStonesUpdate);
            _unitOfWork.Save();
            return Ok();
        }
        [HttpDelete]
        public IActionResult DeleteStones(int id)
        {
            var existedStonesUpdate = _unitOfWork.StoneRepository.GetByID(id);
            if(existedStonesUpdate == null)
            { 
                return NotFound();
            }
            _unitOfWork.StoneRepository.Delete(existedStonesUpdate);
            _unitOfWork.Save();
            return Ok();
        }
    }
}

﻿using API.Model.BlogModel;
using API.Model.StonesModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Repositories;
using Repositories.Entity;
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
        [HttpGet("GetTotalRecords")]
        public IActionResult GetTotalRecords([FromQuery] RequestSearchStonesModel requestSearchStonesModel)
        {
            Expression<Func<Stones, bool>> filter = x =>
                (string.IsNullOrEmpty(requestSearchStonesModel.Kind) || x.Kind.Contains(requestSearchStonesModel.Kind)) &&
                (x.Size == requestSearchStonesModel.Size || requestSearchStonesModel.Size == null) &&
                x.Quantity >= requestSearchStonesModel.FromQuantity &&
                (x.Quantity <= requestSearchStonesModel.ToQuantity || requestSearchStonesModel.ToQuantity == null) &&
                x.Price >= requestSearchStonesModel.FromPrice &&
                (x.Price <= requestSearchStonesModel.ToPrice || requestSearchStonesModel.ToPrice == null);

            var totalRecords = _unitOfWork.StoneRepository.Count(filter);

            var response = new
            {
                TotalRecords = totalRecords
            };

            return Ok(response);
        }
        [HttpGet]
        public IActionResult SearchStones([FromQuery] RequestSearchStonesModel requestSearchStonesModel)
        {
            var sortBy = requestSearchStonesModel.SortContent != null ? requestSearchStonesModel.SortContent?.sortStonetBy.ToString() : null;
            var sortType = requestSearchStonesModel.SortContent != null ? requestSearchStonesModel.SortContent?.sortStonesType.ToString() : null;
            Expression<Func<Stones, bool>> filter = x =>
                (string.IsNullOrEmpty(requestSearchStonesModel.Kind) || x.Kind.Contains(requestSearchStonesModel.Kind)) &&
                (x.Size == requestSearchStonesModel.Size || requestSearchStonesModel.Size == null) &&
                x.Quantity >= requestSearchStonesModel.FromQuantity &&
                (x.Quantity <= requestSearchStonesModel.ToQuantity || requestSearchStonesModel.ToQuantity == null) &&
                x.Price >= requestSearchStonesModel.FromPrice &&
                (x.Price <= requestSearchStonesModel.ToPrice || requestSearchStonesModel.ToPrice == null);
            Func<IQueryable<Stones>, IOrderedQueryable<Stones>> orderBy = null;

            if (!string.IsNullOrEmpty(sortBy))
            {
                if (sortType == SortStonesTypeEnum.Ascending.ToString())
                {
                    orderBy = query => query.OrderBy(p => EF.Property<object>(p, sortBy));
                }
                else if (sortType == SortStonesTypeEnum.Descending.ToString())
                {
                    orderBy = query => query.OrderByDescending(p => EF.Property<object>(p, sortBy));
                }
            }
            
            var reponseDesign = _unitOfWork.StoneRepository.Get(
                filter,
                orderBy,
                pageIndex: requestSearchStonesModel.pageIndex,
                pageSize: requestSearchStonesModel.pageSize,
                x=>x.Designs
                ).Select(x=>x.toStonesDTO()).ToList();
            return Ok(reponseDesign);
            
        }

        [HttpGet("{id}")]
        public IActionResult GetStonesById(int id)
        {
            var Stones = _unitOfWork.StoneRepository.GetByID(id,p=>p.Designs);
            if(Stones == null)
            {
                return NotFound("Stones is not existed");
            }
            return Ok(Stones.toStonesDTO());
        }
        [HttpPost]
        public IActionResult CreateStones(RequestCreateStonesModel requestCreateStonesModel)
        {
            if (requestCreateStonesModel.Size <= 0)
            {
                return BadRequest("Size cannot be less than 0 or null");
            }
            if (requestCreateStonesModel.Quantity <= 0)
            {
                return BadRequest("Quantity cannot be less than 0 or null");
            }
            if (requestCreateStonesModel.Price <= 0)
            {
                return BadRequest("Price cannot be less than 0 or null");
            }
            var getStoneSize = _unitOfWork.StoneRepository.Get(filter: x => (x.Size == requestCreateStonesModel.Size) && (x.Quantity == requestCreateStonesModel.Quantity)).FirstOrDefault();
            if (getStoneSize != null)
            {
                return BadRequest("Stone with this size and quantity had existed");
            }
            /*if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }*/
            try
            {
                var stones = requestCreateStonesModel.toStonesEntity();
                _unitOfWork.StoneRepository.Insert(stones);
                _unitOfWork.Save();
                return Ok("Create successfully");
            }
            catch (Exception ex)
            {
                return BadRequest("Create failed");
            }
        }
        [HttpPut]
        public IActionResult UpdateStones(int id, RequestCreateStonesModel requestCreateStonesModel)
        {
            if (requestCreateStonesModel.Size <= 0)
            {
                return BadRequest("Size cannot be less than 0 or null");
            }
            if (requestCreateStonesModel.Quantity <= 0)
            {
                return BadRequest("Quantity cannot be less than 0 or null");
            }
            if (requestCreateStonesModel.Price <= 0)
            {
                return BadRequest("Price cannot be less than 0 or null");
            }

            var existingStone = _unitOfWork.StoneRepository.GetByID(id);
            if (existingStone == null)
            {
                return NotFound("Stone not found");
            }

            var duplicateStone = _unitOfWork.StoneRepository
                .Get(filter: x => x.Size == requestCreateStonesModel.Size && x.Quantity == requestCreateStonesModel.Quantity && x.StonesId != id)
                .FirstOrDefault();

            if (duplicateStone != null)
            {
                return BadRequest("Stone with this size and quantity already exists");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                existingStone.Kind = requestCreateStonesModel.Kind;
                existingStone.Size = requestCreateStonesModel.Size;
                existingStone.Quantity = requestCreateStonesModel.Quantity;
                existingStone.Price = requestCreateStonesModel.Price;

                _unitOfWork.StoneRepository.Update(existingStone);
                _unitOfWork.Save();
                return Ok("Update successfully");
            }
            catch (Exception ex)
            {
                return BadRequest("Update failed: " + ex.Message);
            }
        }
        [HttpDelete]
        public IActionResult DeleteStones(int id)
        {
            var existedStonesUpdate = _unitOfWork.StoneRepository.GetByID(id);
            if(existedStonesUpdate == null)
            { 
                return NotFound("Stones is not existed");
            }
            _unitOfWork.StoneRepository.Delete(existedStonesUpdate);
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

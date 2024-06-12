using API.Model.StonesModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repository;
using Repository.Entity;
using System.Drawing;

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

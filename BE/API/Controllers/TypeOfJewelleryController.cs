using API.Model.BlogModel;
using API.Model.TypeOfJewellryModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repository;
using Repository.Entity;

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

        [HttpGet("{id}")]
        public IActionResult GetTypeOfJewelleryById(int id)
        {
            var Blog = _unitOfWork.TypeOfJewellryRepository.GetByID(id,p=>p.Designs);
            if (Blog == null)
            {
                return NotFound();
            }

            return Ok(Blog);
        }

        [HttpPost]
        public IActionResult CreateTypeOfJewellery(RequestCreateTypeOfJewelleryModel requestTypeOfJewelleryModel)
        {
            var TypeOfJewellery = new TypeOfJewellery()
            {
                Name = requestTypeOfJewelleryModel.Name,
            };
            _unitOfWork.TypeOfJewellryRepository.Insert(TypeOfJewellery);
            _unitOfWork.Save();
            return Ok();
        }

        [HttpPut]
        public IActionResult UpdateTypeOfJewellery(int id, RequestCreateTypeOfJewelleryModel requestTypeOfJewelleryModel)
        {
            var existedTypeOfJewellery = _unitOfWork.TypeOfJewellryRepository.GetByID(id);
            if (existedTypeOfJewellery == null)
            {
                return NotFound();
            }
            existedTypeOfJewellery.Name = requestTypeOfJewelleryModel.Name;
            _unitOfWork.TypeOfJewellryRepository.Update(existedTypeOfJewellery);
            _unitOfWork.Save();
            return Ok();
        }

        [HttpDelete]
        public IActionResult DeleteTypeOfJewellery(int id)
        {
            var existedTypeOfJewellery = _unitOfWork.TypeOfJewellryRepository.GetByID(id);
            if (existedTypeOfJewellery == null)
            {
                return NotFound();
            }
            _unitOfWork.TypeOfJewellryRepository.Delete(existedTypeOfJewellery);
            _unitOfWork.Save();
            return Ok();
        }
    }
}

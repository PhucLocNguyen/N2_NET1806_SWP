using API.Model.BlogModel;
using API.Model.DesignModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repository;
using Repository.Entity;
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

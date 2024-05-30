using API.Model.BlogModel;
using API.Model.MaterialModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repository;
using Repository.Entity;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaterialController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;

        public MaterialController(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("{id}")]
        public IActionResult GetMaterialById(int id)
        {
            var Material = _unitOfWork.MaterialRepository.GetByID(id,m=>m.Designs);
            
            if (Material == null)
            {
                return NotFound();
            }
            
            return Ok(Material);
        }

        [HttpPost]
        public IActionResult CreateMaterial(RequestCreateMaterialModel requestCreateMaterialModel)
        {
            var Material = requestCreateMaterialModel.toMaterialEntity();
            _unitOfWork.MaterialRepository.Insert(Material);
            _unitOfWork.Save();
            return Ok();
        }

        [HttpPut]
        public IActionResult UpdateMaterial(int id, RequestCreateMaterialModel requestCreateMaterialModel)
        {
            var existedMaterial = _unitOfWork.MaterialRepository.GetByID(id);
            if (existedMaterial == null)
            {
                return NotFound();
            }
            existedMaterial.Name = requestCreateMaterialModel.Name;
            existedMaterial.Price = requestCreateMaterialModel.Price;
            existedMaterial.ManagerId = requestCreateMaterialModel.ManagerId;
            _unitOfWork.MaterialRepository.Update(existedMaterial);
            _unitOfWork.Save();
            return Ok();
        }

        [HttpDelete]
        public IActionResult DeleteMaterial(int id)
        {
            var existedMaterial = _unitOfWork.MaterialRepository.GetByID(id);
            if (existedMaterial == null)
            {
                return NotFound();
            }
            _unitOfWork.MaterialRepository.Delete(existedMaterial);
            _unitOfWork.Save();
            return Ok();
        }
    }
}

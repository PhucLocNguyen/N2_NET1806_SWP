using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Repository;
using Repository.Entity;
using API.Model.MasterGemstoneModel;
using Microsoft.AspNetCore.Http.HttpResults;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MasterGemstoneController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;

        public MasterGemstoneController(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("{id}")]
        public IActionResult GetMasterGemstoneById(int id)
        {
            var MasterGemstone = _unitOfWork.MasterGemstoneRepository.GetByID(id, p => p.Designs);
            if (MasterGemstone == null)
            {
                return NotFound();
            }
            return Ok(MasterGemstone);
        }

        [HttpPost]
        public IActionResult CreateMasterGemstone(RequestCreateMasterGemstoneModel requestCreateMasterGemstone)
        {
            var MasterGemstone = requestCreateMasterGemstone.toMasterGemstonesEntity();
            _unitOfWork.MasterGemstoneRepository.Insert(MasterGemstone);
            _unitOfWork.Save();
            return Ok();
        }

        [HttpPut]
        [Route("{id}")]
        public IActionResult UpdateMasterGemstone([FromRoute] int id, RequestCreateMasterGemstoneModel requestCreateMasterGemstone)
        {
            var ExistedMasterGemstone = _unitOfWork.MasterGemstoneRepository.GetByID(id);
            if (ExistedMasterGemstone == null)
            {
                return NotFound();
            }

            ExistedMasterGemstone.Kind = requestCreateMasterGemstone.Kind;
            ExistedMasterGemstone.Size = requestCreateMasterGemstone.Size;
            ExistedMasterGemstone.Price = requestCreateMasterGemstone.Price;
            ExistedMasterGemstone.Clarity = requestCreateMasterGemstone.Clarity;
            ExistedMasterGemstone.Cut = requestCreateMasterGemstone.Cut;
            ExistedMasterGemstone.Weight = requestCreateMasterGemstone.Weight;
            ExistedMasterGemstone.Shape = requestCreateMasterGemstone.Shape;
            _unitOfWork.MasterGemstoneRepository.Update(ExistedMasterGemstone);
            _unitOfWork.Save();
            return Ok();
        }

        [HttpDelete]
        public IActionResult DeleteMasterGemstones(int id)
        {
            var ExistedMasterGemstone = _unitOfWork.MasterGemstoneRepository.GetByID(id);
            if (ExistedMasterGemstone == null)
            {
                return NotFound();
            }
            _unitOfWork.MasterGemstoneRepository.Delete(ExistedMasterGemstone);
            _unitOfWork.Save();
            return Ok();
        }

    }
}

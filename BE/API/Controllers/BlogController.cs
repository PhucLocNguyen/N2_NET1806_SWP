using API.Model.BlogModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repository;
using Repository.Entity;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;

        public BlogController(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("{id}")]
        public IActionResult GetBlogById(int id)
        {
            var Blog = _unitOfWork.BlogRepository.GetByID(id);
            if (Blog == null)
            {
                return NotFound();
            }

            return Ok(Blog);
        }

        [HttpPost]
        public IActionResult CreateBlog(RequestCreateBlogModel requestCreateBlogModel)
        {
            var Blog = requestCreateBlogModel.toBlogEntity();
            _unitOfWork.BlogRepository.Insert(Blog);
            _unitOfWork.Save();
            return Ok();
        }

        [HttpPut]
        public IActionResult UpdateBlog(int id, RequestCreateBlogModel requestCreateBlogModel)
        {
            var existedBlog = _unitOfWork.BlogRepository.GetByID(id);
            if (existedBlog == null)
            {
                return NotFound();
            }
            existedBlog.Description = requestCreateBlogModel.Description;
            existedBlog.ManagerId = requestCreateBlogModel.ManagerId;
            existedBlog.Title = requestCreateBlogModel.Title;
            existedBlog.Image = requestCreateBlogModel.Image;
            _unitOfWork.BlogRepository.Update(existedBlog);
            _unitOfWork.Save();
            return Ok();
        }

        [HttpDelete]
        public IActionResult DeleteBlog(int id)
        {
            var existedBlog = _unitOfWork.BlogRepository.GetByID(id);
            if (existedBlog==null)
            {
                return NotFound();
            }
            _unitOfWork.BlogRepository.Delete(existedBlog);
            _unitOfWork.Save();
            return Ok();
        }
    }
}

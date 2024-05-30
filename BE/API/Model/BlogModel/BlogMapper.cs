using Repository.Entity;
using System.Runtime.CompilerServices;

namespace API.Model.BlogModel
{
    public static class BlogMapper
    {
        public static Blog toBlogEntity(this RequestCreateBlogModel requestCreateBlogModel) 
        {
            return new Blog()
            {
                Description = requestCreateBlogModel.Description,
                ManagerId = requestCreateBlogModel.ManagerId,
                Title = requestCreateBlogModel.Title,
                Image = requestCreateBlogModel.Image,

            };
        }
    }
}

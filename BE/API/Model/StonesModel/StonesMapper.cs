using Repository.Entity;

namespace API.Model.StonesModel
{
    public static class StonesMapper
    {
        public static Stones toStonesEntity(this RequestCreateStonesModel requestCreateStonesModel)
        {
            return new Stones()
            {
                Kind = requestCreateStonesModel.Kind,
                Price = requestCreateStonesModel.Price,
                Quantity = requestCreateStonesModel.Quantity,
                Size = requestCreateStonesModel.Size,
            };
        }
    }
}

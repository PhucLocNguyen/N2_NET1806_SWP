using API.Model.DesignModel;

namespace API.Model.TypeOfJewellryModel
{
    public class TypeOfJewelleryDTO
    {
        public string Name { get; set; }
        public virtual ICollection<RequestCreateDesignModel> Designs { get; set; } = new List<RequestCreateDesignModel>();
    }
}

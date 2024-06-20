using API.Model.UserModel;
using Repositories.Entity;

namespace API.Model.ConversationModel
{
    public class ConversationDto
    {
        public int ConversationId { get; set; }

        public int User1Id { get; set; }

        public int User2Id { get; set; }

        public virtual ICollection<Message> Messages { get; set; } = new List<Message>();

        public virtual UserDTO User1 { get; set; } = null!;

        public virtual UserDTO User2 { get; set; } = null!;
    }
}

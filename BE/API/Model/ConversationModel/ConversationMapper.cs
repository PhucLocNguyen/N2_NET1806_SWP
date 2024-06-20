using API.Model.UserModel;
using Repositories.Entity;

namespace API.Model.ConversationModel
{
    public static class MessageMapper
    {
        public static Conversation ToConversationEntity(this RequestCreateConversation requestCreateConversation)
        {
            return new Conversation()
            {
                User1Id = requestCreateConversation.userId1,
                User2Id = requestCreateConversation.userId2,
            };
        }

        public static ConversationDto ToConversationDTO(this Conversation conversation)
        {
            return new ConversationDto()
            {
                ConversationId = conversation.ConversationId,
                User1Id = conversation.User1Id,
                User2Id = conversation.User2Id,
                User1 = conversation.User1.toUserDTO(),
                User2 = conversation.User2.toUserDTO(),
            };
        }
    }
}

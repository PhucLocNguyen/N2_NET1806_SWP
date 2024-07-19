import { CreateConversationById } from "../api/Chat/FetchConversation";

async function CreateConversationJoin(currentUserId, targetUserId) {
    var getConversationDetail = null;
        getConversationDetail = await CreateConversationById(currentUserId, targetUserId);
    return getConversationDetail.conversationId;
}

export default CreateConversationJoin;
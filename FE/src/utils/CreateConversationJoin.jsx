import { CreateConversationById } from "../api/Chat/FetchConversation";

function CreateConversationJoin(currentUserId, targetUserId) {
    var getConversationDetail = null;
    const createConversation = async ()=>{
        getConversationDetail = await CreateConversationById(currentUserId, targetUserId);
    }
    createConversation();
    return getConversationDetail;
}

export default CreateConversationJoin;
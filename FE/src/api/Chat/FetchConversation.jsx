import api from '../instance.jsx'
import axiosConfigHeader from '../AxiosConfigHeader.jsx'

const FetchConversation = async (currentUserId) => {
    try {
        const response = await api.post(`/Conversation/all`,currentUserId, axiosConfigHeader);
            const conversationsByUserId = response.data;
            return conversationsByUserId;
    } catch (e) {
        console.error('Error during Fetch all conversation by current user ID:', e);
    }
}
const FetchConversationById = async (currentConversationId, UserId) => {
    try {
        const response = await api.get(`Conversation/${currentConversationId}?userId=${UserId}`, axiosConfigHeader);
            const conversationsByUserId = response.data;
            return conversationsByUserId;
    } catch (e) {
        console.error('Error during Fetch chat by conversation ID by user id', e);
    }
}
const CreateConversationById = async (currentUserId, targetUserId)=>{
    try{
        const dataPrepare = {
            "userId1": currentUserId,
            "userId2": targetUserId
          }
        const response = await api.post(`Conversation`,dataPrepare, axiosConfigHeader);
          const detailConversation = response.data;
          return detailConversation;
    }catch(e){
        console.error('Error during Create conversation :', e);
    }
}
export { FetchConversation, FetchConversationById, CreateConversationById};
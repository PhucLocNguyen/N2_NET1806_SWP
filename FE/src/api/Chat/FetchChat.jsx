import api from '../instance.jsx'
import axiosConfigHeader from '../AxiosConfigHeader.jsx'

const FetchChatByConversation = async (currentConversationId) => {
    try {
        const response = await api.get(`/Chat/${currentConversationId}/messages`, axiosConfigHeader);
            const chatByConversationId = response.data;
            console.log(chatByConversationId);
            return chatByConversationId;
        
    } catch (e) {
        console.error('Error during Fetch chat by conversation ID:', e);
    }
}


export { FetchChatByConversation};
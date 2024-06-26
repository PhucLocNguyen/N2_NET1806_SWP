import { TextField } from "@mui/material";
import BoxMessage from "./BoxMesseage";
import TargetChat from "./TargetChat";
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, Tooltip } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import SendIcon from '@mui/icons-material/Send';
import * as signalR from '@microsoft/signalr';
import { FetchConversation, FetchConversationById } from "../../api/Chat/FetchConversation";
import useAuth from "../../hooks/useAuth";
import { FetchChatByConversation } from "../../api/Chat/FetchChat";

function Chat() {
const { role, UserId } = useAuth();
const [connection, setConnection] = useState(null);
const [messages, setMessages] = useState([]);
const [message, setMessage] = useState('');
const chatRef = useRef(null);
const [filter,setFilter] = useState("");
const [listConversation, setListConversation] = useState([]);
const [filterList, setFilterList] = useState([]);
const [currentConversationId, setCurrentConversationId] = useState(null);
const [conversation, setConversation] = useState({ conversationId: null });
const connect = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:7103/Chat") // Ensure this URL is correct
        .withAutomaticReconnect()
        .build();
const fetchConversations = async () => {
    const GetConversations = await FetchConversation(UserId);
    setFilterList(GetConversations);
    setListConversation(GetConversations);
};
useEffect(()=>{
    fetchConversations();

},[])
useEffect(() => {
    connect.start()
        .then(() => {
            console.log('Connected!');
            if (currentConversationId) {
                connect.invoke("JoinConversation", currentConversationId)
                    .then(() => console.log('Joined conversation', currentConversationId))
                    .catch(err => console.error('Failed to join conversation', err));
            }
        })
        .catch(err => console.log('Connection failed: ', err));

    connect.on("ReceiveMessage", (message) => {
        console.log('Received message:', message);
        setMessages(prevMessages => [...prevMessages, message]);
    });

    setConnection(connect);

    return () => {
        connect.stop();
    };
}, [currentConversationId]);

useEffect(() => {
    if (connection && currentConversationId !== null) {
        const joinConversation = async () => {
            
            console.log("Joined conversation");
            await connection.invoke("JoinConversation", currentConversationId);
            setMessages([])
        };
        joinConversation();

        return () => {
            const leaveConversation = async () => {
            console.log("Leave conversation");
                await connection.invoke("LeaveConversation", currentConversationId);
            };
            leaveConversation();
        };
    }
}, [connection, currentConversationId]);


useEffect(() => {
    if (currentConversationId !== null) {
       
            const FetchDataMessage = async ()=>{
                const chatByConversationId = await FetchChatByConversation(currentConversationId);
                setMessages(chatByConversationId);
                const conversationDetailId = await FetchConversationById(currentConversationId, UserId);
                setConversation(conversationDetailId);
            }
            FetchDataMessage();
        
    }
}, [currentConversationId]);

const sendMessage = async () => {
    if(message.trim().length>0){

    if (connection) {
        try {
            // await connection.invoke("SendMessage", currentConversationId, UserId, conversation.user.userId, message);
            connect.start()
        .then(() => {
            if (currentConversationId!=null) {
                connect.invoke("SendMessage", currentConversationId, Number(UserId), conversation.user.userId, message) // cai nay phai set cung moi chay duoc
                    .then(() => console.log('Send success', currentConversationId))
                    .catch(err => console.error('Failed to send conversation', err));
            }
        })
        .catch(err => console.log('Connection failed: ', err));
            chatRef.current.value = "";
            setMessage('');
        } catch (e) {
            console.log('Error sending message:', e);
        }
    }
}

};

const handleFilterChange=(e)=>{
    setFilter(e.target.value.trim());
}

const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Gọi hàm khi nhấn Enter
      sendMessage();
    }
  };
useEffect(()=>{
    if(filter !=""){
        const filterList = listConversation.filter((current)=>{
            const escapedFilter = filter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const nameUser = current.user?.name;
            return nameUser.toLocaleLowerCase().match(escapedFilter.toLocaleLowerCase());
        })
        setFilterList(filterList);
    }else{
        setFilterList(listConversation);
    }
},[filter])

const handleInputChange = (e) => {
    setMessage(e.target.value);
};
return (
    <div className="h-[100vh-100px] mx-10 border overflow-hidden fixingLayout">
        <div className="grid grid-cols-5 h-max w-full">
            <div className="col-span-1 bg-slate-50 border-r h-full">
                <div className="border-b p-2">
                    <h3 className="text-[24px] text-center mb-2">Your chat</h3>
                    <div className="relative w-full px-2 mb-3">
                        <TextField className="w-full" placeholder="Enter the username to filter chat" onChange={handleFilterChange} />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2">
                            <Tooltip title="Search">
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            </Tooltip>
                        </span>
                    </div>
                </div>
                <div className="overflow-y-scroll h-[calc(100vh-250px)]">
                {filterList.map((item) => (

                   <BoxMessage key={item.conversationId} item={item} setCurrentConversationId={setCurrentConversationId} />
                    ))}
                </div>
            </div>
            <div className="relative col-span-4">
                {conversation.conversationId !== null ? (
                    <>
                        <div className="bg-slate-500 h-full">
                            <TargetChat conversation={conversation} messages={messages} />
                        </div>
                        <div className="absolute bottom-0 bg-white w-full left-1/2 -translate-x-1/2 h-[75px]">
                            <div className="flex items-center justify-center gap-3 h-full px-3">
                                <TextField
                                    placeholder="Enter your message..."
                                    className="w-[calc(100%-250px)]"
                                    onChange={handleInputChange}
                                    ref={chatRef}
                                    value={message}
                                    onKeyDown={handleKeyPress}
                                    autoComplete="off"
                                />
                                <Tooltip title="Send" className="w-max px-3" onClick={sendMessage}>
                                    <IconButton>
                                        <SendIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                    </>
                ) : (
                    <></>
                )}
            </div>
        </div>
    </div>
);
}

export default Chat;

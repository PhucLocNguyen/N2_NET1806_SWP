import { useRef, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

function TargetChat({ conversation, messages }) {
    const { role, UserId } = useAuth();
    const chatEndRef = useRef(null);

    

    useEffect(() => {
        // Cuộn xuống cuối khi thành phần được render hoặc khi tin nhắn thay đổi
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <>
            <div className="relative max-h-screen overflow-hidden mb-[75px]">
                <div className="border-b h-[70px] bg-white">
                    <div className="pl-4 py-2 h-full flex gap-4">
                        <img
                            src={conversation.user?.image!==null?conversation.user?.image: "https://cdn4.iconfinder.com/data/icons/gray-business-1/512/xxx010-512.png"}
                            alt=""
                            className="h-full rounded-full"
                        />
                        <div className="flex flex-col">
                            <h3 className="text-[20px]">{conversation.user.name}</h3>
                            <span className="border rounded-full px-3 bg-slate-200 text-[red]">
                                {conversation.user.role?.name}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="border h-[calc(100vh-250px)] overflow-y-scroll">
                    {messages.map((msg) => (
                        <div
                            key={msg.messageId}
                            className={`p-2 my-2 ${msg.senderId == UserId ? 'text-right' : 'text-left'}`}
                        >
                            <div className={`inline-block p-2 rounded ${msg.senderId === UserId ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>
            </div>
        </>
    );
}

export default TargetChat;

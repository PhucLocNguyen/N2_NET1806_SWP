import Chat from "../chat/Chat";
import "./index.css";
function ChatStaff() {
    return ( <div className="flex flex-col text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200" id="staffContainerChat">
    <div className=" flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75" >
    <h1 className="text-2xl font-bold">Staff Chat</h1>
    </div>
        <Chat/>
    </div> );
}

export default ChatStaff;
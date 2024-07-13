import userIcon from "../../assets/icon/staffIcon.jpg";
function BoxMessage({item, setCurrentConversationId, currentConversationId}) {
    console.log(item);
    return ( <div className={"flex items-center gap-3 border pl-3 cursor-pointer py-3 "+(item.conversationId==currentConversationId? "bg-gray-500 text-white": "")} onClick={()=>{setCurrentConversationId(item.conversationId)}}>
        <div className="w-max h-[65px]">
        <img src={ item.user?.image!==null? item.user?.image:userIcon} alt={"Image of "+item.user.name} className="h-[65px] rounded-full" />
        </div>
        <div className="flex flex-col">
            <h4>{item.user.name}</h4>
        </div>
    </div> );
}

export default BoxMessage;
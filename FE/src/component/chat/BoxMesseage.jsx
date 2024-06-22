function BoxMessage({item, setCurrentConversationId}) {
    console.log(item);
    return ( <div className="flex items-center gap-3 border pl-3 cursor-pointer py-3" onClick={()=>{setCurrentConversationId(item.conversationId)}}>
        <div>
        <img src={ item.image||"https://cdn.iconscout.com/icon/free/png-256/free-avatar-375-456327.png"} alt="" className="h-[65px] " />


        </div>
        <div className="flex flex-col">
            <h4>{item.user.name}</h4>
        </div>
    </div> );
}

export default BoxMessage;
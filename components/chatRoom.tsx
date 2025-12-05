import ChatBar from "./chatbar"


export default function ChatRoom() {
  return (
    <div className="w-full h-full">
      <div className="w-full h-[90%] border-b overflow-y-auto">
        {/* messages will go here */}
      </div>
      <div className="w-full h-[10%] flex items-center">
        <ChatBar />
      </div>
    </div>
  );
}

import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const isSelected = selectedConversation?._id === conversation._id;
  const isOnline = onlineUsers.includes(conversation._id);
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
        ${isSelected ? "bg-sky-500" : ""}`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profile} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flax gap-3 justify-between">
            <p className="font-bold text-black">{conversation.username}</p>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-1 h-1" />}
    </>
  );
};

export default Conversation;

import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  console.log("CONVERSATIONS : ", conversations);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === conversations.length - 1} //index of last conv just to be sure if it's the last
        />
      ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};

export default Conversations;

//import Conversation from "./Conversation";

// const Conversations = () => {
//   return (
//     <div className="py-2 flex flex-col overflow-auto">
//       <Conversation />
//       <Conversation />
//       <Conversation />
//       <Conversation />
//       <Conversation />
//       <Conversation />
//     </div>
//   );
// };

// export default Conversations;

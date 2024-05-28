import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }), //same thing as useState func
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;

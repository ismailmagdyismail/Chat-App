import { useState } from "react";
import MessageDto from "../Dtos/Message.dto";
import MessageDomain from "../Domain/Message.domain";

export default function useChatInteractor() {
  const [messages, setMessages] = useState<MessageDto[]>([]);
  const [conversationId] = useState("1");
  function getConversationName(): string {
    return "Current Conversation";
  }
  function sendMessage(message: string) {
    const newMessage: MessageDto = {
      content: message,
      sentBy: "ismail",
      conversationId: conversationId,
    };
    setMessages([...messages, newMessage]);
  }
  function deleteMessage(id: string) {
    setMessages(messages.filter((message) => message.id === id));
  }
  function getMessages() {
    return messages;
  }
  function isMessageSent(message: MessageDto): boolean {
    return MessageDomain.isSent(message.sentBy, "ismail");
  }
  return {
    getConversationName,
    sendMessage,
    deleteMessage,
    getMessages,
    isMessageSent,
  };
}

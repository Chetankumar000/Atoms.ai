import React, { useEffect } from "react";
import MessageItem from "./MessageItem";

const MessageList = ({ messages, messagesEndRef, isTyping }) => {
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, messagesEndRef]);

  return (
    <div className="flex-1 overflow-y-auto w-full  px-4 mt-4 space-y-4 scrollbar-thin scrollbar-thumb-black scrollbar-track-black">
      {messages.map((message, index) => (
        <MessageItem
          key={index}
          message={message}
          index={index}
          isTyping={isTyping}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;

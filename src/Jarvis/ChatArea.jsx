import React from "react";
import { motion } from "framer-motion";
import JarvisInput from "./JarvisInput";
import MessageList from "./components/MessageList";
import ChatHeader from "./components/ChatHeader";

const ChatArea = ({
  messages,
  handleSendMessage,
  isTyping,
  model,
  setModel,
  showModel,
  messagesEndRef,
  setVoiceModeOpen,
}) => {
  const wordVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  const isNewChat = messages.length === 0;

  return (
    <div className="flex-1 w-full flex flex-col h-screen">
      <ChatHeader model={model} />

      <div className="flex-1 overflow-y-auto  w-full mx-auto flex flex-col">
        {isNewChat ? (
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <h1 className="text-2xl 2xl:text-4xl font-bold text-[#00FFFF] mb-4">
              {"What can I help with?".split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            <p className="italic text-gray-400 2xl:text-3xl mb-8">
              "Journey of long miles starts with a small step."
            </p>

            {/* Centered input on empty screen */}
            <div className="w-full max-w-2xl">
              <JarvisInput
                handleSendMessage={handleSendMessage}
                isTyping={isTyping}
                model={model}
                setModel={setModel}
                showModel={showModel}
                setVoiceModeOpen={setVoiceModeOpen}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="scrollbar scrollbar-thumb-[#424242] h-[50rem] scrollbar-track-transparent overflow-y-scroll w-full  mx-auto">
              {/* Messages list */}
              <div className="flex-1 max-w-[50rem] xl:max-w-[50rem] mx-auto pb-4">
                <MessageList
                  messages={messages}
                  messagesEndRef={messagesEndRef}
                  isTyping={isTyping}
                />
              </div>

              {/* Bottom-aligned input */}
            </div>
            <div className="w-full max-w-[52rem] mx-auto relative mt-2">
              <JarvisInput
                handleSendMessage={handleSendMessage}
                isTyping={isTyping}
                model={model}
                setModel={setModel}
                showModel={showModel}
                setVoiceModeOpen={setVoiceModeOpen}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatArea;

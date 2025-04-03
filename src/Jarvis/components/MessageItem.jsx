import React, { useState } from "react";
import { motion } from "framer-motion";
import { LoaderCircle, Clipboard, ClipboardCheck } from "lucide-react";
import { MarkdownRenderer } from "./MarkdownRenderer";

const MessageItem = ({ message, index, handleCopy, isTyping }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const isResponse = message.type === "response";

  const onCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
    if (handleCopy) handleCopy(text, index);
  };

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${
        message.type === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`relative group px-6 py-2 2xl:text-[0.95rem] font-thin text-xs rounded-xl  leading-relaxed ${
          message.type === "user"
            ? "bg-[#2F2F2F] text-white"
            : isResponse
            ? " text-white"
            : "bg-red-500 text-white"
        }`}
      >
        <div className="space-y-2">
          {isTyping ? (
            message.text ? (
              <>
                <div>
                  <MarkdownRenderer text={message.text} />
                </div>
              </>
            ) : (
              <div className=" justify-center items-center space-x-2">
                <LoaderCircle className="w-5 h-5 animate-spin text-white inline-block align-middle" />
                <span className="text-sm text-gray-300">Thinking...</span>
              </div>
            )
          ) : (
            <MarkdownRenderer text={message.text} />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageItem;

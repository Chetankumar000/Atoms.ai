import React from "react";

const ChatHeader = ({ model }) => (
  <div className="w-full px-6 py-3 flex border-b border-b-[#2B2B2B] gap-4">
    <div
      onClick={() => (window.location.href = "/")}
      className="bg-[#00FFFF] rounded-full cursor-pointer"
    >
      <img className="h-8 2xl:h-12" src="/svg_icons/i.svg" alt="indianAtoms" />
    </div>
    <div className="flex flex-col">
      <div className="text-[0.7rem] 2xl:text-[1rem] text-gray-200">
        IndianAtoms.ai
      </div>
      <div className="flex gap-4">
        <div className="text-[0.7rem] 2xl:text-[0.9rem] text-gray-400">
          Version: v1
        </div>
        <div className="text-[0.7rem] 2xl:text-[0.9rem] text-gray-400">
          LLM: {model}
        </div>
      </div>
    </div>
  </div>
);

export default ChatHeader;

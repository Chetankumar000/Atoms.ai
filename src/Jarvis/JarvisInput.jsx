import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  FaPaperclip,
  FaAngleDown,
  FaPaperPlane,
  FaCheck,
} from "react-icons/fa";
import { MdOutlineStopCircle } from "react-icons/md";
import { AiOutlineAudio } from "react-icons/ai";
// import ListeningModal from "./components/ListeningModel";

const JarvisInput = ({
  handleSendMessage,
  isTyping,
  model,
  setModel,
  showModel,
  setVoiceModeOpen,
}) => {
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [showExploreDropdown, setShowExploreDropdown] = useState(false);
  const [showExplore, setShowExplorer] = useState("Explore");
  const [input, setInput] = useState("");
  // const [isListening, setIsListening] = useState(false);
  const modelRef = useRef(null);
  const exploreRef = useRef(null);

  // Close dropdowns when clicking outside
  const handleClickOutside = useCallback((event) => {
    if (modelRef.current && !modelRef.current.contains(event.target)) {
      setShowModelDropdown(false);
    }
    if (exploreRef.current && !exploreRef.current.contains(event.target)) {
      setShowExploreDropdown(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const toggleModelDropdown = useCallback(() => {
    setShowModelDropdown((prev) => !prev);
  }, []);

  const toggleExploreDropdown = useCallback(() => {
    setShowExploreDropdown((prev) => !prev);
  }, []);

  const handleModelSelect = useCallback(
    (option) => {
      setModel(option);
      setShowModelDropdown(false);
    },
    [setModel]
  );

  const handleExploreSelect = useCallback((option) => {
    setShowExplorer(option);
    setShowExploreDropdown(false);
  }, []);

  // const startListening = () => {
  //   setIsListening(true);
  // };

  // const stopListening = () => {
  //   setIsListening(false);
  // };

  return (
    <div
      className={`flex flex-col w-full border border-gray-500 rounded-lg transition duration-150 mx-auto `}
    >
      {/* Input Box Container */}
      <div className="flex items-center bg-[#121212] rounded-lg px-4 py-3 w-full">
        <textarea
          className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 text-sm resize-none min-h-[2.5rem] max-h-[12rem] overflow-y-auto"
          placeholder="Ask Indian Atom Builder anything"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !isTyping) {
              e.preventDefault();
              handleSendMessage(input);
              setInput("");
            }
          }}
          maxLength={20000}
        />
        <span className="text-gray-400 mb-4 text-[0.7rem]">
          {input?.length}/20000
        </span>
      </div>

      {/* Dropdown Buttons */}
      <div className="flex justify-between items-center p-2 gap-2 px-4 relative">
        <div className="flex items-center gap-2">
          {/* Attachment Icon */}
          <button className="text-gray-300 hover:opacity-80 transition duration-150">
            <FaPaperclip size={13} className="rotate-[-42deg]" />
          </button>

          <div className="w-[1px] h-6 bg-gray-600"></div>

          {/* Model Dropdown */}
          {showModel && (
            <div className="relative" ref={modelRef}>
              <button
                onClick={toggleModelDropdown}
                className="flex items-center bg-[#121212] border border-gray-500 text-white px-3 py-1.5 rounded-md text-[0.68rem]"
              >
                {model} <FaAngleDown className="ml-1" />
              </button>

              {showModelDropdown && (
                <div className="absolute left-0 top-10 bg-[#1e1e1e] border border-gray-500 rounded-md shadow-md w-32 z-50">
                  {["gemini", "gpt-4", "deepseek"].map((option) => (
                    <div
                      key={option}
                      onClick={() => handleModelSelect(option)}
                      className={`px-3 py-2 text-white text-sm cursor-pointer hover:bg-gray-700 flex justify-between ${
                        model === option ? "bg-gray-700" : ""
                      }`}
                    >
                      {option}
                      {model === option && <FaCheck size={10} />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Explore Dropdown */}
          <div className="relative" ref={exploreRef}>
            <button
              onClick={toggleExploreDropdown}
              className="flex items-center bg-[#121212] border border-gray-500 text-white px-3 py-1.5 rounded-md text-[0.68rem]"
            >
              {showExplore} <FaAngleDown className="ml-1" />
            </button>

            {showExploreDropdown && (
              <div className="absolute left-0 top-[-7rem] bg-[#1e1e1e] border border-gray-500 rounded-md shadow-md w-36 z-50">
                {["Recent", "Trending", "Saved"].map((option) => (
                  <div
                    key={option}
                    onClick={() => handleExploreSelect(option)}
                    className="px-3 py-2 text-white text-sm cursor-pointer hover:bg-gray-700"
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Send / Voice Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setVoiceModeOpen(true)}
            title="Start voice input"
          >
            <AiOutlineAudio className="hover:bg-gray-600 text-white p-1 w-6 h-6 rounded-full" />
          </button>

          <button
            onClick={() => {
              handleSendMessage(input);
              setInput("");
            }}
            className={`ml-2 rounded-full transition duration-150 ${
              input?.length > 0 ? "opacity-100 hover:text-white" : "opacity-50"
            }`}
            disabled={input?.length === 0 || isTyping}
          >
            {isTyping ? (
              <MdOutlineStopCircle className="hover:bg-gray-600" />
            ) : (
              <FaPaperPlane className="hover:bg-gray-600 text-white p-1 w-7 h-6 rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Voice Modal */}
      {/* {isListening && (
        <ListeningModal
          onClose={() => setIsListening(false)}
          onTranscript={(text) => {
            handleSendMessage(text);
            setInput("");
          }}
        />
      )} */}
    </div>
  );
};

export default JarvisInput;

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

import SidebarLeft from "./SidebarLeft";
import ChatArea from "./ChatArea";
import RightSidebar from "./RightSideBar";
import useAuthStore from "../stores/useAuthStore";
import { useUserInfo } from "./customHooks/useUserInfo";
import VoiceChat from "./components/VoiceChat";

import useChatSession from "./customHooks/useChatSession";

const MyJarvis = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [model, setModel] = useState("gemini");
  const [showModel, setShowModel] = useState(true);
  const messagesEndRef = useRef(null);
  const [voiceModeOpen, setVoiceModeOpen] = useState(false);

  const { userName, email } = useUserInfo();
  const {
    chatHistory,
    sessionId,
    setSessionId,
    messages,
    setMessages,
    saveChatHistory,
    startNewChat,
  } = useChatSession(Date.now().toString());

  // Prevent body scroll when sidebar is open
  const [sidebarOpen, setSidebarOpen] = useState(true);
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
  }, [sidebarOpen]);

  // Set user info

  // Show model if there are no messages
  useEffect(() => {
    setShowModel(messages.length === 0);
  }, [messages]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const handleSendMessage = async (input) => {
    if (!input.trim()) return "";

    const userMsg = { type: "user", text: input };
    const loadingMsg = { type: "response", text: "" };
    const newMessages = [...messages, userMsg, loadingMsg];

    setMessages(newMessages);
    setIsTyping(true);

    try {
      const res = await axios.post("https://myjarvis-2.onrender.com/chat", {
        message: input,
      });

      const reply = res.data?.reply || "No response received.";
      const updatedMessages = [
        ...newMessages.slice(0, -1),
        { type: "response", text: reply },
      ];
      setMessages(updatedMessages);
      saveChatHistory(updatedMessages);

      return reply; // ✅ return the actual reply for direct use
    } catch (error) {
      console.error("API Error:", error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { type: "error", text: "Failed to fetch response. Please try again." },
      ]);
      return "";
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    startNewChat();
  }, []);

  return (
    <div className="flex h-screen  font-roboto bg-[#212121] text-white">
      <SidebarLeft
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        chatHistory={chatHistory}
        sessionId={sessionId}
        setSessionId={setSessionId}
        setMessages={setMessages}
        startNewChat={startNewChat}
        userName={userName}
        email={email}
      />
      <ChatArea
        messages={messages}
        handleSendMessage={handleSendMessage}
        isTyping={isTyping}
        model={model}
        setModel={setModel}
        showModel={showModel}
        messagesEndRef={messagesEndRef}
        setVoiceModeOpen={setVoiceModeOpen}
      />
      {/* <RightSidebar /> */}
      {voiceModeOpen && (
        <VoiceChat
          onClose={() => setVoiceModeOpen(false)}
          onSend={async (userInput) => {
            const reply = await handleSendMessage(userInput); // ✅ get reply directly
            return reply;
          }}
        />
      )}
    </div>
  );
};

export default MyJarvis;

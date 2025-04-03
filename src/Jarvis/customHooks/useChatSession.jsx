import { useState, useEffect } from "react";

const useChatSession = (initialSessionId = null) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);

  // Load chat history from localStorage
  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem("chatSessions")) || [];
    setChatHistory(savedChats);
    if (savedChats.length > 0) {
      setSessionId(savedChats[0].id);
      setMessages(savedChats[0].messages);
    }
  }, []);

  const saveChatHistory = (updatedMessages) => {
    let updatedHistory = chatHistory.map((session) =>
      session.id === sessionId
        ? { ...session, messages: updatedMessages }
        : session
    );
    if (!updatedHistory.find((session) => session.id === sessionId)) {
      updatedHistory = [
        { id: sessionId, messages: updatedMessages },
        ...updatedHistory,
      ];
    }
    setChatHistory(updatedHistory);
    localStorage.setItem("chatSessions", JSON.stringify(updatedHistory));
  };

  const startNewChat = () => {
    const newSessionId = Date.now().toString();
    setSessionId(newSessionId);
    setMessages([]);
  };

  return {
    chatHistory,
    sessionId,
    setSessionId,
    messages,
    setMessages,
    saveChatHistory,
    startNewChat,
  };
};

export default useChatSession;

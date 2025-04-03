export const saveChatHistory = (
  sessionId,
  updatedMessages,
  chatHistory,
  setChatHistory
) => {
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

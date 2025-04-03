export const addResponse = (response, setMessages, setIsTyping) => {
  setMessages((prev) => [
    ...prev.slice(0, -1),
    { type: "response", text: response },
  ]);
  setIsTyping(false);
};

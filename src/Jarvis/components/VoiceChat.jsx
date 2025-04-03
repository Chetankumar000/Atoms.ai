import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff, RefreshCcw } from "lucide-react";

const VoiceChat = ({ onClose, onSend }) => {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const transcriptRef = useRef("");
  const isManuallyStopped = useRef(false);

  const speak = (text, callback) => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.onend = () => callback?.();
    window.speechSynthesis.speak(utterance);
  };

  const stopListening = () => {
    try {
      isManuallyStopped.current = true;
      recognitionRef.current?.abort();
      setListening(false);
    } catch (err) {
      console.warn("Abort failed:", err.message);
    }
  };

  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Speech not supported.");

    if (recognitionRef.current) recognitionRef.current.abort();

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;
    recognitionRef.current = recognition;
    isManuallyStopped.current = false;

    recognition.onstart = () => {
      setTranscript("");
      transcriptRef.current = "";
      setListening(true);
    };

    recognition.onresult = (e) => {
      let finalText = "";
      for (let i = e.resultIndex; i < e.results.length; ++i) {
        finalText += e.results[i][0].transcript;
      }
      transcriptRef.current = finalText;
      setTranscript(finalText);
    };

    recognition.onerror = (e) => {
      console.error("Speech error:", e);
      setListening(false);
    };

    recognition.onend = async () => {
      setListening(false);
      if (isManuallyStopped.current) return;

      const userText = transcriptRef.current.trim();
      if (!userText) return startVoice();

      const botReply = await onSend(userText);
      speak(botReply, () => {
        if (!isManuallyStopped.current) startVoice();
      });
    };

    recognition.start();
  };

  const toggleMic = () => {
    if (listening) {
      stopListening(); // 🛑 Toggle off
    } else {
      startVoice(); // 🎙️ Toggle on
    }
  };

  const restartVoiceChat = () => {
    stopListening();
    window.speechSynthesis.cancel();
    setTranscript("");
    transcriptRef.current = "";
    setTimeout(() => startVoice(), 300);
  };

  const handleClose = () => {
    stopListening();
    window.speechSynthesis.cancel();
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ y: 100, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-[90%] max-w-md bg-[#1e1e1e] border border-gray-600 p-6 rounded-2xl shadow-2xl relative"
      >
        <h2 className="text-white text-2xl font-semibold text-center mb-4">
          🧠 Voice Chat Mode
        </h2>

        <div className="bg-black/30 p-4 rounded-lg text-gray-200 min-h-[70px] mb-4 transition-all duration-300">
          {transcript ||
            (listening ? "🎧 Listening..." : "Press the mic below to speak")}
        </div>

        <div className="flex items-center justify-center mb-6">
          <motion.button
            onClick={toggleMic}
            whileTap={{ scale: 0.95 }}
            animate={
              listening
                ? { scale: [1, 1.05, 1], boxShadow: "0 0 20px #4ade80" }
                : {}
            }
            transition={{ repeat: Infinity, duration: 1 }}
            className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition ${
              listening
                ? "border-green-400 bg-green-700"
                : "border-gray-500 bg-gray-800 hover:bg-green-600"
            }`}
          >
            {listening ? (
              <MicOff className="text-white" />
            ) : (
              <Mic className="text-white" />
            )}
          </motion.button>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={restartVoiceChat}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg flex items-center gap-2"
          >
            <RefreshCcw size={16} /> New Conversation
          </button>

          <button
            onClick={handleClose}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg"
          >
            ❌ Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VoiceChat;

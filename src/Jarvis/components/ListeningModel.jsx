import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ListeningModal = ({ onClose, onTranscript }) => {
  const [status, setStatus] = useState("Listening...");

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in your browser.");
      onClose();
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setStatus("Listening...");
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setStatus(`Error: ${event.error}`);
      setTimeout(() => onClose(), 500);
    };
    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setStatus("Got it!");
      setTimeout(() => {
        onTranscript(spokenText);
        onClose();
      }, 800);
    };
    recognition.onend = () => {
      if (status === "Listening...") {
        setStatus("Didn't catch that");
        setTimeout(() => onClose(), 5000);
      }
    };

    recognition.start();
    return () => recognition.stop();
  }, [onClose, onTranscript]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-[#1e1e1e] border border-gray-500 p-6 rounded-2xl text-center text-white shadow-2xl w-72"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <div className="text-lg font-semibold mb-3">{status}</div>

          {/* Mic waveform animation */}
          <div className="flex justify-center items-end gap-1 h-8 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 bg-red-500 rounded"
                animate={{
                  height: ["0.5rem", "1.5rem", "0.8rem"],
                }}
                transition={{
                  duration: 0.7,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>

          {/* Cancel Button */}
          <motion.button
            onClick={onClose}
            className="mt-2 px-4 py-1 text-sm bg-red-600 rounded-md text-white"
            whileHover={{ scale: 1.05, backgroundColor: "#dc2626" }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ListeningModal;

// MicWaveform.js
import React from "react";
import "./MicWaveform.css"; // styles below

const MicWaveform = () => {
  return (
    <div className="mic-bars">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="bar"></div>
      ))}
    </div>
  );
};

export default MicWaveform;

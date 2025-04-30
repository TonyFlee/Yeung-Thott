"use client";
import React from "react";

const Animation: React.FC = () => (
  <div style={{
    position: "absolute",
    inset: 0,
    zIndex: 99,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    pointerEvents: "none"
  }}>
    <div style={{
      width: 110,
      height: 110,
      borderRadius: "50%",
      background: "rgba(255,182,193,0.4)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      animation: "popIn 1.1s cubic-bezier(.53,.01,.51,1.01)"
    }}>
      <span role="img" aria-label="flash" style={{ fontSize: 60 }}>✨</span>
    </div>
    <style>
      {`
      @keyframes popIn {
        0% { transform: scale(0.7); opacity: 0; }
        45% { transform: scale(1.2); opacity: 1; }
        100% { transform: scale(1); opacity: 0; }
      }
      `}
    </style>
  </div>
);

export default Animation;
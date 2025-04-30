"use client";
import React, { useRef } from "react";

type Props = {
  capturedImage: string | null;
  onCapture: (img: string) => void;
  onRetake: () => void;
};

const CaptureButton: React.FC<Props> = ({ capturedImage, onCapture, onRetake }) => {
  const isProcessingRef = useRef(false);

  const handleCapture = () => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;

    const video = document.querySelector("video.camera-live") as HTMLVideoElement | null;
    if (!video) {
      alert("Camera not available.");
      isProcessingRef.current = false;
      return;
    }
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 400;
    canvas.height = video.videoHeight || 320;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      flashEffect();
      const dataUrl = canvas.toDataURL("image/png");
      setTimeout(() => {
        onCapture(dataUrl);
        isProcessingRef.current = false;
      }, 180);
    } else {
      alert("Failed to capture image.");
      isProcessingRef.current = false;
    }
  };

  const handleRetake = () => {
    if (isProcessingRef.current) return;
    onRetake();
  };

  const flashEffect = () => {
    let flash = document.createElement("div");
    flash.style.position = "fixed";
    flash.style.top = "0";
    flash.style.left = "0";
    flash.style.width = "100vw";
    flash.style.height = "100vh";
    flash.style.background = "white";
    flash.style.opacity = "0.75";
    flash.style.zIndex = "9999";
    flash.style.pointerEvents = "none";
    flash.style.transition = "opacity 0.3s";
    document.body.appendChild(flash);

    setTimeout(() => {
      flash.style.opacity = "0";
      setTimeout(() => {
        if (flash.parentNode) flash.parentNode.removeChild(flash);
      }, 300);
    }, 100);
  };

  return (
    <div className="capture-controls">
      {!capturedImage ? (
        <button
          className="capture-btn"
          onClick={handleCapture}
          style={{
            background: "linear-gradient(90deg,#ffb6c1,#f06292)",
            color: "#fff",
            padding: "1.1rem 2.8rem",
            border: "none",
            borderRadius: "2rem",
            fontSize: "1.35rem",
            cursor: "pointer",
            boxShadow: "0 3px 12px #f0629250",
            transition: "background 0.2s",
            fontWeight: "bold"
          }}
          aria-label="Capture photo"
        >
          <span style={{ marginRight: "0.7rem" }}>📸</span>
          Start Capture
        </button>
      ) : (
        <button
          className="retake-btn"
          onClick={handleRetake}
          style={{
            background: "#43a047",
            color: "#fff",
            padding: "1.1rem 2.8rem",
            border: "none",
            borderRadius: "2rem",
            fontSize: "1.35rem",
            cursor: "pointer",
            boxShadow: "0 3px 12px #43a04733",
            transition: "background 0.2s",
            fontWeight: "bold"
          }}
          aria-label="Retake photo"
        >
          <span style={{ marginRight: "0.7rem" }}>🔄</span>
          Retake
        </button>
      )}
    </div>
  );
};

export default CaptureButton;
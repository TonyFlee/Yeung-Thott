"use client";
import React from "react";

type Props = {
  capturedImage: string | null;
};

const DownloadShare: React.FC<Props> = ({ capturedImage }) => {
  const handleDownload = () => {
    if (!capturedImage) return;
    const a = document.createElement("a");
    a.href = capturedImage;
    a.download = "photobooth.png";
    a.click();
  };

  const handleShare = async () => {
    if (!capturedImage) return;
    if (
      typeof navigator !== "undefined" &&
      navigator.share &&
      navigator.canShare &&
      navigator.canShare({ files: [] })
    ) {
      const res = await fetch(capturedImage);
      const blob = await res.blob();
      const file = new File([blob], "photobooth.png", { type: blob.type });

      try {
        await navigator.share({
          files: [file],
          title: "Photo Booth Photo",
          text: "Check out my fun photo!",
        });
      } catch (err) {
        alert("Share cancelled or failed.");
      }
    } else {
      alert("Web Share not supported. Download and share manually!");
    }
  };

  return (
    <div className="download-share" style={{ display: "flex", gap: 14 }}>
      <button
        onClick={handleDownload}
        disabled={!capturedImage}
        style={{
          background: "#3949ab",
          color: "#fff",
          padding: "0.8rem 2rem",
          border: "none",
          borderRadius: "1.5rem",
          fontSize: "1rem",
          cursor: capturedImage ? "pointer" : "not-allowed",
          opacity: capturedImage ? 1 : 0.6,
          boxShadow: "0 2px 8px rgba(57,73,171,0.13)",
          transition: "background 0.2s",
        }}
        aria-label="Download photo"
      >
        <span style={{ marginRight: "0.5rem" }}>⬇️</span>
        Download
      </button>
      <button
        onClick={handleShare}
        disabled={!capturedImage}
        style={{
          background: "#fbc02d",
          color: "#222",
          padding: "0.8rem 2rem",
          border: "none",
          borderRadius: "1.5rem",
          fontSize: "1rem",
          cursor: capturedImage ? "pointer" : "not-allowed",
          opacity: capturedImage ? 1 : 0.6,
          boxShadow: "0 2px 8px rgba(251,192,45,0.13)",
          transition: "background 0.2s",
        }}
        aria-label="Share photo"
      >
        <span style={{ marginRight: "0.5rem" }}>📲</span>
        Share
      </button>
    </div>
  );
};

export default DownloadShare;
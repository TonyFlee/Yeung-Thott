"use client";
import React, { useState } from "react";

// Example frames - you can replace these URLs with your own cute frame PNG/SVG assets (transparent centers)
const FRAMES = [
  { key: "none", label: "No Frame", src: "" },
  { key: "pink-bunny", label: "Pink Bunny", src: "/frames/pink-bunny.png" },
  { key: "blue-stars", label: "Blue Stars", src: "/frames/blue-stars.png" },
  { key: "rainbow", label: "Rainbow", src: "/frames/rainbow.png" },
];

type Props = {
  images: string[];
};

const Gallery: React.FC<Props> = ({ images }) => {
  const [selectedFrame, setSelectedFrame] = useState(FRAMES[0].key);

  return (
    <div className="photobooth-gallery" style={{ marginTop: "2rem" }}>
      <h3 style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Gallery</h3>
      {/* Frame selector */}
      <div style={{ marginBottom: "1rem" }}>
        <span style={{ marginRight: "1rem" }}>Choose a frame:</span>
        {FRAMES.map((frame) => (
          <button
            key={frame.key}
            onClick={() => setSelectedFrame(frame.key)}
            style={{
              marginRight: "0.5rem",
              borderRadius: "16px",
              border: selectedFrame === frame.key ? "2px solid #ff80ab" : "1px solid #ccc",
              background: selectedFrame === frame.key ? "#ffe4ec" : "#fff",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              fontWeight: selectedFrame === frame.key ? "bold" : "normal",
              boxShadow: selectedFrame === frame.key ? "0 2px 8px #ff80ab33" : "none",
              transition: "all 0.2s"
            }}
            aria-pressed={selectedFrame === frame.key}
          >
            {frame.label}
          </button>
        ))}
      </div>
      {/* Gallery images with frame overlay */}
      <div className="gallery-images" style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
        {images.length === 0 && <div>No photos yet!</div>}
        {images.map((img, i) => (
          <div
            key={i}
            className="gallery-item"
            style={{
              position: "relative",
              width: 120,
              height: 120,
              background: "#f8f8f8",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 2px 10px #aaa1"
            }}
          >
            {/* User image */}
            <img
              src={img}
              alt={`Captured ${i + 1}`}
              width={120}
              height={120}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "16px"
              }}
            />
            {/* Frame overlay */}
            {selectedFrame !== "none" && (
              <img
                src={FRAMES.find((f) => f.key === selectedFrame)?.src}
                alt={selectedFrame + " frame"}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  pointerEvents: "none",
                  borderRadius: "16px"
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
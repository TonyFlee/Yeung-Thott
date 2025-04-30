"use client";
import React from "react";

// Defines available layout options
const LAYOUTS = {
  A: { key: "A", label: "Layout A", poses: 4, grid: [4, 1], color: "#ffb6c1" },
  B: { key: "B", label: "Layout B", poses: 3, grid: [3, 1], color: "#b7c7f5" },
  C: { key: "C", label: "Layout C", poses: 2, grid: [2, 1], color: "#ffe0e4" },
  D: { key: "D", label: "Layout D", poses: 6, grid: [2, 3], color: "#b7c7f5" },
};

type Props = {
  images: string[];               // Array of dataUrl or image URLs, in order
  layout: keyof typeof LAYOUTS;   // "A" | "B" | "C" | "D"
  dateString?: string;            // e.g. "04/30/2025"
};

const PhotoStrip: React.FC<Props> = ({ images, layout, dateString }) => {
  const lay = LAYOUTS[layout];
  const [rows, cols] = lay.grid;
  const paddedImages = [...images, ...Array(lay.poses - images.length).fill("")].slice(0, lay.poses);

  // Responsive sizing
  const stripWidth = layout === "D" ? 220 : 140;
  const stripHeight = layout === "D" ? 220 : lay.poses * 80 + 60;

  return (
    <div
      style={{
        padding: 8,
        borderRadius: 18,
        border: `3px solid ${lay.color}`,
        background: "#fff",
        width: stripWidth + 10,
        margin: "auto",
        boxShadow: "0 3px 16px #ffb6c166",
        marginBottom: 26,
        position: "relative"
      }}
    >
      {/* Collage grid */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: 8,
          width: stripWidth,
          height: stripHeight - 60,
          background: layout === "D" ? "#efeafe" : "#f9e7ef",
          borderRadius: 12,
          margin: "0 auto",
          overflow: "hidden",
          marginBottom: 8
        }}
      >
        {paddedImages.map((img, i) => (
          <div
            key={i}
            style={{
              background: "#e0e0e0",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              position: "relative"
            }}
          >
            {img ? (
              <img
                src={img}
                alt={`Pose ${i + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span style={{ color: "#bdbdbd", fontSize: 18 }}>+</span>
            )}
          </div>
        ))}
      </div>
      {/* Date and bottom label */}
      <div style={{
        textAlign: "center",
        fontSize: 13,
        color: "#a7a7a7",
        marginBottom: 2,
        letterSpacing: 0.5
      }}>
        {dateString || new Date().toLocaleDateString()}
      </div>
      <div style={{
        textAlign: "center",
        fontWeight: 600,
        fontSize: 18,
        marginTop: 2
      }}>
        {lay.label}
        <div style={{ fontWeight: 400, fontSize: 15, color: "#444" }}>
          {lay.poses} Pose{lay.poses > 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
};

export default PhotoStrip;
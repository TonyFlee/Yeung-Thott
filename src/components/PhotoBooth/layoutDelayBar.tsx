"use client";
import React from "react";

const LAYOUTS = [
  { key: "A", label: "Layout A (2 poses)", poses: 2 },
  { key: "B", label: "Layout B (4 poses)", poses: 4 },
  { key: "C", label: "Layout C (6 poses)", poses: 6 },
  { key: "D", label: "Layout D (8 poses)", poses: 8 },
];

const DELAYS = [
  { key: 3, label: "3s Delay" },
  { key: 5, label: "5s Delay" },
  { key: 10, label: "10s Delay" },
];

type Props = {
  layout: string;
  setLayout: (l: string) => void;
  delay: number;
  setDelay: (d: number) => void;
  onUploadPhoto?: () => void;
};

const LayoutDelayBar: React.FC<Props> = ({
  layout,
  setLayout,
  delay,
  setDelay,
  onUploadPhoto
}) => (
  <div style={{
    display: "flex",
    gap: 16,
    alignItems: "center",
    marginBottom: 24,
    justifyContent: "center"
  }}>
    <div>
      <select
        value={layout}
        onChange={e => setLayout(e.target.value)}
        style={{
          padding: "0.5rem 1.2rem",
          borderRadius: 12,
          border: "1px solid #ffd6e0",
          fontWeight: "bold",
          fontSize: "1rem",
          background: "#fff0f6"
        }}
      >
        {LAYOUTS.map(l => (
          <option value={l.key} key={l.key}>{l.label}</option>
        ))}
      </select>
    </div>
    <div>
      <select
        value={delay}
        onChange={e => setDelay(Number(e.target.value))}
        style={{
          padding: "0.5rem 1.2rem",
          borderRadius: 12,
          border: "1px solid #ffd6e0",
          fontWeight: "bold",
          fontSize: "1rem",
          background: "#fff0f6"
        }}
      >
        {DELAYS.map(d => (
          <option value={d.key} key={d.key}>{d.label}</option>
        ))}
      </select>
    </div>
    {onUploadPhoto && (
      <button
        onClick={onUploadPhoto}
        style={{
          border: "1.5px solid #ff80ab",
          background: "linear-gradient(90deg,#fff,#ffe4ec)",
          color: "#ff4081",
          padding: "0.5rem 1.5rem",
          borderRadius: "13px",
          fontWeight: 600,
          fontSize: "1rem",
          marginLeft: 12,
          cursor: "pointer",
          boxShadow: "0 2px 8px #ff80ab11"
        }}
      >
        <span style={{ marginRight: 6 }}>🖼️</span>Upload Photo
      </button>
    )}
  </div>
);

export default LayoutDelayBar;
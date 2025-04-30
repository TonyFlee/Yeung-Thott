"use client";
import React from "react";

const FILTERS = [
  { key: "none", label: "Normal" },
  { key: "bw", label: "BW" },
  { key: "sepia", label: "Sepia" },
  { key: "pop", label: "Pop Art" },
  { key: "vintage", label: "Vintage" },
  { key: "oldphoto", label: "Old Photo" },
  { key: "amber", label: "Amber" },
  { key: "nocturne", label: "Nocturne" },
];

type Props = {
  filter: string;
  setFilter: (f: string) => void;
  disabled?: boolean;
};

const Filters: React.FC<Props> = ({ filter, setFilter, disabled }) => (
  <div style={{ textAlign: "center" }}>
    <div style={{ fontWeight: 600, marginBottom: 10 }}>Choose a filter</div>
    <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
      {FILTERS.map((f) => (
        <button
          key={f.key}
          onClick={() => setFilter(f.key)}
          disabled={disabled}
          style={{
            background: filter === f.key ? "#ffb6c1" : "#f3e5f5",
            color: filter === f.key ? "#fff" : "#555",
            border: "none",
            borderRadius: "16px",
            padding: "0.5rem 1.3rem",
            fontSize: "1rem",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.6 : 1,
            marginBottom: 6,
            fontWeight: filter === f.key ? "bold" : "normal",
            boxShadow: filter === f.key ? "0 2px 8px #ffb6c166" : "none",
            transition: "background 0.2s",
          }}
          aria-pressed={filter === f.key}
        >
          {f.label}
        </button>
      ))}
    </div>
  </div>
);

export default Filters;
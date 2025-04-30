"use client";
import React, { useRef } from "react";

const AVAILABLE_PROPS = [
  { id: "glasses", label: "Glasses", img: "/props/glasses.png" },
  { id: "hat", label: "Hat", img: "/props/hat.png" },
  { id: "mustache", label: "Mustache", img: "/props/mustache.png" },
];

type PropInstance = {
  id: string;
  label: string;
  img: string;
  x: number;
  y: number;
  scale: number;
};

type Props = {
  enabled: boolean;
  propsData: PropInstance[];
  setPropsData: React.Dispatch<React.SetStateAction<PropInstance[]>>;
};

const PropsOverlay: React.FC<Props> = ({ enabled, propsData, setPropsData }) => {
  const dragIndex = useRef<number | null>(null);
  const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const addProp = (prop: any) => {
    if (!enabled) return;
    setPropsData(prev => [
      ...prev,
      { ...prop, x: 200 + Math.random() * 40, y: 120 + Math.random() * 40, scale: 1 },
    ]);
  };

  const handleMouseDown = (index: number, e: React.MouseEvent) => {
    if (!enabled) return;
    dragIndex.current = index;
    dragOffset.current = {
      x: e.clientX - propsData[index].x,
      y: e.clientY - propsData[index].y,
    };
    window.addEventListener("mousemove", handleMouseMove as any);
    window.addEventListener("mouseup", handleMouseUp as any);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (dragIndex.current === null) return;
    setPropsData(prev => {
      const updated = [...prev];
      updated[dragIndex.current!] = {
        ...updated[dragIndex.current!],
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      };
      return updated;
    });
  };

  const handleMouseUp = () => {
    dragIndex.current = null;
    window.removeEventListener("mousemove", handleMouseMove as any);
    window.removeEventListener("mouseup", handleMouseUp as any);
  };

  const handleWheel = (index: number, e: React.WheelEvent) => {
    if (!enabled) return;
    setPropsData(prev => {
      const updated = [...prev];
      let newScale = updated[index].scale + (e.deltaY < 0 ? 0.1 : -0.1);
      newScale = Math.max(0.5, Math.min(newScale, 2));
      updated[index] = { ...updated[index], scale: newScale };
      return updated;
    });
  };

  const removeProp = (index: number) => {
    setPropsData(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="props-overlay" style={{
      position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
      pointerEvents: enabled ? "auto" : "none"
    }}>
      {/* Toolbar to add props */}
      <div className="props-toolbar" style={{
        position: "absolute", top: 8, left: 8, zIndex: 5, display: "flex", gap: 8
      }}>
        {AVAILABLE_PROPS.map((p) => (
          <button
            key={p.id}
            onClick={() => addProp(p)}
            disabled={!enabled}
            style={{
              background: "#fff",
              border: "1px solid #eee",
              borderRadius: "8px",
              padding: 4,
              cursor: enabled ? "pointer" : "not-allowed",
              opacity: enabled ? 1 : 0.5,
            }}
            aria-label={`Add ${p.label}`}
            type="button"
          >
            <img src={p.img} alt={p.label} width={32} height={32} />
          </button>
        ))}
      </div>
      {/* Render each prop as draggable & scalable */}
      {propsData.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            transform: `translate(-50%, -50%) scale(${p.scale || 1})`,
            zIndex: 4 + i,
            cursor: enabled ? "grab" : "default",
            userSelect: "none",
          }}
          onMouseDown={enabled ? (e) => handleMouseDown(i, e) : undefined}
          onWheel={enabled ? (e) => handleWheel(i, e) : undefined}
          tabIndex={0}
          aria-label={`${p.label} prop`}
        >
          <img
            src={p.img}
            alt={p.label}
            draggable={false}
            style={{
              width: 80,
              height: 80,
              pointerEvents: "none",
              filter: "drop-shadow(0 2px 4px #0002)",
            }}
          />
          {enabled && (
            <button
              onClick={() => removeProp(i)}
              style={{
                position: "absolute",
                top: -12,
                right: -12,
                width: 24,
                height: 24,
                borderRadius: "50%",
                border: "none",
                background: "#fff",
                boxShadow: "0 0 2px #0002",
                cursor: "pointer",
                zIndex: 10,
                fontWeight: "bold",
                color: "#f44336",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Remove prop"
              type="button"
              tabIndex={-1}
            >
              ×
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default PropsOverlay;
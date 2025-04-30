"use client";
import React, { useEffect, useRef } from "react";

type PropInstance = {
  id: string;
  label: string;
  img: string;
  x: number;
  y: number;
  scale: number;
};

type CameraProps = {
  capturedImage: string | null;
  filter: string;
  propsData: PropInstance[];
  setPropsData: React.Dispatch<React.SetStateAction<PropInstance[]>>;
};

const FILTER_MAP: Record<string, string> = {
  none: "none",
  bw: "grayscale(1)",
  sepia: "sepia(1)",
  pop: "contrast(1.6) saturate(1.8)",
  vintage: "sepia(0.4) contrast(1.1) brightness(0.95)",
  oldphoto: "grayscale(0.35) sepia(0.75) brightness(0.9)",
  amber: "sepia(0.45) brightness(1.07) hue-rotate(-10deg)",
};

const Camera: React.FC<CameraProps> = ({ capturedImage, filter }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (capturedImage) return;
    let stream: MediaStream | null = null;
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((s) => {
        stream = s;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }
      })
      .catch(() => {
        if (videoRef.current) {
          videoRef.current.setAttribute("data-error", "pb.cam.denied");
        }
      });
    return () => { stream?.getTracks().forEach(track => track.stop()); };
  }, [capturedImage]);

  if (capturedImage) {
    return (
      <img
        src={capturedImage}
        alt="Captured"
        width={400}
        height={320}
        style={{
          width: 400,
          height: 320,
          borderRadius: 20,
          objectFit: "cover",
          filter: FILTER_MAP[filter] ?? "none",
          background: "#eee",
        }}
      />
    );
  }

  return (
    <div style={{
      width: 400,
      height: 320,
      background: "#2e2e2e",
      borderRadius: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative"
    }}>
      <video
        ref={videoRef}
        className="camera-live"
        width={400}
        height={320}
        autoPlay
        playsInline
        style={{
          width: 400,
          height: 320,
          borderRadius: 20,
          objectFit: "cover",
          filter: FILTER_MAP[filter] ?? "none"
        }}
        data-error=""
      />
      {/* Error overlay */}
      {videoRef.current?.getAttribute("data-error") === "pb.cam.denied" && (
        <div style={{
          position: "absolute", inset: 0, background: "#3b353aee", borderRadius: 20,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{ color: "#fff", fontSize: 20, fontWeight: 600, marginBottom: 16 }}>
            pb.cam.denied
          </div>
          <button
            style={{
              background: "linear-gradient(90deg,#ff80ab,#ff8a65)",
              color: "#fff",
              padding: "0.75rem 2rem",
              borderRadius: 20,
              fontSize: 16,
              border: "none",
              boxShadow: "0 2px 12px #ff80ab44",
              fontWeight: 500
            }}
            onClick={() => window.location.reload()}
          >
            📷 Camera not working?
          </button>
        </div>
      )}
    </div>
  );
};

export default Camera;
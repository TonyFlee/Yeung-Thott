"use client";
import React, { useEffect, useRef, useState } from "react";

type LayoutOption = { key: string; label: string; poses: number };
type MultiPoseCaptureProps = {
  layout: LayoutOption;
  delay: number;
  filter: string;
  onComplete: (images: string[]) => void;
};

const PLACEHOLDER_IMAGE = "/placeholder-cam.png"; // Place your placeholder image in /public/

const MultiPoseCapture: React.FC<MultiPoseCaptureProps> = ({
  layout,
  delay,
  filter,
  onComplete,
}) => {
  const [step, setStep] = useState<"idle" | "countdown" | "capturing" | "done">("idle");
  const [countdown, setCountdown] = useState(delay);
  const [captured, setCaptured] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Start the capture process
  const startCapture = () => {
    setCaptured([]);
    setStep("countdown");
    setCountdown(delay);
  };

  // Countdown logic
  useEffect(() => {
    if (step === "countdown") {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setStep("capturing");
      }
    }
  }, [step, countdown]);

  // Capture photo
  useEffect(() => {
    if (step === "capturing") {
      setTimeout(() => {
        capturePhoto();
      }, 100);
    }
    // eslint-disable-next-line
  }, [step]);

  // After capturing all photos, finish
  useEffect(() => {
    if (captured.length === layout.poses) {
      setStep("done");
      onComplete(captured);
    } else if (step === "capturing" && captured.length < layout.poses) {
      setTimeout(() => {
        setStep("countdown");
        setCountdown(delay);
      }, 700);
    }
    // eslint-disable-next-line
  }, [captured, layout.poses, delay, step, onComplete]);

  // Camera setup
  useEffect(() => {
    let stream: MediaStream | null = null;
    if (videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((s) => {
          stream = s;
          videoRef.current!.srcObject = s;
        })
        .catch(() => {
          // Error handled visually or by your app
        });
    }
    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  // Capture a photo from video
  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 480;
    canvas.height = video.videoHeight || 360;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.filter = getCanvasFilter(filter);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      setCaptured((prev) => [...prev, dataUrl]);
    }
  };

  // For filter support on canvas
  function getCanvasFilter(f: string) {
    switch (f) {
      case "bw":
        return "grayscale(1)";
      case "sepia":
        return "sepia(1)";
      case "pop":
        return "contrast(1.6) saturate(1.8)";
      default:
        return "none";
    }
  }

  // Render pose previews
  const renderPreviews = () => {
    const previews = [];
    for (let i = 0; i < layout.poses; i++) {
      previews.push(
        <div
          key={i}
          style={{
            width: 110,
            height: 85,
            background: "#262626",
            borderRadius: 8,
            marginBottom: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px #0002"
          }}
        >
          {captured[i] ? (
            <img
              src={captured[i]}
              alt={`Pose ${i + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
          ) : (
            <img
              src={PLACEHOLDER_IMAGE}
              alt="Placeholder"
              width={50}
              height={50}
              style={{ opacity: 0.7 }}
            />
          )}
        </div>
      );
    }
    return previews;
  };

  return (
    <div style={{ display: "flex", gap: 28, alignItems: "flex-start", justifyContent: "center" }}>
      <div>
        <div
          style={{
            margin: "0 0 12px 0",
            color: "#d81b60",
            background: "#ffe4ec",
            padding: "7px 16px",
            borderRadius: 15,
            textAlign: "center",
            fontWeight: 500,
            fontSize: 16,
            display: "inline-block"
          }}
        >
          Selected layout: {layout.label} ({layout.poses} photos)
        </div>
        <div
          style={{
            width: 520,
            height: 390,
            background: "#222",
            borderRadius: 15,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            marginBottom: 18,
            boxShadow: "0 3px 22px #0002"
          }}
        >
          <video
            ref={videoRef}
            width={520}
            height={390}
            autoPlay
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 15,
              filter: getCanvasFilter(filter),
              opacity: step === "done" ? 0.2 : 1,
              transition: "opacity 0.2s"
            }}
          />
          {/* Countdown overlay */}
          {step === "countdown" && (
            <div style={{
              position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(0,0,0,0.3)", zIndex: 10
            }}>
              <div style={{ fontSize: 90, color: "#fff", fontWeight: 800, textShadow: "0 1px 8px #0004" }}>
                {countdown}
              </div>
            </div>
          )}
          {/* Capturing overlay */}
          {step === "capturing" && (
            <div style={{
              position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(0,0,0,0.25)", zIndex: 10
            }}>
              <div style={{
                fontSize: 30, color: "#fff", fontWeight: 600, background: "#d81b60",
                borderRadius: 8, padding: "10px 24px", boxShadow: "0 2px 8px #d81b6033"
              }}>
                Capturing...
              </div>
            </div>
          )}
        </div>
        <div style={{ textAlign: "center", marginTop: 8 }}>
          <label htmlFor="countdown" style={{ marginRight: 10, fontWeight: 500, color: "#444" }}>
            Select Countdown Time:
          </label>
          <select
            id="countdown"
            value={delay}
            onChange={e => setCountdown(Number(e.target.value))}
            disabled={step !== "idle"}
            style={{
              padding: "0.4rem 1.1rem",
              borderRadius: 10,
              border: "1px solid #ffd6e0",
              fontWeight: "bold",
              fontSize: "1rem",
              background: "#fff0f6"
            }}
          >
            {[3, 5, 10].map(val => (
              <option value={val} key={val}>{val}s</option>
            ))}
          </select>
        </div>
        <div style={{ textAlign: "center", marginTop: 18 }}>
          <button
            onClick={startCapture}
            disabled={step === "countdown" || step === "capturing"}
            style={{
              background: step === "idle" ? "linear-gradient(90deg,#ffb6c1,#f06292)" : "#eee",
              color: step === "idle" ? "#fff" : "#aaa",
              padding: "0.8rem 2.3rem",
              border: "none",
              borderRadius: "1.5rem",
              fontSize: "1.1rem",
              cursor: step === "idle" ? "pointer" : "not-allowed",
              opacity: step === "idle" ? 1 : 0.5,
              fontWeight: "bold",
              boxShadow: step === "idle" ? "0 3px 12px #f0629250" : "none"
            }}
          >
            {step === "idle" ? "Start Capturing" : "Capturing..."}
          </button>
        </div>
        <div style={{ textAlign: "center", color: "#666", fontSize: 15, marginTop: 12 }}>
          Choose a filter for your photos!
        </div>
      </div>
      {/* Pose previews */}
      <div>
        {renderPreviews()}
      </div>
    </div>
  );
};

export default MultiPoseCapture;
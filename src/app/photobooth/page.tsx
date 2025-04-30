"use client";
import React, { useState } from "react";
import LayoutDelayBar from "@/components/PhotoBooth/layoutDelayBar";
import MultiPoseCapture from "@/components/PhotoBooth/multiPoseCapture";
import Filters from "@/components/PhotoBooth/filters";
import PhotoStrip from "@/components/PhotoBooth/photoStrip";
import Gallery from "@/components/PhotoBooth/gallery";

const LAYOUTS = {
  A: { key: "A", label: "Layout A", poses: 4 },
  B: { key: "B", label: "Layout B", poses: 3 },
  C: { key: "C", label: "Layout C", poses: 2 },
  D: { key: "D", label: "Layout D", poses: 6 },
};

export default function PhotoBoothPage() {
  const [filter, setFilter] = useState<string>("none");
  const [layout, setLayout] = useState<string>("A");
  const [delay, setDelay] = useState<number>(3);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [stripReady, setStripReady] = useState(false);
  const [gallery, setGallery] = useState<{ images: string[]; layout: string; date: string }[]>([]);

  // When a full sequence of poses is done
  const handlePoseComplete = (images: string[]) => {
    setCapturedImages(images);
    setStripReady(true);
    setGallery((g) => [
      ...g,
      { images, layout, date: new Date().toLocaleDateString() },
    ]);
  };

  const handleRetake = () => {
    setCapturedImages([]);
    setStripReady(false);
  };

  return (
    <div
      className="photobooth-root"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fff0f6 0%, #f3e5f5 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "2rem 0",
        }}
      >
        {/* Left side: QR code and promo */}
        <aside
          style={{
            width: 220,
            background: "rgba(255,192,203,0.18)",
            borderRadius: 24,
            padding: 32,
            marginRight: 32,
            boxShadow: "0 2px 24px 0 #ffb6c166",
          }}
        >
          <div
            style={{
              color: "#f06292",
              fontWeight: 600,
              marginBottom: 16,
              fontSize: 16,
            }}
          >
            Get the app for endless frames, stickers, filters, and retouching tools!
          </div>
          <img
            src="/qr-download.png"
            alt="QR code to download"
            width={120}
            height={120}
            style={{ borderRadius: 12 }}
          />
          <div
            style={{
              fontSize: 14,
              marginTop: 12,
              color: "#888",
              textAlign: "center",
            }}
          >
            Scan to Download
          </div>
        </aside>

        {/* Center: Main photobooth */}
        <section
          style={{
            flex: 1,
            maxWidth: 700,
            background: "#fff",
            borderRadius: 32,
            boxShadow: "0 4px 28px #d1c4e933",
            padding: "2.5rem 2rem",
          }}
        >
          <LayoutDelayBar
            layout={layout}
            setLayout={setLayout}
            delay={delay}
            setDelay={setDelay}
            // Optionally: onUploadPhoto={...}
          />
          <div style={{ margin: "2rem 0 1rem 0" }}>
            <Filters filter={filter} setFilter={setFilter} />
          </div>
          {!stripReady ? (
            <MultiPoseCapture
              layout={LAYOUTS[layout as keyof typeof LAYOUTS]}
              delay={delay}
              filter={filter}
              onComplete={handlePoseComplete}
            />
          ) : (
            <div style={{ textAlign: "center" }}>
              <PhotoStrip
                images={capturedImages}
                layout={layout as keyof typeof LAYOUTS}
                dateString={new Date().toLocaleDateString()}
              />
              <button
                onClick={handleRetake}
                style={{
                  background: "#43a047",
                  color: "#fff",
                  padding: "0.7rem 2rem",
                  border: "none",
                  borderRadius: "1.5rem",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  marginTop: 12,
                  fontWeight: "bold",
                }}
              >
                Retake
              </button>
            </div>
          )}
          <div style={{ marginTop: 40 }}>
            <h3>Gallery (your photostrips)</h3>
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
              {gallery.map((strip, i) => (
                <PhotoStrip
                  key={i}
                  images={strip.images}
                  layout={strip.layout as keyof typeof LAYOUTS}
                  dateString={strip.date}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
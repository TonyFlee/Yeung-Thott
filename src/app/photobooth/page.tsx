"use client";

import React, { useState, useRef } from "react";
import Navbar from "@/components/navbar-client-wrapper";
import Footer from "@/components/footer";
import Camera from "../../components/PhotoBooth/camera";
import Filters from "../../components/PhotoBooth/filters";
import PropsOverlay from "../../components/PhotoBooth/propsOverlay";
import CaptureButton from "../../components/PhotoBooth/CaptureButton";
import DownloadShare from "../../components/PhotoBooth/downloadShare";
import Confetti from "react-confetti";

const PhotoBoothPage = () => {
  const [filter, setFilter] = useState("none");
  const [photo, setPhoto] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.filter = filter;
        ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        setPhoto(canvasRef.current.toDataURL("image/png"));
        setShowConfetti(true);

        // Hide confetti after 3 seconds
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center mb-6">Virtual Photo Booth</h1>
        {!photo ? (
          <div className="space-y-4">
            <div className="relative shadow-lg rounded-lg overflow-hidden">
              <Camera onStreamReady={stream => (videoRef.current!.srcObject = stream)} />
              <PropsOverlay />
            </div>
            <Filters onFilterChange={setFilter} />
            <CaptureButton onCapture={handleCapture} />
          </div>
        ) : (
          <div className="space-y-4">
            <img src={photo} alt="Captured" className="w-full max-w-md mx-auto shadow-lg rounded-lg" />
            <DownloadShare url={photo} />
            <button
              onClick={() => setPhoto(null)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Retake Photo
            </button>
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" width={640} height={480} />
      </main>
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <Footer />
    </div>
  );
};

export default PhotoBoothPage;
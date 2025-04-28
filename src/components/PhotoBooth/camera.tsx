import React, { useRef, useEffect } from "react";

const Camera = ({ onStreamReady }: { onStreamReady: (stream: MediaStream) => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        onStreamReady(stream);
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    })();

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [onStreamReady]);

  return (
    <div className="relative aspect-video bg-black">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
  );
};

export default Camera;
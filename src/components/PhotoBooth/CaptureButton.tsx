import React from "react";

const CaptureButton = ({ onCapture }: { onCapture: () => void }) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={onCapture}
        className="px-8 py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600"
      >
        Capture Photo
      </button>
    </div>
  );
};

export default CaptureButton;
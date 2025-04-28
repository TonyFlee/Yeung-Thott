import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const Animation = ({ trigger }: { trigger: boolean }) => {
  const [showShutter, setShowShutter] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (trigger) {
      // Trigger the camera shutter animation
      setShowShutter(true);
      setShowConfetti(true);

      // Remove shutter effect after 1 second
      const shutterTimeout = setTimeout(() => {
        setShowShutter(false);
      }, 1000);

      // Remove confetti after 3 seconds
      const confettiTimeout = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);

      return () => {
        clearTimeout(shutterTimeout);
        clearTimeout(confettiTimeout);
      };
    }
  }, [trigger]);

  return (
    <div className="relative">
      {/* Shutter Animation */}
      {showShutter && (
        <div className="fixed inset-0 bg-black opacity-50 z-50 animate-fade-out" />
      )}

      {/* Confetti Animation */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={200}
        />
      )}
    </div>
  );
};

export default Animation;
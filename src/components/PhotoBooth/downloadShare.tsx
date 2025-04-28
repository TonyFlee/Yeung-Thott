import React from "react";

const DownloadShare = ({ url }: { url: string }) => {
  const sharePhoto = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Fun Photo",
          url,
        });
      } catch (err) {
        console.error("Error sharing photo:", err);
      }
    } else {
      alert("Sharing is not supported on this device.");
    }
  };

  return (
    <div className="flex justify-center space-x-4">
      <a
        href={url}
        download="photo.png"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Download
      </a>
      <button
        onClick={sharePhoto}
        className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
      >
        Share
      </button>
    </div>
  );
};

export default DownloadShare;
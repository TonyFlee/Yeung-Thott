"use client";

import { Facebook } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/context/language-context";

interface FacebookPostProps {
  date?: Date;
  text?: string;
  imageUrl?: string;
  likes?: number;
  comments?: number;
  shares?: number;
  isEmbedded?: boolean;
  embedUrl?: string;
}

export default function FacebookPost({
  date = new Date(),
  text = "We're excited to announce our new project launching next month! Stay tuned for more updates.",
  imageUrl,
  likes = 124,
  comments = 38,
  shares = 17,
  isEmbedded = false,
  embedUrl = "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fposts%2F10153231379946729&width=500&show_text=true&height=316&appId",
}: FacebookPostProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
            <Facebook className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold">YEUNG THOTT</h4>
            <p className="text-xs text-gray-500">{date.toLocaleDateString()}</p>
          </div>
        </div>

        {!isEmbedded && (
          <>
            <p className="text-gray-600 mb-4">{text}</p>
            {imageUrl && (
              <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                <Image
                  src={imageUrl}
                  alt="Facebook post image"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </>
        )}

        {isEmbedded && (
          <div className="aspect-auto bg-white rounded-lg mb-4 overflow-hidden">
            <iframe
              src={embedUrl}
              width="100%"
              height="316"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            ></iframe>
          </div>
        )}

        <div className="flex justify-between text-gray-500 text-sm">
          <span>
            ❤️ {likes} {t("likes") || "Likes"}
          </span>
          <span>
            💬 {comments} {t("comments") || "Comments"}
          </span>
          <span>
            🔄 {shares} {t("shares") || "Shares"}
          </span>
        </div>
      </div>
    </div>
  );
}

"use client";

import Navbar from "@/components/navbar-client-wrapper";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/language-context";
import { useRef, useState, useEffect } from "react";
import emailjs from "emailjs-com";

// Animation variants
const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const loadingVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, yoyo: Infinity } },
};

export default function ContactPage() {
  const { t } = useLanguage();
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [pageLoading, setPageLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("Loading.");

  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 1000);
    let dots = 1;
    const loadingInterval = setInterval(() => {
      dots = dots === 3 ? 1 : dots + 1;
      setLoadingText(`Loading${".".repeat(dots)}`);
    }, 400);
    return () => {
      clearTimeout(timer);
      clearInterval(loadingInterval);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setDone(false);
    setError(null);

    emailjs
      .sendForm(
        "service_rpbfotn",
        "template_iqgrk6m",
        formRef.current!,
        "3NXkXANif9RsVNs3y"
      )
      .then(
        () => {
          setLoading(false);
          setDone(true);
        },
        () => {
          setLoading(false);
          setError("Failed to send message. Please try again.");
        }
      );
  };

  if (pageLoading) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={loadingVariants}
      >
        <motion.div
          className="w-16 h-16 border-4 border-t-[#468e83] border-gray-300 rounded-full animate-spin"
          variants={loadingVariants}
        ></motion.div>
        <motion.div
          className="mt-6 text-lg font-medium text-[#468e83]"
          variants={loadingVariants}
        >
          {loadingText}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />

      <main className="bg-gradient-to-br from-[#d0f4ff] via-[#e2ffe7] to-[#ffe7f0] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen py-20 px-4 flex items-center justify-center">
        <motion.div
          className="w-full max-w-4xl mx-auto backdrop-blur-md bg-white/30 dark:bg-white/10 shadow-2xl rounded-3xl p-10 border border-white/20"
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
              📬 {t("contactUs") || "Get in Touch"}
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              {t("contactSubtitle") || "Slide into our inbox — we’d love to hear from you!"}
            </p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-base font-medium text-gray-800 dark:text-white mb-2">
                  🧑 {t("name") || "Name"}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-white/70 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#66cab4] text-lg text-gray-800 dark:text-white placeholder:text-gray-400"
                  placeholder={t("Name") || "Tony Flee"}
                />
              </div>
              <div>
                <label className="block text-base font-medium text-gray-800 dark:text-white mb-2">
                  📧 {t("email") || "Email"}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-white/70 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#66cab4] text-lg text-gray-800 dark:text-white placeholder:text-gray-400"
                  placeholder={t("Email") || "tonyflee@example.com"}
                />
              </div>
            </div>

            <div>
              <label className="block text-base font-medium text-gray-800 dark:text-white mb-2">
                💬 {t("message") || "Message"}
              </label>
              <textarea
                name="message"
                rows={6}
                required
                className="w-full px-4 py-3 bg-white/70 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#66cab4] text-lg text-gray-800 dark:text-white placeholder:text-gray-400"
                placeholder={t("Message") || "Write something cool..."}
              ></textarea>
            </div>

            <motion.button
              type="submit"
              className="w-full px-8 py-4 text-lg font-bold text-white bg-[#66cab4] rounded-xl hover:bg-[#4aa48d] active:scale-95 transition-transform duration-200"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              disabled={loading}
            >
              {loading
                ? "⏳ Sending..."
                : done
                ? "✅ Sent!"
                : t("sendMessage") || "Send Message 🚀"}
            </motion.button>

            {error && (
              <div className="mt-3 text-red-500 text-center font-medium">{error}</div>
            )}
            {done && (
              <div className="mt-3 text-green-500 text-center font-medium">
                🎉 Message sent successfully!
              </div>
            )}
          </form>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

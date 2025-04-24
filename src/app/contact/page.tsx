"use client";

import Navbar from "@/components/navbar-client-wrapper";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/language-context";
import { useRef, useState } from "react";
import emailjs from "emailjs-com";

// Animation variants
const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const buttonVariants = {
  hover: { scale: 1.1, transition: { duration: 0.3 } },
  tap: { scale: 0.95 },
};

export default function ContactPage() {
  const { t } = useLanguage();
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setDone(false);
    setError(null);

    emailjs
      .sendForm(
        "service_rpbfotn", // Replace with your EmailJS service ID
        "template_iqgrk6m", // Replace with your EmailJS template ID
        formRef.current!,
        "3NXkXANif9RsVNs3y" // Replace with your EmailJS user/public key
      )
      .then(
        () => {
          setLoading(false);
          setDone(true);
        },
        (err) => {
          setLoading(false);
          setError("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />

      <main>
        {/* Hero Section */}
        <motion.section
          className="py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900"
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
        >
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                {t("contactUs") || "Contact Us"}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {t("contactSubtitle") ||
                  "We'd love to hear from you. Reach out to us for any inquiries or feedback."}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Contact Form Section */}
        <motion.section
          className="py-16 bg-white dark:bg-gray-900"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
        >
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
              variants={fadeUpVariants}
            >
              <div className="md:flex">
                {/* Contact Info Column */}
                <motion.div
                  className="md:w-1/3 bg-[#468e83] text-white p-10 flex flex-col justify-center"
                  variants={fadeUpVariants}
                >
                  <h3 className="text-2xl font-bold mb-6">Contact Info</h3>
                  <div className="space-y-6 text-lg">
                    <p>123 Main Street</p>
                    <p>Phnom Penh, Cambodia</p>
                    <p>yeungthott@gmail.com</p>
                    <p>+855 69 895 443</p>
                  </div>
                </motion.div>
                {/* Form Column */}
                <motion.div
                  className="md:w-2/3 p-10"
                  initial="hidden"
                  animate="visible"
                  variants={fadeUpVariants}
                >
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <motion.div variants={fadeUpVariants}>
                        <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t("name") || "Name"}
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#468e83] text-lg"
                          placeholder={t("Name") || "Enter your name"}
                        />
                      </motion.div>
                      <motion.div variants={fadeUpVariants}>
                        <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t("email") || "Email"}
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#468e83] text-lg"
                          placeholder={t("Email") || "Enter your email"}
                        />
                      </motion.div>
                    </div>
                    <motion.div variants={fadeUpVariants}>
                      <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t("message") || "Message"}
                      </label>
                      <textarea
                        name="message"
                        rows={6}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#468e83] text-lg"
                        placeholder={t("Message") || "Enter your message"}
                      ></textarea>
                    </motion.div>
                    <motion.button
                      type="submit"
                      className="w-full px-8 py-4 text-lg font-semibold text-white bg-[#468e83] rounded-lg hover:bg-[#29534d] transition-colors"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      disabled={loading}
                    >
                      {loading
                        ? "Sending..."
                        : done
                        ? "Message Sent!"
                        : t("sendMessage") || "Send Message"}
                    </motion.button>
                    {error && (
                      <div className="mt-2 text-red-500 text-center text-base">{error}</div>
                    )}
                    {done && (
                      <div className="mt-2 text-green-500 text-center text-base">
                        Message sent successfully!
                      </div>
                    )}
                  </form>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
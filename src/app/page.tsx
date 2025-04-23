"use client";

import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar-client-wrapper";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
import {
  ArrowUpRight,
  Camera,
  CheckCircle2,
  MessageSquare,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/language-context";

// Animation variants
const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const loadingVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, yoyo: Infinity } },
};

export default function Home() {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate a 2-second loading time
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <motion.div
        className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={fadeInVariants}
      >
        <motion.div
          className="w-16 h-16 border-4 border-t-[#468e83] border-gray-300 rounded-full animate-spin"
          variants={loadingVariants}
        ></motion.div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* About Section */}
      <motion.section
        id="about"
        className="py-24 bg-white dark:bg-gray-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUpVariants}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t("aboutTitle")}</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {t("aboutSubtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="rounded-xl overflow-hidden shadow-lg"
              variants={fadeUpVariants}
            >
              <Image
                src="https://i.imgur.com/rpLidJF.png"
                alt="Team Photo"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </motion.div>
            <motion.div variants={fadeUpVariants}>
              <h3 className="text-2xl font-bold mb-4">{t("ourStory")}</h3>
              <p className="text-gray-600 mb-6">
                {t("foundedWithVision") ||
                  "Founded with a vision to make a difference, YEUNG THOTT has grown from a small team to a thriving organization. We believe in the power of collaboration, creativity, and commitment."}
              </p>
              <p className="text-gray-600 mb-6">
                {t("diverseTalents") ||
                  "Our team brings together diverse talents and perspectives, united by a shared passion for excellence and innovation."}
              </p>
              <Link
                href="/about"
                className="inline-flex items-center px-6 py-3 text-[#e3e7d7] bg-[#468e83] rounded-lg hover:bg-[#356860] transition-colors"
              >
                {t("learnMore")}
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        className="py-24 bg-gray-50 dark:bg-gray-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUpVariants}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t("whatWeOffer")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("comprehensiveRange") ||
                "Discover our comprehensive range of services designed to meet your needs and exceed your expectations."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-6 h-6" />,
                title: t("professionalService"),
                description: t("professionalServiceDescription"),
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: t("teamCollaboration") || "Team Collaboration",
                description: t("teamCollaborationDescription"),
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: t("fastDelivery") || "Fast Delivery",
                description: t("fastDeliveryDescription"),
              },
              {
                icon: <CheckCircle2 className="w-6 h-6" />,
                title: t("qualityAssurance"),
                description: t("qualityAssuranceDescription"),
              },
              {
                icon: <MessageSquare className="w-6 h-6" />,
                title: t("clearCommunication") || "Clear Communication",
                description: t("clearCommunicationDescription"),
              },
              {
                icon: <Camera className="w-6 h-6" />,
                title: t("creativeSolutions") || "Creative Solutions",
                description: t("creativeSolutionsDescription"),
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                variants={fadeUpVariants}
              >
                <div className="text-[#468e83] mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#000000] to-[#e3e7d7]">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="py-24 bg-white dark:bg-gray-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUpVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
          >
            <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions or want to work with us? Reach out and we'll get back to
              you as soon as possible.
            </p>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
          >
            <div className="md:flex">
              <motion.div
                className="md:w-1/3 bg-[#468e83] text-white p-6"
                variants={fadeUpVariants}
              >
                <h3 className="text-xl font-bold mb-4">Contact Info</h3>
                <div className="space-y-4">
                  <p>123 Main Street</p>
                  <p>Phnom Penh, Cambodia</p>
                  <p>yeungthott@gmail.com</p>
                  <p>+855 69 895 443</p>
                </div>
              </motion.div>
              <motion.div
                className="md:w-2/3 p-6"
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
              >
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.div variants={fadeUpVariants}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#468e83]"
                      />
                    </motion.div>
                    <motion.div variants={fadeUpVariants}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#468e83]"
                      />
                    </motion.div>
                  </div>
                  <motion.div variants={fadeUpVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#468e83]"
                    />
                  </motion.div>
                  <motion.div variants={fadeUpVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#468e83]"
                    ></textarea>
                  </motion.div>
                  <motion.button
                    type="submit"
                    className="w-full px-6 py-3 text-white bg-[#468e83] rounded-lg hover:bg-[#29534d] transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send Message
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>
      <Footer />
    </div>
  );
}

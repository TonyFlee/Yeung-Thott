"use client";

import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar-client-wrapper";
import { motion } from "framer-motion";
import FacebookPostsSection from "@/components/FacebookPostsSection";
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
  const [loadingText, setLoadingText] = useState("Loading.");

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Animate loading text
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

  if (isLoading) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={fadeInVariants}
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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* About Section */}
      <motion.section
        id="about"
        className="py-24 bg-[#f0fdfa]/30 dark:bg-gray-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUpVariants}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t("aboutTitle")}</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t("aboutSubtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="rounded-xl overflow-hidden shadow-lg"
              variants={fadeUpVariants}
            >
              <Image
                src="/assets/images/YeungThottBanner.png"
                alt="Team Photo"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </motion.div>
            <motion.div variants={fadeUpVariants}>
              <h3 className="text-2xl font-bold mb-4">{t("ourStory")}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t("foundedWithVision") ||
                  "YEUNG THOTT started as a small group of friends with big dreams. At first, we didn’t have much—just our passion, curiosity, and the hope that we could create something meaningful. We didn’t come from professional backgrounds, but we believed that with enough effort, anyone can learn, improve, and make a difference."}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t("diverseTalents") ||
                  "At YEUNG THOTT, we welcome everyone with an open heart. We believe in growing together, helping one another, and building a future filled with hope, innovation, and positive change. Our story is just beginning, and we’re excited for what lies ahead."}
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
        className="py-24 bg-[#e3e7d7]/30 dark:bg-gray-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUpVariants}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t("whatWeOffer")}</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t("comprehensiveRange") ||
                "Take a look at all the services we offer. We’ve created them to fit your needs and hopefully give you even more than you expected."}
            </p>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
          >
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
                className="p-6 dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                variants={fadeUpVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-[#468e83] mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#000000] to-[#468e83] dark:from-[#e3e7d7] dark:to-[#468e83]">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Facebook Posts Section (dynamic from Supabase) */}
      <FacebookPostsSection t={t} />

      <Footer />
    </div>
  );
}
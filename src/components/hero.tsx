"use client";

import Link from "next/link";
import { motion } from "framer-motion"; // Import Framer Motion
import { ArrowUpRight, Check, Globe } from "lucide-react";
import Image from "next/image";
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

export default function Hero() {
  const { t } = useLanguage();

  return (
    <motion.div
      className="relative overflow-hidden bg-white dark:bg-gray-900"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={fadeInVariants} // Fade-in effect for the entire Hero section
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-70 dark:opacity-10" />

      <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <motion.div
              className="lg:w-1/2 text-center lg:text-left"
              variants={fadeUpVariants} // Fade-up effect for the left content
            >
              <h1 className="text-5xl sm:text-7xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">
                {t("welcomeTitle").split("YEUNG THOTT")[0]}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#468e83] to-[#e3e7d7] dark:from-[#468e83] dark:to-[#e3e7d7]">
                  {t("nameweb")}
                </span>
                {t("welcomeTitle").split("YEUNG THOTT")[1] || ""}
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {t("welcomeSubtitle")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }} // Hover effect
                  whileTap={{ scale: 0.95 }} // Tap effect
                >
                  <Link
                    href="contact"
                    className="inline-flex items-center px-8 py-4 text-white bg-[#468e83] rounded-lg hover:bg-[#468e83]/90 transition-colors text-lg font-medium"
                  >
                    {t("contactUs")}
                    <ArrowUpRight className="ml-2 w-5 h-5" />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }} // Hover effect
                  whileTap={{ scale: 0.95 }} // Tap effect
                >
                  <Link
                    href="#about"
                    className="inline-flex items-center px-8 py-4 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-lg font-medium"
                  >
                    {t("learnMore")}
                  </Link>
                </motion.div>
              </div>

              <motion.div
                className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 text-sm text-gray-600 dark:text-gray-300"
                variants={fadeUpVariants} // Fade-up effect for the features
              >
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#468e83]" />
                  <span>{t("professionalService")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#468e83]" />
                  <span>{t("qualityAssurance")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#468e83]" />
                  <span>{t("bilingualSupport")}</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              className="lg:w-1/2 mt-12 lg:mt-0"
              variants={fadeUpVariants} // Fade-up effect for the image
            >
              <div className="relative">
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-[#468e83] to-[#e3e7d7] rounded-2xl blur-lg opacity-20 animate-pulse"
                  variants={fadeInVariants} // Fade-in effect for the glowing background
                ></motion.div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/favicon.ico"
                    alt="YEUNG THOTT Team"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

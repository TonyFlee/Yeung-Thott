"use client";

import Navbar from "@/components/navbar-client-wrapper";
import Footer from "@/components/footer";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/language-context";
import { useState, useEffect } from "react";

// Animation variants
const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const loadingVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, yoyo: Infinity } },
};


const teamMembers = [
  {
    nameKey: "member1Name",
    roleKey: "member1Role",
    descKey: "member1Desc",
    image: "https://i.imgur.com/nUBvrcG.jpeg",
  },
  {
    nameKey: "member2Name",
    roleKey: "member2Role",
    descKey: "member2Desc",
    image: "https://i.imgur.com/Gutk4Oa.jpeg",
  },
];

export default function AboutsPage() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("Loading.");
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);

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

  if (loading) {
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

      <main>
        {/* Hero Section */}
        <motion.section
          className="py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900"
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
        >
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              {t("missionVisionTitle") || "Our Mission & Vision"}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
              {t("missionText") || "Our mission is to ..."}
            </p>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t("visionText") || "Our vision is to ..."}
            </p>
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          className="py-16 bg-white dark:bg-gray-900"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
        >
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <motion.div variants={fadeUpVariants}>
          <motion.div
            className="text-5xl mb-4"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9, rotate: -10 }}
          >
            <img
              src="https://em-content.zobj.net/thumbs/240/apple/354/glowing-star_1f31f.png"
              alt="Excellence"
              className="w-12 h-12 mx-auto"
            />
          </motion.div>
          <h3 className="text-xl font-bold mb-2">{t("excellence") || "Excellence"}</h3>
          <p className="text-gray-600 dark:text-gray-300">{t("excellenceDesc")}</p>
              </motion.div>
              <motion.div variants={fadeUpVariants}>
          <motion.div
            className="text-5xl mb-4"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9, rotate: -10 }}
          >
            <img
              src="https://em-content.zobj.net/thumbs/240/apple/354/light-bulb_1f4a1.png"
              alt="Innovation"
              className="w-12 h-12 mx-auto"
            />
          </motion.div>
          <h3 className="text-xl font-bold mb-2">{t("innovation") || "Innovation"}</h3>
          <p className="text-gray-600 dark:text-gray-300">{t("innovationDesc")}</p>
              </motion.div>
              <motion.div variants={fadeUpVariants}>
          <motion.div
            className="text-5xl mb-4"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9, rotate: -10 }}
          >
            <img
              src="https://em-content.zobj.net/thumbs/240/apple/354/handshake_1f91d.png"
              alt="Integrity"
              className="w-12 h-12 mx-auto"
            />
          </motion.div>
          <h3 className="text-xl font-bold mb-2">{t("integrity") || "Integrity"}</h3>
          <p className="text-gray-600 dark:text-gray-300">{t("integrityDesc")}</p>
              </motion.div>
              <motion.div variants={fadeUpVariants}>
          <motion.div
            className="text-5xl mb-4"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9, rotate: -10 }}
          >
            <img
              src="https://em-content.zobj.net/thumbs/240/apple/354/busts-in-silhouette_1f465.png"
              alt="Teamwork"
              className="w-12 h-12 mx-auto"
            />
          </motion.div>
          <h3 className="text-xl font-bold mb-2">{t("teamwork") || "Teamwork"}</h3>
          <p className="text-gray-600 dark:text-gray-300">{t("teamworkDesc")}</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Our Story Section */}
        <motion.section
          className="py-16 bg-blue-50 dark:bg-gray-800"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
        >
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
              {t("ourStoryTitle") || "Our Story"}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              {t("ourStoryP1")}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                    {t("ourStoryP2")}
                  </p>
            <AnimatePresence>
              {showMore && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                    {t("ourStoryP3")}
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                    {t("ourStoryP4")}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="text-center">
              <motion.button
                className="mt-2 px-6 py-2 bg-[#468e83] text-white rounded-lg font-semibold hover:bg-[#29534d] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMore((v) => !v)}
              >
                {showMore
                  ? t("showLess") || "Show Less"
                  : t("showMore") || "Show More"}
              </motion.button>
            </div>
          </div>
        </motion.section>

        {/* Growth Timeline */}
        <motion.section
          className="py-16 bg-white dark:bg-gray-900"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
        >
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
              {t("growthTimelineTitle") || "Our Growth Timeline"}
            </h2>
            <div className="space-y-8">
              <motion.div variants={fadeUpVariants} className="flex items-start gap-4">
                <div className="text-2xl font-bold text-[#468e83] min-w-[80px]">{t("2025") || "2025"}</div>
                <div>
                  <h4 className="font-semibold">{t("timeline2025Title")}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{t("timeline2025Desc")}</p>
                </div>
              </motion.div>
              <motion.div variants={fadeUpVariants} className="flex items-start gap-4">
                <div className="text-2xl font-bold text-[#468e83] min-w-[80px]">{t("today") || "Today"}</div>
                <div>
                  <h4 className="font-semibold">{t("timelineTodayTitle")}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{t("timelineTodayDesc")}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Meet Our Team */}
        <motion.section
          className="py-16 bg-blue-50 dark:bg-gray-800"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
        >
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-10 text-center text-gray-900 dark:text-white">
              {t("meetOurTeam") || "Meet Our Team"}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {teamMembers.map((member, index) => (
            <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105"
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="h-64 overflow-hidden">
              <img
                src={member.image}
                alt={t("ourTeamImageAlt") || "Team member"}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">
                {t(member.nameKey)}
              </h3>
              <div className="text-[#468e83] font-semibold mb-2">
                {t(member.roleKey)}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t(member.descKey)}
              </p>
            </div>
          </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
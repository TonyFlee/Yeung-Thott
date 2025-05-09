"use client";

import Navbar from "@/components/navbar-client-wrapper";
import Footer from "@/components/footer";
import Image from "next/image";
import { useLanguage } from "@/context/language-context";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClientComponentClient } from "@/supabase/client";

// Animation variants
const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const loadingVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, yoyo: Infinity } },
};

export default function GalleryPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleItems, setVisibleItems] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("Loading.");
  const [galleryItems, setGalleryItems] = useState<
    {
      id: string;
      category: string;
      title: string;
      description: string;
      image_url: string;
    }[]
  >([]);

  // Fetch gallery data from Supabase
  useEffect(() => {
    const supabase = createClientComponentClient();

    async function fetchGallery() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        setGalleryItems([]);
        setLoadingText("Error loading gallery");
      } else {
        setGalleryItems(data || []);
        setLoadingText("Loading.");
      }
      setIsLoading(false);
    }

    fetchGallery();

    // Animate loading text
    let dots = 1;
    const loadingInterval = setInterval(() => {
      dots = dots === 3 ? 1 : dots + 1;
      setLoadingText(`Loading${".".repeat(dots)}`);
    }, 400);

    return () => {
      clearInterval(loadingInterval);
    };
  }, []);

  // Category definitions
  const categories = [
    { id: "all", name: t("all") || "All" },
    { id: "project", name: t("project") || "Project" },
    { id: "team", name: t("team") || "Team" },
    { id: "events", name: t("events") || "Events" },
    { id: "sport", name: t("sport") || "Sport" },
  ];

  // Filter gallery items based on active category
  const filteredItems = galleryItems.filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    if (categoryId === "all") {
      setVisibleItems((prev) => Math.max(prev, 6));
    } else {
      setVisibleItems(6);
    }
  };

  // Handle show more button click
  const handleShowMore = () => {
    setVisibleItems(Math.min(filteredItems.length, visibleItems + 6));
  };

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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />

      <main>
        {/* Hero Section */}
        <motion.section
          className="py-20 bg-gradient-to-b from-[#cbf8ee]/30 to-[#e3e7d7]/30 dark:from-gray-800 dark:to-gray-900"
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
        >
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                {t("ourGallery") || "Our Gallery"}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {t("gallerySubtitle") ||
                  "Explore our portfolio of work and see the quality and creativity we bring to every project"}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Gallery Section */}
        <motion.section
          className="py-16 bg-[#e3e7d7]/30 dark:bg-gray-900"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
        >
          <div className="container mx-auto px-4">
            {/* Category Filter */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-12"
              variants={fadeUpVariants}
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    category.id === activeCategory
                      ? "bg-[#468e83] text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </motion.div>

            {/* Gallery Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={fadeUpVariants}
            >
              <AnimatePresence>
                {filteredItems.slice(0, visibleItems).map((item) => (
                  <motion.div
                    key={item.id}
                    className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src={item.image_url}
                        alt={item.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {item.description}
                      </p>
                      <div className="mt-4">
                        <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-700 dark:bg-[#468e83] text-[#e3e7d7] dark:text-[#e3e7d7] rounded-full">
                          {
                            categories.find((cat) => cat.id === item.category)
                              ?.name
                          }
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Show More Button */}
            {visibleItems < filteredItems.length && (
              <motion.div
                className="text-center mt-12"
                variants={fadeUpVariants}
              >
                <button
                  onClick={handleShowMore}
                  className="inline-flex items-center justify-center px-6 py-3 text-white bg-[#468e83] rounded-lg hover:bg-[#2e5c55] transition-colors"
                >
                  {t("showMore") || "Show More"}
                </button>
              </motion.div>
            )}
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
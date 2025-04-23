"use client";

import Navbar from "@/components/navbar-client-wrapper";
import Footer from "@/components/footer";
import Image from "next/image";
import { useLanguage } from "@/context/language-context";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion

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

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate a 2-second loading time
    return () => clearTimeout(timer);
  }, []);

  // Sample gallery categories and images
  const categories = [
    { id: "all", name: t("all") || "All" },
    { id: "projects", name: t("projects") || "Projects" },
    { id: "team", name: t("team") || "Team" },
    { id: "events", name: t("events") || "Events" },
  ];

  const galleryItems = [
    {
      id: 1,
      category: "projects",
      title: "Project Alpha",
      description: "A showcase of our innovative approach",
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&random=1",
    },
    {
      id: 2,
      category: "projects",
      title: "Project Beta",
      description: "Excellence in execution",
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&random=2",
    },
    {
      id: 3,
      category: "team",
      title: "Team Building",
      description: "Strengthening our bonds",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    },
    {
      id: 4,
      category: "events",
      title: "Annual Conference",
      description: "Sharing knowledge and insights",
      image:
        "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?w=800&q=80",
    },
    {
      id: 5,
      category: "projects",
      title: "Project Gamma",
      description: "Pushing boundaries",
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&random=3",
    },
    {
      id: 6,
      category: "team",
      title: "Team Workshop",
      description: "Collaborative problem solving",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
    },
    {
      id: 7,
      category: "events",
      title: "Community Outreach",
      description: "Making a difference",
      image:
        "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&q=80",
    },
    {
      id: 8,
      category: "projects",
      title: "Project Delta",
      description: "Attention to detail",
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&random=4",
    },
    {
      id: 9,
      category: "team",
      title: "Team Celebration",
      description: "Recognizing achievements",
      image:
        "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80",
    },
    {
      id: 10,
      category: "events",
      title: "Industry Exhibition",
      description: "Showcasing our capabilities",
      image:
        "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?w=800&q=80&random=1",
    },
    {
      id: 11,
      category: "projects",
      title: "Project Epsilon",
      description: "Innovation at work",
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&random=5",
    },
    {
      id: 12,
      category: "team",
      title: "Team Meeting",
      description: "Planning for success",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
    },
  ];

  // Filter gallery items based on active category
  const filteredItems = galleryItems.filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setVisibleItems(6); // Reset visible items when changing category
  };

  // Handle show more button click
  const handleShowMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleItems(Math.min(filteredItems.length, visibleItems + 6));
      setIsLoading(false);
    }, 800);
  };

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
          className="py-16 bg-white dark:bg-gray-900"
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
                      ? "bg-blue-600 text-white"
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
              {filteredItems.slice(0, visibleItems).map((item) => (
                <motion.div
                  key={item.id}
                  className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  variants={fadeUpVariants}
                >
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={item.image}
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
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full">
                        {
                          categories.find((cat) => cat.id === item.category)
                            ?.name
                        }
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Show More Button */}
            {visibleItems < filteredItems.length && (
              <motion.div
                className="text-center mt-12"
                variants={fadeUpVariants}
              >
                <button
                  onClick={handleShowMore}
                  disabled={isLoading}
                  className="inline-flex items-center justify-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {t("loading") || "Loading..."}
                    </>
                  ) : (
                    t("showMore") || "Show More"
                  )}
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

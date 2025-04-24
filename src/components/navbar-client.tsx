"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import LanguageSwitcher from "./language-switcher";
import ThemeToggle from "./theme-toggle";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/language-context";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion

interface NavbarClientProps {
  isAdmin: boolean;
}

// Animation variants
const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function NavbarClient({ isAdmin }: NavbarClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.div
        className="hidden md:flex gap-8 items-center"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants} // Fade-in animation for desktop navigation
      >
        {["home", "about", "gallery", "contact"].map((item, index) => (
          <motion.div
            key={item}
            variants={fadeUpVariants} // Fade-up animation for each link
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={`/${item === "home" ? "" : item}`}
              className="text-gray-700 dark:text-gray-300 hover:text-[#468e83] dark:hover:text-[#e3e7d7] font-medium transition-colors duration-300 relative group"
            >
              {t(item)}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#468e83] dark:bg-[#e3e7d7] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </motion.div>
        ))}

        <div className="flex gap-4 items-center ml-4">
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Theme Switcher */}
          <ThemeToggle />

          {isAdmin && (
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
            >
              <Link href="/dashboard">
                <Button className="bg-[#468e83] hover:bg-[#468e83]/90 text-white transition-all duration-300 transform hover:scale-105">
                  {t("dashboard")}
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Mobile Menu Button */}
      <motion.div
        className="md:hidden"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants} // Fade-in animation for mobile menu button
      >
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-700 dark:text-gray-300 hover:bg-[#468e83]/10 transition-all duration-300"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </motion.div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 z-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-4">
              {["home", "about", "gallery", "contact"].map((item) => (
                <motion.div
                  key={item}
                  variants={fadeUpVariants} // Fade-up animation for each mobile link
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1 }}
                >
                  <Link
                    href={`/${item === "facebook-posts" ? "updates" : item}`}
                    className="text-gray-700 dark:text-gray-300 hover:text-[#468e83] dark:hover:text-[#e3e7d7] font-medium transition-colors duration-300 py-2 px-3 rounded-md hover:bg-[#468e83]/10 dark:hover:bg-[#e3e7d7]/10"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t(item)}
                  </Link>
                </motion.div>
              ))}

              {isAdmin && (
                <motion.div
                  className="pt-4 border-t border-gray-100 dark:border-gray-800"
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                >
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-block"
                  >
                    <Button
                      size="sm"
                      className="bg-[#468e83] hover:bg-[#468e83]/90 text-white transition-all duration-300 transform hover:scale-105"
                    >
                      {t("dashboard")}
                    </Button>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Menu, X, Coffee } from "lucide-react";
import { useState } from "react";
import LanguageSwitcher from "./language-switcher";
import ThemeToggle from "./theme-toggle";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/language-context";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarClientProps {
  isAdmin: boolean;
}

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
  const [coffeePopupOpen, setCoffeePopupOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleCoffeePopup = () => {
    setCoffeePopupOpen(!coffeePopupOpen);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.div
        className="hidden md:flex gap-8 items-center"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        {["home", "about", "gallery", "contact"].map((item, index) => (
          <motion.div
            key={item}
            variants={fadeUpVariants}
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
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <LanguageSwitcher />
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <ThemeToggle />
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700 dark:text-gray-300 hover:bg-[#468e83]/10 transition-all duration-300"
              onClick={toggleCoffeePopup}
            >
              <Coffee className="h-6 w-6" />
            </Button>
          </motion.div>

          {isAdmin && (
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
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
        variants={fadeInVariants}
      >
        <div className="flex items-center gap-2">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            <LanguageSwitcher />
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <ThemeToggle />
          </motion.div>

          <Button
            variant="ghost"
            size="icon"
            className="text-gray-700 dark:text-gray-300 hover:bg-[#468e83]/10 transition-all duration-300"
            onClick={toggleCoffeePopup}
          >
            <Coffee className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-gray-700 dark:text-gray-300 hover:bg-[#468e83]/10 transition-all duration-300"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1 }}
                >
                  <Link
                    href={`/${item}`}
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
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
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

      {/* Coffee Popup */}
      <AnimatePresence>
        {coffeePopupOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={toggleCoffeePopup}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="https://i.imgur.com/yRTrexx.jpeg"
                alt="Coffee"
                className="rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                Buy Me A Coffee!
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
              Enjoying my work? A coffee would really help me keep going and create more awesome content. Your support means a lot! ☕❤️
              </p>
              <div className="mt-4 flex justify-center space-x-3">
                <a
                  href="https://link.payway.com.kh/ABAPAYjZ352198G"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-[#468e83] hover:bg-[#468e83]/90 text-white">
                    Donate
                  </Button>
                </a>
                <Button
                  className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
                  onClick={toggleCoffeePopup}
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

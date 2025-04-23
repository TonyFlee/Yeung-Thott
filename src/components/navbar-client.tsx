"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import LanguageSwitcher from "./language-switcher";
import ThemeToggle from "./theme-toggle";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/language-context";

interface NavbarClientProps {
  isAdmin: boolean;
}

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
      <div className="hidden md:flex gap-8 items-center">
        <Link
          href="#about"
          className="text-gray-700 dark:text-gray-300 hover:text-[#468e83] dark:hover:text-[#e3e7d7] font-medium transition-colors duration-300 relative group"
        >
          {t("about")}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#468e83] dark:bg-[#e3e7d7] transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link
          href="#gallery"
          className="text-gray-700 dark:text-gray-300 hover:text-[#468e83] dark:hover:text-[#e3e7d7] font-medium transition-colors duration-300 relative group"
        >
          {t("gallery")}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#468e83] dark:bg-[#e3e7d7] transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link
          href="#facebook-posts"
          className="text-gray-700 dark:text-gray-300 hover:text-[#468e83] dark:hover:text-[#e3e7d7] font-medium transition-colors duration-300 relative group"
        >
          {t("updates")}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#468e83] dark:bg-[#e3e7d7] transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link
          href="#contact"
          className="text-gray-700 dark:text-gray-300 hover:text-[#468e83] dark:hover:text-[#e3e7d7] font-medium transition-colors duration-300 relative group"
        >
          {t("contact")}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#468e83] dark:bg-[#e3e7d7] transition-all duration-300 group-hover:w-full"></span>
        </Link>

        <div className="flex gap-4 items-center ml-4">
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Theme Switcher */}
          <ThemeToggle />

          {isAdmin && (
            <Link href="/dashboard">
              <Button className="bg-[#468e83] hover:bg-[#468e83]/90 text-white transition-all duration-300 transform hover:scale-105">
                {t("dashboard")}
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
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
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 z-50 animate-in fade-in slide-in-from-top-5 duration-300">
          <div className="flex flex-col space-y-4">
            <Link
              href="#about"
              className="text-gray-700 dark:text-gray-300 hover:text-[#468e83] dark:hover:text-[#e3e7d7] font-medium transition-colors duration-300 py-2 px-3 rounded-md hover:bg-[#468e83]/10 dark:hover:bg-[#e3e7d7]/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("about")}
            </Link>
            <Link
              href="#gallery"
              className="text-gray-700 dark:text-gray-300 hover:text-[#468e83] dark:hover:text-[#e3e7d7] font-medium transition-colors duration-300 py-2 px-3 rounded-md hover:bg-[#468e83]/10 dark:hover:bg-[#e3e7d7]/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("gallery")}
            </Link>
            <Link
              href="#facebook-posts"
              className="text-gray-700 dark:text-gray-300 hover:text-[#468e83] dark:hover:text-[#e3e7d7] font-medium transition-colors duration-300 py-2 px-3 rounded-md hover:bg-[#468e83]/10 dark:hover:bg-[#e3e7d7]/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("updates")}
            </Link>
            <Link
              href="#contact"
              className="text-gray-700 dark:text-gray-300 hover:text-[#468e83] dark:hover:text-[#e3e7d7] font-medium transition-colors duration-300 py-2 px-3 rounded-md hover:bg-[#468e83]/10 dark:hover:bg-[#e3e7d7]/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("contact")}
            </Link>

            {isAdmin && (
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
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
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

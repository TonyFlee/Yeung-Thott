"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Globe, Menu, Moon, Sun, X } from "lucide-react";
import LanguageSwitcher from "./language-switcher";
import { useTheme } from "next-themes";

interface MobileMenuProps {
  isAdmin?: boolean;
}

export default function MobileMenu({ isAdmin = false }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { setTheme, theme } = useTheme();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="text-gray-700"
        onClick={toggleMenu}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 z-50">
          <div className="flex flex-col space-y-4">
            <Link
              href="#about"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="#gallery"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Gallery
            </Link>
            <Link
              href="#facebook-posts"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Updates
            </Link>
            <Link
              href="#contact"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

            <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800">
              <div className="flex gap-4">
                <LanguageSwitcher />
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={toggleTheme}
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
              </div>

              {isAdmin ? (
                <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                  <Button size="sm">Dashboard</Button>
                </Link>
              ) : (
                <Link
                  href="/sign-in"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => setIsOpen(false)}
                >
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

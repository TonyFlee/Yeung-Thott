"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [pageTurn, setPageTurn] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle theme change with animation
  const handleThemeChange = (newTheme: "light" | "dark") => {
    setPageTurn(newTheme);
    setTimeout(() => {
      setTheme(newTheme);
      setPageTurn(null);
    }, 100); // 1.8 seconds to match animation
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="rounded-full">
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <div className="relative">
      {/* Book page turn animation overlay */}
      <AnimatePresence>
        {pageTurn && (
          <motion.div
            key={pageTurn}
            initial={{ rotateY: 0, opacity: 1 }}
            animate={{ rotateY: 180, opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }} // <-- slower animation
            className="fixed inset-0 z-50 pointer-events-none"
            style={{
              background:
                pageTurn === "dark"
                  ? "linear-gradient(90deg, #fff 80%, #23272f 100%)"
                  : "linear-gradient(90deg, #23272f 80%, #fff 100%)",
              boxShadow: "0 0 60px 10px rgba(0,0,0,0.15)",
              borderRadius: 0,
              transformOrigin: "left center",
              perspective: 1200,
              willChange: "transform, opacity",
            }}
          />
        )}
      </AnimatePresence>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-[#468e83]/10 transition-all duration-300 relative overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "dark" ? (
                <motion.span
                  key="moon"
                  initial={{ opacity: 0, scale: 0.7, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.7, rotate: 90 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center absolute inset-0"
                >
                  <Moon className="h-5 w-5 text-yellow-400" />
                </motion.span>
              ) : (
                <motion.span
                  key="sun"
                  initial={{ opacity: 0, scale: 0.7, rotate: 90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.7, rotate: -90 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center absolute inset-0"
                >
                  <Sun className="h-5 w-5 text-yellow-500" />
                </motion.span>
              )}
            </AnimatePresence>
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="animate-in fade-in-80 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
        >
          <DropdownMenuItem
            onClick={() => handleThemeChange("light")}
            className="cursor-pointer transition-colors duration-200 hover:bg-[#468e83]/10"
          >
            Light {theme === "light" && "✓"}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleThemeChange("dark")}
            className="cursor-pointer transition-colors duration-200 hover:bg-[#468e83]/10"
          >
            Dark {theme === "dark" && "✓"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

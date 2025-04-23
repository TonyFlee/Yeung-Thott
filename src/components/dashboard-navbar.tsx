"use client";

import Link from "next/link";
import { createClient } from "../../supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  UserCircle,
  Home,
  Settings,
  Image,
  Facebook,
  MessageSquare,
  BarChart3,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import ThemeToggle from "./theme-toggle";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardNavbar() {
  const supabase = createClient();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const navItems = [
    { href: "/dashboard", icon: <Home size={18} />, label: "Dashboard" },
    { href: "#", icon: <Image size={18} />, label: "Gallery" },
    { href: "#", icon: <Facebook size={18} />, label: "Posts" },
    { href: "#", icon: <MessageSquare size={18} />, label: "Messages" },
    { href: "#", icon: <BarChart3 size={18} />, label: "Analytics" },
  ];

  return (
    <nav className="w-full border-b border-[#468e83]/20 dark:border-gray-800 bg-white dark:bg-gray-900 py-4 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            prefetch
            className="text-xl font-bold text-[#468e83] dark:text-[#e3e7d7] transition-all duration-300 hover:scale-105"
          >
            YEUNG THOTT
          </Link>
          <div className="hidden md:flex gap-6 ml-8">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-[#468e83] dark:hover:text-[#e3e7d7] flex items-center gap-2 transition-all duration-300 relative group py-1"
              >
                <motion.span
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.2 }}
                  className="text-[#468e83] dark:text-[#e3e7d7]"
                >
                  {item.icon}
                </motion.span>
                <span>{item.label}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#468e83] dark:bg-[#e3e7d7] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Link
            href="/"
            className="text-gray-700 dark:text-gray-300 hover:text-[#468e83] dark:hover:text-[#e3e7d7] transition-all duration-300"
          >
            <Button
              variant="ghost"
              className="flex items-center gap-2 hover:bg-[#468e83]/10 transition-all duration-300"
            >
              <Home size={18} />
              <span className="hidden sm:inline">View Site</span>
            </Button>
          </Link>

          <ThemeToggle />

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700 dark:text-gray-300 hover:bg-[#468e83]/10 transition-all duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>

          {/* User dropdown - only visible on desktop */}
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-[#468e83]/10 transition-all duration-300 rounded-full"
                >
                  <UserCircle className="h-6 w-6 text-[#468e83] dark:text-[#e3e7d7]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="animate-in fade-in-80 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
              >
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer transition-colors duration-200 hover:bg-[#468e83]/10">
                  <Settings
                    size={16}
                    className="text-[#468e83] dark:text-[#e3e7d7]"
                  />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-red-500 focus:text-red-500 cursor-pointer transition-colors duration-200 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <LogOut size={16} />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white dark:bg-gray-900 border-b border-[#468e83]/20 dark:border-gray-800"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-[#468e83] dark:hover:text-[#e3e7d7] flex items-center gap-3 p-2 rounded-md hover:bg-[#468e83]/10 dark:hover:bg-[#e3e7d7]/10 transition-all"
                >
                  <span className="text-[#468e83] dark:text-[#e3e7d7]">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

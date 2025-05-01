"use client";

import Navbar from "@/components/navbar-client-wrapper";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#232940] via-[#161b22] to-[#0f111a] dark:from-[#0f111a] dark:to-[#232940]">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center relative py-12 px-2">
        {/* Hologram 404 Glitch Animation */}
        <div className="relative mb-10 flex items-center justify-center">
          <motion.h1
            className="relative z-10 text-[7rem] md:text-[10rem] font-extrabold leading-none text-transparent bg-clip-text bg-gradient-to-br from-[#7ddaff] to-[#a986ff] drop-shadow-2xl select-none"
            initial={{ scale: 0.9, opacity: 0.5, filter: "blur(2px)" }}
            animate={{
              scale: [1, 1.03, 1],
              opacity: [0.8, 1, 0.8],
              filter: [
                "blur(2px)",
                "blur(0.5px) brightness(1.2)",
                "blur(2px)",
              ],
              x: [0, -5, 5, 0],
              y: [0, 4, -4, 0],
              skewX: [0, 5, -5, 0],
              skewY: [0, -2, 2, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            style={{
              textShadow:
                "0 0 32px #7ddaff, 0 0 64px #a986ff, 0 2px 12px #fff",
            }}
          >
            404
          </motion.h1>
          {/* Glitch overlays */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full pointer-events-none mix-blend-lighten"
            initial={{ opacity: 0.2 }}
            animate={{
              opacity: [0.2, 0.5, 0.1, 0.2],
              x: [0, 3, -3, 0],
              y: [0, -2, 2, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              background:
                "repeating-linear-gradient(180deg, #7ddaff40 0 2px, transparent 2px 6px)",
            }}
          />
        </div>
        {/* Hologram Card */}
        <motion.div
          className="relative px-10 py-8 rounded-2xl shadow-2xl border border-[#a986ff66] bg-white/10 dark:bg-gray-900/50 backdrop-blur-md max-w-xl mx-auto flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.9, y: 64 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring", bounce: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white tracking-wider" style={{ textShadow: "0 2px 12px #7ddaff" }}>
            Not Found Page
          </h2>
          <p className="mb-6 mt-2 text-gray-200 text-lg max-w-md text-center">
            <span className="font-mono tracking-tight text-[#7ddaff]">404</span>{" "}
            The page you’re seeking is lost in the matrix.<br />
            <span className="text-[#a986ff] font-semibold">Reality not found.</span>
          </p>
          {/* Floating Home Button */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-gradient-to-r from-[#7ddaff] via-[#468e83] to-[#a986ff] text-white font-bold rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-all"
            >
              Return Home
            </Link>
          </motion.div>
        </motion.div>
        {/* Floating hologram lights */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
          <motion.div
            className="absolute left-6 top-1/2 h-16 w-16 bg-[#7ddaff55] rounded-full blur-2xl"
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
          />
          <motion.div
            className="absolute right-10 top-1/3 h-24 w-24 bg-[#b8b4c255] rounded-full blur-2xl"
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 2.7, repeat: Infinity, repeatType: "mirror" }}
          />
          <motion.div
            className="absolute left-1/2 bottom-16 h-20 w-20 bg-[#468e8355] rounded-full blur-2xl"
            animate={{ x: [0, -24, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, repeatType: "mirror" }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
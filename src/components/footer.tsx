"use client";

import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone, Globe } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-[#e3e7d7]/30 dark:bg-gray-900 border-t border-[#468e83]/20 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* About Column */}
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {t("nameweb")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t("prompt")}
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://www.facebook.com/yeungthott"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#468e83] hover:text-[#468e83]/80 dark:text-[#e3e7d7] dark:hover:text-[#e3e7d7]/80 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </motion.a>
                <motion.a
                href="/"
                target="_blank"
                className="text-[#468e83] hover:text-[#468e83]/80 dark:text-[#e3e7d7] dark:hover:text-[#e3e7d7]/80 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                >
                <span className="sr-only">Website</span>
                <Globe className="h-6 w-6" />
                </motion.a>
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2">
            <li>
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#468e83] dark:hover:text-[#e3e7d7] transition-colors duration-300 inline-block relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#468e83] dark:after:bg-[#e3e7d7] after:left-0 after:-bottom-0.5 hover:after:w-full after:transition-all after:duration-300"
                >
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#468e83] dark:hover:text-[#e3e7d7] transition-colors duration-300 inline-block relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#468e83] dark:after:bg-[#e3e7d7] after:left-0 after:-bottom-0.5 hover:after:w-full after:transition-all after:duration-300"
                >
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#468e83] dark:hover:text-[#e3e7d7] transition-colors duration-300 inline-block relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#468e83] dark:after:bg-[#e3e7d7] after:left-0 after:-bottom-0.5 hover:after:w-full after:transition-all after:duration-300"
                >
                  {t("gallery")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#468e83] dark:hover:text-[#e3e7d7] transition-colors duration-300 inline-block relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#468e83] dark:after:bg-[#e3e7d7] after:left-0 after:-bottom-0.5 hover:after:w-full after:transition-all after:duration-300"
                >
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {t("contactInfo")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start group">
                <MapPin className="h-5 w-5 text-[#468e83] dark:text-[#e3e7d7] mr-2 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-gray-600 dark:text-gray-400 group-hover:text-[#468e83] dark:group-hover:text-[#e3e7d7] transition-colors duration-300">
                National No. 6, Siem Reap, Cambodia
                </span>
              </li>
              <li className="flex items-center group">
                <Phone className="h-5 w-5 text-[#468e83] dark:text-[#e3e7d7] mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-gray-600 dark:text-gray-400 group-hover:text-[#468e83] dark:group-hover:text-[#e3e7d7] transition-colors duration-300">
                  +855 69 895 443
                </span>
              </li>
              <li className="flex items-center group">
                <Mail className="h-5 w-5 text-[#468e83] dark:text-[#e3e7d7] mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-gray-600 dark:text-gray-400 group-hover:text-[#468e83] dark:group-hover:text-[#e3e7d7] transition-colors duration-300">
                  {t("emailAddress")}
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#468e83]/20 dark:border-gray-800">
          <div className="text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
            © {currentYear} YEUNG THOTT. {t("allRightsReserved")}
          </div>

          <div className="flex space-x-6">
            <Link
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-[#468e83] dark:hover:text-[#e3e7d7] text-sm transition-colors duration-300"
            >
              {t("privacyPolicy")}
            </Link>
            <Link
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-[#468e83] dark:hover:text-[#e3e7d7] text-sm transition-colors duration-300"
            >
              {t("termsOfService")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

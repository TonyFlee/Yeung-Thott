"use client";

import Link from "next/link";
import { useLanguage } from "@/context/language-context"; // Adjust this path if necessary

export default function NavbarLogo() {
  const { t } = useLanguage(); // Now t is defined

  return (
    <Link
      href="/"
      prefetch
      onClick={(e) => {
        e.preventDefault();
        window.location.reload();
      }}
      className="text-4xl font-bold text-[#468e83] dark:text-[#e3e7d7] hover:text-[#e3e7d7] dark:hover:text-[#468e83] transition-colors"
    >
      {t("nameweb")}
    </Link>
  );
}

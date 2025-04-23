"use client";

import Link from "next/link";

export default function NavbarLogo() {
  return (
    <Link
      href="/"
      prefetch
      onClick={(e) => {
        e.preventDefault();
        window.location.reload();
      }}
      className="text-2xl font-bold text-blue-600 dark:text-blue-400 hover:text-[#468e83] dark:hover:text-[#e3e7d7] transition-colors"
    >
      YEUNG THOTT
    </Link>
  );
}

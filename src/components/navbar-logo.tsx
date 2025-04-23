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
      className="text-2xl font-bold text-[#468e83] dark:text-[#e3e7d7] hover:text-[#e3e7d7] dark:hover:text-[#468e83] transition-colors"
    >
      YEUNG THOTT
    </Link>
  );
}

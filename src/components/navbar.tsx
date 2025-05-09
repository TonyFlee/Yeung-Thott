import Link from "next/link";
import { createClient } from "../supabase/server";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import UserProfile from "./user-profile";
import NavbarClient from "./navbar-client";
import NavbarLogo from "./navbar-logo";

export default async function Navbar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  return (
    <nav className="w-full border-b border-gray-200 bg-white dark:bg-gray-900 py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <NavbarLogo />
        <NavbarClient isAdmin={!!user} />
      </div>
    </nav>
  );
}

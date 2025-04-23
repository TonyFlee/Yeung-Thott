"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "../../supabase/client";
import NavbarLogo from "./navbar-logo";
import NavbarClient from "./navbar-client";

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClientComponentClient();
      const { data } = await supabase.auth.getUser();
      setIsAdmin(!!data.user);
    };

    checkUser();
  }, []);

  return (
    <nav className="w-full border-b border-gray-200 bg-white dark:bg-gray-900 py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <NavbarLogo />
        <NavbarClient isAdmin={isAdmin} />
      </div>
    </nav>
  );
}

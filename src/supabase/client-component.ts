"use client";
import { createBrowserClient } from "@supabase/ssr";

// Factory for creating a client in client components
export const createClientComponentClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};
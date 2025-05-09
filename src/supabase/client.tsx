"use client";
import { createBrowserClient } from "@supabase/ssr";

// ✅ This exports `createClientComponentClient`
export const createClientComponentClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { TempoInit } from "@/components/tempo-init";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/context/language-context";
import MouseFollower from '@/components/mouseFollower'; // ✅ youeady imported

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "យើង ថត | YEUNG THOTT",
  description: "Preserving life’s most beautiful moments through the lens. Let’s turn your memories into timeless art.📸🍃",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Dangrek&family=Kantumruy+Pro:ital,wght@0,100..700;1,100..700&family=Nokora:wght@100;300;400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {/* ⬇️ ADD MouseFollower here */}
            <MouseFollower />
            
            {children}
            <TempoInit />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

"use client";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { Language } from "@/lib/translations";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-[#468e83]/10 transition-all duration-300"
        >
          <Globe className="h-5 w-5" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="animate-in fade-in-80 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
      >
        <DropdownMenuItem
          onClick={() => {
            localStorage.setItem("language", "en");
            window.location.reload();
          }}
          className="cursor-pointer transition-colors duration-200 hover:bg-[#468e83]/10"
        >
          English {language === "en" && "✓"}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            localStorage.setItem("language", "km");
            window.location.reload();
          }}
          className="cursor-pointer transition-colors duration-200 hover:bg-[#468e83]/10"
        >
          ភាសាខ្មែរ (Khmer) {language === "km" && "✓"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

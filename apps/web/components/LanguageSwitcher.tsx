"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, ChevronDown } from "lucide-react";

const LOCALES = [
  { code: "pt", label: "PT", name: "Português" },
  { code: "en", label: "EN", name: "English" },
  { code: "fr", label: "FR", name: "Français" },
  { code: "zh", label: "ZH", name: "中文" },
] as const;

interface LanguageSwitcherProps {
  currentLocale: string;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  // Build the path for the new locale
  const getLocalePath = (newLocale: string) => {
    // Pathname starts with /locale/...
    const segments = pathname.split("/");
    segments[1] = newLocale;
    return segments.join("/") || "/";
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = LOCALES.find((l) => l.code === currentLocale) || LOCALES[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm font-medium text-[#868e96] hover:text-[#212829] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="Switch language"
      >
        <Globe className="w-4 h-4" />
        <span>{current.label}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-36 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-[#e9ecef] dark:border-slate-700 py-1 z-50">
          {LOCALES.map((locale) => (
            <Link
              key={locale.code}
              href={getLocalePath(locale.code)}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between px-3 py-2 text-sm transition-colors ${
                locale.code === currentLocale
                  ? "font-semibold"
                  : "text-[#212829] dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700"
              }`}
              style={
                locale.code === currentLocale
                  ? { color: "rgb(var(--primary))" }
                  : undefined
              }
            >
              <span>{locale.name}</span>
              <span className="text-xs text-[#868e96]">{locale.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

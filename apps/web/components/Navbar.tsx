"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { FicheLogo } from "./FicheLogo";

const LOCALES = ["pt", "en", "fr", "zh"] as const;

interface NavbarProps {
  locale: string;
}

export function Navbar({ locale }: NavbarProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/services`, label: t("services") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-[#e9ecef] dark:border-slate-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center group" aria-label="FICHE — Página inicial">
            <FicheLogo variant="compact" width={110} textColor="currentColor" className="text-[#212829] dark:text-white transition-opacity group-hover:opacity-80" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-primary font-semibold"
                    : "text-[#212829] dark:text-slate-300 hover:text-primary"
                }`}
                style={
                  isActive(link.href)
                    ? { color: "rgb(var(--primary))" }
                    : undefined
                }
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher currentLocale={locale} />

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-md text-[#868e96] hover:text-[#212829] dark:hover:text-white transition-colors hover:bg-gray-100 dark:hover:bg-slate-800"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <Link
              href={`/${locale}/contact`}
              className="px-4 py-2 rounded-md text-white text-sm font-semibold transition-all"
              style={{ backgroundColor: "rgb(var(--primary))" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  "rgb(var(--primary-dark))";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  "rgb(var(--primary))";
              }}
            >
              {t("contactCta")}
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-[#868e96] hover:text-[#212829] dark:hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#e9ecef] dark:border-slate-700 py-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-[#f0faf4] font-semibold"
                      : "text-[#212829] dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800"
                  }`}
                  style={
                    isActive(link.href)
                      ? {
                          color: "rgb(var(--primary))",
                          backgroundColor: "rgb(var(--primary-light))",
                        }
                      : undefined
                  }
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 px-4 flex items-center gap-3">
              <LanguageSwitcher currentLocale={locale} />
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-md text-[#868e96] hover:text-[#212829] dark:hover:text-white transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <Link
                href={`/${locale}/contact`}
                onClick={() => setMobileOpen(false)}
                className="flex-1 text-center px-4 py-2 rounded-md text-white text-sm font-semibold"
                style={{ backgroundColor: "rgb(var(--primary))" }}
              >
                {t("contactCta")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

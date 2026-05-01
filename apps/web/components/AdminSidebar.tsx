"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  LayoutDashboard,
  Briefcase,
  Palette,
  ClipboardList,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface AdminSidebarProps {
  locale: string;
  userEmail?: string;
}

export function AdminSidebar({ locale, userEmail }: AdminSidebarProps) {
  const t = useTranslations("admin.sidebar");
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const navItems = [
    {
      href: `/${locale}/admin/dashboard`,
      label: t("dashboard"),
      icon: LayoutDashboard,
    },
    {
      href: `/${locale}/admin/services`,
      label: t("services"),
      icon: Briefcase,
    },
    {
      href: `/${locale}/admin/theme`,
      label: t("theme"),
      icon: Palette,
    },
    {
      href: `/${locale}/admin/audit`,
      label: t("audit"),
      icon: ClipboardList,
    },
  ];

  const handleLogout = async () => {
    setLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push(`/${locale}/admin/login`);
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-700">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-md flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: "rgb(var(--primary))" }}
          >
            F
          </div>
          <span className="text-lg font-bold text-white">FICHE</span>
        </Link>
        {userEmail && (
          <p className="text-xs text-slate-400 mt-2 truncate">{userEmail}</p>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors ${
                isActive
                  ? "text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-700"
              }`}
              style={
                isActive
                  ? { backgroundColor: "rgb(var(--primary))" }
                  : undefined
              }
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-700 transition-colors w-full disabled:opacity-50"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {loggingOut ? t("loggingOut") : t("logout")}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-slate-900 min-h-screen flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="fixed top-4 left-4 z-50 p-2 bg-slate-900 rounded-lg text-white shadow-lg"
          aria-label="Toggle sidebar"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Backdrop */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Mobile drawer */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex flex-col w-60 bg-slate-900 transform transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SidebarContent />
        </aside>
      </div>
    </>
  );
}

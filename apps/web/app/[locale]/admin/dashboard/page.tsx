import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  MessageSquare,
  MessageSquareDot,
  Briefcase,
  Quote,
  ArrowRight,
  Palette,
  ClipboardList,
} from "lucide-react";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function DashboardPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations("admin.dashboard");

  let stats = {
    totalMessages: 0,
    unreadMessages: 0,
    activeServices: 6,
    totalTestimonials: 3,
  };
  let recentMessages: Array<{
    id: string;
    name: string;
    email: string;
    subject: string;
    created_at: string;
    read: boolean;
  }> = [];

  try {
    const supabase = await createClient();

    const [totalMsg, unreadMsg, activeServices, totalTestimonials, messages] =
      await Promise.all([
        supabase
          .from("contact_messages")
          .select("id", { count: "exact", head: true }),
        supabase
          .from("contact_messages")
          .select("id", { count: "exact", head: true })
          .eq("read", false),
        supabase
          .from("services")
          .select("id", { count: "exact", head: true })
          .eq("active", true),
        supabase
          .from("testimonials")
          .select("id", { count: "exact", head: true })
          .eq("active", true),
        supabase
          .from("contact_messages")
          .select("id, name, email, subject, created_at, read")
          .order("created_at", { ascending: false })
          .limit(5),
      ]);

    stats = {
      totalMessages: totalMsg.count ?? 0,
      unreadMessages: unreadMsg.count ?? 0,
      activeServices: activeServices.count ?? 6,
      totalTestimonials: totalTestimonials.count ?? 3,
    };
    recentMessages = messages.data ?? [];
  } catch {
    // Use defaults
  }

  const statCards = [
    {
      label: t("totalMessages"),
      value: stats.totalMessages,
      icon: MessageSquare,
      color: "#f0f9ff",
      iconColor: "#0ea5e9",
    },
    {
      label: t("unreadMessages"),
      value: stats.unreadMessages,
      icon: MessageSquareDot,
      color: "#fff9f0",
      iconColor: "#f59e0b",
    },
    {
      label: t("activeServices"),
      value: stats.activeServices,
      icon: Briefcase,
      color: "rgb(var(--primary-light))",
      iconColor: "rgb(var(--primary))",
    },
    {
      label: t("totalTestimonials"),
      value: stats.totalTestimonials,
      icon: Quote,
      color: "#f9f0ff",
      iconColor: "#7c3aed",
    },
  ];

  const quickActions = [
    {
      href: `/${locale}/admin/services`,
      label: t("manageServices"),
      icon: Briefcase,
    },
    {
      href: `/${locale}/admin/theme`,
      label: t("manageTheme"),
      icon: Palette,
    },
    {
      href: `/${locale}/admin/audit`,
      label: t("viewAudit"),
      icon: ClipboardList,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#212829] dark:text-white mb-8">
        {t("title")}
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {statCards.map((card, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-800 rounded-xl border border-[#e9ecef] dark:border-slate-700 p-5 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-[#868e96] font-medium">{card.label}</p>
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: card.color }}
              >
                <card.icon
                  className="w-4 h-4"
                  style={{ color: card.iconColor }}
                />
              </div>
            </div>
            <p className="text-3xl font-bold text-[#212829] dark:text-white">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Messages */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-[#e9ecef] dark:border-slate-700 shadow-sm">
          <div className="px-6 py-4 border-b border-[#e9ecef] dark:border-slate-700 flex items-center justify-between">
            <h2 className="font-semibold text-[#212829] dark:text-white">
              {t("recentMessages")}
            </h2>
            <Link
              href={`/${locale}/admin/audit`}
              className="text-xs font-medium flex items-center gap-1"
              style={{ color: "rgb(var(--primary))" }}
            >
              {t("viewAll")} <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {recentMessages.length === 0 ? (
            <div className="px-6 py-12 text-center text-[#868e96] text-sm">
              {t("noMessages")}
            </div>
          ) : (
            <div className="divide-y divide-[#e9ecef] dark:divide-slate-700">
              {recentMessages.map((msg) => (
                <div key={msg.id} className="px-6 py-4 flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5"
                    style={{
                      backgroundColor: "rgb(var(--primary-light))",
                      color: "rgb(var(--primary))",
                    }}
                  >
                    {msg.name[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#212829] dark:text-white truncate">
                        {msg.name}
                      </span>
                      {!msg.read && (
                        <span
                          className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: "rgb(var(--primary))" }}
                        />
                      )}
                    </div>
                    <p className="text-xs text-[#868e96] truncate">
                      {msg.subject}
                    </p>
                  </div>
                  <span className="text-xs text-[#868e96] flex-shrink-0">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-[#e9ecef] dark:border-slate-700 shadow-sm">
          <div className="px-6 py-4 border-b border-[#e9ecef] dark:border-slate-700">
            <h2 className="font-semibold text-[#212829] dark:text-white">
              {t("quickActions")}
            </h2>
          </div>
          <div className="p-4 space-y-2">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors group"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgb(var(--primary-light))" }}
                >
                  <action.icon
                    className="w-4 h-4"
                    style={{ color: "rgb(var(--primary))" }}
                  />
                </div>
                <span className="text-sm font-medium text-[#212829] dark:text-white group-hover:text-primary transition-colors">
                  {action.label}
                </span>
                <ArrowRight className="w-4 h-4 text-[#868e96] ml-auto" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

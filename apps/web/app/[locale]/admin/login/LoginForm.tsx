"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";

interface LoginFormProps {
  locale: string;
  redirectTo?: string;
}

export function LoginForm({ locale, redirectTo }: LoginFormProps) {
  const t = useTranslations("admin.login");
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setStatus("error");
      return;
    }

    router.push(redirectTo || `/${locale}/admin/dashboard`);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === "error" && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {t("error")}
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[#212829] dark:text-white mb-1.5"
        >
          {t("email")}
        </label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#868e96]" />
          <input
            type="email"
            id="email"
            required
            value={form.email}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="admin@fiche.ao"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#dee2e6] dark:border-slate-600 text-sm bg-white dark:bg-slate-900 text-[#212829] dark:text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-[#212829] dark:text-white mb-1.5"
        >
          {t("password")}
        </label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#868e96]" />
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            required
            value={form.password}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
            placeholder="••••••••"
            className="w-full pl-10 pr-11 py-2.5 rounded-lg border border-[#dee2e6] dark:border-slate-600 text-sm bg-white dark:bg-slate-900 text-[#212829] dark:text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#868e96] hover:text-[#212829] dark:hover:text-white"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3 rounded-lg text-white font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        style={{ backgroundColor: "rgb(var(--primary))" }}
      >
        {status === "loading" ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            {t("submitting")}
          </>
        ) : (
          t("submit")
        )}
      </button>
    </form>
  );
}

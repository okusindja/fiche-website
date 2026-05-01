"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

interface ContactFormProps {
  locale: string;
}

export function ContactForm({ locale }: ContactFormProps) {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const supabase = createClient();
      const { error } = await supabase.from("contact_messages").insert([
        {
          name: form.name,
          email: form.email,
          phone: form.phone || null,
          subject: form.subject,
          message: form.message,
        },
      ]);

      if (error) throw error;

      setStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: "rgb(var(--primary-light))" }}
        >
          <CheckCircle
            className="w-8 h-8"
            style={{ color: "rgb(var(--primary))" }}
          />
        </div>
        <h3 className="text-lg font-bold text-[#212829] dark:text-white mb-2">
          {t("successTitle")}
        </h3>
        <p className="text-[#868e96] mb-6">{t("successDesc")}</p>
        <button
          onClick={() => setStatus("idle")}
          className="px-5 py-2.5 rounded-lg text-white text-sm font-semibold"
          style={{ backgroundColor: "rgb(var(--primary))" }}
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === "error" && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {t("errorDesc")}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-[#212829] dark:text-white mb-1.5"
          >
            {t("name")} *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Ex: João Silva"
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#dee2e6] dark:border-slate-600 text-sm bg-white dark:bg-slate-900 text-[#212829] dark:text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all"
            style={{ "--tw-ring-color": "rgb(var(--primary))" } as React.CSSProperties}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#212829] dark:text-white mb-1.5"
          >
            {t("email")} *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="email@exemplo.com"
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#dee2e6] dark:border-slate-600 text-sm bg-white dark:bg-slate-900 text-[#212829] dark:text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-[#212829] dark:text-white mb-1.5"
          >
            {t("phone")}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+244 923 000 000"
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#dee2e6] dark:border-slate-600 text-sm bg-white dark:bg-slate-900 text-[#212829] dark:text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-[#212829] dark:text-white mb-1.5"
          >
            {t("subject")} *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            value={form.subject}
            onChange={handleChange}
            placeholder="Assunto da mensagem"
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#dee2e6] dark:border-slate-600 text-sm bg-white dark:bg-slate-900 text-[#212829] dark:text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-[#212829] dark:text-white mb-1.5"
        >
          {t("message")} *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Escreva a sua mensagem aqui..."
          className="w-full px-3.5 py-2.5 rounded-lg border border-[#dee2e6] dark:border-slate-600 text-sm bg-white dark:bg-slate-900 text-[#212829] dark:text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-white font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ backgroundColor: "rgb(var(--primary))" }}
      >
        {status === "sending" ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            {t("sending")}
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            {t("send")}
          </>
        )}
      </button>
    </form>
  );
}

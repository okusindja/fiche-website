"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { Edit2, Trash2, ToggleLeft, ToggleRight, Save, X } from "lucide-react";

interface Service {
  id: string;
  slug: string;
  icon: string;
  icon_bg: string;
  title_pt: string;
  title_en: string;
  title_fr: string;
  title_zh: string;
  description_pt: string;
  description_en: string;
  description_fr: string;
  description_zh: string;
  sort_order: number;
  active: boolean;
}

interface ServicesManagerProps {
  initialServices: Service[];
  locale: string;
}

export function ServicesManager({
  initialServices,
  locale,
}: ServicesManagerProps) {
  const t = useTranslations("admin.services");
  const [services, setServices] = useState(initialServices);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Service>>({});
  const [saving, setSaving] = useState(false);

  const startEdit = (service: Service) => {
    setEditingId(service.id);
    setEditForm({ ...service });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async () => {
    if (!editingId || !editForm) return;
    setSaving(true);

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("services")
        .update({
          title_pt: editForm.title_pt,
          title_en: editForm.title_en,
          title_fr: editForm.title_fr,
          title_zh: editForm.title_zh,
          description_pt: editForm.description_pt,
          description_en: editForm.description_en,
          description_fr: editForm.description_fr,
          description_zh: editForm.description_zh,
          icon: editForm.icon,
          icon_bg: editForm.icon_bg,
        })
        .eq("id", editingId);

      if (!error) {
        setServices((prev) =>
          prev.map((s) =>
            s.id === editingId ? { ...s, ...editForm } as Service : s
          )
        );
        cancelEdit();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (service: Service) => {
    try {
      const supabase = createClient();
      await supabase
        .from("services")
        .update({ active: !service.active })
        .eq("id", service.id);
      setServices((prev) =>
        prev.map((s) =>
          s.id === service.id ? { ...s, active: !s.active } : s
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const getTitle = (s: Service) => {
    if (locale === "en") return s.title_en;
    if (locale === "fr") return s.title_fr;
    if (locale === "zh") return s.title_zh;
    return s.title_pt;
  };

  return (
    <div className="space-y-4">
      {services.map((service) => (
        <div
          key={service.id}
          className="bg-white dark:bg-slate-800 rounded-xl border border-[#e9ecef] dark:border-slate-700 p-5 shadow-sm"
        >
          {editingId === service.id ? (
            // Edit Mode
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#868e96] mb-1">
                    Ícone
                  </label>
                  <input
                    type="text"
                    value={editForm.icon || ""}
                    onChange={(e) =>
                      setEditForm((prev) => ({ ...prev, icon: e.target.value }))
                    }
                    className="w-full px-3 py-2 rounded-lg border border-[#dee2e6] dark:border-slate-600 text-sm bg-white dark:bg-slate-900 text-[#212829] dark:text-white focus:outline-none focus:ring-2"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#868e96] mb-1">
                    Cor de Fundo
                  </label>
                  <input
                    type="color"
                    value={editForm.icon_bg || "#f0faf4"}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        icon_bg: e.target.value,
                      }))
                    }
                    className="w-full h-9 px-1 rounded-lg border border-[#dee2e6] dark:border-slate-600 bg-white dark:bg-slate-900"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(
                  [
                    { key: "title_pt", label: "Título (PT)" },
                    { key: "title_en", label: "Title (EN)" },
                    { key: "title_fr", label: "Titre (FR)" },
                    { key: "title_zh", label: "标题 (ZH)" },
                  ] as { key: keyof Service; label: string }[]
                ).map(({ key, label }) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-[#868e96] mb-1">
                      {label}
                    </label>
                    <input
                      type="text"
                      value={(editForm[key] as string) || ""}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 rounded-lg border border-[#dee2e6] dark:border-slate-600 text-sm bg-white dark:bg-slate-900 text-[#212829] dark:text-white focus:outline-none focus:ring-2"
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={saveEdit}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold disabled:opacity-60"
                  style={{ backgroundColor: "rgb(var(--primary))" }}
                >
                  <Save className="w-4 h-4" />
                  {saving ? "A guardar..." : t("save")}
                </button>
                <button
                  onClick={cancelEdit}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#868e96] text-sm font-medium border border-[#dee2e6] hover:bg-gray-50 dark:hover:bg-slate-700"
                >
                  <X className="w-4 h-4" />
                  {t("cancel")}
                </button>
              </div>
            </div>
          ) : (
            // View Mode
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ backgroundColor: service.icon_bg }}
              >
                {service.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[#212829] dark:text-white">
                  {getTitle(service)}
                </div>
                <div className="text-xs text-[#868e96] mt-0.5">
                  {service.slug}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    service.active
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {service.active ? t("active") : t("inactive")}
                </span>
                <button
                  onClick={() => toggleActive(service)}
                  className="text-[#868e96] hover:text-[#212829] dark:hover:text-white transition-colors"
                  title={service.active ? "Desactivar" : "Activar"}
                >
                  {service.active ? (
                    <ToggleRight
                      className="w-5 h-5"
                      style={{ color: "rgb(var(--primary))" }}
                    />
                  ) : (
                    <ToggleLeft className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={() => startEdit(service)}
                  className="text-[#868e96] hover:text-[#212829] dark:hover:text-white transition-colors p-1"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

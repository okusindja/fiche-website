"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { COLOR_PRESETS, hexToRgb, darkenHex } from "@/lib/theme";
import { getSeasonalTheme } from "@/lib/seasonal";
import { Check, Sun, Moon, Monitor, Leaf, Save } from "lucide-react";

interface ThemeEditorProps {
  initialSettings: {
    primary_color: string;
    primary_name: string;
    theme_mode: "light" | "dark" | "system";
    seasonal_override: boolean;
  };
  locale: string;
}

export function ThemeEditor({ initialSettings, locale }: ThemeEditorProps) {
  const t = useTranslations("admin.theme");
  const [settings, setSettings] = useState(initialSettings);
  const [customColor, setCustomColor] = useState(initialSettings.primary_color);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");

  const seasonal = getSeasonalTheme();

  const handlePresetSelect = (preset: (typeof COLOR_PRESETS)[0]) => {
    setSettings((prev) => ({
      ...prev,
      primary_color: preset.hex,
      primary_name: preset.name,
    }));
    setCustomColor(preset.hex);
  };

  const handleCustomColorChange = (hex: string) => {
    setCustomColor(hex);
    setSettings((prev) => ({
      ...prev,
      primary_color: hex,
      primary_name: "custom",
    }));
  };

  const handleSave = async () => {
    setStatus("saving");
    try {
      const supabase = createClient();
      const { error } = await supabase.from("site_settings").upsert({
        primary_color: settings.primary_color,
        primary_name: settings.primary_name,
        theme_mode: settings.theme_mode,
        seasonal_override: settings.seasonal_override,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;

      // Inject CSS vars live
      const rgb = hexToRgb(settings.primary_color);
      const darkRgb = hexToRgb(darkenHex(settings.primary_color, 0.3));
      document.documentElement.style.setProperty("--primary", rgb);
      document.documentElement.style.setProperty("--primary-dark", darkRgb);

      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const themeModes = [
    { value: "light" as const, label: t("light"), icon: Sun },
    { value: "dark" as const, label: t("dark"), icon: Moon },
    { value: "system" as const, label: t("system"), icon: Monitor },
  ];

  return (
    <div className="max-w-2xl space-y-8">
      {/* Color Presets */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-[#e9ecef] dark:border-slate-700 p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-[#212829] dark:text-white mb-4">
          {t("colorPresets")}
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {COLOR_PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => handlePresetSelect(preset)}
              className="flex flex-col items-center gap-2 group"
            >
              <div
                className="w-12 h-12 rounded-xl shadow-sm border-2 flex items-center justify-center transition-transform group-hover:scale-105"
                style={{
                  backgroundColor: preset.hex,
                  borderColor:
                    settings.primary_color === preset.hex
                      ? preset.hex
                      : "transparent",
                  boxShadow:
                    settings.primary_color === preset.hex
                      ? `0 0 0 3px ${preset.hex}40`
                      : undefined,
                }}
              >
                {settings.primary_color === preset.hex && (
                  <Check className="w-5 h-5 text-white" />
                )}
              </div>
              <span className="text-xs text-[#868e96] text-center leading-tight">
                {preset.label.split(" ")[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Color */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-[#e9ecef] dark:border-slate-700 p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-[#212829] dark:text-white mb-4">
          {t("customColor")}
        </h2>
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={customColor}
            onChange={(e) => handleCustomColorChange(e.target.value)}
            className="w-14 h-12 rounded-lg border border-[#dee2e6] dark:border-slate-600 p-1 cursor-pointer"
          />
          <input
            type="text"
            value={customColor}
            onChange={(e) => {
              const val = e.target.value;
              if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                handleCustomColorChange(val);
              }
            }}
            placeholder={t("customColorPlaceholder")}
            className="flex-1 px-3.5 py-2.5 rounded-lg border border-[#dee2e6] dark:border-slate-600 text-sm bg-white dark:bg-slate-900 text-[#212829] dark:text-white focus:outline-none focus:ring-2 font-mono"
          />
          <div
            className="w-10 h-10 rounded-lg shadow-sm flex-shrink-0"
            style={{ backgroundColor: settings.primary_color }}
          />
        </div>
      </div>

      {/* Theme Mode */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-[#e9ecef] dark:border-slate-700 p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-[#212829] dark:text-white mb-4">
          {t("themeMode")}
        </h2>
        <div className="flex gap-3">
          {themeModes.map((mode) => (
            <button
              key={mode.value}
              onClick={() =>
                setSettings((prev) => ({ ...prev, theme_mode: mode.value }))
              }
              className={`flex-1 flex flex-col items-center gap-2 py-3 px-4 rounded-lg border-2 transition-all text-sm font-medium ${
                settings.theme_mode === mode.value
                  ? "text-white"
                  : "border-[#dee2e6] dark:border-slate-600 text-[#868e96] hover:border-gray-300"
              }`}
              style={
                settings.theme_mode === mode.value
                  ? {
                      backgroundColor: "rgb(var(--primary))",
                      borderColor: "rgb(var(--primary))",
                    }
                  : undefined
              }
            >
              <mode.icon className="w-5 h-5" />
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Seasonal Themes */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-[#e9ecef] dark:border-slate-700 p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Leaf
                className="w-4 h-4"
                style={{ color: "rgb(var(--primary))" }}
              />
              <h2 className="text-sm font-semibold text-[#212829] dark:text-white">
                {t("seasonalThemes")}
              </h2>
            </div>
            <p className="text-xs text-[#868e96]">{t("seasonalDesc")}</p>
            {seasonal && (
              <div className="mt-3 flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: seasonal.hex }}
                />
                <span className="text-xs text-[#868e96]">
                  Tema activo: {seasonal.label} ({seasonal.hex})
                </span>
              </div>
            )}
          </div>
          <button
            onClick={() =>
              setSettings((prev) => ({
                ...prev,
                seasonal_override: !prev.seasonal_override,
              }))
            }
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ml-4 flex-shrink-0 ${
              settings.seasonal_override ? "bg-green-500" : "bg-gray-300"
            }`}
            style={
              settings.seasonal_override
                ? { backgroundColor: "rgb(var(--primary))" }
                : undefined
            }
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                settings.seasonal_override ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-[#e9ecef] dark:border-slate-700 p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-[#212829] dark:text-white mb-4">
          {t("preview")}
        </h2>
        <div className="space-y-3">
          <button
            className="px-5 py-2.5 rounded-lg text-white text-sm font-semibold transition-all"
            style={{ backgroundColor: settings.primary_color }}
          >
            Botão Principal
          </button>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white"
              style={{ backgroundColor: settings.primary_color }}
            >
              F
            </div>
            <span
              className="font-semibold"
              style={{ color: settings.primary_color }}
            >
              FICHE — Texto Primário
            </span>
          </div>
          <div
            className="p-3 rounded-lg text-sm"
            style={{
              backgroundColor: hexToRgb(settings.primary_color)
                .split(" ")
                .map((v) => Math.round(parseInt(v) * 0.15 + 240))
                .join(" "),
              color: settings.primary_color,
              borderLeft: `3px solid ${settings.primary_color}`,
            }}
          >
            Fundo claro com cor primária
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={status === "saving"}
          className="flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ backgroundColor: "rgb(var(--primary))" }}
        >
          <Save className="w-4 h-4" />
          {status === "saving" ? t("saving") : t("save")}
        </button>

        {status === "success" && (
          <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
            <Check className="w-4 h-4" />
            {t("saveSuccess")}
          </div>
        )}
        {status === "error" && (
          <div className="text-red-600 text-sm font-medium">{t("saveError")}</div>
        )}
      </div>
    </div>
  );
}

import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { ThemeEditor } from "./ThemeEditor";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function AdminThemePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations("admin.theme");

  let settings = {
    primary_color: "#10913b",
    primary_name: "green",
    theme_mode: "system" as "light" | "dark" | "system",
    seasonal_override: true,
  };

  try {
    const supabase = await createClient();
    const { data } = await supabase.from("site_settings").select("*").single();
    if (data) settings = data;
  } catch {
    // Use defaults
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#212829] dark:text-white mb-8">
        {t("title")}
      </h1>
      <ThemeEditor initialSettings={settings} locale={locale} />
    </div>
  );
}

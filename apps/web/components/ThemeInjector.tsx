import { createClient } from "@/lib/supabase/server";
import { getSeasonalTheme } from "@/lib/seasonal";
import { hexToRgb, darkenHex, lightenHex } from "@/lib/theme";

async function getSiteSettings() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("site_settings")
      .select("*")
      .single();
    return data;
  } catch {
    return null;
  }
}

export async function ThemeInjector() {
  const settings = await getSiteSettings();

  let primaryHex = settings?.primary_color || "#10913b";
  const seasonalOverride = settings?.seasonal_override ?? true;

  // Apply seasonal theme if enabled
  if (seasonalOverride) {
    const seasonal = getSeasonalTheme();
    if (seasonal) {
      primaryHex = seasonal.hex;
    }
  }

  const primaryRgb = hexToRgb(primaryHex);
  const darkHex = darkenHex(primaryHex, 0.3);
  const darkRgb = hexToRgb(darkHex);

  // Light bg — very faint tint of primary
  const lightBgHex = lightenHex(primaryHex, 0.85);
  const lightBgRgb = hexToRgb(lightBgHex);

  // Muted — slightly lighter than primary
  const mutedHex = lightenHex(primaryHex, 0.5);
  const mutedRgb = hexToRgb(mutedHex);

  const css = `
    :root {
      --primary: ${primaryRgb};
      --primary-dark: ${darkRgb};
      --primary-light: ${lightBgRgb};
      --primary-muted: ${mutedRgb};
    }
  `;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

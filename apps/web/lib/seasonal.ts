export type SeasonalTheme = {
  name: string;
  hex: string;
  rgb: string;
  darkHex: string;
  darkRgb: string;
  label: string;
};

export function getSeasonalTheme(): SeasonalTheme | null {
  const now = new Date();
  const month = now.getMonth() + 1; // 1-12
  const day = now.getDate();

  // Christmas (Dec 15 - Jan 6)
  if ((month === 12 && day >= 15) || (month === 1 && day <= 6)) {
    return {
      name: "christmas",
      hex: "#dc2626",
      rgb: "220 38 38",
      darkHex: "#b91c1c",
      darkRgb: "185 28 28",
      label: "Natal",
    };
  }

  // Angola Independence Day (Nov 11 ±3 days)
  if (month === 11 && day >= 8 && day <= 14) {
    return {
      name: "independence",
      hex: "#cc0000",
      rgb: "204 0 0",
      darkHex: "#990000",
      darkRgb: "153 0 0",
      label: "Independência de Angola",
    };
  }

  // Carnival / Angola Liberation Day (Feb)
  if (month === 2) {
    return {
      name: "carnival",
      hex: "#7c3aed",
      rgb: "124 58 237",
      darkHex: "#6d28d9",
      darkRgb: "109 40 217",
      label: "Carnaval",
    };
  }

  // Easter (late March / April)
  if ((month === 3 && day >= 20) || (month === 4 && day <= 20)) {
    return {
      name: "easter",
      hex: "#7c3aed",
      rgb: "124 58 237",
      darkHex: "#6d28d9",
      darkRgb: "109 40 217",
      label: "Páscoa",
    };
  }

  return null;
}

export type ColorPreset = {
  name: string;
  label: string;
  hex: string;
  rgb: string;
  darkHex: string;
  darkRgb: string;
};

export const COLOR_PRESETS: ColorPreset[] = [
  {
    name: "green",
    label: "Verde (Padrão)",
    hex: "#10913b",
    rgb: "16 145 59",
    darkHex: "#0a6228",
    darkRgb: "10 98 40",
  },
  {
    name: "black",
    label: "Preto",
    hex: "#212829",
    rgb: "33 40 41",
    darkHex: "#151c1d",
    darkRgb: "21 28 29",
  },
  {
    name: "sky",
    label: "Azul Céu",
    hex: "#0ea5e9",
    rgb: "14 165 233",
    darkHex: "#0284c7",
    darkRgb: "2 132 199",
  },
  {
    name: "navy",
    label: "Azul Marinho",
    hex: "#1e3a5f",
    rgb: "30 58 95",
    darkHex: "#162d4a",
    darkRgb: "22 45 74",
  },
  {
    name: "purple",
    label: "Roxo",
    hex: "#7c3aed",
    rgb: "124 58 237",
    darkHex: "#6d28d9",
    darkRgb: "109 40 217",
  },
  {
    name: "red",
    label: "Vermelho",
    hex: "#dc2626",
    rgb: "220 38 38",
    darkHex: "#b91c1c",
    darkRgb: "185 28 28",
  },
];

export function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "16 145 59";
  return `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`;
}

export function darkenHex(hex: string, amount = 0.3): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "#0a6228";
  const r = Math.max(0, Math.round(parseInt(result[1], 16) * (1 - amount)));
  const g = Math.max(0, Math.round(parseInt(result[2], 16) * (1 - amount)));
  const b = Math.max(0, Math.round(parseInt(result[3], 16) * (1 - amount)));
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

export function lightenHex(hex: string, amount = 0.85): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "#f0faf4";
  const r = Math.min(255, Math.round(parseInt(result[1], 16) + (255 - parseInt(result[1], 16)) * amount));
  const g = Math.min(255, Math.round(parseInt(result[2], 16) + (255 - parseInt(result[2], 16)) * amount));
  const b = Math.min(255, Math.round(parseInt(result[3], 16) + (255 - parseInt(result[3], 16)) * amount));
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

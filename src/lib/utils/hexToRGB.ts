import { type RGBObject } from "./toRGBColor";

/**
 * Converts hex color to RGB color
 * @param hex
 * @param format
 */
export default function hexToRGB(hex: string, format: "string"): string;
export default function hexToRGB(hex: string, format: "object"): RGBObject;
export default function hexToRGB(hex: string, format: "string" | "object") {
  hex = hex.replace(/^#/, "");

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return format === "object" ? { r, g, b } : `rgb(${r}, ${g}, ${b})`;
}

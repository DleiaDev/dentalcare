import toRGBColor from "./toRGBColor";

/**
 * Returns color luminance as a number
 * @param color rgb(231, 43, 76) format
 */
export default function getColorLuminance(color: string): number {
  const rgbColor = toRGBColor(color, "object");

  if (rgbColor === false) throw new Error("Invalid color");

  const { r, g, b } = rgbColor;
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

import getColorFormat, { rgbRegex } from "./getColorFormat";
import hexToRGB from "./hexToRGB";

export type RGBObject = {
  r: number;
  g: number;
  b: number;
};

/**
 * Returns RGB color from string
 * @param color
 * @param returnFormat
 */
export default function toRGBColor(
  color: string,
  returnFormat: "string",
): string | false;

export default function toRGBColor(
  color: string,
  returnFormat: "object",
): RGBObject | false;

export default function toRGBColor(
  color: string,
  returnFormat: "string" | "object",
) {
  const colorFormat = getColorFormat(color);

  if (colorFormat === false) return false;

  // Hex -> RGB
  if (colorFormat === "hex" && returnFormat === "string")
    return hexToRGB(color, returnFormat);
  if (colorFormat === "hex" && returnFormat === "object")
    return hexToRGB(color, returnFormat);

  if (colorFormat === "rgb" && returnFormat === "string") return color;

  // RGB (string) -> RGB (object)
  if (colorFormat === "rgb" && returnFormat === "object") {
    const matches = color.match(rgbRegex);
    if (!matches || matches.length !== 4) return false;
    return {
      r: Number(matches[1]),
      g: Number(matches[2]),
      b: Number(matches[3]),
    };
  }

  return false;
}

export const rgbRegex = /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/;
export const hexRegex = /^#[A-F0-9]{6}$/i;

/**
 * Checks if color is in valid format.
 * Currently, only RGB and hex are supported
 * @param color
 */
export default function getColorFormat(color: string) {
  const isValidHex = color.match(hexRegex) !== null;
  if (isValidHex) return "hex";
  const isValidRGB = color.match(rgbRegex) !== null;
  if (isValidRGB) return "rgb";
  return false;
}

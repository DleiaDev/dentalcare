import randomColor from "randomcolor";

/**
 * Returns color in Hex format
 */
export default function getRandomColor() {
  return randomColor({ format: "hex", luminosity: "dark" });
}

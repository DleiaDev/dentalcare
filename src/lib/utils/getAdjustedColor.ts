interface RGB {
  r: number;
  g: number;
  b: number;
}

// Parse RGB string to RGB object
function parseRGB(rgbStr: string): RGB {
  // Extract numbers from format "rgb(r, g, b)"
  const matches = rgbStr.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

  if (!matches) {
    throw new Error("Invalid RGB format. Must be in format rgb(r, g, b)");
  }

  return {
    r: parseInt(matches[1], 10),
    g: parseInt(matches[2], 10),
    b: parseInt(matches[3], 10),
  };
}

// Convert RGB object back to RGB string
function rgbToString({ r, g, b }: RGB): string {
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

// Calculate relative luminance using WCAG formula
function getLuminance({ r, g, b }: RGB): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Adjust color lightness
function adjustColor(rgb: RGB, amount: number): RGB {
  return {
    r: Math.min(255, Math.max(0, rgb.r + amount)),
    g: Math.min(255, Math.max(0, rgb.g + amount)),
    b: Math.min(255, Math.max(0, rgb.b + amount)),
  };
}

// Main function to get adjusted color
function getAdjustedColor(color: string) {
  const rgb = parseRGB(color);
  const luminance = getLuminance(rgb);

  // Constants
  const LUMINANCE_THRESHOLD = 0.6;
  const ADJUSTMENT_AMOUNT = 60;

  if (luminance > LUMINANCE_THRESHOLD) {
    // Color is too bright, darken it
    return {
      type: "dark",
      color: rgbToString(adjustColor(rgb, -ADJUSTMENT_AMOUNT)),
    };
  } else {
    // Color is too dark, lighten it
    return {
      type: "light",
      color: rgbToString(adjustColor(rgb, ADJUSTMENT_AMOUNT)),
    };
  }
}

export type { RGB };

export { getAdjustedColor, parseRGB, rgbToString, getLuminance };

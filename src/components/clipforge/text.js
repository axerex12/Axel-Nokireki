// Keep a number on the same line as its unit ("150 s", "18 dB", "48 hours").
export const nb = (t) => t.replace(/(\d) (?=(s|dB|h|hours|second)\b)/g, "$1 ");

export const pad = (n) => String(n).padStart(2, "0");

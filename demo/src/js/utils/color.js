import ColorUtil from "../../../../src/utils/color"

export function luminance(color) {
  const rgb = ColorUtil.parseHex(color);
  return Math.floor(
    0.298912 * rgb.r +
    0.586611 * rgb.g +
    0.114478 * rgb.b
  );
}

export function getTextColor(backgroundColor) {
  return luminance(backgroundColor) < 120 ? "#fff" : "#000";
}

export function getRandomColor() {
  return `#${Math.random().toString(16).slice(-6)}`;
}

/**
 * Determines the appropriate text color (black or white) based on the YIQ brightness
 * of a given RGB color using the YIQ color space formula.
 *
 * @param r - Red component (0-255)
 * @param g - Green component (0-255)
 * @param b - Blue component (0-255)
 * @returns 'black' for dark backgrounds, 'white' for light backgrounds
 */
export function getContrastColor(
  r: number,
  g: number,
  b: number
): 'black' | 'white' {
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? 'black' : 'white';
}

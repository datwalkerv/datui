/** datui spacing scale, in px. */
export const SPACING = {
  "3xs": 2,
  "2xs": 4,
  xs: 6,
  s: 8,
  m: 12,
  l: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
} as const;

export type SpacingSize = keyof typeof SPACING;

/** Resolve a token, number (px) or raw CSS length to a CSS value. */
export function spacingValue(value: SpacingSize | number | string | undefined): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value === "number") return `${value}px`;
  return value in SPACING ? `${SPACING[value as SpacingSize]}px` : value;
}

/** `gap` shorthand from a single value or a `[row, column]` tuple. */
export function gapValue(
  gap: SpacingSize | number | string | [SpacingSize | number, SpacingSize | number] | undefined,
): string | undefined {
  if (gap === undefined) return undefined;
  if (Array.isArray(gap)) return `${spacingValue(gap[0])} ${spacingValue(gap[1])}`;
  return spacingValue(gap);
}

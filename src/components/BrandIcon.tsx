import type { Integration } from "@/lib/integrations";

// Relative luminance check so near-black brand marks stay visible on dark tiles.
function isDark(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.25;
}

export function BrandIcon({ icon, size = 32, label }: { icon: Integration["icon"]; size?: number; label: string }) {
  const color = isDark(icon.hex) ? "#FFFFFF" : `#${icon.hex}`;
  if ("monogram" in icon) {
    return (
      <span
        role="img"
        aria-label={label}
        style={{ width: size, height: size, background: `#${icon.hex}`, fontSize: size * 0.42 }}
        className="grid place-items-center rounded-lg font-bold text-white"
      >
        {icon.monogram}
      </span>
    );
  }
  return (
    <svg role="img" aria-label={label} viewBox="0 0 24 24" width={size} height={size} fill={color}>
      <path d={icon.path} />
    </svg>
  );
}

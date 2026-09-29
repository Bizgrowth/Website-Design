# Obsidian Flare — design system (from Google Stitch)

Source: Daniel's Google Drive folder (DESIGN.md, code.html, screen.png exported from Stitch). This is the summary the site implements.

## Feel
Dark glassmorphism with atmospheric light: a near-black canvas crossed by soft amber and cyan light streaks, frosted-glass panels, and luminous hairline borders. Authoritative, modern, uncluttered.

## Color
| Role | Value | Token / helper |
|---|---|---|
| Canvas | `#0b0c10` (deepest `#030407`) | `--bg` |
| Glass panel | `rgba(18,19,24,0.72)` + 20px blur | `--surface`, `.glass` |
| Hairline border | `rgba(255,255,255,0.09)` | `--border` |
| Primary text | `#f3f4f6` | `--ink` |
| Secondary text | `#9ba3af` | `--muted` |
| Ghost labels | `#6b7280` | `--faint` |
| Electric cyan (system activity, links) | `#0091ff` / `#00d2ff` | `--accent`, `--hero-accent` |
| Solar amber (primary actions, attention) | `#ff6b00` | `--flare` |

## Type
- Plus Jakarta Sans for everything; JetBrains Mono for badges, data, and code.
- Headlines 600–800 weight with tight tracking (−0.02em to −0.03em).
- Section badges: uppercase mono, 0.08–0.12em letter-spacing, in a cyan hairline pill with a glowing dot (`Eyebrow` component).

## Components
- **Primary button:** amber gradient `#ff7a1a → #e05300`, white text, warm glow on hover (`.btn-flare`).
- **Secondary button:** translucent glass, white/15 border.
- **Cards:** 16–24px radius, glass fill, blur, subtle border; cyan glow on hover.
- **Featured card / CTA:** dual-tone flare border, amber → transparent → cyan (`.flare-edge`).
- **Header:** floating glass bar, rounded-2xl, orb logo mark (`.orb-glow`).
- **Status dots:** 6px; cyan = processing, amber = attention, green = healthy.

## Layout
- Max content width ~1152–1280px, generous vertical spacing (up to 6rem between sections).
- Fixed atmospheric background on every page (`.atmosphere` in the root layout).

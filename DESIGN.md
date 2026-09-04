# Karthick Narayanen Murugan — Portfolio Design System Specification (`DESIGN.md`)
> Standardized under the VoltAgent/awesome-design-md & Stitch 9-Section Design Protocol.
> Theme: Cyber-Emerald / Linear Stealth Dark

---

## 1. Visual Theme & Atmosphere
- **Aesthetic Direction**: High-Precision Linear Stealth Dark / Cyber-Emerald Engineering Cockpit.
- **Mood & Tone**: Engineered, authoritative, data-driven, elegant, high contrast.
- **Density & Scale**: Balanced high-density technical cards with generous section rhythm (`padding: 90px 0`).
- **Signature Visual Accents**:
  - Radial cursor spotlight tracking mouse movement with emerald tint (`rgba(16, 185, 129, 0.06)`).
  - Subtle micro-dot matrix pattern across canvas.
  - 1px crisp translucent borders with top inset specular highlights (`inset 0 1px 0 rgba(255, 255, 255, 0.09)`).
  - Cyber-Emerald glowing badges, animated pill highlights, and interactive terminals.

---

## 2. Color Palette & Roles
Semantic tokens mapped to exact CSS custom properties:

### Background Layers
- `--bg-950` (`#040608`): Deepest obsidian viewport canvas.
- `--bg-900` (`#07090e`): Primary page body background.
- `--bg-850` (`#0b0e15`): Section contrast alternating background.
- `--bg-card` (`#0c1018`): Default card & container surface.
- `--bg-card-hover` (`#111722`): Interactive elevated card hover state.
- `--bg-glass` (`rgba(12, 16, 24, 0.82)`): Frosted backdrop blur for navigation.

### Brand & Accent Tokens (Cyber-Emerald)
- `--accent` (`#10b981`): Cyber-Emerald primary action & highlight token.
- `--accent-hover` (`#34d399`): Vivid mint/emerald hover state.
- `--accent-dim` (`#059669`): Muted deep emerald for borders and secondary accents.
- `--accent-glow` (`rgba(16, 185, 129, 0.22)`): Atmospheric glow around focused elements.
- `--accent-glow-sm` (`rgba(16, 185, 129, 0.09)`): Subtle ambient glow.
- `--accent-bg` (`rgba(16, 185, 129, 0.08)`): Translucent pill and badge background.

### Typography & Foreground
- `--text-100` (`#f8fafc`): 100% white foreground (Headings, active buttons, key numbers).
- `--text-200` (`#cbd5e1`): 85% high-contrast body text.
- `--text-300` (`#94a3b8`): 60% muted secondary text, descriptions, and labels.
- `--text-400` (`#64748b`): 40% meta captions, timestamps, and inactive icons.

### Borders & Dividers
- `--border` (`rgba(255, 255, 255, 0.08)`): Default subtle perimeter border.
- `--border-highlight` (`rgba(255, 255, 255, 0.16)`): Focused/hover card border.
- `--border-accent` (`rgba(16, 185, 129, 0.45)`): Active primary state border.

---

## 3. Typography Rules

### Font Families
- **Primary Display & Body**: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Monospace & Data**: `'JetBrains Mono', 'IBM Plex Mono', monospace` (Applied to KPI numbers, terminal prompts, simulation metrics, dates, badges).

### Type Hierarchy & Scales
| Level | Font Size | Line Height | Letter Spacing | Font Weight | Target Element |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | `clamp(2.5rem, 5vw, 4rem)` | `1.1` | `-0.03em` | 800 (Bold) | Hero name `h1` |
| **Section Header** | `clamp(1.75rem, 3.5vw, 2.5rem)` | `1.2` | `-0.02em` | 700 (Bold) | `.section-title` |
| **Card Header** | `1.25rem - 1.5rem` | `1.3` | `-0.01em` | 600 (Semibold)| Project / Exp titles |
| **Body Copy** | `0.95rem - 1.05rem` | `1.65` | Normal | 400 (Regular) | Paragraphs, summaries |
| **Monospace / Pill** | `0.75rem - 0.85rem` | `1.4` | `+0.05em` | 500 (Medium) | Badges, terminal text |

---

## 4. Component Stylings

### Interactive Bento Cards (`.bento-card`, `.project-card`, `.skill-card`)
- **Background**: `var(--bg-card)`
- **Border**: `1px solid var(--border)`
- **Radius**: `var(--radius-md)` (12px) or `var(--radius-lg)` (20px)
- **Shadow**: `inset 0 1px 0 rgba(255,255,255,0.09), 0 4px 20px rgba(0,0,0,0.3)`
- **Hover State**: `transform: translateY(-3px)`, `border-color: var(--border-highlight)`, `box-shadow: 0 12px 30px rgba(0,0,0,0.5), 0 0 25px var(--accent-glow-sm)`.

### Buttons & Action Links
- **Primary CTA (`.btn-primary`)**:
  - Background: `var(--accent)` (`#10b981`)
  - Color: `#040608` (Solid high-contrast black)
  - Weight: 600
  - Hover: `background: var(--accent-hover)`, `box-shadow: 0 0 20px var(--accent-glow)`
- **Secondary CTA (`.btn-secondary`, `.btn-ghost`)**:
  - Background: `rgba(255, 255, 255, 0.05)`
  - Border: `1px solid var(--border)`
  - Color: `var(--text-100)`
  - Hover: `background: rgba(255, 255, 255, 0.1)`, `border-color: var(--border-highlight)`

---

## 5. Layout Principles & Spacing
- **Container Max-Width**: `1200px` (with `24px` horizontal gutter padding).
- **Vertical Spacing Rhythm**: `clamp(60px, 8vw, 100px)` between major sections.
- **Grid Layouts**:
  - Bento Grids: CSS Grid with `repeat(auto-fit, minmax(320px, 1fr))` and `gap: 24px`.
  - Filter Pills: Flex wrap with `gap: 8px`.

---

## 6. Depth & Elevation
- **Layer 0 (Canvas)**: `var(--bg-900)` with spotlight gradient.
- **Layer 1 (Card Surfaces)**: `var(--bg-card)` with `1px solid var(--border)`.
- **Layer 2 (Hover Surfaces & Dropdowns)**: `var(--bg-card-hover)` + `box-shadow: 0 16px 36px rgba(0,0,0,0.5)`.
- **Layer 3 (Fixed Nav & Modals)**: `var(--bg-glass)` with `backdrop-filter: blur(16px)` and bottom border.

---

## 7. Do's and Don'ts (Guardrails)
- **Do**: Strictly utilize `#10b981` / `#34d399` for interactive signals.
- **Do**: Retain `JetBrains Mono` for numeric stats, data metrics, code snippets, and timestamps.
- **Don't**: Mix conflicting neon colors or harsh unpadded borders.

---

## 8. Agent Prompt Directives
> *"All styling changes must follow the Cyber-Emerald / Linear Stealth Dark tokens defined in `DESIGN.md` with base #07090e and accent #10b981."*

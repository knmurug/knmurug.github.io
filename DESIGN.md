# Karthick Narayanen Murugan — Portfolio Design System Specification (`DESIGN.md`)
> Standardized under the VoltAgent/awesome-design-md & Stitch 9-Section Design Protocol.

---

## 1. Visual Theme & Atmosphere
- **Aesthetic Direction**: High-Precision Dark Engineering Cockpit / Clean Modern Technical Portfolio.
- **Mood & Tone**: Engineered, authoritative, data-driven, elegant, uncluttered.
- **Density & Scale**: Balanced high-density technical cards with generous section margins (`padding: 90px 0`).
- **Signature Visual Accents**:
  - Radial cursor spotlight (`#spotlight-layer`) tracking mouse movement (`rgba(0, 229, 208, 0.05)`).
  - Subtle micro-dot matrix pattern across canvas.
  - 1px crisp translucent borders with subtle top inset specular highlights (`inset 0 1px 0 rgba(255, 255, 255, 0.08)`).
  - Electric Teal glowing badges and interactive terminals.

---

## 2. Color Palette & Roles
Semantic tokens mapped to exact CSS custom properties:

### Background Layers
- `--bg-950` (`#06070a`): Deepest viewport canvas.
- `--bg-900` (`#090b10`): Primary page body background.
- `--bg-850` (`#0d1017`): Section contrast alternating background.
- `--bg-card` (`#0e121a`): Default card & container surface.
- `--bg-card-hover` (`#141926`): Interactive elevated card hover state.
- `--bg-glass` (`rgba(14, 18, 26, 0.75)`): Frosted backdrop blur for navigation.

### Brand & Accent Tokens
- `--accent` (`#00e5d0`): Electric Teal primary action & highlight token.
- `--accent-hover` (`#1affec`): Vivid teal hover state.
- `--accent-dim` (`#00b8a6`): Muted teal for borders and secondary accents.
- `--accent-glow` (`rgba(0, 229, 208, 0.18)`): Atmospheric glow around focused elements.
- `--accent-glow-sm` (`rgba(0, 229, 208, 0.08)`): Subtle ambient glow.
- `--accent-bg` (`rgba(0, 229, 208, 0.08)`): Translucent pill and badge background.

### Typography & Foreground
- `--text-100` (`#f8fafc`): 100% white foreground (Headings, active buttons, key numbers).
- `--text-200` (`#cbd5e1`): 85% high-contrast body text.
- `--text-300` (`#94a3b8`): 60% muted secondary text, descriptions, and labels.
- `--text-400` (`#64748b`): 40% meta captions, timestamps, and inactive icons.

### Borders & Dividers
- `--border` (`rgba(255, 255, 255, 0.08)`): Default subtle perimeter border.
- `--border-highlight` (`rgba(255, 255, 255, 0.15)`): Focused/hover card border.
- `--border-accent` (`rgba(0, 229, 208, 0.4)`): Active primary state border.

---

## 3. Typography Rules

### Font Families
- **Primary Display & Body**: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Monospace & Data**: `'JetBrains Mono', 'IBM Plex Mono', monospace` (Used for KPI values, terminal prompts, simulation metrics, dates, badges).

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
- **Shadow**: `inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 20px rgba(0,0,0,0.3)`
- **Hover State**: `transform: translateY(-3px)`, `border-color: var(--border-highlight)`, `box-shadow: 0 12px 30px rgba(0,0,0,0.5), 0 0 25px var(--accent-glow-sm)`.

### Buttons & Action Links
- **Primary CTA (`.btn-primary`)**:
  - Background: `var(--accent)`
  - Color: `#06070a` (Solid high-contrast black)
  - Weight: 600
  - Hover: `background: var(--accent-hover)`, `box-shadow: 0 0 20px var(--accent-glow)`
- **Secondary CTA (`.btn-secondary`, `.btn-ghost`)**:
  - Background: `rgba(255, 255, 255, 0.05)`
  - Border: `1px solid var(--border)`
  - Color: `var(--text-100)`
  - Hover: `background: rgba(255, 255, 255, 0.1)`, `border-color: var(--border-highlight)`

### Interactive RAG AI Terminal (`.terminal-widget`)
- Background: `#06070a` (Deep black inset console)
- Header: macOS style 3-dot window controls (`#ff5f56`, `#ffbd2e`, `#27c93f`)
- Font: `'JetBrains Mono'`
- Output: Teal prompt arrows (`>`), white query responses, instant response chips.

### Interactive Monte Carlo Simulator Canvas (`#sim-canvas`)
- Dark cockpit styling with live dual-slider controls (`Supply Variability`, `Lead Time Delay`).
- Real-time KPI counter cards with monospace digital readout.

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

### Do
- Always use `JetBrains Mono` for numeric stats, data metrics, code snippets, and timestamps.
- Always use `var(--accent)` (`#00e5d0`) for primary interactive cues.
- Always ensure text contrast ratios exceed `4.5:1` on all surfaces.
- Always add subtle transitions (`0.22s cubic-bezier(0.16, 1, 0.3, 1)`) for smooth UI responses.

### Don't
- Never use generic saturated pure blue (`#0000ff`) or harsh purple gradients.
- Never use pure white backgrounds or harsh unpadded card borders.
- Never create layout shifts during live data calculation or filter toggling.

---

## 8. Responsive Behavior & Breakpoints
- **Mobile (<640px)**:
  - Navigation switches to sliding mobile drawer (`#nav-links.open`).
  - Bento grid collapses to 1-column stack.
  - Hero statistics stack vertically with `gap: 12px`.
  - Simulator sliders expand to 100% width with 48px touch targets.
- **Tablet (640px - 1024px)**:
  - 2-column bento layouts.
  - Full horizontal filter pill bar with auto-scroll.
- **Desktop (>1024px)**:
  - 3-column bento grids, sticky nav with backdrop blur, mouse-tracking spotlight active.

---

## 9. Agent Prompt Directives
When implementing or refactoring features in this repository, coding agents must adhere to the following directive:

> *"Follow the tokens, typography scales, bento card patterns, and color roles explicitly documented in `DESIGN.md`. Do not introduce new inline hex codes or arbitrary font families. All changes must align with the Electric Teal (#00e5d0) / Deep Dark (#090b10) design system."*

---
name: awesome-design
description: Standardized 9-section DESIGN.md protocol layer specification, generation, and enforcement for AI coding agents based on VoltAgent/awesome-design-md and Stitch standard.
---

# Awesome Design.md Skill

A standard protocol layer bridging human design intent, brand identity, and AI code generation through structured `DESIGN.md` files.

## What is `DESIGN.md`?

`DESIGN.md` is a plain-text markdown design system specification placed in the project root that AI coding agents reference for all styling, architectural, and component decisions.

## The 9-Section Standard Architecture

Every compliant `DESIGN.md` follows this 9-section structure:

```markdown
# [Project Name] Design System Specification (`DESIGN.md`)

## 1. Visual Theme & Atmosphere
- **Aesthetic Direction**: (e.g., Neo-brutalist, Hyper-minimal, Clean Dark-Mode SaaS, Swiss Editorial)
- **Mood & Tone**: (e.g., Precision, Engineered, Warm, Confident, Playful)
- **Density & Scale**: (e.g., High-density data cockpit, Relaxed spacious editorial)
- **Visual Anchors**: Key signatures (subtle borders, accent glows, micro-dot matrix backgrounds)

## 2. Color Palette & Roles
Semantic tokens mapped with exact HEX / HSL / RGB values:
- **Backgrounds**: Base, Surface, Elevated, Overlay
- **Borders & Dividers**: Subtly defined contrasts (e.g., `rgba(255,255,255,0.08)`)
- **Text & Foreground**: Primary (100%), Secondary (70%), Tertiary/Muted (45%), Disabled
- **Accents & Brand Tokens**: Primary Action, Accent Highlight, Hover States
- **Semantic Feedback**: Success, Warning, Error, Info

## 3. Typography Rules
- **Font Stacks**: Primary Sans/Display, Secondary Body, Monospace/Code
- **Type Scale**:
  - Hero Display: `text-5xl` / `text-6xl` (tight tracking `-0.03em`, line-height `1.1`)
  - H1 / Section Titles: `text-3xl` / `text-4xl` (`-0.02em`)
  - H2 / Card Headers: `text-xl` / `text-2xl`
  - Body: `text-sm` / `text-base` (relaxed `1.6`)
  - Micro / Labels: `text-xs` (uppercase, wide tracking `0.08em`, font-mono or semibold)

## 4. Component Stylings
- **Buttons & CTAs**: Primary, Secondary, Ghost, Outline, Pill variants with hover & active states.
- **Cards & Bento Containers**: Surface colors, borders, subtle gradients, backdrop filters (`backdrop-blur-md`).
- **Inputs & Controls**: Form fields, toggles, slider tracks, active focus rings (`ring-2 ring-primary/40`).
- **Badges & Tags**: Rounded pills with muted background and solid borders.

## 5. Layout Principles & Spacing
- **Base Grid**: 4px / 8px scale (`gap-2`, `gap-4`, `gap-6`, `gap-8`, `gap-12`)
- **Container Max-Widths**: Content widths (`max-w-7xl`, `max-w-5xl`, `max-w-prose`)
- **Bento & Masonry Rules**: Asymmetric grids with high information density and clear visual hierarchy.

## 6. Depth & Elevation
- **Layer 0 (Canvas)**: Deepest background.
- **Layer 1 (Card/Container)**: Border + subtle background contrast.
- **Layer 2 (Dropdown/Popover)**: Raised shadow + border (`shadow-lg shadow-black/40`).
- **Layer 3 (Modal/Dialog)**: High elevation with backdrop scrim blur.

## 7. Do's and Don'ts (Guardrails)
### Do
- Consistently use tokenized color variables.
- Keep micro-interactions fast and fluid (`150ms - 200ms ease-out`).
- Maintain accessible contrast ratios (minimum 4.5:1 for body text).

### Don't
- Never use generic saturated pure colors (`#ff0000`, pure `#0000ff`).
- Never mix clashing font weights without purpose.
- Never use harsh heavy black dropshadows without color tints.

## 8. Responsive Behavior & Breakpoints
- **Mobile (<640px)**: Single column layouts, touch targets >= 44x44px, sticky bottom action bars.
- **Tablet (640px - 1024px)**: 2-column bento grids, collapsed drawers.
- **Desktop (>1024px)**: Full multi-column dashboard, persistent navigation, hover tooltips.

## 9. Agent Prompt Directives
- Ready-to-use prompt prefix:
  `"You must strictly adhere to the tokens and component rules defined in @DESIGN.md. Do not invent arbitrary colors, font families, or border-radius values."`
```

## How to Apply `DESIGN.md` in Any Project

1. Check if `DESIGN.md` exists in the repository root.
2. If absent, create `DESIGN.md` by extracting the existing stylesheet/tailwind config tokens into the 9-section standard.
3. When building or refactoring UI components:
   - Reference `DESIGN.md` color tokens directly.
   - Match the defined typography scale and font families.
   - Use the component styling patterns and respect the Do's / Don'ts.
4. Keep `DESIGN.md` updated as new design tokens or components are created.

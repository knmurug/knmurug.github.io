---
name: web-design-guidelines
description: Review and audit UI code for Vercel Web Interface Guidelines compliance including accessibility (ARIA, keyboard navigation), focus states, form UX, animation performance, typography, and responsive layouts. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "check against Web Interface Guidelines".
metadata:
  author: vercel
  version: "1.0.0"
---

# Vercel Web Interface Guidelines Skill

Audit frontend code against Vercel's official Web Interface Guidelines for production-grade accessibility, performance, user experience, and design polish.

---

## 1. Audit Methodology

When reviewing code:
1. Scan the specified files or UI components.
2. Check against the 7 core pillars below.
3. Output findings concisely in `file:line` format with severity (`[FAIL]`, `[WARN]`, `[PASS]`) and actionable fixes.

---

## 2. Core Rulebook

### ♿ Accessibility (a11y)
- **Icon Buttons**: Icon-only buttons must have an `aria-label` or visually-hidden screen reader text.
- **Form Controls**: Every form input/select/textarea requires an associated `<label>` (via `for`/`htmlFor`) or `aria-label`.
- **Semantic HTML First**: Use `<button>` for actions and `<a>`/`<Link>` for navigation. Never `<div onClick>` without complete ARIA role and keyboard handlers.
- **Decorative Media**: Decorative icons and background SVG graphics must specify `aria-hidden="true"`.
- **Dynamic Updates**: Asynchronous live updates (toast alerts, status banners, live validation) must use `aria-live="polite"`.
- **Heading Hierarchy**: Ensure logical heading levels (`h1` -> `h2` -> `h3`) with `scroll-margin-top` for anchor jumps.

### 🎯 Focus States & Keyboard Navigation
- **Visible Focus**: Interactive elements must provide a visible focus indicator using `:focus-visible` (e.g. `focus-visible:ring-2` / `outline`).
- **Never Bare Outline None**: Never use `outline: none` or `outline-none` without an explicit focus replacement.
- **Group Focus**: Compound controls must manage focus grouping using `:focus-within`.
- **Viewport Visibility**: Fixed/sticky headers or modals must not obscure the focused active element.

### 📝 Forms & Data Entry
- **Autocomplete & Names**: Inputs need meaningful `name` and standardized `autocomplete` attributes (e.g. `autocomplete="name"`, `autocomplete="email"`).
- **Correct Input Types**: Use semantic input types (`type="email"`, `type="tel"`, `type="number"`, `type="url"`) with appropriate `inputmode`.
- **Unblocked Paste**: Never intercept or block paste (`preventDefault()` on paste events is banned).
- **Clickable Labels**: Clicking a label must focus its corresponding input control.
- **Spellcheck Discipline**: Set `spellcheck="false"` on email fields, usernames, API keys, and code inputs.
- **Loading State**: Submit buttons must remain enabled until request starts, displaying an inline loading indicator with `…`.

### ✨ Motion & Animation
- **Reduced Motion**: All animations and transitions must respect `prefers-reduced-motion: reduce`.
- **Compositor Friendly**: Only animate hardware-accelerated properties (`transform` and `opacity`). Avoid animating `height`, `width`, `top`, `left`, `margin`, `padding`.
- **No Transition All**: Explicitly list animated properties (e.g. `transition: transform 0.2s ease, opacity 0.2s ease`).
- **Interruptible Transitions**: Ensure interactions respond immediately to mid-animation interrupts.

### 🔤 Typography & Numbers
- **Punctuation**: Use proper ellipsis character `…` (not `...`) and balanced quotes.
- **Tabular Numbers**: Use `font-variant-numeric: tabular-nums` or monospace for aligned metrics, timestamps, and data columns.
- **Widow Prevention**: Apply `text-wrap: balance` or `text-wrap: pretty` to display headlines.

### 📐 Content Handling & Layout Stability
- **Overflow Protection**: Flex and grid children must declare `min-w-0` to allow text truncation (`truncate`, `break-words`).
- **Layout Shift (CLS)**: Images must include explicit `width` and `height` attributes or aspect-ratio boxes.
- **Loading Priorities**: Below-the-fold assets must use `loading="lazy"`. Above-the-fold hero assets should use `fetchpriority="high"`.

### ⚡ Performance
- **Zero Layout Reads in Render**: Never interleave DOM measurement reads (`offsetHeight`, `getBoundingClientRect`) with DOM writes in hot animation loops.
- **Debounced / Throttled Listeners**: All continuous window events (`scroll`, `resize`, `mousemove`) must be passive and throttled/rAF-batched.

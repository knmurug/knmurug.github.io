---
name: framer-motion
description: Production-grade Framer Motion & Motion animation guide, spring physics, layout animations, exit animations, gestures, and performance optimization for React & Next.js.
---

# Framer Motion & Motion Skill

Comprehensive production guide and patterns for **Framer Motion** (`framer-motion` / `motion`) in React and Next.js applications.

---

## 1. Core Philosophy & Performance Rules
1. **GPU-Accelerated Properties Only**: Animate `transform` (`x`, `y`, `scale`, `rotate`) and `opacity`. Avoid animating `width`, `height`, `top`, `left`, or `margin` directly to prevent expensive browser reflows (use `layout` props instead).
2. **Spring Over Easing Curves for Micro-Interactions**: Use physics-based springs (`type: 'spring', stiffness: 300, damping: 30`) for tactile, natural feel.
3. **Reduced Motion Accessibility**: Always wrap intense motion with `useReducedMotion()` or honor `prefers-reduced-motion`.

---

## 2. Common Patterns & Code Snippets

### A. Spring Physics Hover & Tap (Micro-interactions)
```tsx
import { motion } from 'framer-motion';

export const InteractiveButton = ({ children, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.03, y: -2 }}
    whileTap={{ scale: 0.97, y: 0 }}
    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    className="px-5 py-2.5 rounded-xl bg-teal-500 text-black font-semibold shadow-lg shadow-teal-500/20"
  >
    {children}
  </motion.button>
);
```

### B. Staggered Container & Child Variants
```tsx
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

export const StaggeredList = ({ items }) => (
  <motion.ul
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className="grid grid-cols-1 md:grid-cols-2 gap-4"
  >
    {items.map((item) => (
      <motion.li key={item.id} variants={itemVariants} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
        {item.title}
      </motion.li>
    ))}
  </motion.ul>
);
```

### C. AnimatePresence (Mounting & Unmounting / Exit Transitions)
```tsx
import { motion, AnimatePresence } from 'framer-motion';

export const Toast = ({ isVisible, message, onClose }) => (
  <AnimatePresence mode="wait">
    {isVisible && (
      <motion.div
        key="toast"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-6 right-6 p-4 rounded-xl bg-zinc-900 text-white border border-zinc-700 shadow-2xl"
      >
        {message}
      </motion.div>
    )}
  </AnimatePresence>
);
```

### D. Shared Element Layout Transitions (`layoutId`)
```tsx
import { useState } from 'react';
import { motion } from 'framer-motion';

const tabs = ['Overview', 'Analytics', 'Settings'];

export const TabBar = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="flex space-x-2 bg-zinc-950 p-1.5 rounded-xl border border-zinc-800">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className="relative px-4 py-2 rounded-lg text-sm font-medium text-zinc-300 hover:text-white transition-colors"
        >
          {activeTab === tab && (
            <motion.div
              layoutId="activeTabBadge"
              className="absolute inset-0 bg-zinc-800 rounded-lg"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span className="relative z-10">{tab}</span>
        </button>
      ))}
    </div>
  );
};
```

---

## 3. Recommended Spring Physics Presets
- **Snappy Button / Toggle**: `{ type: 'spring', stiffness: 500, damping: 30 }`
- **Natural Card Hover**: `{ type: 'spring', stiffness: 350, damping: 25 }`
- **Gentle Modal / Sheet**: `{ type: 'spring', stiffness: 260, damping: 28 }`
- **Bouncy Notification / Tag**: `{ type: 'spring', stiffness: 400, damping: 15, mass: 0.8 }`

---

## 4. Troubleshooting & Best Practices
- **Layout Jitter**: When using `layout`, ensure parent elements have defined bounding boxes and explicit `overflow: hidden` where appropriate.
- **SSR / Next.js Hydration**: Ensure client components using Framer Motion are marked with `'use client'` directive at the top of the file.

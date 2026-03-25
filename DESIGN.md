# Design System Specification: The Cognitive Atelier

## 1. Overview & Creative North Star: "The Digital Curator"

This design system rejects the cluttered, "dashboard-heavy" aesthetic of traditional productivity tools. Our Creative North Star is **The Digital Curator**—an interface that feels less like a software suite and more like a high-end editorial gallery.

We achieve a premium feel through **Intentional Asymmetry** and **Tonal Depth**. By breaking the rigid, centered grid and using expansive whitespace (negative space as a functional element), we allow the user’s focus to rest on what matters: their thoughts and the AI’s insights. The interface should feel "quiet" until interacted with, using high-contrast typography to establish a clear, authoritative hierarchy.

---

## 2. Colors & Surface Philosophy

The palette is rooted in deep charcoals and crisp architectural whites, punctuated by a singular "Intelligence" accent: **Emerald Green (`secondary`)**.

### The "No-Line" Rule

Standard 1px borders are strictly prohibited for sectioning. Structural boundaries must be defined solely through background color shifts. To separate the sidebar from the main canvas, transition from `surface` to `surface-container-low`.

### Surface Hierarchy & Nesting

Treat the UI as a physical stack of fine paper. Layering is achieved through the `surface-container` tiers:

- **Base Layer:** `surface` (#fcf9f8) - The main workspace canvas.
- **The Inset:** `surface-container-low` (#f6f3f2) - Used for sidebars or utility panels.
- **The Floating Card:** `surface-container-lowest` (#ffffff) - Used for primary content cards resting on a lower-tier surface to create "natural lift."

### The "Glass & Gradient" Rule

To signify "AI Intelligence," floating modal elements or generative AI responses should utilize **Glassmorphism**. Apply `surface-container-lowest` at 80% opacity with a `backdrop-blur` of 20px.

- **Signature Texture:** Main CTAs or active AI states should use a subtle linear gradient: `primary` (#40576f) to `primary-container` (#586f89) at a 135-degree angle. This adds "soul" and depth that flat hex codes lack.

---

## 3. Typography: Editorial Authority

We utilize a dual-typeface system to balance character with utility.

- **Display & Headlines (Manrope):** Chosen for its geometric precision and modern "tech-humanist" feel. Use `display-lg` (3.5rem) with tighter letter-spacing (-0.02em) for hero moments to create a bold, editorial impact.
- **Body & Labels (Inter):** The workhorse. `body-md` (0.875rem) provides maximum legibility for long-form productivity tasks.
- **The Hierarchy Rule:** Skip sizes to create drama. Pair a `headline-sm` (1.5rem) directly with `label-md` (0.75rem) for metadata to create a sophisticated, high-contrast look that guides the eye instantly.

---

## 4. Elevation & Depth: Tonal Layering

Traditional drop shadows are a fallback, not a standard. We communicate "upward" movement through color.

- **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-high` background. The delta in lightness creates a perceived elevation of roughly 4dp without a single shadow pixel.
- **Ambient Shadows:** For floating elements (like a Command Bar), use a diffused shadow: `y-offset: 16px`, `blur: 32px`, Color: `on-surface` (#1c1b1b) at **4% opacity**. It should feel like a soft glow of light, not a "drop shadow."
- **The Ghost Border Fallback:** If a border is required for accessibility (e.g., in high-glare environments), use `outline-variant` (#c4c5d9) at **20% opacity**.

---

## 5. Components: Minimalist Primitives

### Buttons

- **Primary:** Gradient of `primary` to `primary-container`. `rounded-md` (0.375rem). No border.
- **Secondary:** Ghost style. `on-surface` text with a `surface-container-highest` background on hover.
- **Tertiary:** `label-md` uppercase with 0.05em letter spacing. No container.

### Input Fields

- **Style:** Minimalist underline or "In-line" style. Remove the box. Use `surface-container-low` as a subtle background block with `rounded-sm` (0.125rem).
- **Focus State:** Transition the background to `surface-container-high` and change the `outline` to the `secondary` (Emerald) color.

### Cards & Lists

- **Divider Prohibition:** Never use a horizontal line to separate list items. Use the **Spacing Scale `3` (1rem)** to create a gap, or alternate background shades between `surface` and `surface-container-lowest`.
- **The "AI Insight" Card:** Use a `secondary_container` (#6cf8bb) background at 10% opacity with a solid `secondary` left-accent bar (4px) to denote AI-generated content.

### Command Bar (New Component)

A floating centerpiece for the AI app. Uses `surface-container-lowest` with Glassmorphism, `rounded-xl` (0.75rem), and the **Ambient Shadow** spec.

---

## 6. Do’s and Don’ts

### Do:

- **Embrace the Spacing Scale:** Use `16` (5.5rem) for top-level section padding to create a "luxury" sense of space.
- **Use Intentional Asymmetry:** Align text to the left but place supporting imagery or AI visualizations slightly off-center to the right.
- **Leverage High Contrast:** Ensure all `on-surface` text on `surface` backgrounds meets WCAG AAA standards.

### Don’t:

- **Don't use 100% Black:** Always use `on-surface` (#1c1b1b) for text to maintain a sophisticated charcoal tone.
- **Don't "Box-In" Content:** Avoid wrapping every section in a container. Let the content breathe against the `surface` background.
- **Don't use Rounded-Full for everything:** Reserve `rounded-full` only for Chips and specific Action Buttons. Use `rounded-md` or `rounded-lg` for structural elements to maintain a professional, architectural "edge."

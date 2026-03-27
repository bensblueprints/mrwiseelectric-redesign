# Mr. Wise Electric - Design System

## Design Decision Framework

### Business Context
- **Industry**: Electrical contractor (residential & commercial)
- **Target Customer**: Atlanta homeowners and business owners needing electrical work
- **Key Differentiator**: 42+ years of experience (established 1989)
- **Brand Name Opportunity**: "Wise" suggests expertise, knowledge, trustworthiness
- **Service Area**: Atlanta metro - predominantly suburban, working/middle class neighborhoods

---

## 1. Aesthetic Direction

**Choice: `industrial-utilitarian`** with warmth

**Rationale**:
Electrical work is inherently industrial - cables, circuits, panels, tools. Leaning into this authenticity creates credibility. The "utilitarian" approach communicates no-nonsense professionalism. However, since this serves residential customers (not just commercial), we'll inject warmth through amber/copper accent colors that reference electrical elements (copper wiring, warm lighting).

**Visual Language**:
- Exposed structure aesthetic - grid lines, technical precision
- Heavy, confident typography that commands attention
- Copper/amber accents that evoke electrical warmth
- Dark backgrounds with high contrast elements
- Honest materials feel - no glossy faux-luxury

---

## 2. Typography

**Display Font: Bebas Neue**
- All caps, condensed, industrial
- Perfect for headings that need to command attention
- Feels established, not trendy
- Free via Google Fonts

**Body Font: DM Sans**
- Clean, geometric, highly readable
- Professional without being cold
- Great number rendering (important for phone numbers, prices)
- Excellent across all weights
- Free via Google Fonts

```css
--font-display: 'Bebas Neue', sans-serif;
--font-body: 'DM Sans', sans-serif;
```

---

## 3. Color Palette

**Philosophy**: Inspired by electrical work - the warm glow of copper wiring, the amber of incandescent bulbs, the deep blacks of conduit, and safety yellow from warning tape.

```css
:root {
  /* Core Palette */
  --color-primary: #1C1917;       /* Rich black - conduit, authority */
  --color-secondary: #44403C;     /* Warm charcoal - depth, sophistication */
  --color-accent: #F59E0B;        /* Amber - electrical warmth, copper glow */
  --color-surface: #FAFAF9;       /* Warm white - clean, professional */
  --color-text: #292524;          /* Near-black - readable, grounded */

  /* Extended Palette */
  --color-accent-light: #FCD34D;  /* Light amber - hover states */
  --color-accent-dark: #D97706;   /* Deep amber - active states */
  --color-muted: #78716C;         /* Stone gray - secondary text */
  --color-border: #E7E5E4;        /* Light border - structure */
  --color-success: #22C55E;       /* Green - confirmations */
  --color-error: #EF4444;         /* Red - errors, urgency */
}
```

**Color Usage Rules**:
- Primary (black) for headers, navigation, footer backgrounds
- Amber accent ONLY for CTAs, interactive elements, highlights
- Surface white for content areas, cards
- Never use amber for body text
- Borders should be subtle, structural only

---

## 4. Motion Strategy

**Philosophy**: Industrial precision meets electrical energy. Movements should feel purposeful and snappy, like a circuit completing.

### Entry Animations
- **Fade-up with stagger**: Content sections reveal from bottom, each element delays 0.1s
- **Slide-in from left**: Service cards enter from left (like a circuit path)
- **Scale reveal**: Stats/numbers pop in with slight overshoot spring

### Hover States
- **Underline draw**: Links animate underline from left to right
- **Card lift**: Cards lift 4px with subtle shadow deepening
- **Button glow**: CTAs get amber glow on hover (like powered on)
- **Icon pulse**: Service icons pulse once on hover

### Page Transitions
- **Fade**: Simple 200ms fade between routes
- **No slide**: Slides feel too playful for industrial aesthetic

### Scroll-Triggered Effects
- Hero section: Parallax on background image (subtle, 10%)
- Stats section: Numbers count up when in view
- Service cards: Staggered reveal as section enters viewport
- Testimonials: Fade in one by one

### Spring Configuration
```typescript
const springConfig = {
  stiff: { type: "spring", stiffness: 400, damping: 30 },
  gentle: { type: "spring", stiffness: 260, damping: 20 },
  slow: { type: "spring", stiffness: 120, damping: 14 }
};
```

---

## 5. Layout Signature

**Primary Signature: Oversized number counters**

The hero will feature massive, typographically bold statistics:
- "42+" years of experience
- "10,000+" jobs completed
- "100%" licensed & insured

These numbers will be enormous (clamp(80px, 12vw, 160px)), set in Bebas Neue, with amber accent color. They create immediate credibility and visual impact.

**Secondary Signatures**:
- **Diagonal accent lines**: Amber diagonal stripes (like caution tape) used sparingly as section dividers
- **Grid lines visible**: Subtle grid overlay on hero section
- **Asymmetric service grid**: Services displayed in offset 2/1/2/1 pattern, not uniform grid

---

## 6. Component Design Tokens

### Spacing Scale
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */
```

### Border Radius
```css
--radius-sm: 4px;     /* Buttons, inputs */
--radius-md: 8px;     /* Cards, containers */
--radius-lg: 12px;    /* Modals, large cards */
--radius-full: 9999px; /* Pills, avatars */
```

### Shadows
```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-card: 0 4px 24px -4px rgb(0 0 0 / 0.12);
--shadow-glow: 0 0 20px rgb(245 158 11 / 0.4);
```

---

## 7. UI Component Specifications

### Buttons
- **Primary**: Amber background, black text, bold weight
- **Secondary**: Black background, white text
- **Ghost**: Transparent, amber text, amber border on hover
- Height: 48px minimum (touch-friendly)
- Padding: 16px 32px
- Font: DM Sans 600, uppercase tracking

### Cards
- White background
- 8px border radius
- Subtle border (1px border color)
- Shadow on hover
- Amber left-border accent (4px) for feature cards

### Inputs
- Height: 52px
- Border: 1px stone-300
- Focus: Amber border, subtle glow
- Label: Above input, DM Sans 500
- Error: Red border, error text below

### Navigation
- Fixed header, black background
- Logo left, nav center, CTA right
- Amber underline on active/hover
- Mobile: Sheet drawer from right

---

## 8. Responsive Breakpoints

```css
/* Mobile first */
--breakpoint-sm: 640px;   /* Large phones */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Small laptops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1536px; /* Large screens */
```

---

## 9. Accessibility Commitments

- All interactive elements have 4.5:1 contrast ratio minimum
- Focus states are visible and use amber glow
- Touch targets are 44px minimum
- Skip-to-content link on every page
- Reduced motion respected via prefers-reduced-motion
- Form inputs have associated labels
- Images have meaningful alt text
- ARIA labels on icon-only buttons

---

## 10. Design Philosophy Summary

> "Mr. Wise Electric's website should feel like walking into a well-organized workshop run by a master electrician. Everything has its place. The tools are quality. There's no flash, just competence. But when you look closer, you notice the warm lighting, the pride in craft, the 42 years of experience evident in every detail. This is a company that could rewire your entire house while you sleep and you'd wake up to everything working perfectly."

The design should inspire trust through visible competence, not through polish or persuasion.

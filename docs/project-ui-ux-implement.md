# HDG UI/UX Implementation Guide

## Design Philosophy

HDG's visual identity embodies **modern minimalism** with a focus on:
- Clean, uncluttered layouts
- Purposeful use of whitespace
- Subtle animations that enhance UX
- Professional, trustworthy aesthetic

---

## Brand Colors (Based on Logo)

The HDG logo consists of two primary colors forming an "H" shape:

### Primary Palette

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **HDG Blue** | `#3B6B9C` | 59, 107, 156 | Primary brand, headers, CTAs |
| **HDG Dark** | `#3A3A3A` | 58, 58, 58 | Text, secondary elements |
| **White** | `#FFFFFF` | 255, 255, 255 | Backgrounds, contrast |

### Extended Palette

| Color | Hex | Usage |
|-------|-----|-------|
| **Blue Light** | `#5A8BBF` | Hover states, accents |
| **Blue Dark** | `#2A4F73` | Active states, depth |
| **Blue Muted** | `#E8F0F7` | Backgrounds, cards |
| **Gray 50** | `#F9FAFB` | Page backgrounds |
| **Gray 100** | `#F3F4F6` | Card backgrounds |
| **Gray 200** | `#E5E7EB` | Borders |
| **Gray 500** | `#6B7280` | Muted text |
| **Gray 900** | `#111827` | Headings |

### CSS Variables

```css
:root {
  /* Brand Colors */
  --hdg-blue: 210 45% 42%;
  --hdg-blue-light: 210 45% 55%;
  --hdg-blue-dark: 210 45% 30%;
  --hdg-blue-muted: 210 45% 95%;
  --hdg-dark: 0 0% 23%;
  
  /* Semantic Colors */
  --primary: var(--hdg-blue);
  --primary-foreground: 0 0% 100%;
  --secondary: var(--hdg-dark);
  --secondary-foreground: 0 0% 100%;
  --accent: var(--hdg-blue-light);
  --accent-foreground: 0 0% 100%;
  
  /* UI Colors */
  --background: 0 0% 100%;
  --foreground: 0 0% 23%;
  --muted: 220 14% 96%;
  --muted-foreground: 220 9% 46%;
  --border: 220 13% 91%;
}
```

---

## Typography

### Font Stack

| Element | Font | Weight | Size |
|---------|------|--------|------|
| **H1** | Outfit | 700 | 48-64px |
| **H2** | Outfit | 600 | 36-48px |
| **H3** | Outfit | 600 | 24-30px |
| **H4** | Outfit | 500 | 20-24px |
| **Body** | Inter | 400 | 16px |
| **Body Small** | Inter | 400 | 14px |
| **Caption** | Inter | 500 | 12px |

### Line Heights

- Headings: 1.2
- Body: 1.6
- UI elements: 1.4

---

## Spacing System

Based on 4px grid:

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | 4px | Icon padding |
| `sm` | 8px | Inline spacing |
| `md` | 16px | Component padding |
| `lg` | 24px | Section padding |
| `xl` | 32px | Card padding |
| `2xl` | 48px | Section gaps |
| `3xl` | 64px | Page sections |
| `4xl` | 96px | Hero padding |

---

## Component Styles

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: hsl(var(--hdg-blue));
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: hsl(var(--hdg-blue-dark));
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 107, 156, 0.3);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: hsl(var(--hdg-blue));
  border: 2px solid hsl(var(--hdg-blue));
  padding: 10px 22px;
  border-radius: 8px;
}

.btn-secondary:hover {
  background: hsl(var(--hdg-blue));
  color: white;
}

/* Ghost Button */
.btn-ghost {
  background: transparent;
  color: hsl(var(--hdg-dark));
  padding: 12px 24px;
}

.btn-ghost:hover {
  background: hsl(var(--hdg-blue-muted));
}
```

### Cards

```css
.card {
  background: white;
  border: 1px solid hsl(var(--border));
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
}

.card:hover {
  border-color: hsl(var(--hdg-blue));
  box-shadow: 0 8px 24px rgba(59, 107, 156, 0.1);
  transform: translateY(-2px);
}

.card-elevated {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}
```

### Inputs

```css
.input {
  border: 1px solid hsl(var(--border));
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  transition: all 0.2s ease;
}

.input:focus {
  border-color: hsl(var(--hdg-blue));
  outline: none;
  box-shadow: 0 0 0 3px hsl(var(--hdg-blue-muted));
}
```

---

## Animation System

### Timing Functions

```css
:root {
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### Animation Durations

| Type | Duration | Usage |
|------|----------|-------|
| **Micro** | 150ms | Button states, hover |
| **Fast** | 200ms | Dropdowns, tooltips |
| **Normal** | 300ms | Modals, cards |
| **Slow** | 500ms | Page transitions |

### Keyframe Animations

```css
/* Fade In Up */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scale In */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Slide In Left */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Subtle Float */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}
```

### Stagger Delays

```css
.stagger-1 { animation-delay: 100ms; }
.stagger-2 { animation-delay: 200ms; }
.stagger-3 { animation-delay: 300ms; }
.stagger-4 { animation-delay: 400ms; }
.stagger-5 { animation-delay: 500ms; }
```

---

## Layout Patterns

### Container Widths

| Breakpoint | Max Width |
|------------|-----------|
| Default | 100% |
| sm (640px) | 640px |
| md (768px) | 768px |
| lg (1024px) | 1024px |
| xl (1280px) | 1280px |
| 2xl (1536px) | 1440px |

### Grid System

```css
/* 12-column grid */
.grid-cols-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}

/* Common layouts */
.layout-2-col { grid-template-columns: repeat(2, 1fr); }
.layout-3-col { grid-template-columns: repeat(3, 1fr); }
.layout-4-col { grid-template-columns: repeat(4, 1fr); }
.layout-sidebar { grid-template-columns: 280px 1fr; }
.layout-content { grid-template-columns: 1fr 320px; }
```

---

## Component Library

### Navigation

- **Header**: Sticky, blur backdrop, logo left, nav center, CTA right
- **Mobile Menu**: Full-screen slide-in from right
- **Footer**: 4-column grid, logo + description, quick links, services, contact

### Hero Sections

- **Primary Hero**: Full-width, gradient overlay, centered text
- **Page Hero**: Compact, breadcrumbs, title + subtitle
- **Image Hero**: Split layout with image and content

### Content Sections

- **Feature Grid**: 3-column cards with icons
- **Process Steps**: Numbered timeline with connectors
- **Statistics**: Large numbers with labels
- **Testimonials**: Quote cards with photos

### Project Components

- **Project Card**: Image, category badge, title, location
- **Project Gallery**: Masonry or grid layout
- **Project Detail**: Hero image, metadata sidebar, content

---

## Responsive Breakpoints

```css
/* Mobile First */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

---

## Accessibility Guidelines

### Color Contrast

- Text on white: minimum 4.5:1 ratio
- Large text: minimum 3:1 ratio
- Interactive elements: visible focus states

### Focus States

```css
:focus-visible {
  outline: 2px solid hsl(var(--hdg-blue));
  outline-offset: 2px;
}
```

### Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Dark Mode (Future)

```css
.dark {
  --background: 222 47% 11%;
  --foreground: 210 40% 98%;
  --primary: 210 45% 55%;
  --primary-foreground: 222 47% 11%;
  --muted: 217 33% 17%;
  --muted-foreground: 215 20% 65%;
  --border: 217 33% 17%;
}
```

---

## Implementation Checklist

- [x] Define color palette from logo
- [x] Configure typography scale
- [x] Set up spacing system
- [x] Create button variants
- [x] Design card components
- [x] Define animation keyframes
- [x] Configure responsive breakpoints
- [ ] Implement dark mode toggle
- [ ] Add motion preference detection
- [ ] Audit accessibility compliance


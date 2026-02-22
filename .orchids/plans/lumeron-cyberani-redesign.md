# Lumeron Website Redesign - Cyberani-Inspired Transformation

## Requirements

Transform the current Lumeron website into a modern, professional, enterprise-grade platform inspired by Cyberani.sa. The redesign focuses on a cleaner aesthetic with lighter backgrounds, structured layouts, formal typography, a new Services carousel, and a dedicated Contact section with interactive form and map integration.

## Current State Analysis

### Existing Architecture
- **Framework**: Next.js (App Router) with Tailwind CSS
- **Components**: Modular section-based architecture in `src/components/sections/`
- **Styling**: Custom theme with Lumeron teal colors (#3ec8ba, #39968d, #229388)
- **Fonts**: Currently uses BubblegumSans for decorative headers + Avenir Next Arabic

### Files to Modify
1. `src/app/globals.css` - Typography and color system overhaul
2. `src/components/sections/hero.tsx` - Background lightening, typography update
3. `src/components/sections/product-layers.tsx` - Transform to carousel + replace Future Tech image
4. `src/components/sections/news-carousel.tsx` - May be repurposed or redesigned
5. `src/components/sections/mission-statement.tsx` - Typography and background updates
6. `src/components/sections/strategic-allies.tsx` - Layout refinements
7. `src/components/sections/cta-bottom.tsx` - Typography updates
8. `src/components/sections/footer.tsx` - Add contact info integration
9. `src/app/page.tsx` - Add new Contact section

### New Files to Create
1. `src/components/sections/services-carousel.tsx` - New horizontal carousel cards
2. `src/components/sections/contact-section.tsx` - Contact form, company info, map

## Design Specifications

### 1. Visual Identity & Backgrounds

#### Color Palette Shift
```css
/* FROM: Dark, high-contrast backgrounds */
/* TO: Light, professional, enterprise palette */

--color-background: #ffffff;
--color-background-secondary: #f8fafc; /* Light gray sections */
--color-background-hero: linear-gradient(135deg, #f0fdfc 0%, #ffffff 50%, #e0f7f5 100%);
--color-accent-blue: #1e3a5f; /* Enterprise blue for depth */
--color-text-primary: #111827; /* Near-black for authority */
--color-text-secondary: #64748b; /* Muted gray */
```

#### Hero Section Updates
- Replace dark video overlay with light gradient background
- Use subtle geometric patterns or abstract tech visuals
- Maintain video but with significantly reduced opacity overlay
- Add soft gradient: white → light teal → white

#### Section Backgrounds
- Alternate between pure white and #f8fafc (light gray)
- Remove heavy black/dark overlays
- Use subtle border separations instead of gradient fades

### 2. Typography System

#### Font Hierarchy (Avenir Next Arabic Only)
```css
/* REMOVE: BubblegumSans from all headings and body */
/* KEEP: BubblegumSans ONLY for logo "LUMERON" text */

/* Heading Typography */
h1 { 
  font-family: 'Avenir Next Arabic', sans-serif;
  font-weight: 700; /* Bold */
  font-size: clamp(48px, 8vw, 80px);
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

h2 { 
  font-family: 'Avenir Next Arabic', sans-serif;
  font-weight: 600; /* Semibold */
  font-size: clamp(32px, 5vw, 56px);
  letter-spacing: -0.01em;
}

h3 { 
  font-family: 'Avenir Next Arabic', sans-serif;
  font-weight: 600;
  font-size: clamp(24px, 3vw, 32px);
}

/* Body Typography */
body, p { 
  font-family: 'Avenir Next Arabic', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.7;
  color: var(--color-text-secondary);
}
```

#### Restricted Usage
- **Logo ONLY**: BubblegumSans remains for "LUMERON" in navbar hero logo
- **All Headings**: Avenir Next Arabic (formal, authoritative)
- **All Body**: Avenir Next Arabic (clean, legible)

### 3. Services Carousel Redesign

#### Component Structure: `services-carousel.tsx`
```tsx
interface ServiceCard {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  image?: string;
  link: string;
}

const services: ServiceCard[] = [
  {
    id: "infrastructure",
    icon: Database,
    title: "Digital Infrastructure",
    description: "Sovereign hyperscale data centers anchoring national digital independence.",
    link: "#infrastructure"
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud & Platforms",
    description: "Seamless migration across public, private, and hybrid environments.",
    link: "#cloud"
  },
  {
    id: "managed",
    icon: ShieldCheck,
    title: "Managed Services",
    description: "24/7 cybersecurity monitoring with guaranteed SLAs.",
    link: "#managed"
  },
  {
    id: "future",
    icon: Cpu,
    title: "Future Technologies",
    description: "AI, IoT, and automation driving innovation across the Kingdom.",
    link: "#future"
  },
  {
    id: "consulting",
    icon: Users,
    title: "Digital Consulting",
    description: "Strategic advisory for Vision 2030 transformation initiatives.",
    link: "#consulting"
  },
  {
    id: "integration",
    icon: Layers,
    title: "System Integration",
    description: "End-to-end enterprise system integration and deployment.",
    link: "#integration"
  }
];
```

#### Carousel Layout Specifications
- **Container**: Full-width with side padding (max-width: 1440px)
- **Card Width**: 380px fixed
- **Card Height**: 420px minimum
- **Gap**: 24px between cards
- **Visible Cards**: 3-4 on desktop, 1-2 on mobile
- **Navigation**: Left/Right arrows + dot indicators
- **Animation**: Smooth horizontal scroll with easing

#### Card Design
```
┌─────────────────────────────────┐
│                                 │
│   [Icon - 48px teal circle]    │
│                                 │
│   ─────────────────────────    │
│                                 │
│   Service Title                │
│   (24px, Bold, #111827)        │
│                                 │
│   Description text goes here   │
│   spanning 2-3 lines max with  │
│   ellipsis overflow handling.  │
│   (16px, Regular, #64748b)     │
│                                 │
│                                 │
│   [Learn More →]               │
│   (14px, Semibold, Teal)       │
│                                 │
└─────────────────────────────────┘

Border: 1px solid #e2e8f0
Background: #ffffff
Border-radius: 20px
Shadow: 0 4px 20px rgba(0,0,0,0.05)
Hover: Subtle lift + shadow increase
```

### 4. Contact Section Design

#### Component Structure: `contact-section.tsx`
```tsx
// Three-column layout on desktop, stacked on mobile
// Left: Contact Form
// Center: Company Information
// Right: Embedded Map
```

#### Contact Form Fields
```
Name*          [________________________]
Email*         [________________________]
Subject        [________________________]
Message*       [                        ]
               [                        ]
               [                        ]
               [________________________]

               [    Send Message    ]
```

#### Form Specifications
- **Inputs**: Full-width, 52px height, 12px border-radius
- **Border**: 1px solid #e2e8f0
- **Focus**: Teal ring (2px)
- **Button**: Primary teal (#229388), full-width on mobile
- **Validation**: Client-side with error states

#### Company Information Display
```
Contact Us
──────────────────────────

Email
info@lumeron.sa

Phone
+966 XX XXX XXXX

Address
King Abdullah Financial District
Riyadh, Saudi Arabia

Business Hours
Sunday - Thursday
9:00 AM - 6:00 PM (AST)
```

#### Map Integration
- **Provider**: Google Maps Embed or Mapbox
- **Style**: Monochrome or light theme to match design
- **Size**: 100% width of column, 400px minimum height
- **Border-radius**: 20px
- **Interaction**: Click to open in Google Maps

### 5. Future Technologies Image Replacement

#### Current Image
- VR goggles visual (cliché tech imagery)

#### Replacement Criteria
- Abstract data visualization or network topology
- Clean, sophisticated tech illustration
- Colors: Predominantly teal/cyan with subtle gradients
- Style: Geometric, modern, non-literal representation
- Options:
  1. Neural network / AI node visualization
  2. Abstract circuit board pattern
  3. Data stream / particle flow
  4. Holographic interface mockup

## Implementation Phases

### Phase 1: Typography & Color Foundation
1. Remove BubblegumSans from all CSS except logo
2. Update globals.css with new font hierarchy
3. Lighten background colors across all sections
4. Update button and accent color applications

### Phase 2: Hero Section Modernization
1. Replace dark overlay with light gradient
2. Update typography to Avenir Next Arabic
3. Adjust video opacity and blend mode
4. Ensure typing animation uses new font

### Phase 3: Services Carousel Implementation
1. Create new services-carousel.tsx component
2. Implement horizontal scroll with navigation
3. Build responsive card components
4. Add smooth animations and hover states
5. Replace or integrate with existing ProductLayers

### Phase 4: Contact Section Creation
1. Build contact-section.tsx with form
2. Add company information block
3. Integrate map embed
4. Implement form validation
5. Add to page.tsx before Footer

### Phase 5: Section Refinements
1. Update MissionStatement backgrounds
2. Update StrategicAllies styling
3. Update CTABottom typography
4. Update NewsCarousel backgrounds
5. Replace Future Technologies image

### Phase 6: Final Polish
1. Cross-browser testing
2. Mobile responsive verification
3. Animation smoothness checks
4. Accessibility audit (ARIA, contrast)
5. RTL support verification for Arabic

## Technical Considerations

### Performance
- Lazy load carousel cards offscreen
- Optimize map embed with loading="lazy"
- Preload critical fonts

### Accessibility
- Form labels and ARIA attributes
- Keyboard navigation for carousel
- Color contrast minimum 4.5:1

### Responsive Breakpoints
```css
/* Mobile First */
@media (min-width: 640px)  { /* sm: 2 cards visible */ }
@media (min-width: 768px)  { /* md: 3 cards visible */ }
@media (min-width: 1024px) { /* lg: 4 cards visible */ }
@media (min-width: 1280px) { /* xl: full desktop */ }
```

## Dependencies

### Existing (No Changes)
- Next.js (App Router)
- Tailwind CSS
- Lucide React
- Framer Motion

### Potentially Add
- react-use-embla (for carousel, if native scroll insufficient)
- @react-google-maps/api (for map, optional - can use iframe)

## Risk Assessment

### Low Risk
- Typography changes (CSS only)
- Background color updates
- Contact form UI

### Medium Risk
- Carousel implementation (new component)
- Map integration (external dependency)

### Mitigation
- Use native CSS scroll-snap for carousel if possible
- Fallback to iframe map if API issues arise

## Success Criteria

1. **Visual**: Lighter, cleaner aesthetic matching enterprise standards
2. **Typography**: Consistent formal font usage (logo exception)
3. **Functionality**: Smooth carousel navigation
4. **Lead Generation**: Working contact form with validation
5. **Professionalism**: Cyberani-level polish and structure

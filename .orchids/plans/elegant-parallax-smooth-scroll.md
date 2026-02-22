# Elegant Parallax & Smooth Scrolling Animation

## Requirements
Add elegant, butter-smooth parallax scrolling animations globally across the Lumeron website. The implementation should create a premium, high-end feel that matches the enterprise Cyberani-style aesthetic while maintaining performance and accessibility.

## Current State Analysis

### Existing Setup
- **Framework**: Next.js 15 with App Router, React 19
- **Animation Library**: Framer Motion already installed (`framer-motion: ^12.23.24`)
- **Scroll Behavior**: Basic `scroll-behavior: smooth` in CSS
- **Sections**: Hero, ServicesCarousel, MissionStatement, ProductLayers, StrategicAllies, CTABottom, ContactSection, Footer

### Current Animations
- Framer Motion `whileInView` fade-in animations on sections
- Basic stagger animations on hero elements
- Hover transitions on cards and buttons

### Missing Features
- No global smooth scroll engine
- No parallax effects on background elements
- No scroll-velocity-based animations
- No scroll progress indicators

## Proposed Solution

### Technology Stack
Use **Lenis** (v1.3+) for smooth scrolling - the industry standard for premium scroll experiences:
- Lightweight (~3KB gzipped)
- Already compatible with existing Framer Motion setup
- Native RAF-based animation loop
- Supports scroll anchors (existing `#services`, `#contact` links)

### Architecture Overview
```
src/
├── app/
│   └── layout.tsx          # Add ReactLenis provider
├── components/
│   ├── providers/
│   │   └── smooth-scroll-provider.tsx  # NEW: Lenis wrapper with options
│   ├── animations/
│   │   ├── parallax-wrapper.tsx        # NEW: Reusable parallax component
│   │   ├── scroll-reveal.tsx           # NEW: Enhanced reveal animations
│   │   └── floating-element.tsx        # NEW: Floating parallax decorations
│   └── sections/
│       └── [existing sections]         # Add parallax to backgrounds
└── styles/
    └── globals.css          # Add Lenis CSS variables
```

## Implementation Phases

### Phase 1: Install Lenis & Create Smooth Scroll Provider
- Install `lenis` package
- Create `SmoothScrollProvider` component with optimal settings
- Wrap app in provider via `layout.tsx`
- Add required Lenis CSS to `globals.css`
- Test basic smooth scroll functionality

### Phase 2: Create Reusable Parallax Components
- Build `ParallaxWrapper` component with configurable speed/direction
- Build `FloatingElement` for decorative background elements
- Build `ScrollReveal` component enhancing existing fade-ins with parallax
- Ensure all components respect `prefers-reduced-motion`

### Phase 3: Apply Parallax to Hero Section
- Add parallax to gradient background orbs (slower, depth effect)
- Add subtle parallax to grid pattern
- Add floating tech-inspired decorations
- Enhance headline reveal with scroll-linked opacity

### Phase 4: Apply Parallax to Content Sections
- ServicesCarousel: Parallax on card images during scroll
- MissionStatement: Background gradient parallax + pillar stagger
- ProductLayers: Image parallax opposite to content (depth)
- StrategicAllies: Subtle logo float on scroll
- CTABottom: Feature cards with varied parallax speeds
- ContactSection: Form and map subtle depth separation

### Phase 5: Add Global Scroll Enhancements
- Scroll progress indicator (optional teal bar at top)
- Velocity-based animation intensity
- Smooth anchor scrolling for nav links
- Performance optimization & testing

## Technical Specifications

### Lenis Configuration
```typescript
{
  lerp: 0.08,           // Smooth interpolation (lower = smoother)
  duration: 1.4,        // Animation duration
  smoothWheel: true,    // Smooth mouse wheel
  syncTouch: false,     // Native touch on mobile (performance)
  autoRaf: true,        // Automatic animation frame
  anchors: true,        // Support #hash navigation
}
```

### Parallax Speed Guidelines
- **Background elements**: `speed: -0.3` to `-0.5` (moves slower)
- **Foreground accents**: `speed: 0.2` to `0.5` (moves faster)
- **Images in alternating layouts**: `speed: -0.1` (subtle depth)
- **Decorative floating elements**: `speed: 0.15` with rotation

### Accessibility Considerations
- Detect `prefers-reduced-motion` and disable parallax
- Maintain all existing keyboard navigation
- Ensure smooth scroll doesn't break focus management
- Keep content readable regardless of scroll position

## File Changes Summary

### New Files
1. `src/components/providers/smooth-scroll-provider.tsx` - Lenis wrapper
2. `src/components/animations/parallax-wrapper.tsx` - Reusable parallax
3. `src/components/animations/scroll-reveal.tsx` - Enhanced reveals
4. `src/components/animations/floating-element.tsx` - Decorative floats

### Modified Files
1. `src/app/layout.tsx` - Wrap with SmoothScrollProvider
2. `src/app/globals.css` - Add Lenis CSS variables
3. `src/components/sections/hero.tsx` - Add parallax to backgrounds
4. `src/components/sections/mission-statement.tsx` - Background parallax
5. `src/components/sections/product-layers.tsx` - Image depth parallax
6. `src/components/sections/services-carousel.tsx` - Subtle card parallax
7. `src/components/sections/strategic-allies.tsx` - Logo float effects
8. `src/components/sections/cta-bottom.tsx` - Card depth effects
9. `src/components/sections/contact-section.tsx` - Section depth
10. `package.json` - Add lenis dependency

## Dependencies
```bash
npm install lenis
```

## Performance Considerations
- Use `will-change: transform` only on parallax elements
- Limit parallax to non-critical decorative elements
- Disable complex parallax on mobile for battery/performance
- Use CSS transforms (GPU-accelerated) exclusively
- Throttle scroll callbacks if needed

## Success Criteria
- Butter-smooth 60fps scrolling on desktop
- Elegant depth perception through parallax layers
- No layout shifts or content jumping
- Maintains all existing functionality
- Mobile-optimized with graceful degradation
- Passes Lighthouse performance audit

## Project Summary
A high-end, light-mode corporate website for Lumeron, MASCO Digital. The site is a clone of the Humain.com structure, adapted with Lumeron's branding, company profile content, and strategic pillars aligned with Saudi Vision 2030.

## Tech Stack
- Framework: Next.js (App Router)
- Styling: Tailwind CSS
- Icons: Lucide React
- Visual Edits: Orchids Visual Edits integration

## Architecture
- `src/app/page.tsx`: Main entry point assembling all sections.
- `src/components/sections/`: Contains modular components for each section of the page (Hero, Navbar, NewsCarousel, etc.).
- `public/`: Stores the Lumeron SVG logo and other static assets.

## User Preferences
- Light mode only aesthetic.
- Creative, distinctive frontend design with high-impact typography.
- Use of Avenir Next Arabic as the exclusive font across the entire platform.
- Use of specific branding colors (Lumeron Light Teal: #3ec8ba, Lumeron Dark Teal: #39968d, Lumeron Accent: #229388).
- Buttons use #229388 with an animated glow stroke effect.
- Preference for animated gradients using brand teals (#3ec8ba to #39968d) for high-impact sections.
- Clean glassmorphism effects for a modern, corporate feel.

## Project Guidelines
- All components must be client components if using interactivity or browser APIs.
- No `styled-jsx` for server components; prefer Tailwind CSS.
- Keep the structure of the cloned website while replacing content and branding.
- Enforce light mode colors across all components (no dark mode support).

## Common Patterns
- Section-based architecture for easy maintenance.
- Responsive design with vertical storytelling flow.
- Glassmorphic card components with soft shadows and light borders.

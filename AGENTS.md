# AGENTS.md

## Project Overview
This is a Next.js 15 project using App Router, TypeScript, Tailwind CSS v4, and a strict design system.

## Design System

### Typography
All typography must use the established type scale. Never introduce new font sizes or weights outside this system.

| Token | Font | Weight | Size | Line Height | Letter Spacing |
|-------|------|--------|------|-------------|----------------|
| `h1`  | Afacad | 700 | 60px | 60.9px | -1.24px |
| `h2`  | Afacad | 700 | 50px | 45px | 0px |
| `h3`  | Afacad | 600 | 45px | 25px | -0.39px |
| `h4`  | Afacad | 700 | 30px | 35px | 0px |
| `p1`  | Roboto | 600 | 22px | 60.9px | 0.24px |
| `p2`  | Roboto | 400 | 20px | 45px | 0px |
| `p3`  | Roboto | 400 | 14px | 25px | -0.39px |
| `p4`  | Roboto | 400 | 12px | 35px | 0px |

### Colors
| Token | Hex |
|-------|-----|
| `brand-blue` | `#1D70C5` |
| `brand-blue-light` | `#E2F2FF` |
| `brand-green` | `#38A81B` |
| `brand-green-light` | `#A0FF88` |
| `brand-pink-light` | `#FAD3FF` |
| `brand-yellow-light` | `#FFE072` |

### Components
- All typography rendered via `<Heading>` and `<Text>` components from `@/components/ui/Typography`
- Buttons from `@/components/ui/Button`
- Section wrappers from `@/components/layout/Section`
- Container from `@/components/layout/Container`

## File Structure
```
src/
  app/                  # Next.js App Router pages
  components/
    ui/                 # Atomic reusable UI components
    sections/           # Page sections (Hero, Features, etc.)
    layout/             # Layout wrappers (Container, Section, Navbar, Footer)
  lib/                  # Utilities and helpers
  styles/               # Global styles and design tokens
  types/                # TypeScript type definitions
```

## Rules for AI Agents
1. **Always use design system tokens** — no hardcoded hex colors or arbitrary font sizes
2. **Use Tailwind CSS v4 custom properties** defined in `globals.css`
3. **Typography must use `<Heading>` or `<Text>` components** — never raw `<h1>` tags with inline styles
4. **New sections must use `<Section>` wrapper** for consistent spacing
5. **Keep components small and focused** — single responsibility
6. **TypeScript strict mode is on** — all props must be typed
7. **No `any` types** — use proper generics or explicit types
8. **App Router conventions** — use `page.tsx`, `layout.tsx`, `loading.tsx` patterns
9. **Fonts loaded via `next/font/google`** in `src/app/layout.tsx`
10. **New components go in the correct folder** — ui (atomic), sections (page blocks), layout (structural)

## Running the Project
```bash
npm install
npm run dev        # Development server on http://localhost:3002
npm run build      # Production build
npm run type-check # TypeScript validation
npm run lint       # ESLint
```

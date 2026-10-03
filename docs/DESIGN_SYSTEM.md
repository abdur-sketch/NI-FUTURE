# NI FUTURE Design System

Phase 1 establishes a visual foundation without redesigning the full public homepage. The implementation follows this dependency direction:

`tokens → primitives → components → pages`

## Brand direction

- Positioning: **NI FUTURE — Future Starts Here.**
- Visual language: white, premium green, forest, and neutral.
- Tone: modern, youthful, trustworthy, educational, technology-oriented, and Islamic through values rather than ornament.
- Existing navy/orange page styles remain temporarily available for backward compatibility and will be migrated page-by-page.

## Accessibility

The semantic foreground/background pairs are verified by `tests/design-system.test.mjs` using the WCAG relative-luminance algorithm.

- Normal text target: at least 4.5:1.
- Large text and visible component boundaries: at least 3:1.
- Global `:focus-visible` uses a three-pixel ring with offset.
- Interactive controls have a minimum height of 44px.
- Motion is reduced through `prefers-reduced-motion`.
- Dialogs include an accessible name, modal semantics, focus trap, Escape close, focus restoration, and body scroll locking.

## Responsive targets

The layout tokens and component breakpoints cover 360, 390, 430, 768, 1024, and 1440px. Containers use a fluid gutter with a 1248px maximum. Visual browser verification remains a separate release gate and must not be inferred from source-level responsive checks.

## Preview

`/design-system` is dynamically available in development and staging. It returns not found when the resolved Firebase project is production.

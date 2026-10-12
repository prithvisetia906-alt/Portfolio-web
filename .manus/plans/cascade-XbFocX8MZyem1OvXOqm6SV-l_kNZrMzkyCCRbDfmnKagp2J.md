# OGGY — 3D Creative Portfolio Implementation Plan

## Goal

Build a premium, production-quality, responsive single-page portfolio website for the fictional creative professional **OGGY**. The site is a freelancer portfolio template/demo intended to demonstrate capability across personal portfolios, 3D websites, game websites, creative agency sites, startup landing pages, interactive product pages, and modern responsive web experiences.

The first five seconds must clearly communicate: **OGGY = 3D + creativity + technology + interactive experiences.** The hero must be memorable through an interactive, mouse-aware 3D face/character, while the rest of the page proves breadth through selected work, services, skills, experience, testimonials, process, and a strong contact conversion path.

The managed website has been initialized at `D:\projects\Portfolio web` as **OGGY — 3D Creative Portfolio**. Implementation begins only after this plan is approved.

## Design direction

### Design movement

**Playful editorial 3D studio portfolio**: a light, art-directed interface combining award-site editorial typography, soft clay-like 3D forms, and carefully paced interaction. The visual language should feel authored by a creative technologist rather than assembled from generic cards or AI gradients.

### Core principles

1. **Lightness with precision** — warm whites and soft pastel accents create an optimistic canvas; dark ink typography and restrained contrast preserve readability.
2. **3D as narrative** — every 3D object belongs to the story of the section it supports; avoid random decorative placement.
3. **Editorial asymmetry** — use oversized headlines, irregular project compositions, generous whitespace, and small technical labels instead of repetitive centered grids.
4. **Purposeful motion** — motion communicates depth, responsiveness, and craft; it must slow down or simplify under reduced-motion settings.

### Color philosophy

The base is warm white/off-white with very light gray structural surfaces. Lavender, pastel blue, mint, peach, and soft yellow are used as small moments of personality and wayfinding. The ownable brand color is **Oggy Lilac** (`#B9A7FF`), paired with deep ink (`#24212B`) for type and borders. Gradients stay subtle and atmospheric, never neon or high-contrast.

### Layout paradigm

Use a **scrolling art-directed canvas** rather than a conventional marketing grid: a sticky top nav, a two-column hero, overlapping/offset project compositions, a full-bleed featured environment, and section-level narrative transitions. On small screens, collapse into a single column while preserving the visual rhythm through spacing, object scale, and horizontal metadata rows.

### Signature elements

- A custom OGGY wordmark with a small lilac abstract 3D icon.
- Soft clay 3D forms with oversized expressive eyes and cursor-aware motion.
- Small uppercase technical labels, project numbers, orbit paths, and thin curved guide lines used as a quiet studio-system motif.

### Interaction philosophy

Interactions should feel like the site is gently responding to the visitor: the hero face follows the cursor, buttons have a restrained magnetic pull, cards reveal extra project detail on hover, and scroll drives depth in the featured environment and timeline. Touch devices use safe automatic motion or touch proximity rather than requiring hover. All interactions must remain non-blocking and preserve layout stability.

### Animation system

- Initial page load: short, low-intensity entrance reveal with a subtle loading mark.
- Hero: floating idle motion, cursor-following glow, eye/pupil tracking, slight head rotation, and staggered text reveal.
- Sections: IntersectionObserver-driven reveal classes with opacity/translate/clip-path transitions.
- About/featured work: scroll progress maps to gentle object rotation and layered parallax.
- Work cards: image/3D preview offset, typography shift, metadata reveal, and cursor treatment.
- Buttons: small magnetic movement and press feedback; no large distracting spring effects.
- Navigation: translucent/blurred treatment and compact spacing after scroll.
- Skills: orbit rotation pauses/brightens on hover and exposes a short technology description.
- Experience: timeline line progress is tied to section visibility.
- `prefers-reduced-motion: reduce`: disable mouse tracking, parallax, large transforms, and auto-rotation; retain short opacity/color transitions only.

### Typography system

Use a premium display face for editorial headlines and a clean modern sans-serif for body copy and interface labels. Recommended implementation: a display face such as **DM Serif Display** or **Instrument Serif** for selected oversized headlines, paired with **Manrope** or **Inter** for body/UI. Headings are bold/large with tight leading; metadata is uppercase, small, and letter-spaced. Use `clamp()` sizing so the hero remains expressive without causing mobile overflow.

### Brand essence and voice

- **Positioning:** OGGY builds playful 3D worlds and interactive digital products for clients who want more than a normal website.
- **Personality:** curious, tactile, precise.
- **Voice:** concise, imaginative, technically credible; avoid generic filler.
- Example headline language: “IMAGINING WORLDS THAT MOVE.”
- Example supporting language: “Have an idea that deserves more than a normal website?”

### Wordmark and logo

Create the wordmark in code using a distinct display treatment: oversized OGGY lettering with custom letter spacing and a small CSS/Three.js lilac abstract 3D mark. Use the same mark in the nav, hero, footer, and favicon/metadata where practical.

## Implementation approach

### Stack

Use the initialized flexible web scaffold and implement a React + TypeScript site. Prefer Vite-compatible React structure if supplied by the scaffold. Use:

- Three.js with React Three Fiber and Drei for lightweight interactive geometry.
- Framer Motion or GSAP for accessible UI motion; use one primary motion system consistently.
- CSS modules or a clear global stylesheet with CSS custom properties; use Tailwind only if already present in the scaffold, avoiding unnecessary setup churn.
- Semantic HTML, CSS `clamp()`, responsive breakpoints, and `@media (prefers-reduced-motion: reduce)`.

Avoid relying on heavy external GLB assets for the core experience. Build the hero face and background forms from optimized primitives/materials so the demo stays fast and self-contained. Use CSS/SVG/Canvas-generated visual treatments for project cards where a full image asset is not necessary; if custom art is generated later, keep it lazy-loaded and scoped to a planned placement.

### Application structure

Organize the project into small reusable components rather than one large page file:

```text
D:\projects\Portfolio web\
├─ public/
│  ├─ manus-routes.json
│  └─ favicon/ or static brand assets
├─ src/
│  ├─ app/ or pages/              # page shell, metadata, route entry
│  ├─ components/
│  │  ├─ BrandMark.tsx
│  │  ├─ Navigation.tsx
│  │  ├─ MagneticButton.tsx
│  │  ├─ SectionLabel.tsx
│  │  ├─ Reveal.tsx
│  │  ├─ HeroFaceScene.tsx
│  │  ├─ FloatingForms.tsx
│  │  ├─ AboutObjectScene.tsx
│  │  ├─ WorkCard.tsx
│  │  ├─ NebulaRunScene.tsx
│  │  ├─ ServiceCard.tsx
│  │  ├─ TechOrbit.tsx
│  │  ├─ ExperienceTimeline.tsx
│  │  ├─ TestimonialRail.tsx
│  │  ├─ ProcessSteps.tsx
│  │  ├─ ContactForm.tsx
│  │  └─ Footer.tsx
│  ├─ data/
│  │  ├─ projects.ts
│  │  ├─ services.ts
│  │  ├─ technologies.ts
│  │  ├─ experience.ts
│  │  ├─ testimonials.ts
│  │  └─ process.ts
│  ├─ hooks/
│  │  ├─ useReducedMotion.ts
│  │  ├─ usePointerTarget.ts
│  │  ├─ useInViewProgress.ts
│  │  └─ useMagneticHover.ts
│  ├─ styles/
│  │  ├─ tokens.css
│  │  ├─ globals.css
│  │  └─ sections.css
│  └─ main.tsx
├─ app.config.ts              # preserve scaffold conventions; add literal logo URL if required
├─ package.json
└─ ... scaffold configuration
```

The exact scaffold folders may differ; preserve existing conventions and adapt the module boundaries without introducing duplicate app roots.

### Page sections and required content

1. **Navigation** — sticky, functional anchors to WORK, ABOUT, SERVICES, EXPERIENCE, CONTACT; compact blurred/translucent state after scroll; HIRE OGGY pill.
2. **Hero** — OGGY brand, identity labels, “IMAGINING WORLDS THAT MOVE.”, supporting copy, View My Work and Let’s Work Together CTAs, interactive 3D face, floating light geometry, cursor glow.
3. **About** — “MAKING DIGITAL THINGS FEEL ALIVE.”, fictional copy spanning 3D design, game environments, interactive experiences, creative development, motion design and web experiences; rotating 3D object; fictional-demo stats 08+, 42, 18, 12 with clear fictional framing.
4. **Selected Work** — six projects with mixed compositions: 01 NEBULA RUN (3D Game Environment), 02 MONO (Interactive Character), 03 LUMA (Creative Web Experience), 04 PIXELVERSE (Game World Design), 05 ORBIT (Interactive Product Experience), 06 DREAMSCAPE (3D Motion Experiment). Each includes visual treatment, category, description, technologies, and View Project CTA.
5. **Featured NEBULA RUN** — full-width interactive environment with rocks, structures, portals, character, clouds, layered depth; scroll reveals role tags (3D DESIGN, GAME DEVELOPMENT, ENVIRONMENT ART), technology tags (Blender, Three.js, Unity, WebGL), project details, and final CTA.
6. **Services** — six interactive cards with supplied descriptions and small animated 3D icon/preview on hover: 3D GAME DESIGN, CREATIVE DEVELOPMENT, 3D WEB EXPERIENCES, MOTION & INTERACTION, UI / UX DESIGN, DIGITAL PRODUCTS.
7. **Skills** — orbit/3D visualization for Blender, Three.js, React, Next.js, JavaScript, TypeScript, Unity, WebGL, Figma, GSAP, HTML, CSS; hover/focus shows a short description and highlights the technology.
8. **Experience** — clearly fictional timeline: 2026 Independent Creative Developer; 2024 3D Game Designer — PixelForge Studio; 2022 Junior 3D Artist — MotionLab. Animate the progress line on scroll.
9. **Testimonials** — three explicitly fictional demo testimonials using the supplied quotes and names Maya Chen, Daniel Ross, and Alex Morgan.
10. **Process** — four scroll-animated steps: DISCOVER, DESIGN, BUILD, LAUNCH with the supplied descriptions.
11. **Contact** — “LET’S BUILD SOMETHING UNEXPECTED.”, support line, Start a Project and Email Oggy CTAs, functional front-end form fields Name, Email, Project Type, Budget, Message, plus fictional placeholder social links.
12. **Footer** — large OGGY logo, “3D DESIGNER · CREATIVE DEVELOPER · DIGITAL ARTIST”, nav/social links, copyright, and “Designed to make digital experiences feel alive.”

### 3D implementation details

- `HeroFaceScene`: use a low-poly/smooth primitive head, pastel clay material, separate eye whites/irises/pupils, tiny nose/mouth shapes, and a lilac accent. Compute a normalized pointer target and damp rotation/eye offsets with `lerp`; clamp all movement. Add an idle sine-based float. Disable or reduce pointer response on touch and reduced-motion devices.
- `FloatingForms`: use a small number of instanced or memoized spheres/cubes/blobs with slow deterministic motion and opacity; avoid per-frame React state updates.
- `AboutObjectScene`: a single hero object with scroll progress mapped to rotation and vertical offset; mount lazily when near viewport.
- `NebulaRunScene`: compose low-cost primitives for rocks, towers, portal rings, clouds, and a tiny character. Use depth layering and scroll progress; do not load a heavy model unless the scaffold or generated assets make it clearly worthwhile.
- `TechOrbit`: CSS/DOM orbit or lightweight Canvas/Three.js rings with accessible keyboard focus targets for technologies; do not make hover the only way to access descriptions.

### Responsiveness and accessibility

- Desktop: immersive split layouts and larger scene canvases.
- Tablet: reduce scene footprint, simplify overlap, keep text/CTA hierarchy.
- Mobile: one-column flow, no horizontal scrolling, smaller/lazier 3D scenes, automatic movement instead of required hover, readable headings, full-width or wrapped buttons.
- Use semantic headings in order, visible focus states, keyboard-accessible nav/cards/tech items, descriptive labels, `aria-live` only where status changes need announcement, and correct form labels.
- Keep fictional demo claims explicit in copy or a small “fictional portfolio demo” note near stats, experience, and testimonials.

### Managed-site/runtime requirements

After plan approval and before first code batch:

1. Inspect `webdev.config` with the managed Webdev runtime endpoint and reuse/enable TypeScript diagnostics per the returned project guidance.
2. Declare the session runtime port with the Webdev config API, then start the dev server bound only to `127.0.0.1` on the declared exact port with strict-port behavior.
3. Add and maintain `public/manus-routes.json` with the complete page route set, at minimum `{ "routes": [{ "path": "/", "title": "OGGY — 3D Creative Portfolio" }] }`.
4. Preserve the initialized project declaration and existing scaffold files; do not reinitialize Git or overwrite unrelated work.
5. If project-logo metadata is required by the scaffold, set a quoted durable HTTPS `logoUrl` literal in `app.config.ts` only after a suitable asset URL exists.

## Verification plan

- Run the scaffold’s typecheck/lint/build commands and resolve all actionable diagnostics.
- Start the local dev server on the declared managed runtime port and confirm the root route returns HTTP 200; separately request `/manus-routes.json` and verify it returns valid JSON rather than SPA fallback HTML.
- Inspect source and runtime behavior for every required section and anchor, including functional CTA navigation and form controls.
- Verify responsive layouts at desktop, tablet, and narrow mobile widths for no horizontal overflow, overlapping text, clipped buttons, or unreadable type.
- Verify hero face pointer behavior, idle motion, reduced-motion fallback, and touch-safe behavior; ensure 3D scenes are lazy or lightweight enough not to block the first render.
- Verify keyboard focus and accessible labels for navigation, buttons, project cards, orbit technologies, form fields, and social links.
- Verify fictional status is explicit for portfolio-demo stats, experience, and testimonials.
- Use a read-only implementation review after the first complete build to trace the page sections, data modules, 3D components, route manifest, and responsive/reduced-motion logic; fix only confirmed issues and re-run affected checks.

## Assumptions and risks

- The initialized flexible scaffold supports a local React + TypeScript workflow; exact entry filenames and existing package choices will be inspected after approval and preserved where compatible.
- No user-supplied brand assets are required; the wordmark and core 3D forms will be authored in code so the demo is self-contained and does not depend on broken remote image URLs.
- The contact form is front-end/demo behavior unless a backend is explicitly requested later; it should validate fields and provide a clear non-submitting demo success state rather than implying a real email delivery system.
- A complete real-time environment with heavy GLB assets could harm performance; the plan intentionally uses optimized procedural geometry and layered parallax while preserving the requested interactive 3D impression.
- External fonts may be loaded only if the scaffold and runtime permit it; provide resilient fallbacks so typography remains readable offline.
- The managed initialization is complete, but publishing, custom domains, and external integrations are outside this implementation unless separately requested.

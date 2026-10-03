---
name: Tactile Modern SaaS
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#434655'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#515f74'
  on-secondary: '#ffffff'
  secondary-container: '#d5e3fc'
  on-secondary-container: '#57657a'
  tertiary: '#744e00'
  on-tertiary: '#ffffff'
  tertiary-container: '#946400'
  on-tertiary-container: '#ffeedc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#d5e3fc'
  secondary-fixed-dim: '#b9c7df'
  on-secondary-fixed: '#0d1c2e'
  on-secondary-fixed-variant: '#3a485b'
  tertiary-fixed: '#ffddb0'
  tertiary-fixed-dim: '#ffba46'
  on-tertiary-fixed: '#281800'
  on-tertiary-fixed-variant: '#614000'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-hero:
    fontFamily: Inter
    fontSize: 44px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Inter
    fontSize: 34px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.005em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
  space-2xl: 3.5rem
---

## Brand & Style
The design system delivers an intelligent, hyper-focused project management environment engineered for speed, tactile clarity, and high-density productivity. It bridges the precision of enterprise software with the physical feedback of physical desk artifacts—index cards, sticky notes, and tactile control panels.

The visual style blends modern SaaS utility with subtle physical depth: crisp micro-borders, clean surface shifts, deliberate ambient shadows, and luminous accent signals. It communicates effortless command, operational calm, and algorithmic momentum for modern engineering and product teams.

## Colors
The palette leverages a crisp, multi-tiered light surface architecture anchored by an authoritative electric blue.

- **Primary (`#2563EB`)**: Drives core CTAs, active AI prompt states, real-time sync pulses, and selection rings.
- **Secondary (`#475569`)**: Governs metadata, supporting navigation, subtle icons, and structural divider labels.
- **Tertiary Accent (`#CA8A04` / `#FEF08A`)**: Reserved for sticky reminders, AI sprint insights, and triage highlights.
- **Semantic Accents**: Emerald (`#059669` / `#D1FAE5`) denotes operational velocity and completed task branches; Indigo (`#4F46E5` / `#E0E7FF`) indicates autonomous agent processing.
- **Neutrals & Surfaces**: Background surfaces alternate between pristine canvas (`#FFFFFF`), base environment (`#F8FAFC`), and subtle card containers (`#F1F5F9`). Text hierarchy rests on slate ink tones (`#0F172A` for primary headlines, `#475569` for body copy, and `#94A3B8` for secondary cues).

## Typography
Typography is strictly configured using Inter to deliver high legibility, neutral metric rhythm, and dense information readability across compact mobile displays. 

Hero and headline scales employ tight tracking (`-0.03em` to `-0.015em`) and solid vertical balance to ground viewport impact. Body copy prioritizes optical balance at 14px with relaxed line heights for scanning complex issue threads and automated ticket workflows. Micro-labels and uppercase status tags use subtle letter-spacing expansions (`0.02em` to `0.04em`) to maintain sharp contrast against soft backgrounds.

## Layout & Spacing
The layout follows a modular 8pt dynamic grid tuned for mobile handheld reachability and rapid vertical progression. 

Mobile viewports use a fluid single-column spine with `1rem` outer horizontal margins and `0.75rem` card gutters, expanding into multi-column dashboard previews at 768px tablet breakpoints. Sections adhere to an alternating rhythm using `space-xl` and `space-2xl` boundaries, maintaining continuous visual flow while preserving isolated focus blocks for feature interactives, interactive kanban widgets, and performance metrics.

## Elevation & Depth
Elevation emphasizes tangible tactile layering over stark floating dropoffs, pairing micro-borders with multi-stop ambient lighting:

- **Level 0 (Base Canvas)**: Flat `#F8FAFC`, non-elevated backdrop.
- **Level 1 (Card & Module Surfaces)**: Pure white `#FFFFFF` paired with a 1px border of `#E2E8F0` and dual ambient shadow: `0 1px 3px rgba(15, 23, 42, 0.04), 0 4px 12px rgba(15, 23, 42, 0.03)`.
- **Level 2 (Active Artifacts & Triage Elements)**: Raised modules and sticky highlights utilize `0 4px 6px -1px rgba(15, 23, 42, 0.05), 0 10px 20px -3px rgba(15, 23, 42, 0.04)` over a subtle `border: 1px solid #CBD5E1`.
- **Level 3 (Modals, Overlays, and Mobile Sheets)**: Floating drawers and command palettes leverage `0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)` with backdrop-filter blur (`12px`) for optical separation.

## Shapes
A baseline roundedness scale of `2` provides smooth, balanced geometry. Core container cards, interactive panels, and input surfaces implement a cohesive `0.5rem` (`8px`) to `1rem` (`16px`) radius. High-priority action pills, status tags, and metadata badges deviate into pure pill shapes (`9999px`) to emphasize fluidity and touch targets against structural card borders.

## Components

### Buttons
- **Primary CTA**: `#2563EB` solid fill, white text, 12px vertical / 20px horizontal padding, subtle inner inset highlight (`inset 0 1px 0 rgba(255, 255, 255, 0.2)`), paired with a tactile drop shadow (`0 2px 4px rgba(37, 99, 235, 0.24)`). On press, transforms down 1px with reduced shadow.
- **Secondary Action**: Background `#FFFFFF`, border `1px solid #E2E8F0`, text `#0F172A`, hover background `#F8FAFC`.
- **Ghost/Tertiary**: Text `#475569`, transparent background, active state `#F1F5F9`.

### Badges & Status Chips
- Fully rounded pill geometry (`9999px`).
- **AI Processing**: Indigo tint (Background `#EEF2FF`, Text `#4338CA`, Border `1px solid #C7D2FE`).
- **Sprint Success / Ready**: Emerald tint (Background `#ECFDF5`, Text `#047857`, Border `1px solid #A7F3D0`).
- **Sticky / Warning**: Yellow tint (Background `#FEF9C3`, Text `#A16207`, Border `1px solid #FEF08A`).

### Cards & Ticket Modules
- Built on `#FFFFFF` surface with `1px solid #E2E8F0` micro-border, `16px` border-radius, and Level 1 elevation.
- Internal padding spans `16px` (mobile) to `24px` (tablet/desktop).
- Header zones integrate quick metadata rows: ticket ID in `#64748B`, priority indicator pill, and assignees stacked with `2px` white outline rings.

### Form Inputs & Search Command
- Crisp white fill, `1px solid #CBD5E1` border, `8px` corner radius.
- Focus state activates an electric blue bounding halo: `border-color: #2563EB` with `box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12)`.
- Icon prefixes (search glass, AI prompt spark) rendered in `#64748B`.

### Triage / Sticky Note Artifacts
- Tactile sticky cards use `#FEF08A` background with `#713F12` typography and soft yellow ambient drop shadow (`0 4px 12px rgba(202, 138, 4, 0.12)`). Designed for dynamic AI reminders and sprint roadblocks.
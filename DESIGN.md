# Design Brief

## Direction
**ServiceHub** — Premium marketplace for professional services. Trustworthy, efficient, visually refined; escrow confidence + transparent quote negotiation. Categories: Home Repair, Cleaning, Design, IT, Marketing, Garden, Other.

## Tone
Refined minimalism with purposeful teal accents; professional yet approachable; clarity over decoration.

## Differentiation
Quote flow state badges (Pending → Offered → Accepted) make negotiation explicit and transparent; provider star ratings prominent; responsive card hierarchy guides attention.

## Color Palette

| Token       | OKLCH         | Role                                  |
|-------------|---------------|---------------------------------------|
| background  | 0.97 0.01 100 | Light cream page base; warm, open     |
| foreground  | 0.16 0.02 260 | Deep navy text; high contrast         |
| card        | 0.99 0.02 95  | White card surfaces; elevated         |
| primary     | 0.56 0.14 183 | Confident teal CTAs, quote actions    |
| secondary   | 0.88 0.06 95  | Soft beige badges; neutral            |
| accent      | 0.62 0.16 150 | Cyan active states, highlights        |
| destructive | 0.55 0.22 25  | Red cancellations, warnings           |

## Typography

- **Display:** Space Grotesk — geometric, bold headers (Hero `text-3xl bold`, H2 `text-xl semibold`)
- **Body:** DM Sans — precise copy (Label `text-sm medium`, Body `text-base`)
- **Mono:** JetBrains Mono — transaction amounts, invoice IDs

## Elevation & Depth

Minimal shadows; depth through borders + background layering. Cards elevated via 2px shadow; popovers with soft drop-shadow. No glows.

## Structural Zones

| Zone    | Background                 | Border          | Notes                          |
|---------|----------------------------|-----------------|--------------------------------|
| Header  | bg-card + border-b         | 1px border      | Nav toggle, search, profile    |
| Content | bg-card, alternating bg-background | —              | Service grid, quote sidebar    |
| Footer  | bg-secondary/10 + border-t | 1px border      | Escrow guarantee messaging     |

## Spacing & Rhythm

1rem (16px) gaps between sections; 12px card padding; 8px label-input spacing. Quote badges: compact 2.5px px / 0.5px py.

## Component Patterns

- **Buttons:** Teal primary, beige secondary, active scale-95, disabled opacity-50
- **Cards:** 12px radius, subtle border, hover shadow, cursor-pointer
- **Badges:** Rounded-full, state variants (pending=muted, offered=primary, accepted=accent, rejected=destructive, cancelled=muted)
- **Loading:** Skeleton screens with `loading-skeleton` (animate-pulse), spinner on detail load
- **Empty States:** Centered icon + text + CTA button
- **Error States:** bg-destructive/10, readable error message, retry button

## Motion

- **Entrance:** Cards fade-in 300ms on load; slide-in-from-bottom for modals (300ms)
- **Interaction:** Button active scale-95; hover shadow lift via transition-smooth (300ms)
- **Loading:** pulse-soft 2s animation for skeleton screens
- **State Changes:** Instant, no speculation; animations sync with data

## Responsive Design

Mobile-first breakpoints: base (mobile), sm (640px), md (768px), lg (1024px). Hamburger menu on mobile; sticky header; touch-friendly (44px min tap targets).

## Signature Detail

Quote state badges use distinct color coding (pending=muted, offered=teal, accepted=cyan, rejected=red, cancelled=muted) to make negotiation flow immediately obvious. Photo attachments in quote list items (max 4 thumbnails + overflow chip). Provider stars always visible in cards.

## Constraints

- No gradients; OKLCH values only
- No blur or glassmorphism
- Star ratings visible in all provider cards
- Quote state transitions synchronous
- Accessibility: AA+ contrast, focus rings visible, skip-to-content links

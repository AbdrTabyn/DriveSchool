# What was removed from the Assignment 2 CSS and what replaced it (Bootstrap 5.3.3)

This file tracks the move from a hand-written layout (Assignment 2) to
Bootstrap (Assignment 3): which manual rules were deleted and which
Bootstrap class now does that job. Keep the table updated if you remove
anything else.

## Containers and grid

| Before (hand-written CSS) | Removed | Replaced with |
|---|---|---|
| Custom grid built with `float` / manual `width` percentages for columns | ✅ | `container`, `container-fluid`, `row`, `col-12 col-md-6 col-lg-4`, etc. |
| Manual `max-width` and `margin: 0 auto` to center the page | ✅ | `container` (Bootstrap centers and constrains width on its own) |
| Custom `display: flex` to lay out cards in a row | ✅ | `row g-3` / `row g-4` (gutter utilities instead of custom margins) |

## Spacing and alignment

| Before | Removed | Replaced with |
|---|---|---|
| Manual `margin` / `padding` on blocks, cards, sections | ✅ | `p-4`, `m-4`, `mb-3`, `mt-5`, `gap-2`, `gap-3` |
| Custom `text-align: center` | ✅ | `text-center`, `text-md-end`, `text-lg-start` |

## Navigation

| Before | Removed | Replaced with |
|---|---|---|
| Custom hamburger button and CSS/JS to collapse the menu | ✅ | `navbar`, `navbar-expand-md/lg`, `navbar-toggler`, `collapse navbar-collapse` (Bootstrap JS bundle) |
| Manual background and hover colors for nav links | partly | `navbar-dark`, `nav-link`, `text-white-50`; the brand dark-blue background is kept in our own CSS (`.navbar.navbar-dark { background-color: var(--brand-dark); }`) since Bootstrap doesn't know our brand color |

## Buttons

| Before | Removed | Replaced with |
|---|---|---|
| Custom `.button`, `.button-outline` classes, manual `border-radius`, `padding` on buttons | ✅ | `btn`, `btn-primary`, `btn-outline-primary`, `btn-sm`, `btn-lg`, `disabled` attribute |
| Button color set with a direct `background-color` in markup | ✅ | Overriding Bootstrap's own CSS variables (`--bs-btn-bg`, `--bs-btn-hover-bg` in Abdurrakhim.css) instead of `!important` |

## Cards, badges, tables

| Before | Removed | Replaced with |
|---|---|---|
| Custom border/shadow for the instructor card | ✅ | `card`, `card-body`, `border`, `shadow-sm`, `h-100` |
| Custom circular frame for the instructor photo (`border-radius: 50%` by hand) | ✅ | `rounded-circle`, `object-fit-cover` |
| Custom rating badge | ✅ | `badge rounded-pill bg-primary` (brand blue applied via `.badge.bg-primary { background-color: #2f6fed; }` in base.css, no `!important`) |
| Custom striped/bordered table | ✅ | `table table-striped table-bordered table-hover`, `table-dark`, `align-middle` |

## Forms

| Before | Removed | Replaced with |
|---|---|---|
| Custom styling for `input` / `select` / `textarea` | ✅ | `form-control`, `form-select`, `form-check`, `form-check-input`, `form-label` |
| Custom form wrapper with manual spacing | ✅ | `fieldset`, `mb-3`, `border rounded-3 p-3` |

## Other

| Before | Removed | Replaced with |
|---|---|---|
| Manual positioning of the "back to top" / feedback button | ✅ | `position-fixed`, `bottom-0`, `end-0` / `start-0`, `m-4` (only `width/height/transition` remain in CSS, since Bootstrap has no utility for those) |
| Custom text wrap around the instructor/classroom photo | ✅ | `float-start`, `me-3`, `mb-2` (only `clear: left` remains in CSS for `blockquote`, since Bootstrap has no `clear` utility) |

## What's left in our own CSS, and why

The hand-written CSS is reduced to a correction layer: **brand colors**
(`--brand`, `--brand-dark`, etc.), heading **fonts** (`Georgia` for h2/h3 —
Bootstrap doesn't set a specific font), a few **exact pixel sizes** that
have no matching utility (`.instructor-photo { width: 80px; height: 80px; }`,
`.classroom-photo { width: 200px; }`), and isolated exceptions with no
matching utility class (`clear: left` on `blockquote`).

> ⚠️ Check before submitting: the number of `!important` declarations in
> the project — the assignment allows **one** for the whole project (the
> one currently justified by a comment in `nurasyl.css`). Every other
> `!important` in `base.css` needs to be removed and replaced by
> overriding Bootstrap's component CSS variables or relying on file load
> order instead.

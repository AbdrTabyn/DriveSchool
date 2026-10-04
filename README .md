# Drive School — driving school website (student project)

Student project for the "Introduction to Web Technologies" course.
Assignment 3: migrating the layout to Bootstrap 5.3.3.

## About the project

A multi-page driving school website: home, categories & prices, schedule,
about the school, instructors, fleet, contacts, colophon (how the site was
built). The site is static and runs from local files, with no domain or
hosting. Forms on the site don't submit anywhere yet — this is an early
stage of the project.

## Technologies

- HTML5 (semantic markup: `article`, `section`, `aside`, `figure`,
  `details`, `dl`, `blockquote`, `q`, `abbr`, `kbd`, `samp`, `mark`, etc.)
- **Bootstrap 5.3.3** — loaded via CDN (jsDelivr) on every page, the
  version is noted in a comment in each page's `<head>`
- Our own CSS — a thin correction layer on top of Bootstrap: brand colors,
  heading fonts, a handful of exact sizes. A full list of what was removed
  from the hand-written CSS and what replaced it is in
  [`CHANGES.md`](./CHANGES.md)

## Repository structure

```
/
├── index.html          Home
├── price.html           Categories & prices
├── schedule.html         Schedule
├── about.html            About the school
├── instructor.html       Instructors
├── fleet.html            Fleet
├── contacts.html         Contacts
├── colophon.html          How the site was built
├── css/
│   ├── base.css           shared base layer for all pages
│   ├── Abdurrakhim.css    personal layer (index.html, price.html, schedule.html)
│   ├── zharkynbek.css     personal layer (about.html, instructor.html, colophon.html)
│   └── nurasyl.css        personal layer (contacts.html, fleet.html)
├── images/                photos (instructors, classroom, fleet, schedule)
├── screenshots/           4 responsiveness screenshots (see below)
├── CHANGES.md             list of removed hand-written CSS and its Bootstrap replacement
├── ai-log.md              log of questions asked to AI for this assignment
└── README.md              this file
```

## Team and page ownership

| Member | Pages | Personal CSS |
|---|---|---|
| Abdurrakhim Yestaiuly | index.html, price.html, schedule.html | Abdurrakhim.css |
| Zharkynbek Orynbasar | about.html, instructor.html, colophon.html | zharkynbek.css |
| Adilbek Nurasyl | contacts.html, fleet.html | nurasyl.css |

*(if the actual team is different, update this table to match your real
members and the `meta name="author"` tags on each page)*

## How to open the project

The files are static — no special server is required, just open any
`.html` file in a browser. Alternatively, run a local server (e.g. a Live
Server extension or your IDE's built-in server) so relative image paths
resolve correctly.

## Key Bootstrap decisions

- **container vs container-fluid** — every page uses `container` (a fixed,
  readable text width), except `about.html`, which uses `container-fluid`
  because the instructor's photo with `float-start` needs more room to wrap
  text around it on medium screens. The reasoning is left as a comment
  directly in `about.html`.
- **Grid nesting** — a `row` nested inside a `col` appears in `price.html`
  (the phone/date fields in the trial-lesson form) and in `instructor.html`
  (the "How training works" block).
- **Bootstrap component from the docs** — cards (`card`) for instructors
  and a styled table (`table-striped`, `table-bordered`) for the schedule
  and fleet pages; changes from the original markup are noted in a comment
  directly above the code.
- **Responsiveness** — the navbar collapses into a `navbar-toggler` below
  the `md`/`lg` breakpoint depending on the page; individual blocks are
  hidden/shown or re-aligned via `d-none d-sm-block`, `d-none d-md-block`,
  `text-center text-md-end`, etc.

## Screenshots (`/screenshots`)

The same page (`instructor.html`) at three widths, plus a separate frame
showing the collapsed navigation:

1. `01-mobile-375.png` — 375px width (phone)
2. `02-tablet-768.png` — 768px width (tablet)
3. `03-desktop.png` — desktop, full window width
4. `04-nav-collapsed.png` — navigation collapsed into a hamburger at
   mobile width (same frame as the mobile screenshot)

## Checks

- W3C validation: every page must pass [validator.w3.org](https://validator.w3.org)
  with zero errors.
- No horizontal scroll at 375px width on any page.
- At most one `!important` in the whole project (see the warning in
  `CHANGES.md`) and no inline `style="..."` attributes.

## AI log

All questions asked to AI while working on this assignment are recorded in
[`ai-log.md`](./ai-log.md).

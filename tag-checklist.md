# Drive School — Bootstrap / CSS Checklist

This checklist describes the main Bootstrap classes and custom CSS used in the final Drive School website.

## Bootstrap Layout

Used across the website:

- `container` — main content width
- `container-fluid` — full-width responsive content where needed
- `row` — Bootstrap grid row
- `col-*` — responsive columns
- `row-cols-*` — responsive groups of cards
- `g-*` — grid gaps

## Responsive Design

Bootstrap responsive classes are used to adapt the website to different screen sizes:

- `navbar-expand-lg`
- `col-md-*`
- `col-lg-*`
- `row-cols-sm-*`
- `row-cols-lg-*`
- `d-flex`
- `flex-wrap`
- `d-none`
- `img-fluid`

The layout was checked at desktop and phone widths.

## Navigation

The same navigation structure is used across the main pages.

Bootstrap classes include:

- `navbar`
- `navbar-dark`
- `navbar-expand-lg`
- `navbar-brand`
- `navbar-nav`
- `nav-item`
- `nav-link`
- `active`

The current page is highlighted using the `active` state.

## Tables

Bootstrap table classes are used for pricing, schedule, instructors and fleet information:

- `table`
- `table-striped`
- `table-bordered`
- `table-dark`
- `table-responsive`

Table styles were reviewed to keep their appearance consistent across pages.

## Forms

Bootstrap form classes are used for the trial lesson and other forms:

- `form-control`
- `form-select`
- `form-check`
- `form-check-input`
- `form-check-label`
- `btn`
- `btn-primary`
- `btn-outline-primary`

Forms use responsive Bootstrap grid classes where necessary.

## Cards and Content

Bootstrap cards and utility classes are used for instructors, training stages, schedule and other content:

- `card`
- `card-body`
- `card-title`
- `border`
- `rounded`
- `shadow-sm`
- `p-*`
- `m-*`
- `gap-*`

## Images

Images use responsive Bootstrap classes such as:

- `img-fluid`
- `w-100`

Custom CSS is used only where an exact image height or crop is needed.

## Custom CSS

Bootstrap provides the main layout and components.

The project's own CSS is used as a small correction layer for:

- Drive School brand colours;
- heading fonts;
- navigation appearance;
- exact image sizes where necessary;
- mobile navigation behaviour;
- small visual corrections.

The main project colours are:

- `#0f1f3d` — dark navy
- `#2f6fed` — primary blue
- `#f0f4fb` — light background
- `#d6e0f0` — borders
- `#ffffff` — white

## Final Review

Before submission we checked:

- consistent navigation;
- responsive Bootstrap layout;
- consistent tables and cards;
- responsive images;
- forms;
- contact information;
- mobile layout;
- links between pages;
- custom CSS usage.

# Drive School — Driving School Website

Student project for the **Introduction to Web Technologies** course.

## About the Project

Drive School is a multi-page responsive driving school website. It includes information about training categories and prices, schedule, the school, instructors, fleet and contacts.

For the Midterm Project, all pages were reviewed as one complete website. The main goal was to make the project consistent, responsive and logically complete.

## Technologies

- HTML5 with semantic markup
- CSS3
- Bootstrap 5.3.3
- Responsive Bootstrap Grid
- Bootstrap components and utility classes

Our own CSS is used as a small correction layer on top of Bootstrap for brand colours and several custom elements.

## Repository Structure

```text
/
├── index.html             Home
├── price.html             Categories & prices
├── schedule.html          Schedule
├── about.html             About the school
├── instructors.html       Instructors
├── fleet.html             Fleet
├── contacts.html          Contacts
├── css/
│   ├── base.css           Shared styles
│   ├── Abdurrakhim.css    index, price, schedule
│   ├── zharkynbek.css     about, instructors
│   └── nurasyl.css        contacts, fleet
├── images/                Website images
├── screenshots/           Desktop and mobile screenshots
└── README.md
```

## Team and Page Ownership

| Member | Pages | Personal CSS |
| --- | --- | --- |
| Abdurrakhim Yestaiuly | `index.html`, `price.html`, `schedule.html` | `Abdurrakhim.css` |
| Zharkynbek Orynbasar | `about.html`, `instructors.html` | `zharkynbek.css` |
| Adilbek Nurasyl | `contacts.html`, `fleet.html` | `nurasyl.css` |

## Midterm Changes

For the Midterm, the team reviewed all pages and made them work as one consistent website.

Main changes:

- Navigation was unified across all pages.
- Active navigation states were made consistent.
- Phone number, email and address were checked and corrected where necessary.
- The footer information was unified.
- Table header colours and other visual elements were made consistent.
- Cards, buttons, spacing and page colours were reviewed for the same visual style.
- Forms and content blocks were improved for responsive layouts.
- Image cards were adjusted for different screen sizes.
- Mobile navigation was reviewed.
- Semantic HTML elements from previous assignments were preserved and used on the real website pages.
- `colophon.html` was removed because it was an educational demonstration of HTML tags rather than a page needed by a real Drive School visitor.

The website now uses the same main colour palette:

- `#0f1f3d` — dark navy
- `#2f6fed` — primary blue
- `#f0f4fb` — light background
- `#d6e0f0` — borders
- `#ffffff` — white

## Three User Journeys

### 1. Compare Training Categories

**Start:** Home page.

The visitor opens **Categories & Prices**, compares categories A, B and C, checks their prices and training stages, and then uses the trial lesson form.

**End:** The visitor has chosen a suitable category and prepared a trial lesson request.

### 2. Choose an Instructor

**Start:** Instructors page.

The visitor compares instructor experience, categories and ratings, checks available days and chooses a contact or booking action.

**End:** The visitor has selected an instructor and knows how to contact the school.

### 3. Check the Fleet and Find the School

**Start:** Fleet page.

The visitor checks the available training vehicles and their categories, views the vehicle photographs, and then uses the Contacts page or footer to find the address, phone number or email.

**End:** The visitor knows which vehicles are available and how to contact or find Drive School.

## Quality Pass

Before the Midterm submission, the website was reviewed as one complete project.

We checked and corrected:

- navigation consistency;
- phone, email and address information;
- table and card styling;
- responsive layouts;
- footer placement;
- image responsiveness;
- links between pages;
- mobile navigation;
- unnecessary demonstration content.

The final review focused on making pages written by different team members look and behave like one website.

## How to Open the Project

The website is static and does not require a backend.

Open `index.html` directly in a browser or use a local server such as **Live Server** in VS Code.

## Final Checks

Before submission, the team checks:

- all pages and navigation links work;
- images load correctly;
- contact information is consistent;
- there is no horizontal scrolling at phone width;
- desktop and mobile layouts work correctly;
- W3C validation reports no HTML errors;
- the browser console contains no errors;
- Bootstrap remains responsible for the main layout.

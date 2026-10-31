# Drive School — Driving School Website

## About the Project

Drive School is a multi-page responsive driving school website. It includes information about training categories and prices, schedule, the school, instructors, fleet and contacts.

The project was developed step by step during the course. For the Midterm, the team focused on creating one consistent and responsive website. In Assignment 4, interactive functionality was added using **JavaScript and jQuery**.

## Technologies

- HTML5 with semantic markup
- CSS3
- Bootstrap 5.3.3
- Responsive Bootstrap Grid
- JavaScript
- jQuery 3.7.1

Bootstrap is responsible for the main layout and components. Existing CSS and Bootstrap classes are also used for dynamically created elements.

## Repository Structure

```text id="rv5jbx"
/
├── index.html              Home
├── price.html              Categories & prices
├── schedule.html           Schedule
├── about.html              About the school
├── instructors.html        Instructors
├── fleet.html              Fleet
├── contacts.html           Contacts
│
├── css/
│   ├── base.css            Shared styles
│   ├── Abdurrakhim.css     index, price, schedule
│   ├── zharkynbek.css      about, instructors
│   └── nurasyl.css         contacts, fleet
│
├── js/
│   ├── main.js             Shared JavaScript
│   ├── index.js            Home functionality
│   ├── price.js            Prices functionality
│   ├── schedule.js         Schedule functionality
│   ├── about.js            About functionality
│   ├── instructors.js      Instructors functionality
│   ├── contacts.js         Contacts functionality
│   └── fleet.js            Fleet functionality
│
├── old js/                 Previous JavaScript versions
├── images/                 Website images
├── screenshots/            Desktop and mobile screenshots
└── README.md
```

## Team and Page Ownership

| Member | Pages | Personal CSS |
| --- | --- | --- |
| Abdurrakhim Yestaiuly | `index.html`, `price.html`, `schedule.html` | `Abdurrakhim.css` |
| Zharkynbek Orynbasar | `about.html`, `instructors.html` | `zharkynbek.css` |
| Adilbek Nurasyl | `contacts.html`, `fleet.html` | `nurasyl.css` |

Each team member is responsible for the functionality of their assigned pages.

## Main Website Features

The website provides:

- information about driving licence categories;
- training prices;
- lesson schedules;
- instructor information;
- training vehicle information;
- school information and contacts;
- responsive navigation;
- forms and interactive elements;
- dynamic content created with JavaScript and jQuery.

## Assignment 4 — JavaScript & jQuery

For Assignment 4, the team added interactive functionality and rewrote selected existing JavaScript features using **jQuery 3.7.1**.

The project demonstrates:

- jQuery selectors;
- DOM traversal;
- `$(this)`;
- method chaining;
- `.text()`, `.html()`, `.val()`, `.attr()` and `.prop()`;
- class manipulation;
- dynamic element creation;
- `.append()` and `.appendTo()`;
- `.on()` event handling;
- delegated events;
- multiple event types;
- `preventDefault()`;
- fade and slide effects;
- form validation.

Previous plain-JavaScript versions are preserved separately and are not connected to the active website.

## Page Functionality

### Home

The Home page includes dynamic training program cards, category filtering and interactive form functionality.

### Categories & Prices

The Prices page includes program selection, instructor selection, a price calculator and trial lesson form validation.

### Schedule

The Schedule page includes dynamically generated lesson cards, search, category and lesson-type filters and lesson selection.

### About & Instructors

These pages provide information about the driving school and instructors with additional interactive JavaScript functionality.

### Fleet & Contacts

These pages provide information about training vehicles and school contacts with interactive functionality for users.

## User Journeys

### 1. Compare Training Categories

The visitor starts from the Home page, compares training categories and continues to the Prices page to select a suitable program.

### 2. Choose a Lesson or Instructor

The visitor can check the Schedule and Instructors pages, compare available options and continue to booking.

### 3. Check the Fleet and Contact the School

The visitor can view available training vehicles and use the Contacts page to find the school's address and contact information.

## Quality Checks

Before submission, the team checks:

- all pages and navigation links work;
- images load correctly;
- responsive layouts work correctly;
- dynamic elements work;
- search and filters work;
- forms and validation work;
- delegated events work;
- jQuery effects work;
- there are no inline `onclick` handlers;
- previous JavaScript versions are not connected to the active pages;
- the browser Console contains no errors.

## How to Open the Project

The website does not require a backend.

Open `index.html` directly in a browser or run the project using a local development server.

An internet connection may be required to load jQuery and Bootstrap from CDN.

## Final Notes

Drive School is a front-end educational project. The team combined responsive web design with JavaScript and jQuery to create a consistent and interactive multi-page website.

Login, booking and other form features demonstrate client-side behaviour and do not store or send real user data.
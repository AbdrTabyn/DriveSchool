
# Drive School

**Introduction to Web Technologies — Endterm Project**

Drive School is an interactive, responsive driving school website developed as a team project. It helps visitors explore driving courses, compare prices, view schedules, find instructors, browse training vehicles, and submit booking requests.

## GitHub Repository

https://github.com/AbdrTabyn/DriveSchool

## Team Members

**Group: SE-2532**

| Student | Responsibilities |
|---|---|
| Abdurrakhim Yestaiuly | Home, Categories and Prices, Schedule |
| Zharkynbek Orynbasar | About the School, Instructors |
| Adilbek Nurasyl | Fleet, Contacts |

## Technologies Used

- HTML5 — page structure
- CSS3 — styling and responsive design
- Bootstrap 5.3.3 — layout and UI components
- JavaScript (ES6+) — application logic and dynamic content
- jQuery 3.7.1 — DOM manipulation, events, effects, and validation
- Browser APIs — URL parameters and localStorage

## Website Pages

### 1. Home
- Driving school introduction
- Training program cards
- Category filtering (A, B, C)
- Interactive login form with password validation

### 2. Categories and Prices
- Six driving license categories
- Dynamic program selection
- Price calculator for additional lessons
- Instructor selection
- Trial lesson registration form
- Input validation and confirmation message

### 3. Schedule
- Four-week theoretical training schedule
- Lesson information and filtering
- Search by category and lesson type
- First aid lesson
- Links to lesson registration

### 4. About the School
- School information
- Interactive reviews
- Review filtering
- Local storage of submitted reviews

### 5. Instructors
- Instructor profiles
- Search by instructor name
- Category and availability filters
- Booking links with preselected information

### 6. Fleet
- Training vehicle cards
- Vehicle search and category filtering
- Sorting by price and year
- Vehicle booking interaction

### 7. Contacts
- Contact information
- Interactive FAQ
- Contact form validation

## JavaScript Implementation

The project uses arrays and objects to store information about programs, lessons, instructors, and vehicles.

JavaScript functionality includes:

- Functions with parameters and return values
- Loops for generating dynamic content
- Conditional statements
- Price calculations
- DOM updates
- Event listeners
- Event delegation
- Form validation

## jQuery Implementation

jQuery is used for interactive page functionality.

Main techniques:

- Selectors and DOM traversal
- `.find()`, `.closest()`, `.parent()`, `.siblings()`
- `.append()`, `.empty()`, `.text()`, `.html()`
- `.val()`, `.attr()`, `.prop()`
- `.addClass()`, `.removeClass()`, `.toggleClass()`
- `.on()` for event handling and delegation
- `.fadeIn()`, `.slideToggle()`, `.animate()`

jQuery is loaded from a CDN before scripts that depend on it.

## Form Validation

The trial lesson registration form checks:

- Student name
- Email format
- Phone number when required
- Driving category
- Selected instructor
- Lesson type
- Selected date
- User consent

Invalid fields display error messages. Successful validation displays a confirmation summary.

Forms are implemented as front-end demonstrations and do not submit information to a backend server.

## Improvements Since Midterm

The midterm version focused on HTML, CSS, Bootstrap, page structure, and responsive layout.

The endterm version extends the existing website with:

- Interactive category and lesson filters
- Dynamic price calculations
- Instructor and vehicle search
- Improved registration forms
- Input validation and feedback
- Dynamic content generated from JavaScript data
- jQuery event handling and visual effects
- Connected navigation between selection and booking

These improvements allow visitors to complete meaningful interactions instead of only viewing static information.

## User Scenarios

### Scenario 1: Choose a Training Program

1. Open the Categories and Prices page.
2. Compare available programs.
3. Select a driving category.
4. Calculate the total training cost.
5. Choose an instructor and lesson date.
6. Submit the form and receive confirmation.

### Scenario 2: Find an Instructor

1. Open the Instructors page.
2. Search or filter instructors.
3. Select a suitable instructor.
4. Continue to the registration page.
5. Complete the booking form.

### Scenario 3: Select a Training Vehicle

1. Open the Fleet page.
2. Browse available vehicles.
3. Filter or sort the vehicles.
4. Select a vehicle.
5. Complete the booking interaction.

## Project Structure

```text
DriveSchool/
├── html/
│   ├── index.html
│   ├── price.html
│   ├── schedule.html
│   ├── about.html
│   ├── instructors.html
│   ├── fleet.html
│   └── contacts.html
├── css/
├── js/
│   ├── index.js
│   ├── price.js
│   ├── schedule.js
│   ├── about.js
│   ├── instructors.js
│   ├── fleet.js
│   └── jquery-assignment.js
├── images/
└── README.md
```

## How to Run

1. Clone the repository:

   `git clone https://github.com/AbdrTabyn/DriveSchool.git`

2. Open the project in WebStorm or another code editor.
3. Open `html/index.html` in a browser.
4. Navigate through the website and test its interactive features.

An internet connection is required to load Bootstrap and jQuery from their CDNs.

## Limitations

- No backend server or database
- Booking requests are demonstrated in the browser
- Locally stored reviews are not shared between users
- No online payment integration

## Conclusion

Drive School demonstrates how JavaScript and jQuery can transform a static website into an interactive web application.

The project combines responsive design, dynamic content, filtering, calculations, form validation, and event-driven interactions to provide a practical user experience.

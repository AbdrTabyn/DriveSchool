# Drive School — JavaScript / jQuery Checklist

This checklist describes the main JavaScript and jQuery features, methods, and improvements implemented in the final Drive School website.

## JavaScript Data and Logic

JavaScript is used to store and process website information.

Main concepts include:

- `const` and `let` — variables and application state
- `arrays` — lists of programs, instructors, lessons, and vehicles
- `objects` — structured information about each item
- `functions` — reusable application logic
- `if / else` — conditional statements
- `map()` — generating content from arrays
- `filter()` — filtering programs and other data
- `find()` — finding selected items
- `forEach()` — processing collections

These methods help generate dynamic content instead of keeping all information directly in HTML.

## Dynamic Content

JavaScript and jQuery are used to create and update website elements.

Main methods include:

- `.append()` — adding new elements
- `.empty()` — clearing existing content
- `.html()` — inserting predefined HTML
- `.text()` — updating text content
- `.val()` — reading and changing form values
- `.attr()` — managing element attributes
- `.prop()` — working with element properties

Dynamic content is used for training programs, instructor profiles, schedules, and vehicle information.

## Events and User Interaction

The website responds to user actions through JavaScript and jQuery event handlers.

Main events include:

- `click` — selecting programs and pressing buttons
- `input` — live search and input validation
- `change` — changing categories and filters
- `submit` — processing forms
- `reset` — resetting form values
- `mouseenter` and `mouseleave` — interactive card effects

Event delegation is used to handle interactions with dynamically generated elements.

## jQuery Selectors and Traversal

jQuery simplifies selecting and working with HTML elements.

Main methods include:

- `$()` — selecting elements
- `.find()` — finding child elements
- `.closest()` — finding the nearest matching parent
- `.parent()` — accessing parent elements
- `.siblings()` — accessing elements at the same level
- `.filter()` — selecting matching elements
- `.each()` — processing selected elements
- `$(this)` — accessing the current element inside an event handler

Method chaining is used to perform several operations on selected elements.

## jQuery Effects

jQuery effects improve the interaction between visitors and website elements.

Methods used include:

- `.fadeIn()` — displaying content smoothly
- `.fadeOut()` — hiding content smoothly
- `.slideDown()` — expanding hidden sections
- `.slideUp()` — collapsing sections
- `.slideToggle()` — switching section visibility
- `.animate()` — animating selected elements

Effects are used for feedback messages, interactive sections, and visual transitions where applicable.

## Form Validation

JavaScript and jQuery validate user input before displaying confirmation messages.

Validation includes:

- Required fields
- Name length and format
- Email format
- Phone number format
- Date selection
- Instructor availability
- Lesson type
- User consent
- Error messages next to invalid fields

Main methods and concepts:

- `preventDefault()` — preventing default form submission
- `.trim()` — removing unnecessary spaces
- Regular expressions — checking input formats
- `.addClass()` — displaying invalid states
- `.removeClass()` — removing invalid states
- `.toggleClass()` — switching validation states

Forms display confirmation messages after successful validation.

## Interactive Features by Page

### Home — `index.js`

- Dynamic training program cards
- Category filtering (A, B, C)
- Interactive login form
- Password validation and visibility control
- User feedback messages

### Categories and Prices — `price.js`

- Selection of six driving categories
- Dynamic price calculator
- Additional driving lessons calculation
- Instructor selection
- Trial lesson registration
- Form validation and confirmation
- URL parameter handling

### Schedule — `schedule.js`

- Four-week theoretical training schedule
- Dynamic lesson cards
- Lesson search and filtering
- Category and lesson-type selection
- First aid lesson
- Links to trial lesson registration

### About the School — `about.js`

- Interactive reviews
- Review submission
- Review filtering
- Input validation
- Browser-based review storage

### Instructors — `instructors.js`

- Dynamic instructor cards
- Instructor name search
- Category filtering
- Availability filtering
- Gearbox filtering
- Booking links with selected parameters

### Fleet — `fleet.js`

- Dynamic vehicle information
- Vehicle search
- Category filtering
- Sorting by price and year
- Vehicle selection and booking interaction

### Contacts

- Interactive FAQ
- Expandable information sections
- Contact form validation
- User feedback

## Price Calculation

The price calculator updates the total cost based on the selected training program and additional lessons.

Formula:

**Total Price = Program Price + (Additional Lessons × 9,000 KZT)**

For example:

- Category B: 80,000 KZT
- Additional lessons: 2
- Additional cost: 18,000 KZT
- Total: 98,000 KZT

The calculator allows 0–20 additional lessons.

## Browser Features

The project uses browser functionality to improve the user experience.

- `URLSearchParams` — reading selected category and instructor information from the URL
- `localStorage` — saving user reviews locally
- Form input values — managing user selections
- Dynamic DOM updates — displaying results without reloading the page

## Improvements Since Midterm

The midterm project focused on HTML, CSS, Bootstrap, responsive design, and static website content.

The endterm project extended the website with:

- Working interactive buttons and controls
- Dynamic content generated from JavaScript arrays
- Program, instructor, lesson, and vehicle filtering
- Automatic price calculations
- Form validation and error messages
- Confirmation messages
- jQuery event handling and delegation
- Interactive effects
- Connected booking workflows
- Improved card alignment and page layout

These improvements transformed the website from a mainly informational project into an interactive front-end application.

## Final Review

Before submission, the following should be checked:

- [ ] All buttons and links work correctly
- [ ] JavaScript and jQuery features are separated appropriately
- [ ] Dynamic content is displayed correctly
- [ ] Filters return the expected results
- [ ] Empty search results are handled
- [ ] Price calculations are correct
- [ ] Invalid forms display field-specific errors
- [ ] Valid forms display confirmation messages
- [ ] No JavaScript errors appear in the browser console
- [ ] Responsive layouts work on mobile devices
- [ ] README and AI Usage Log are updated
- [ ] All changes are committed to GitHub
- [ ] The `endterm` Git tag is created

## Conclusion

The Drive School endterm project demonstrates practical JavaScript and jQuery functionality through dynamic content, interactive filtering, calculations, form validation, and event handling.

The website maintains its Bootstrap-based responsive design while providing more useful interactions for visitors.

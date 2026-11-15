'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const USER_KEY = 'driveSchoolUser';

    // Highlight the active navigation link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(function (link) {
        const linkHref = link.getAttribute('href')?.split('?')[0].split('#')[0];

        if (linkHref === currentPath) {
            link.classList.add('active', 'fw-bold');
            link.classList.remove('text-white-50');
        } else {
            link.classList.remove('active', 'fw-bold');
        }
    });

    // Read the saved user
    function getUser() {
        try {
            const user = JSON.parse(localStorage.getItem(USER_KEY));

            return user && typeof user.name === 'string'
                ? user.name.trim()
                : '';
        } catch {
            return '';
        }
    }

    // Display the account on every page
    function renderAccount() {
        const username = getUser();
        if (!username) return;

        // Remove duplicate account elements
        document.querySelectorAll('.drive-user').forEach(function (element) {
            element.remove();
        });

        // Find the navbar container
        const navbar = document.querySelector(
            '.navbar .navbar-collapse'
        ) || document.querySelector(
            '.navbar .container, .navbar .container-fluid'
        );
        if (!navbar) return;

        // Create the account container
        const account = document.createElement('div');
        account.className =
            'drive-user d-flex align-items-center gap-2 ms-lg-auto mt-2 mt-lg-0';

        // Display the username
        const name = document.createElement('span');
        name.className = 'text-white fw-semibold text-truncate';
        name.textContent = '👤 ' + username;
        name.style.maxWidth = '170px';

        // Create the logout button
        const logout = document.createElement('button');
        logout.type = 'button';
        logout.className = 'btn btn-sm btn-outline-light';
        logout.textContent = 'Выйти';

        // Handle logout
        logout.addEventListener('click', function () {
            localStorage.removeItem(USER_KEY);
            window.location.reload();
        });
        account.append(name, logout);
        navbar.appendChild(account);

        // Hide the login dropdown after authentication
        document.querySelectorAll('.drive-login-dropdown').forEach(function (element) {
            element.remove();
        });

        // Hide the original login form
        const loginInput = document.getElementById('login-username');

        if (loginInput) {
            const aside = loginInput.closest('aside');
            if (aside) aside.style.display = 'none';
        }
    }
    renderAccount();

    // Create the scroll-to-top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.type = 'button';
    scrollTopBtn.textContent = '↑ Наверх';
    scrollTopBtn.className =
        'btn btn-primary position-fixed bottom-0 end-0 m-4 shadow d-none';
    scrollTopBtn.setAttribute(
        'aria-label',
        'Прокрутить страницу наверх'
    );
    document.body.appendChild(scrollTopBtn);

    // Toggle the scroll-to-top button
    function updateScrollButton() {
        scrollTopBtn.classList.toggle(
            'd-none',
            window.scrollY <= 300
        );
    }
    window.addEventListener('scroll', updateScrollButton);
    updateScrollButton();

    // Scroll smoothly to the top
    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

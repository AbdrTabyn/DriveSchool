'use strict';

document.addEventListener('DOMContentLoaded', function() {
    console.log('Drive School site-wide script initialized.');

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(function(link) {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPath) {
            link.classList.add('active', 'fw-bold');
            link.classList.remove('text-white-50');
        } else {
            link.classList.remove('active', 'fw-bold');
        }
    });

    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.textContent = '↑ Наверх';
    scrollTopBtn.className = 'btn btn-primary position-fixed bottom-0 end-0 m-4 shadow d-none';
    scrollTopBtn.setAttribute('aria-label', 'Прокрутить страницу наверх');
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.remove('d-none');
        } else {
            scrollTopBtn.classList.add('d-none');
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
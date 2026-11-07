'use strict';

const fleetData = [
    { id: 1, brand: 'Toyota Camry', category: 'B', year: 2020, pricePerLesson: 5000, available: true, image: 'images/camry.jpg'},
    {id: 2, brand: 'КАМАЗ Компас 5', category: 'C', year: 2021, pricePerLesson: 4800, available: true, image: 'images/КАМАЗ Компас 5.jpg'},
    { id: 3, brand: 'Honda CR-V', category: 'B', year: 2021, pricePerLesson: 5500, available: true, image: 'images/honda.jpg' },
    { id: 4, brand: 'Hyundai Accent', category: 'B', year: 2022, pricePerLesson: 4500, available: true, image: 'images/тойота.jpg' },
    { id: 5, brand: 'Rockot Alpha Tourist', category: 'A', year: 2019, pricePerLesson: 4000, available: false, image: 'images/Rockot.jpg' },
    { id: 6, brand: 'Alpha', category: 'A', year: 2020, pricePerLesson: 4300, available: true, image: 'images/Rockot.jpg' },
];

$(function () {
    const $nav = $('.navbar');
    $nav.removeClass('bg-dark py-3').css({
        backgroundColor: '#10203e',
        minHeight: '0',
        paddingTop: '8px',
        paddingBottom: '8px'
    });

    $('.navbar-brand')
        .removeClass('fs-4')
        .addClass('fw-bold text-white');

    $('.mobile-nav')
        .removeClass('justify-content-end w-100');

    $('.navbar-nav .nav-link')
        .removeClass('text-white text-white-50 fw-bold active')
        .css({
            color: 'rgba(255, 255, 255, 0.55)',
            fontWeight: '400'
        });

    $('.navbar-nav .nav-link[href="fleet.html"]')
        .addClass('active')
        .css({
            color: '#ffffff',
            fontWeight: '700'
        });

    $('.navbar-nav a[href="instructor.html"]')
        .attr('href', 'instructors.html');
});
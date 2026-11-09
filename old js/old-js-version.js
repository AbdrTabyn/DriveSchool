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

'use strict';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    if (!form) {
        return;
    }

    const cardBody = form;
    if (!document.querySelector('#visitor-phone')) {
        const additionalFieldsHTML = document.createElement('div');
        additionalFieldsHTML.innerHTML = `
            <div class="mb-3">
                <label for="visitor-name" class="form-label fw-bold">Ваше имя:</label>
                <input type="text" id="visitor-name" class="form-control" placeholder="Введите имя">
                <div class="invalid-feedback">Пожалуйста, введите ваше имя.</div>
            </div>
            <div class="mb-3">
                <label for="visitor-phone" class="form-label fw-bold">Телефон:</label>
                <input type="tel" id="visitor-phone" class="form-control" placeholder="+77011234567">
                <div class="invalid-feedback">Введите корректный номер телефона (10-12 цифр).</div>
            </div>
            <div class="mb-3">
                <label for="visitor-email" class="form-label fw-bold">Электронная почта:</label>
                <input type="email" id="visitor-email" class="form-control" placeholder="example@mail.com">
                <div class="invalid-feedback">Введите корректный email адрес.</div>
            </div>
            <div class="mb-3">
                <label for="visitor-hours" class="form-label fw-bold">Количество часов вождения:</label>
                <input type="number" id="visitor-hours" class="form-control" min="2" max="50" value="10">
                <div class="invalid-feedback">Укажите от 2 до 50 часов.</div>
            </div>
            <button type="submit" class="btn btn-primary w-100">Отправить заявку</button>
        `;
        form.appendChild(additionalFieldsHTML);
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let isValid = true;

        // 1. Поле: Имя (обязательное, trimmed)
        const nameInput = document.querySelector('#visitor-name') || form.querySelector('input[type="text"]');
        if (nameInput) {
            const val = nameInput.value.trim();
            if (val === '') {
                isValid = false;
                nameInput.classList.add('is-invalid');
                nameInput.classList.remove('is-valid');
            } else {
                nameInput.classList.remove('is-invalid');
                nameInput.classList.add('is-valid');
            }
        }

        // 2. Поле: Телефон (по регулярному выражению)
        const phoneInput = document.querySelector('#visitor-phone') || form.querySelector('input[type="tel"]');
        const phoneRegex = /^\+?[0-9]{10,12}$/;
        if (phoneInput) {
            if (!phoneRegex.test(phoneInput.value.trim())) {
                isValid = false;
                phoneInput.classList.add('is-invalid');
                phoneInput.classList.remove('is-valid');
            } else {
                phoneInput.classList.remove('is-invalid');
                phoneInput.classList.add('is-valid');
            }
        }

        const emailInput = document.querySelector('#visitor-email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput) {
            if (!emailRegex.test(emailInput.value.trim())) {
                isValid = false;
                emailInput.classList.add('is-invalid');
                emailInput.classList.remove('is-valid');
            } else {
                emailInput.classList.remove('is-invalid');
                emailInput.classList.add('is-valid');
            }
        }

        const hoursInput = document.querySelector('#visitor-hours');
        if (hoursInput) {
            const hoursVal = parseInt(hoursInput.value, 10);
            if (isNaN(hoursVal) || hoursVal < 2 || hoursVal > 50) {
                isValid = false;
                hoursInput.classList.add('is-invalid');
                hoursInput.classList.remove('is-valid');
            } else {
                hoursInput.classList.remove('is-invalid');
                hoursInput.classList.add('is-valid');
            }
        }

        if (!isValid) {
            const firstInvalid = form.querySelector('.is-invalid');
            if (firstInvalid) {
                firstInvalid.focus();
            }
            return;
        }

        const refNumber = generateRandomReference('DS');

        const oldAlert = document.getElementById('success-booking-alert');
        if (oldAlert) {
            oldAlert.remove();
        }

        const successAlert = document.createElement('div');
        successAlert.id = 'success-booking-alert';
        successAlert.className = 'alert alert-success mt-4 fs-6';
        successAlert.innerHTML = `
            <h4 class="alert-heading">Заявка успешно сформирована!</h4>
            <p>Спасибо, ${nameInput ? nameInput.value.trim() : 'Гость'}! Ваши данные успешно прошли проверку на клиенте.</p>
            <hr>
            <p class="mb-0"><strong>Референс бронирования:</strong> ${refNumber}.<br>
            <em>Внимание: Данные никуда не отправляются, реальная запись или оплата не производятся.</em></p>
        `;
        form.insertAdjacentElement('afterend', successAlert);
        form.reset();

        form.querySelectorAll('.is-valid').forEach(function(el) {
            el.classList.remove('is-valid');
        });
    });
});

function generateRandomReference(prefix) {
    const randomNum = Math.floor(Math.random() * 900000) + 100000;
    return prefix + '-' + randomNum;
}'use strict';

const fleetData = [
    { id: 1, brand: 'Toyota Camry', category: 'B', year: 2020, pricePerLesson: 5000, available: true, image: 'images/camry.jpg'},
    {id: 2, brand: 'КАМАЗ Компас 5', category: 'C', year: 2021, pricePerLesson: 4800, available: true, image: 'images/КАМАЗ Компас 5.jpg'},
    { id: 3, brand: 'Honda CR-V', category: 'B', year: 2021, pricePerLesson: 5500, available: true, image: 'images/honda.jpg' },
    { id: 4, brand: 'Hyundai Accent', category: 'B', year: 2022, pricePerLesson: 4500, available: true, image: 'images/accent.jpg' },
    { id: 5, brand: 'Rockot Alpha Tourist', category: 'A', year: 2019, pricePerLesson: 4000, available: false, image: 'Rockot.jpg' },
    { id: 6, brand: 'Alpha', category: 'A', year: 2020, pricePerLesson: 4300, available: true, image: 'images/Rockot.jpg' },
];

function filterFleet(items, categoryFilter, searchQuery) {
    return items.filter(function(car) {
        const matchesCategory = (categoryFilter === 'ALL' || car.category === categoryFilter);
        const matchesSearch = car.brand.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });
}

function sortFleet(items, sortBy) {
    const sorted = items.slice();
    sorted.sort(function(a, b) {
        if (sortBy === 'price-asc') {
            return a.pricePerLesson - b.pricePerLesson;
        } else if (sortBy === 'price-desc') {
            return b.pricePerLesson - a.pricePerLesson;
        } else if (sortBy === 'year-desc') {
            return b.year - a.year;
        }
        return 0;
    });
    return sorted;
}

function calculateTotalCost(hours, carPrice, hasDiscount) {
    let total = hours * carPrice;
    if (hasDiscount === true && hours >= 10) {
        total = total * 0.9;
    }
    return total;
}

function generateRandomReference(prefix) {
    const randomNum = Math.floor(Math.random() * 900000) + 100000;
    return prefix + '-' + randomNum;
}

function renderFleetList(carsArray) {
    const tbody = document.querySelector('.table tbody');
    if (!tbody) {
        return;
    }

    tbody.textContent = '';

    if (carsArray.length === 0) {
        const emptyRow = document.createElement('tr');
        const emptyCell = document.createElement('td');
        emptyCell.setAttribute('colspan', '3');
        emptyCell.className = 'text-center text-muted py-4';
        emptyCell.textContent = 'По вашему запросу транспортных средств не найдено.';
        emptyRow.appendChild(emptyCell);
        tbody.appendChild(emptyRow);
        return;
    }

    carsArray.forEach(function(car) {
        const row = document.createElement('tr');

        const brandCell = document.createElement('td');
        brandCell.className = 'fw-bold';
        brandCell.textContent = car.brand;

        const categoryCell = document.createElement('td');
        const badge = document.createElement('span');
        if (car.category === 'A') {
            badge.className = 'badge bg-success';
        } else if (car.category === 'C') {
            badge.className = 'badge bg-warning text-dark';
        } else {
            badge.className = 'badge bg-secondary';
        }
        badge.textContent = car.category;
        categoryCell.appendChild(badge);

        const yearCell = document.createElement('td');
        yearCell.textContent = String(car.year);

        row.appendChild(brandCell);
        row.appendChild(categoryCell);
        row.appendChild(yearCell);

        tbody.appendChild(row);
    });
}

function renderFleetGallery(carsArray) {
    const h2Photos = Array.from(document.querySelectorAll('main h2')).find(function(el) {
        return el.textContent.includes('Фотографии');
    });
    if (!h2Photos) return;

    let galleryRow = h2Photos.nextElementSibling;
    if (!galleryRow || !galleryRow.classList.contains('row')) {
        galleryRow = document.createElement('div');
        galleryRow.className = 'row g-4 mt-2 fs-6';
        h2Photos.insertAdjacentElement('afterend', galleryRow);
    }

    galleryRow.textContent = '';

    if (carsArray.length === 0) {
        const msg = document.createElement('div');
        msg.className = 'col-12 text-center text-muted py-3';
        msg.textContent = 'Нет фотографий для отображения.';
        galleryRow.appendChild(msg);
        return;
    }

    carsArray.slice(0, 4).forEach(function(car) {
        const colDiv = document.createElement('div');
        colDiv.className = 'col-md-6';

        const cardDiv = document.createElement('div');
        cardDiv.className = 'card h-100 border-0 bg-light shadow-sm';

        const img = document.createElement('img');
        img.src = car.image;
        img.className = 'card-img-top img-fluid rounded';
        img.alt = car.brand;

        // Заглушка, если картинка не найдена
        img.onerror = function() {
            this.src = 'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="150" viewBox="0 0 300 150"><rect width="300" height="150" fill="#dee2e6"/><text x="50%" y="50%" fill="#6c757d" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16">Фото: ' + encodeURIComponent(car.brand) + '</text></svg>';
        };

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body text-center py-3';

        const title = document.createElement('h5');
        title.className = 'fw-bold mb-1';
        title.textContent = car.brand;

        const desc = document.createElement('p');
        desc.className = 'text-muted mb-0 small';
        desc.textContent = `Категория: ${car.category} | ${car.year} г.в. | ${car.pricePerLesson} ₸/ч`;

        cardBody.appendChild(title);
        cardBody.appendChild(desc);

        cardDiv.appendChild(img);
        cardDiv.appendChild(cardBody);
        colDiv.appendChild(cardDiv);
        galleryRow.appendChild(colDiv);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    renderFleetList(fleetData);
    renderFleetGallery(fleetData);

    const mainContainer = document.querySelector('main');
    const h2Element = mainContainer.querySelector('h2');

    if (h2Element) {
        const controlPanel = document.createElement('div');
        controlPanel.className = 'row g-3 mb-4 p-3 bg-light rounded fs-6';
        controlPanel.innerHTML = `
            <div class="col-md-3">
                <label for="fleet-search" class="form-label fw-bold">Поиск:</label>
                <input type="text" id="fleet-search" class="form-control" placeholder="Марка...">
            </div>
            <div class="col-md-3">
                <label for="fleet-category" class="form-label fw-bold">Категория:</label>
                <select id="fleet-category" class="form-select">
                    <option value="ALL">Все категории</option>
                    <option value="A">Категория A</option>
                    <option value="B">Категория B</option>
                    <option value="C">Категория C</option>
                </select>
            </div>
            <div class="col-md-3">
                <label for="fleet-sort" class="form-label fw-bold">Сортировка:</label>
                <select id="fleet-sort" class="form-select">
                    <option value="default">По умолчанию</option>
                    <option value="price-asc">Цена: по возрастанию</option>
                    <option value="price-desc">Цена: по убыванию</option>
                    <option value="year-desc">Год: новейшие</option>
                </select>
            </div>
            <div class="col-md-3 d-flex align-items-end">
                <button id="reset-filter-btn" class="btn btn-outline-secondary w-100">Сбросить</button>
            </div>
            <div class="col-12 text-muted small mt-2" id="fleet-counter">
                Найдено транспорта: ${fleetData.length}
            </div>
        `;
        mainContainer.insertBefore(controlPanel, h2Element);

        const searchInput = document.getElementById('fleet-search');
        const categorySelect = document.getElementById('fleet-category');
        const sortSelect = document.getElementById('fleet-sort');
        const resetBtn = document.getElementById('reset-filter-btn');
        const counterEl = document.getElementById('fleet-counter');

        function updateFleetView() {
            const query = searchInput.value.trim();
            const categoryVal = categorySelect.value;
            const sortVal = sortSelect.value;

            const filtered = filterFleet(fleetData, categoryVal, query);
            const sorted = sortFleet(filtered, sortVal);

            renderFleetList(sorted);
            renderFleetGallery(sorted);
            counterEl.textContent = `Найдено транспорта: ${sorted.length}`;
        }

        searchInput.addEventListener('input', updateFleetView);
        categorySelect.addEventListener('change', updateFleetView);
        sortSelect.addEventListener('change', updateFleetView);

        resetBtn.addEventListener('click', function() {
            searchInput.value = '';
            categorySelect.value = 'ALL';
            sortSelect.value = 'default';
            updateFleetView();
        });
    }
});

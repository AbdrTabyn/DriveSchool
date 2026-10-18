'use strict';

const programs = [
    { id: 1, category: 'A', title: 'Мотоцикл: базовый курс',    price: 50000,  weeks: 6,  transmission: 'МКПП' },
    { id: 2, category: 'B', title: 'Легковой: стандарт (МКПП)', price: 80000,  weeks: 8,  transmission: 'МКПП' },
    { id: 3, category: 'B', title: 'Легковой: стандарт (АКПП)', price: 80000,  weeks: 8,  transmission: 'АКПП' },
    { id: 4, category: 'B', title: 'Легковой: интенсив',        price: 80000,  weeks: 4,  transmission: 'АКПП' },
    { id: 5, category: 'C', title: 'Грузовой: базовый курс',    price: 100000, weeks: 10, transmission: 'МКПП' },
    { id: 6, category: 'C', title: 'Грузовой: расширенный',     price: 100000, weeks: 12, transmission: 'МКПП' }
];

function formatPrice(value) {
    return value.toLocaleString('ru-RU') + ' ₸';
}

// Создаёт элемент с классом и текстом
function createEl(tag, className, text) {
    const el = document.createElement(tag);
    if (className) {
        el.className = className;
    }
    if (text !== undefined) {
        el.textContent = text;
    }
    return el;
}

// Строка из поля -> число или null (нет значения или значение неверное)
function parseNumber(value) {
    const trimmed = value.trim();
    if (trimmed === '') {
        return null;
    }
    const number = Number(trimmed);
    if (Number.isNaN(number) || number < 0) {
        return null;
    }
    return number;
}

// Подписанное поле в колонке сетки
function createField(labelText, control, colClass) {
    const col = createEl('div', colClass);
    const label = createEl('label', 'form-label fw-semibold', labelText);
    label.htmlFor = control.id;
    col.append(label, control);
    return col;
}

// Универсальный рендер списка: для программ, расписания, инструкторов, автопарка
function renderList(list, container, createItem, emptyText) {
    container.replaceChildren();

    if (list.length === 0) {
        container.appendChild(createEl('p', 'text-muted mb-0', emptyText));
        return;
    }

    for (const item of list) {
        container.appendChild(createItem(item));
    }
}
// Показывает ошибку у поля; пустое сообщение очищает её
function showError(input, errorEl, message) {
    const hasError = message !== '';
    errorEl.textContent = hasError ? 'Ошибка: ' + message : '';
    errorEl.classList.toggle('d-none', !hasError);
    input.classList.toggle('is-invalid', hasError);
    input.setAttribute('aria-invalid', String(hasError));
}

// Общий функционал для всего сайта
document.addEventListener('DOMContentLoaded', function () {

    function highlightActivePage() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

        navLinks.forEach(function (link) {
            const linkHref = link.getAttribute('href');

            if (linkHref === currentPath) {
                link.classList.add('active', 'fw-bold');
                link.classList.remove('text-white-50');
            } else {
                link.classList.remove('active', 'fw-bold');
            }
        });
    }

    function createScrollTopButton() {
        const scrollTopBtn = createEl(
            'button',
            'btn btn-primary position-fixed bottom-0 end-0 m-4 shadow d-none',
            '↑ Наверх'
        );
        scrollTopBtn.type = 'button';
        scrollTopBtn.setAttribute('aria-label', 'Прокрутить страницу наверх');

        document.body.appendChild(scrollTopBtn);

        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.remove('d-none');
            } else {
                scrollTopBtn.classList.add('d-none');
            }
        });

        scrollTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Запуск общих функций
    highlightActivePage();
    createScrollTopButton();
});
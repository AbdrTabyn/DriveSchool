'use strict';

// ---------- Данные ----------

const programs = [
    { id: 1, category: 'A', title: 'Мотоцикл: базовый курс',    price: 50000,  weeks: 6,  transmission: 'МКПП' },
    { id: 2, category: 'B', title: 'Легковой: стандарт (МКПП)', price: 80000,  weeks: 8,  transmission: 'МКПП' },
    { id: 3, category: 'B', title: 'Легковой: стандарт (АКПП)', price: 80000,  weeks: 8,  transmission: 'АКПП' },
    { id: 4, category: 'B', title: 'Легковой: интенсив',        price: 80000,  weeks: 4,  transmission: 'АКПП' },
    { id: 5, category: 'C', title: 'Грузовой: базовый курс',    price: 100000, weeks: 10, transmission: 'МКПП' },
    { id: 6, category: 'C', title: 'Грузовой: расширенный',     price: 100000, weeks: 12, transmission: 'МКПП' }
];

// ---------- Общие функции ----------

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

// Универсальный рендер списка с пустым состоянием
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

// ---------- Набор функций напарника (window.DriveSchool) ----------

window.DriveSchool = (() => {
    const element = createEl;   // тот же код, другое имя

    function button(text, classes = 'btn btn-primary btn-sm') {
        const node = element('button', classes, text);
        node.type = 'button';
        return node;
    }

    function option(value, text) {
        const node = element('option', '', text);
        node.value = value;
        return node;
    }

    function field(form, id, title, type = 'text') {
        const box = element('div', 'col-12 col-md-6 mb-2');
        const label = element('label', 'form-label small fw-bold mb-1', title);
        label.htmlFor = id;

        const input = element(
            ['select', 'textarea'].includes(type) ? type : 'input',
            type === 'select'
                ? 'form-select form-select-sm'
                : 'form-control form-control-sm'
        );

        if (input.tagName === 'INPUT') input.type = type;
        if (type === 'textarea') input.rows = 2;

        input.id = id;
        input.name = id;

        const error = element('div', 'invalid-feedback');
        error.id = `${id}-error`;
        input.setAttribute('aria-describedby', error.id);

        box.append(label, input, error);
        form.append(box);

        return { input, error };
    }

    function validate(fields, messages) {
        fields.forEach((item, index) => {
            item.error.textContent = messages[index];
            item.input.classList.toggle('is-invalid', messages[index] !== '');
            item.input.classList.toggle('is-valid', messages[index] === '');
            item.input.setAttribute('aria-invalid', String(messages[index] !== ''));
        });

        const first = messages.findIndex(message => message !== '');
        if (first !== -1) fields[first].input.focus();
        return first === -1;
    }

    function clearErrors(fields) {
        fields.forEach(item => {
            item.error.textContent = '';
            item.input.classList.remove('is-invalid', 'is-valid');
            item.input.removeAttribute('aria-invalid');
        });
    }

    function status() {
        const node = element('p', 'col-12 small text-break mt-2 mb-0');
        node.setAttribute('role', 'status');
        return node;
    }

    function localDate(date = new Date()) {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }

    function section(title) {
        const node = element('section', 'border rounded p-3 mt-4');
        node.append(element('h2', 'h4 mb-3', title));
        return node;
    }

    return { element, button, option, field, validate, clearErrors, status, localDate, section };
})();

// ---------- Общее поведение сайта ----------

// Подсветка текущей страницы в меню
function highlightActivePage() {
    const page = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.navbar-nav .nav-link').forEach(function (link) {
        const active = link.getAttribute('href') === page;
        link.classList.toggle('active', active);
        link.classList.toggle('fw-bold', active);
        if (active) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

// Управление мобильным меню с клавиатуры
function initMobileMenu() {
    const toggle = document.querySelector('#menu-toggle');
    const trigger = document.querySelector('label[for="menu-toggle"]');
    if (!toggle || !trigger) {
        return;
    }

    trigger.tabIndex = 0;
    trigger.setAttribute('role', 'button');

    function update() {
        trigger.setAttribute('aria-expanded', String(toggle.checked));
    }

    trigger.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggle.checked = !toggle.checked;
            update();
        }
    });

    toggle.addEventListener('change', update);

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && toggle.checked) {
            toggle.checked = false;
            update();
            trigger.focus();
        }
    });

    update();
}

// Кнопка «Наверх»
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
        scrollTopBtn.classList.toggle('d-none', window.scrollY <= 300);
    });

    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Запуск (скрипты с defer выполняются, когда DOM уже готов)
highlightActivePage();
initMobileMenu();
createScrollTopButton();
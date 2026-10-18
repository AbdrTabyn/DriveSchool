'use strict';

const EXTRA_PRICE = 9000;
const MAX_EXTRA = 20;
const LESSONS = { theory: 'Теория', practice: 'Практика' };
const FIELDS = ['name', 'email', 'phone', 'date', 'lesson-type', 'consent'];

const SUBCATEGORIES = [
    { code: 'A1', parent: 'A', vehicle: 'Лёгкие мотоциклы',       price: 40000,  weeks: 4 },
    { code: 'A',  parent: 'A', vehicle: 'Мотоциклы',              price: 50000,  weeks: 6 },
    { code: 'B1', parent: 'B', vehicle: 'Трициклы и квадроциклы', price: 60000,  weeks: 5 },
    { code: 'B',  parent: 'B', vehicle: 'Легковые автомобили',    price: 80000,  weeks: 8 },
    { code: 'C1', parent: 'C', vehicle: 'Средние грузовики',      price: 90000,  weeks: 8 },
    { code: 'C',  parent: 'C', vehicle: 'Грузовые автомобили',    price: 100000, weeks: 10 }
];

let selectedSub = null;   // выбранная строка таблицы

// ---------- Функции ----------

function findSub(code) {
    return SUBCATEGORIES.find(function (item) {
        return item.code === code;
    });
}

// Сегодня в формате ГГГГ-ММ-ДД
function today() {
    return new Date().toLocaleDateString('en-CA');
}

// Число доп. занятий или null, если ввод неверный
function parseExtra(value) {
    const number = parseNumber(value);
    return number !== null && Number.isInteger(number) && number <= MAX_EXTRA ? number : null;
}

// Возвращает объект ошибок { имя_поля: текст }; пустой объект = всё верно
function validateForm(d) {
    const errors = {};
    if (!/^[\p{L}\s'-]{2,}$/u.test(d.name)) {
        errors.name = 'введите имя (только буквы, не менее 2).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) {
        errors.email = 'формат email: name@example.com.';
    }
    if (d.phone !== '' && !/^(\+7|8)\d{10}$/.test(d.phone.replace(/[\s()-]/g, ''))) {
        errors.phone = 'формат телефона: +7 700 000 00 00.';
    } else if (d.phone === '' && d.lesson === 'practice') {
        errors.phone = 'для практики укажите телефон: инструктор согласует время.';
    }
    if (d.date === '') {
        errors.date = 'выберите дату.';
    } else if (d.date < today()) {
        errors.date = 'дата не может быть в прошлом.';
    }
    if (d.lesson === '') {
        errors['lesson-type'] = 'выберите тип занятия.';
    }
    if (!d.consent) {
        errors.consent = 'нужно согласие на обработку данных.';
    }
    return errors;
}

// ---------- Калькулятор (считает по выбранной строке таблицы) ----------

const calcExtra = createEl('input', 'form-control');
calcExtra.type = 'number';
calcExtra.id = 'calc-extra';
calcExtra.min = '0';
calcExtra.max = String(MAX_EXTRA);
calcExtra.value = '0';

const calcError = createEl('div', 'text-danger small mt-1 d-none');
const calcResult = createEl('div', 'mt-3');
calcResult.setAttribute('aria-live', 'polite');
const calcRow = createEl('div', 'row g-3');
calcRow.append(createField('Дополнительные занятия вождения, шт.', calcExtra, 'col-12 col-md-6'));
calcExtra.after(calcError);

const calcSection = createEl('div', 'border rounded-3 p-3 mt-4');
calcSection.append(
    createEl('h2', 'h4 mb-2', 'Калькулятор стоимости'),
    createEl('p', 'small text-muted', 'Программа выбирается в таблице выше.'),
    calcRow,
    calcResult
);

function updateCalc() {
    const extra = parseExtra(calcExtra.value);
    showError(calcExtra, calcError, extra === null ? 'введите целое число от 0 до ' + MAX_EXTRA + '.' : '');
    calcResult.replaceChildren();
    if (extra === null || selectedSub === null) {
        return;
    }
    calcResult.append(
        createEl('p', 'mb-1', 'Программа ' + selectedSub.code + ' (' + selectedSub.vehicle + '): ' +
            formatPrice(selectedSub.price)),
        createEl('p', 'mb-1', 'Доп. занятия: ' + extra + ' × ' + formatPrice(EXTRA_PRICE) +
            ' = ' + formatPrice(extra * EXTRA_PRICE)),
        createEl('p', 'fw-bold fs-5 text-primary mb-1', 'Итого: ' + formatPrice(selectedSub.price + extra * EXTRA_PRICE)),
        createEl('p', 'small text-muted mb-0', 'Предварительный расчёт, не является счётом или договором.')
    );
}

// ---------- Форма записи ----------

const trialForm = document.querySelector('#trial-form');
trialForm.noValidate = true;
const categorySelect = trialForm.querySelector('#category');

const fieldEls = {};
const errorEls = {};
for (const key of FIELDS) {
    fieldEls[key] = trialForm.querySelector('[name="' + key + '"]');
    errorEls[key] = createEl('div', 'text-danger small mt-1 d-none');
    const anchor = key === 'lesson-type' ? fieldEls[key].closest('fieldset')
        : key === 'consent' ? fieldEls[key].closest('.form-check')
            : fieldEls[key];
    anchor.after(errorEls[key]);
}
fieldEls.date.min = today();

const resultBox = createEl('div', 'alert alert-success mt-3 mb-0 d-none');
resultBox.setAttribute('role', 'status');
trialForm.after(resultBox);

function readForm() {
    const raw = Object.fromEntries(new FormData(trialForm));
    return {
        name: (raw.name || '').trim(),
        email: (raw.email || '').trim(),
        phone: (raw.phone || '').trim(),
        date: raw.date || '',
        lesson: raw['lesson-type'] || '',
        consent: 'consent' in raw
    };
}

function showSummary(d) {
    const extra = parseExtra(calcExtra.value) || 0;
    const reference = 'DEMO-' + (1000 + Math.floor(Math.random() * 9000));
    const list = createEl('ul', 'mb-2');
    for (const line of [
        'Имя: ' + d.name,
        'Email: ' + d.email,
        'Телефон: ' + (d.phone === '' ? 'не указан' : d.phone),
        'Программа: ' + selectedSub.code + ' (' + selectedSub.vehicle + ')',
        'Тип занятия: ' + LESSONS[d.lesson],
        'Желаемая дата: ' + d.date.split('-').reverse().join('.'),
        'Стоимость курса (предварительно): ' + formatPrice(selectedSub.price + extra * EXTRA_PRICE)
    ]) {
        list.appendChild(createEl('li', '', line));
    }
    resultBox.replaceChildren(
        createEl('p', 'fw-bold mb-2', 'Демонстрационная заявка на пробный урок'),
        list,
        createEl('p', 'small mb-0', 'Данные не отправляются на сервер, реальная запись не создана. ' +
            'Временный номер: ' + reference + '.')
    );
    resultBox.classList.remove('d-none');
}

trialForm.addEventListener('submit', function (event) {
    event.preventDefault();
    resultBox.classList.add('d-none');

    const data = readForm();
    const errors = validateForm(data);
    let firstInvalid = null;

    for (const key of FIELDS) {
        showError(fieldEls[key], errorEls[key], errors[key] || '');
        if (errors[key] && firstInvalid === null) {
            firstInvalid = fieldEls[key];
        }
    }
    if (firstInvalid !== null) {
        firstInvalid.focus();
        return;
    }

    trialForm.reset();   // сначала сброс: его обработчик прячет сводку
    showSummary(data);
});

// Правка поля убирает его устаревшую ошибку и старое сообщение об успехе
trialForm.addEventListener('input', function (event) {
    const key = event.target.name;
    if (FIELDS.includes(key)) {
        showError(fieldEls[key], errorEls[key], '');
    }
    resultBox.classList.add('d-none');
});

// reset срабатывает до фактической очистки, поэтому выбор обновляем через setTimeout
trialForm.addEventListener('reset', function () {
    for (const key of FIELDS) {
        showError(fieldEls[key], errorEls[key], '');
    }
    resultBox.classList.add('d-none');
    setTimeout(function () {
        selectSubcategory(findSub(categorySelect.value));
    }, 0);
});

// ---------- Таблица подкатегорий (единственное место выбора) ----------

const tableWrap = document.querySelector('.table-responsive');
const subBody = tableWrap.querySelector('tbody');
const subNote = createEl('p', 'small text-muted mt-2 mb-0');
subNote.setAttribute('aria-live', 'polite');

// Подсвечивает строку, ставит категорию в форму, обновляет калькулятор
function selectSubcategory(item) {
    for (const row of subBody.children) {
        row.classList.remove('table-active');
    }
    subBody.children[SUBCATEGORIES.indexOf(item)].classList.add('table-active');
    selectedSub = item;
    categorySelect.value = item.parent;
    subNote.textContent = 'Выбрана программа ' + item.code + ': ' + item.vehicle +
        '. Категория в форме записи: ' + item.parent + '.';
    updateCalc();
}

function createSubRow(item) {
    const choose = createEl('button', 'btn btn-outline-primary btn-sm', 'Выбрать');
    choose.type = 'button';
    choose.addEventListener('click', function () {
        selectSubcategory(item);
    });

    const action = createEl('td');
    action.appendChild(choose);
    const code = createEl('th', '', item.code);
    code.scope = 'row';

    const row = createEl('tr');
    row.append(
        code,
        createEl('td', '', item.vehicle),
        createEl('td', '', formatPrice(item.price)),
        createEl('td', '', item.weeks + ' нед.'),
        action
    );
    return row;
}

const headRow = tableWrap.querySelector('thead tr');
for (const title of ['Срок', 'Действие']) {
    const th = createEl('th', '', title);
    th.scope = 'col';
    headRow.appendChild(th);
}
subBody.replaceChildren();
for (const item of SUBCATEGORIES) {
    subBody.appendChild(createSubRow(item));
}
tableWrap.after(subNote);
subNote.after(calcSection);

// Смена категории в форме выбирает базовую строку таблицы
categorySelect.addEventListener('change', function () {
    selectSubcategory(findSub(categorySelect.value));
});
calcExtra.addEventListener('input', updateCalc);

// Категория из ссылки (с главной или из расписания)
const urlSub = findSub(new URLSearchParams(window.location.search).get('category'));
if (urlSub) {
    const closeButton = createEl('button', 'btn-close');
    closeButton.type = 'button';
    closeButton.setAttribute('aria-label', 'Закрыть сообщение');
    closeButton.addEventListener('click', function () {
        notice.remove();
    });
    const notice = createEl('div', 'alert alert-info d-flex justify-content-between align-items-start gap-2');
    notice.setAttribute('role', 'status');
    notice.append(
        createEl('span', '', 'Вы выбрали категорию ' + urlSub.code +
            '. Стоимость: ' + formatPrice(urlSub.price) + '.'),
        closeButton
    );
    trialForm.before(notice);
}
selectSubcategory(urlSub || findSub(categorySelect.value));
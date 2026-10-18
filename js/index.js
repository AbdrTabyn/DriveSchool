'use strict';

// ---------- Подбор программы ----------

function createCard(program) {
    const link = createEl('a', 'btn btn-outline-primary btn-sm', 'Записаться');
    link.href = 'price.html?category=' + program.category;

    const card = createEl('div', 'border rounded-3 p-3 h-100');
    card.append(
        createEl('h4', 'h6 fw-bold', 'Категория ' + program.category + ': ' + program.title),
        createEl('p', 'small mb-2', 'Срок: ' + program.weeks + ' нед. · ' + program.transmission),
        createEl('p', 'fw-bold text-primary mb-2', formatPrice(program.price)),
        link
    );

    const col = createEl('div', 'col-12 col-md-6');
    col.appendChild(card);
    return col;
}

function filterPrograms(list, category) {
    return list.filter(function (item) {
        return category === 'all' || item.category === category;
    });
}

const cardsRow = createEl('div', 'row g-3');

const buttonsRow = createEl('div', 'd-flex flex-wrap gap-2 mb-3');
buttonsRow.setAttribute('role', 'group');
buttonsRow.setAttribute('aria-label', 'Категория обучения');

// Показывает программы выбранной категории и подсвечивает нажатую кнопку
function showCategory(category) {
    renderList(filterPrograms(programs, category), cardsRow, createCard, 'Нет программ в этой категории.');
    for (const button of buttonsRow.children) {
        button.setAttribute('aria-pressed', String(active));
    }
}

const choices = [
    ['all', 'Все программы'], ['A', 'A — мотоциклы'], ['B', 'B — легковые'], ['C', 'C — грузовые']
];
for (const [value, text] of choices) {
    const button = createEl('button', 'btn btn-outline-primary', text);
    button.type = 'button';
    button.dataset.category = value;
    button.addEventListener('click', function () {
        showCategory(value);
    });
    buttonsRow.appendChild(button);
}

const picker = createEl('section', 'bg-white p-4 rounded-3 border shadow-sm mt-4');
picker.append(
    createEl('h2', 'h4 mb-3', 'Выбери свою программу обучения'),
    buttonsRow,
    cardsRow
);
document.querySelector('.home-layout').after(picker);

showCategory('all');

// ---------- Форма входа (демонстрация, без сервера) ----------

const passwordRules = [
    { text: 'Не менее 8 символов',            regex: /.{8,}/ },
    { text: 'Заглавная буква',                regex: /[A-ZА-ЯЁ]/ },
    { text: 'Строчная буква',                 regex: /[a-zа-яё]/ },
    { text: 'Цифра',                          regex: /\d/ },
    { text: 'Спецсимвол (например, ! ? # $)', regex: /[^A-Za-zА-Яа-яЁё0-9\s]/ }
];

// Рисует чеклист, возвращает true, если все правила выполнены
function renderChecklist(listEl, password) {
    listEl.replaceChildren();
    let allOk = true;
    for (const rule of passwordRules) {
        const ok = rule.regex.test(password);
        allOk = allOk && ok;
        listEl.appendChild(createEl('li', ok ? 'text-success' : 'text-muted', (ok ? '✓ ' : '✗ ') + rule.text));
    }
    return allOk;
}


function initLoginForm(form) {
    const userInput = form.querySelector('#login-username');
    const passInput = form.querySelector('#login-password');
    form.noValidate = true;

    const userError = createEl('div', 'text-danger small mt-1 d-none');
    const passError = createEl('div', 'text-danger small mt-1 d-none');
    const checklist = createEl('ul', 'list-unstyled small mt-2 mb-1');
    const toggle = createEl('button', 'btn btn-outline-secondary btn-sm mt-2', 'Показать пароль');
    toggle.type = 'button';
    const resultBox = createEl('div', 'alert alert-success mt-3 mb-0 small d-none');
    resultBox.setAttribute('role', 'status');

    userInput.after(userError);
    passInput.after(toggle, checklist, passError);
    form.appendChild(resultBox);
    renderChecklist(checklist, '');

    userInput.addEventListener('input', function () {
        showError(userInput, userError, '');
        resultBox.classList.add('d-none');
    });

    passInput.addEventListener('input', function () {
        renderChecklist(checklist, passInput.value);
        showError(passInput, passError, '');
        resultBox.classList.add('d-none');
    });

    toggle.addEventListener('click', function () {
        const hidden = passInput.type === 'password';
        passInput.type = hidden ? 'text' : 'password';
        toggle.textContent = hidden ? 'Скрыть пароль' : 'Показать пароль';
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        resultBox.classList.add('d-none');

        const username = userInput.value.trim();
        const userMsg = username.length < 3 ? 'логин должен содержать не менее 3 символов.' : '';
        const passMsg = renderChecklist(checklist, passInput.value) ? '' : 'пароль не выполняет все правила из списка.';
        showError(userInput, userError, userMsg);
        showError(passInput, passError, passMsg);

        if (userMsg !== '') {
            userInput.focus();
            return;
        }
        if (passMsg !== '') {
            passInput.focus();
            return;
        }

        resultBox.textContent = 'Формат данных для логина «' + username +
            '» проверен, но вход не выполнен. Данные никуда не отправляются, аккаунт не создаётся.';
        resultBox.classList.remove('d-none');
        passInput.value = '';
        renderChecklist(checklist, '');
    });
}

const loginForm = document.querySelector('aside form');
if (loginForm) {
    initLoginForm(loginForm);
}
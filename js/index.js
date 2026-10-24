'use strict';

// Каждый файл подключается только на своей странице.
(() => {
    function init() {
        if (!document.querySelector('.home-layout') || document.querySelector('#program-picker')) return;
        function createEl(tag, classes = '', text = '') {
            const node = document.createElement(tag);
            node.className = classes;
            node.textContent = text;
            return node;
        }
        function renderList(items, box, render, emptyText) {
            box.replaceChildren();
            if (items.length === 0) box.append(createEl('p', 'col-12 text-muted', emptyText));
            else items.forEach(item => box.append(render(item)));
        }
        function formatPrice(number) {
            return new Intl.NumberFormat('ru-RU').format(number) + ' ₸';
        }
        function showError(input, error, message) {
            error.textContent = message;
            error.classList.toggle('d-none', message === '');
            const inputs = input.type === 'radio'
                ? input.closest('fieldset').querySelectorAll('input') : [input];
            inputs.forEach(field => {
                field.classList.toggle('is-invalid', message !== '');
                field.setAttribute('aria-invalid', String(message !== ''));
            });
            if (!error.id) error.id = input.id + '-error';
            input.setAttribute('aria-describedby', error.id);
        }
        const programs = [
            { category: 'A1', parent: 'A', title: 'Лёгкие мотоциклы', price: 40000, weeks: 4 },
            { category: 'A', parent: 'A', title: 'Мотоциклы', price: 50000, weeks: 6 },
            { category: 'B1', parent: 'B', title: 'Трициклы и квадроциклы', price: 60000, weeks: 5 },
            { category: 'B', parent: 'B', title: 'Легковые автомобили', price: 80000, weeks: 8 },
            { category: 'C1', parent: 'C', title: 'Средние грузовики', price: 90000, weeks: 8 },
            { category: 'C', parent: 'C', title: 'Грузовые автомобили', price: 100000, weeks: 10 }
        ];

        // ---------- Подбор программы ----------

        function createCard(program) {
            const link = createEl('a', 'btn btn-outline-primary btn-sm', 'Записаться');
            link.href = 'price.html?category=' + program.category;

            const card = createEl('div', 'border rounded-3 p-3 h-100');
            card.append(
                createEl('h4', 'h6 fw-bold', 'Категория ' + program.category + ': ' + program.title),
                createEl('p', 'small mb-2', 'Срок: ' + program.weeks + ' нед.'),
                createEl('p', 'fw-bold text-primary mb-2', formatPrice(program.price)),
                link
            );

            const col = createEl('div', 'col-12 col-md-6');
            col.appendChild(card);
            return col;
        }

        function filterPrograms(list, category) {
            return list.filter(function (item) {
                return category === 'all' || item.parent === category;
            });
        }

        const cardsRow = createEl('div', 'row g-3');

        const buttonsRow = createEl('div', 'd-flex flex-wrap gap-2 mb-3');
        buttonsRow.setAttribute('role', 'group');
        buttonsRow.setAttribute('aria-label', 'Категория обучения');

        // Показывает программы выбранной категории и подсвечивает нажатую кнопку
        function showCategory(category) {
            const found = filterPrograms(programs, category);
            renderList(found, cardsRow, createCard, 'Нет программ в этой категории.');
            for (const button of buttonsRow.children) {
                button.setAttribute('aria-pressed', String(button.dataset.category === category));
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
        picker.id = 'program-picker';
        picker.append(
            createEl('h2', 'h4 mb-3', 'Выбери свою программу обучения'),
            buttonsRow,
            cardsRow
        );
        document.querySelector('.home-layout').after(picker);

        showCategory('all');

        // ---------- Проверка формы входа ----------

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
            if (!userInput || !passInput) return;
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
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else init();
})();

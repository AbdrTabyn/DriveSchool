'use strict';

// Каждый файл подключается только на своей странице.
(() => {
    function init() {
        const priceForm = document.querySelector('#trial-form');
        const priceTable = document.querySelector('.table-responsive');
        if (!priceForm || !priceTable || !priceTable.querySelector('tbody') || !priceForm.querySelector('#category') || document.querySelector('#calc-extra')) return;
        // Локальные помощники: доступны только этому файлу.
        const ui = (() => {
            function element(tag, classes = '', text = '') {
                const node = document.createElement(tag);
                node.className = classes;
                node.textContent = text;
                return node;
            }
            function option(value, text) {
                const node = element('option', '', text);
                node.value = value;
                return node;
            }
            function localDate(date = new Date()) {
                return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            }
            return { element, option, localDate };
        })();
        const createEl = ui.element;
        function createField(title, input, classes = 'mb-3') {
            const box = createEl('div', classes);
            const label = createEl('label', 'form-label', title);
            label.htmlFor = input.id;
            box.append(label, input);
            return box;
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
        const instructors = [
            { id: 'aman', name: 'Артықбаев Аман', experience: 10, rating: 4.9, categories: ['A', 'B'], days: [1, 3, 5], description: 'Спокойно объясняет основы управления автомобилем и помогает освоить городские маршруты.' },
            { id: 'bekzat', name: 'Жақсыбай Бекзат', experience: 7, rating: 4.7, categories: ['A', 'B'], days: [2, 4, 6], description: 'Работает с начинающими водителями, уделяет внимание парковке и подготовке к экзамену.' },
            { id: 'aigerim', name: 'Серікқызы Айгерім', experience: 8, rating: 4.8, categories: ['B'], days: [1, 2, 4], description: 'Помогает преодолеть волнение за рулём и постепенно перейти от площадки к городу.' },
            { id: 'daniyar', name: 'Омаров Данияр', experience: 12, rating: 4.9, categories: ['B', 'C'], days: [2, 3, 6], description: 'Обучает вождению легковых и грузовых автомобилей, подробно разбирает работу с габаритами.' },
            { id: 'madina', name: 'Төлегенова Мадина', experience: 6, rating: 4.8, categories: ['B'], days: [3, 5, 6], description: 'Помогает восстановить навыки после перерыва и увереннее проезжать сложные перекрёстки.' },
            { id: 'ruslan', name: 'Әлиев Руслан', experience: 9, rating: 4.6, categories: ['A', 'B'], days: [1, 4, 5], description: 'Объясняет управление мотоциклом и автомобилем, делает акцент на безопасных манёврах.' },
            { id: 'erzhan', name: 'Нұрланов Ержан', experience: 11, rating: 4.9, categories: ['B', 'C'], days: [1, 3, 6], description: 'Отрабатывает с учениками движение в потоке, развороты и маневрирование на ограниченной площадке.' },
            { id: 'asel', name: 'Сапарова Әсел', experience: 5, rating: 4.8, categories: ['B'], days: [2, 4, 5], description: 'Понятно объясняет действия водителя и помогает освоить парковку без спешки.' },
            { id: 'timur', name: 'Қасымов Тимур', experience: 14, rating: 4.9, categories: ['A', 'B'], days: [1, 2, 5], description: 'Уделяет внимание наблюдению за дорогой, выбору дистанции и предупреждению опасных ситуаций.' },
            { id: 'dana', name: 'Мұратова Дана', experience: 6, rating: 4.7, categories: ['B'], days: [3, 4, 6], description: 'Помогает начинающим водителям освоить базовые навыки и последовательность действий на дороге.' },
            { id: 'alibek', name: 'Ибраев Әлібек', experience: 9, rating: 4.8, categories: ['B', 'C'], days: [1, 4, 6], description: 'Подробно объясняет повороты, перестроения и особенности управления крупным автомобилем.' },
            { id: 'nursultan', name: 'Сейітов Нұрсұлтан', experience: 8, rating: 4.8, categories: ['A', 'B'], days: [2, 3, 5], description: 'Обучает плавному управлению, правильной посадке и уверенной работе с органами управления.' },
            { id: 'aruzhan', name: 'Қуанышова Аружан', experience: 4, rating: 4.6, categories: ['B'], days: [1, 3, 5], description: 'Поддерживает спокойный темп занятий и помогает закрепить навыки парковки и движения в городе.' },
            { id: 'marat', name: 'Ахметов Марат', experience: 16, rating: 4.9, categories: ['B', 'C'], days: [2, 4, 6], description: 'Готовит учеников к управлению легковыми и грузовыми автомобилями, уделяя внимание безопасности.' },
            { id: 'aliya', name: 'Бекенова Алия', experience: 7, rating: 4.8, categories: ['B'], days: [1, 2, 4], description: 'Разбирает типичные ошибки новичков и помогает увереннее действовать на перекрёстках.' },
            { id: 'arman', name: 'Тұрсынов Арман', experience: 10, rating: 4.7, categories: ['A', 'B'], days: [3, 5, 6], description: 'Помогает освоить мотоцикл и автомобиль, отрабатывает повороты и безопасное торможение.' },
            { id: 'zhanar', name: 'Рахимова Жанар', experience: 8, rating: 4.9, categories: ['B'], days: [1, 4, 5], description: 'Работает над уверенностью за рулём, парковкой и самостоятельным планированием маршрута.' },
            { id: 'erlan', name: 'Смағұлов Ерлан', experience: 13, rating: 4.8, categories: ['B', 'C'], days: [2, 3, 6], description: 'Объясняет работу с габаритами, выбор траектории и безопасное движение в городском потоке.' },
            { id: 'dauren', name: 'Оспанов Дәурен', experience: 6, rating: 4.7, categories: ['A', 'B'], days: [1, 3, 4], description: 'Пошагово разбирает базовые манёвры и помогает закрепить навыки на площадке и в городе.' },
            { id: 'diana', name: 'Кәрімова Диана', experience: 5, rating: 4.8, categories: ['B'], days: [2, 5, 6], description: 'Обучает с нуля, уделяет внимание плавному вождению и спокойной подготовке к самостоятельным поездкам.' }
        ];
        const EXTRA_PRICE = 9000;
        const MAX_EXTRA = 20;
        const LESSONS = { theory: 'Теория', practice: 'Практика' };
        const DAYS = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        const FIELDS = ['name', 'email', 'phone', 'date', 'category', 'instructor', 'lesson-type', 'consent'];
        const SUBCATEGORIES = [
            { code: 'A1', parent: 'A', vehicle: 'Лёгкие мотоциклы', price: 40000, weeks: 4 },
            { code: 'A', parent: 'A', vehicle: 'Мотоциклы', price: 50000, weeks: 6 },
            { code: 'B1', parent: 'B', vehicle: 'Трициклы и квадроциклы', price: 60000, weeks: 5 },
            { code: 'B', parent: 'B', vehicle: 'Легковые автомобили', price: 80000, weeks: 8 },
            { code: 'C1', parent: 'C', vehicle: 'Средние грузовики', price: 90000, weeks: 8 },
            { code: 'C', parent: 'C', vehicle: 'Грузовые автомобили', price: 100000, weeks: 10 }
        ];
        let selectedSub = null;
        function findSub(code) {
            return SUBCATEGORIES.find(item => item.code === code);
        }
        function findInstructor(id) {
            return instructors.find(item => item.id === id);
        }
        function today() {
            return ui.localDate();
        }
        function lastDate() {
            const date = new Date();
            date.setDate(date.getDate() + 90);
            return ui.localDate(date);
        }
        function parseExtra(value) {
            const number = Number(value);
            return String(value).trim() !== '' && Number.isInteger(number)
                && number >= 0 && number <= MAX_EXTRA ? number : null;
        }

        // Выбор программы и расчёт стоимости.
        const tableWrap = document.querySelector('.table-responsive');
        const subBody = tableWrap.querySelector('tbody');
        const trialForm = document.querySelector('#trial-form');
        trialForm.noValidate = true;
        const categorySelect = trialForm.querySelector('#category');
        const subNote = createEl('p', 'small text-muted mt-2 mb-0');
        subNote.setAttribute('aria-live', 'polite');
        const calcExtra = createEl('input', 'form-control');
        calcExtra.type = 'number';
        calcExtra.id = 'calc-extra';
        calcExtra.min = '0';
        calcExtra.max = String(MAX_EXTRA);
        calcExtra.step = '1';
        calcExtra.value = '0';
        const calcError = createEl('div', 'text-danger small mt-1 d-none');
        const calcResult = createEl('div', 'mt-3');
        calcResult.setAttribute('aria-live', 'polite');
        const calcRow = createEl('div', 'row g-3');
        calcRow.append(createField('Дополнительные занятия вождения, шт.', calcExtra, 'col-12 col-md-6'));
        calcExtra.after(calcError);
        const calcSection = createEl('div', 'border rounded-3 p-3 mt-4');
        calcSection.append(createEl('h2', 'h4 mb-2', 'Калькулятор стоимости'),
            createEl('p', 'small text-muted', 'Программа выбирается в таблице выше.'), calcRow, calcResult);

        // Поле инструктора добавляется через DOM: исходный HTML не меняется.
        const instructorSelect = createEl('select', 'form-select');
        instructorSelect.id = 'instructor';
        instructorSelect.name = 'instructor';
        instructorSelect.required = true;
        const instructorBox = createField('Инструктор:', instructorSelect);
        const instructorHint = createEl('p', 'small text-muted mt-2 mb-0');
        instructorHint.setAttribute('aria-live', 'polite');
        instructorBox.append(instructorHint);
        categorySelect.closest('.mb-3').after(instructorBox);
        const fieldEls = {};
        const errorEls = {};
        for (const key of FIELDS) {
            fieldEls[key] = trialForm.querySelector('[name="' + key + '"]');
            errorEls[key] = createEl('div', 'text-danger small mt-1 d-none');
            const anchor = key === 'lesson-type' ? fieldEls[key].closest('fieldset')
                : key === 'consent' ? fieldEls[key].closest('.form-check') : fieldEls[key];
            anchor.after(errorEls[key]);
        }
        fieldEls.date.min = today();
        fieldEls.date.max = lastDate();
        const liveSummary = createEl('p', 'small text-break mt-3');
        liveSummary.setAttribute('role', 'status');
        trialForm.querySelector('button[type="submit"]').parentElement.before(liveSummary);
        const resultBox = createEl('div', 'alert alert-success mt-3 mb-0 d-none text-break');
        resultBox.setAttribute('role', 'status');
        trialForm.after(resultBox);
        const notice = createEl('p', 'alert alert-info d-none');
        notice.setAttribute('role', 'status');
        trialForm.before(notice);

        function updateCalc() {
            const extra = parseExtra(calcExtra.value);
            showError(calcExtra, calcError, extra === null ? 'Введите целое число от 0 до ' + MAX_EXTRA + '.' : '');
            calcResult.replaceChildren();
            if (extra === null || selectedSub === null) return;
            calcResult.append(
                createEl('p', 'mb-1', 'Программа ' + selectedSub.code + ' (' + selectedSub.vehicle + '): ' + formatPrice(selectedSub.price)),
                createEl('p', 'mb-1', 'Доп. занятия: ' + extra + ' × ' + formatPrice(EXTRA_PRICE) + ' = ' + formatPrice(extra * EXTRA_PRICE)),
                createEl('p', 'fw-bold fs-5 text-primary mb-1', 'Итого: ' + formatPrice(selectedSub.price + extra * EXTRA_PRICE)),
                createEl('p', 'small text-muted mb-0', 'Предварительный расчёт, не является счётом или договором.'));
        }
        function updateInstructorHint() {
            const instructor = findInstructor(instructorSelect.value);
            instructorHint.textContent = instructor
                ? 'Дни занятий: ' + instructor.days.map(day => DAYS[day]).join(', ') + '. ' + instructor.description
                : 'Выберите инструктора для выбранной категории.';
        }
        function updateInstructors() {
            const previous = instructorSelect.value;
            const matches = instructors.filter(item => item.categories.includes(categorySelect.value));
            instructorSelect.replaceChildren(ui.option('', 'Выберите инструктора'), ...matches.map(item => ui.option(item.id, item.name)));
            if (matches.some(item => item.id === previous)) instructorSelect.value = previous;
            showError(instructorSelect, errorEls.instructor, '');
            showError(fieldEls.date, errorEls.date, '');
            updateInstructorHint();
        }
        function updateLiveSummary() {
            if (!selectedSub) return;
            const instructor = findInstructor(instructorSelect.value);
            const lesson = trialForm.querySelector('[name="lesson-type"]:checked');
            const extra = parseExtra(calcExtra.value);
            liveSummary.textContent = 'Программа: ' + selectedSub.code + '. Инструктор: '
                + (instructor ? instructor.name : 'не выбран') + '. Тип: ' + (lesson ? LESSONS[lesson.value] : 'не выбран')
                + '. Дата: ' + (fieldEls.date.value || 'не выбрана') + '. '
                + (extra === null ? 'Проверьте количество дополнительных занятий.'
                    : 'Доп. занятий: ' + extra + '. Стоимость курса: ' + formatPrice(selectedSub.price + extra * EXTRA_PRICE) + '.');
        }
        function selectSubcategory(item) {
            selectedSub = item || findSub('B');
            Array.from(subBody.children).forEach((row, index) => row.classList.toggle('table-active', SUBCATEGORIES[index] === selectedSub));
            categorySelect.value = selectedSub.parent;
            subNote.textContent = 'Выбрана программа ' + selectedSub.code + ': ' + selectedSub.vehicle + '.';
            updateInstructors();
            updateCalc();
            updateLiveSummary();
            resultBox.classList.add('d-none');
        }
        function createSubRow(item) {
            const choose = createEl('button', 'btn btn-outline-primary btn-sm', 'Выбрать');
            choose.type = 'button';
            choose.setAttribute('aria-label', 'Выбрать программу ' + item.code);
            choose.addEventListener('click', () => {
                selectSubcategory(item);
                notice.classList.add('d-none');
            });
            const action = createEl('td');
            action.append(choose);
            const code = createEl('th', '', item.code);
            code.scope = 'row';
            const row = createEl('tr');
            row.append(code, createEl('td', '', item.vehicle), createEl('td', '', formatPrice(item.price)), createEl('td', '', item.weeks + ' нед.'), action);
            return row;
        }
        const headRow = tableWrap.querySelector('thead tr');
        for (const title of ['Срок', 'Действие']) {
            const th = createEl('th', '', title);
            th.scope = 'col';
            headRow.append(th);
        }
        subBody.replaceChildren(...SUBCATEGORIES.map(createSubRow));
        tableWrap.after(subNote);
        subNote.after(calcSection);

        function readForm() {
            const raw = Object.fromEntries(new FormData(trialForm));
            return { name: (raw.name || '').trim(), email: (raw.email || '').trim(),
                phone: (raw.phone || '').trim(), date: raw.date || '', category: raw.category,
                instructor: raw.instructor || '', lesson: raw['lesson-type'] || '', consent: 'consent' in raw };
        }
        function validateForm(data) {
            const errors = {};
            const instructor = findInstructor(data.instructor);
            const date = new Date(data.date + 'T12:00:00');
            if (!/^[\p{L}\s'-]{2,60}$/u.test(data.name) || data.name.replace(/[^\p{L}]/gu, '').length < 2) errors.name = 'Введите имя: от 2 до 60 символов, минимум две буквы.';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Формат email: name@example.com.';
            if (data.phone !== '' && !/^(\+7|8)\d{10}$/.test(data.phone.replace(/[\s()-]/g, ''))) errors.phone = 'Формат телефона: +7 700 000 00 00.';
            else if (data.phone === '' && data.lesson === 'practice') errors.phone = 'Для практики укажите телефон.';
            if (!['A', 'B', 'C'].includes(data.category)) errors.category = 'Выберите категорию.';
            if (!instructor) errors.instructor = 'Выберите инструктора.';
            else if (!instructor.categories.includes(data.category)) errors.instructor = 'Инструктор не работает с выбранной категорией.';
            if (Number.isNaN(date.getTime()) || ui.localDate(date) !== data.date) errors.date = 'Выберите корректную дату.';
            else if (data.date < today()) errors.date = 'Дата не может быть в прошлом.';
            else if (data.date > lastDate()) errors.date = 'Выберите дату в ближайшие 90 дней.';
            else if (instructor && !instructor.days.includes(date.getDay())) errors.date = 'Дни работы инструктора: ' + instructor.days.map(day => DAYS[day]).join(', ') + '.';
            if (!Object.hasOwn(LESSONS, data.lesson)) errors['lesson-type'] = 'Выберите тип занятия.';
            if (!data.consent) errors.consent = 'Нужно согласие на обработку данных.';
            return errors;
        }
        function showSummary(data) {
            const extra = parseExtra(calcExtra.value);
            const instructor = findInstructor(data.instructor);
            const reference = 'REQ-' + (1000 + Math.floor(Math.random() * 9000));
            const list = createEl('ul', 'mb-2');
            for (const line of ['Имя: ' + data.name, 'Email: ' + data.email,
                'Телефон: ' + (data.phone || 'не указан'), 'Инструктор: ' + instructor.name,
                'Программа: ' + selectedSub.code + ' (' + selectedSub.vehicle + ')', 'Тип занятия: ' + LESSONS[data.lesson],
                'Желаемая дата: ' + data.date.split('-').reverse().join('.'),
                'Стоимость курса (предварительно): ' + formatPrice(selectedSub.price + extra * EXTRA_PRICE)]) list.append(createEl('li', '', line));
            resultBox.replaceChildren(createEl('p', 'fw-bold mb-2', 'Заявка на пробный урок сформирована'), list,
                createEl('p', 'small mb-0', 'Данные не отправляются на сервер, реальная запись не создана. Временный номер: ' + reference + '.'));
            resultBox.classList.remove('d-none');
        }
        trialForm.addEventListener('submit', event => {
            event.preventDefault();
            resultBox.classList.add('d-none');
            const data = readForm();
            const errors = validateForm(data);
            let firstInvalid = null;
            for (const key of FIELDS) {
                showError(fieldEls[key], errorEls[key], errors[key] || '');
                if (errors[key] && firstInvalid === null) firstInvalid = fieldEls[key];
            }
            updateCalc();
            if (firstInvalid !== null) { firstInvalid.focus(); return; }
            if (parseExtra(calcExtra.value) === null) { calcExtra.focus(); return; }
            showSummary(data);
        });
        trialForm.addEventListener('input', event => {
            const key = event.target.name;
            if (FIELDS.includes(key)) showError(fieldEls[key], errorEls[key], '');
            resultBox.classList.add('d-none');
            updateLiveSummary();
        });
        instructorSelect.addEventListener('change', () => {
            notice.classList.add('d-none');
            showError(fieldEls.date, errorEls.date, '');
            updateInstructorHint();
            updateLiveSummary();
        });
        categorySelect.addEventListener('change', () => {
            notice.classList.add('d-none');
            selectSubcategory(findSub(categorySelect.value));
        });
        calcExtra.addEventListener('input', () => {
            resultBox.classList.add('d-none');
            updateCalc();
            updateLiveSummary();
        });
        trialForm.addEventListener('reset', () => {
            for (const key of FIELDS) showError(fieldEls[key], errorEls[key], '');
            resultBox.classList.add('d-none');
            notice.classList.add('d-none');
            setTimeout(() => selectSubcategory(findSub(categorySelect.value)), 0);
        });

        // Восстанавливаем выбор из ссылки с инструкторов или расписания.
        const params = new URLSearchParams(location.search);
        const linkedProgram = findSub(params.get('category'));

        selectSubcategory(
            linkedProgram || findSub(categorySelect.value)
        );

        const instructor = findInstructor(params.get('instructor'));

        if (params.has('instructor')) {
            notice.classList.remove('d-none');

            if (
                instructor &&
                instructor.categories.includes(categorySelect.value)
            ) {
                instructorSelect.value = instructor.id;

                notice.textContent =
                    'Выбран инструктор ' + instructor.name +
                    ', категория ' + selectedSub.code + '.';
            } else {
                notice.textContent =
                    'Указанный инструктор не подходит выбранной категории. ' +
                    'Выберите инструктора из списка.';
            }
        } else if (linkedProgram) {
            notice.classList.remove('d-none');

            notice.textContent =
                'Вы выбрали категорию ' + linkedProgram.code +
                '. Стоимость: ' + formatPrice(linkedProgram.price) + '.';
        }
        const lessonType = params.get('type');
        if (Object.hasOwn(LESSONS, lessonType)) trialForm.querySelector('[name="lesson-type"][value="' + lessonType + '"]').checked = true;
        updateInstructorHint();
        updateLiveSummary();

    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else init();
})();

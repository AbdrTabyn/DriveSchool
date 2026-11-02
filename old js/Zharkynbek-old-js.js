'use strict';

// Сравнение с jQuery. Этот файл НЕ подключается ни к одной странице.

// ===== instructors.js: предыдущая версия на обычном JavaScript =====
'use strict';

// Каждый файл подключается только на своей странице.
(() => {
    function init() {
        // Локальные помощники: доступны только этому файлу.
        const ui = (() => {
            function element(tag, classes = '', text = '') {
                const node = document.createElement(tag);
                node.className = classes;
                node.textContent = text;
                return node;
            }
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
                const input = element(['select', 'textarea'].includes(type) ? type : 'input',
                    type === 'select' ? 'form-select form-select-sm' : 'form-control form-control-sm');
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
            function status() {
                const node = element('p', 'col-12 small text-break mt-2 mb-0');
                node.setAttribute('role', 'status');
                return node;
            }
            return { element, button, option, field, status };
        })();
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
        const main = document.querySelector('main');
        if (!main || !main.querySelector('#training-steps')) return;
        const team = main.querySelector('details');
        if (!team) return;
        const grid = team.querySelector('.row');
        if (!grid || document.querySelector('#instructor-search')) return;
        const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        const filters = ui.element('form', 'row g-2 border rounded p-3 mb-3 mt-3 mx-0');
        const search = ui.field(filters, 'instructor-search', 'Поиск по имени', 'search');
        const category = ui.field(filters, 'filter-category', 'Категория', 'select');
        category.input.append(ui.option('', 'Все категории'), ...['A', 'B', 'C'].map(value => ui.option(value, value)));
        const day = ui.field(filters, 'filter-day', 'Удобный день', 'select');
        day.input.append(ui.option('', 'Любой день'), ...[1, 2, 3, 4, 5, 6].map(value => ui.option(value, days[value])));
        const resetBox = ui.element('div', 'col-12 col-md-6 d-flex align-items-end mb-2');
        const reset = ui.button('Сбросить фильтры', 'btn btn-outline-primary btn-sm');
        resetBox.append(reset);
        const count = ui.status();
        filters.append(resetBox, count);
        grid.before(filters);

        function renderCards(items) {
            grid.replaceChildren();
            count.textContent = `Найдено: ${items.length} из ${instructors.length}.`;
            if (items.length === 0) grid.append(ui.element('p', 'col-12 text-muted', 'Ничего не найдено. Измените условия или сбросьте фильтры.'));
            items.forEach(item => {
                const column = ui.element('div', 'col-12 col-md-6');
                const card = ui.element('article', 'card h-100 shadow-sm instructor-card');
                const body = ui.element('div', 'card-body d-flex flex-column');
                const heading = ui.element('div', 'd-flex flex-wrap align-items-center gap-3 mb-2');
                heading.append(ui.element('span', 'rounded-circle bg-light border p-3 text-primary fw-bold', item.name.split(' ').map(part => part[0]).join('')),
                    ui.element('h3', 'h4 card-title mb-0', item.name));
                const rating = ui.element('span', 'badge bg-primary mb-2 align-self-start', `★ ${item.rating.toFixed(1)}`);
                rating.setAttribute('aria-label', `Рейтинг: ${item.rating} из 5`);
                const chosenCategory = category.input.value || item.categories[0];
                const link = ui.element('a', 'btn btn-primary btn-sm mt-auto align-self-start', 'Записаться на пробный урок');
                link.href = 'price.html?' + new URLSearchParams({ category: chosenCategory, instructor: item.id, type: 'practice' });
                link.setAttribute('aria-label', `Записаться на пробный урок: ${item.name}`);
                body.append(heading, rating,
                    ui.element('p', 'small mb-1', `Стаж: ${item.experience} лет. Категории: ${item.categories.join(', ')}.`),
                    ui.element('p', 'small text-muted mb-2', `Дни занятий: ${item.days.map(value => days[value]).join(', ')}.`),
                    ui.element('p', 'small card-text', item.description), link);
                card.append(body);
                column.append(card);
                grid.append(column);
            });
        }
        function filterCards() {
            const query = search.input.value.trim().toLocaleLowerCase('ru');
            renderCards(instructors.filter(item => item.name.toLocaleLowerCase('ru').includes(query)
                && (category.input.value === '' || item.categories.includes(category.input.value))
                && (day.input.value === '' || item.days.includes(Number(day.input.value)))));
        }
        filters.addEventListener('submit', event => event.preventDefault());
        search.input.addEventListener('input', filterCards);
        [category.input, day.input].forEach(input => input.addEventListener('change', filterCards));
        reset.addEventListener('click', () => { filters.reset(); filterCards(); search.input.focus(); });
        main.querySelector('.table-responsive')?.remove();
        const oldContact = Array.from(main.children).find(node => node.tagName === 'P' && node.textContent.includes('Записаться к конкретному'));
        oldContact?.remove();
        team.classList.remove('toggle');
        team.querySelector('summary').classList.add('mb-3');
        const training = main.querySelector('#training-steps');
        const trainingSection = ui.element('section', 'mb-4');
        trainingSection.id = training.id;
        trainingSection.append(ui.element('h2', 'h4 mb-3', training.querySelector('summary').textContent));
        Array.from(training.children).forEach(child => {
            if (child.tagName !== 'SUMMARY') trainingSection.append(child);
        });
        training.replaceWith(trainingSection);
        filterCards();

    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else init();
})();


// ===== about.js: предыдущая версия на обычном JavaScript =====
'use strict';

// Каждый файл подключается только на своей странице.
(() => {
    function init() {
        // Локальные помощники: доступны только этому файлу.
        const ui = (() => {
            function element(tag, classes = '', text = '') {
                const node = document.createElement(tag);
                node.className = classes;
                node.textContent = text;
                return node;
            }
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
                const input = element(['select', 'textarea'].includes(type) ? type : 'input',
                    type === 'select' ? 'form-select form-select-sm' : 'form-control form-control-sm');
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
                fields.forEach((field, index) => {
                    field.error.textContent = messages[index];
                    field.input.classList.toggle('is-invalid', messages[index] !== '');
                    field.input.classList.toggle('is-valid', messages[index] === '');
                    field.input.setAttribute('aria-invalid', String(messages[index] !== ''));
                });
                const first = messages.findIndex(message => message !== '');
                if (first !== -1) fields[first].input.focus();
                return first === -1;
            }
            function clearErrors(fields) {
                fields.forEach(field => {
                    field.error.textContent = '';
                    field.input.classList.remove('is-invalid', 'is-valid');
                    field.input.removeAttribute('aria-invalid');
                });
            }
            function status() {
                const node = element('p', 'col-12 small text-break mt-2 mb-0');
                node.setAttribute('role', 'status');
                return node;
            }
            function section(title) {
                const node = element('section', 'border rounded p-3 mt-4');
                node.append(element('h2', 'h4 mb-3', title));
                return node;
            }
            return { element, button, option, field, validate, clearErrors, status, section };
        })();
        const history = document.querySelector('.history');
        if (!history || document.querySelector('#review-form')) return;
        const content = history.parentElement;
        const reviews = [
            { name: 'Ұлан', text: 'Великие дела начинаются с мечтаний', rating: null, date: '2026-09-05T12:00:00', own: false },
            { name: 'Abdurrakhim Yestaiuly', text: 'Уроки проходят хорошо и на позитиве. Инструкторы добрые и всегда стараются помочь', rating: null, date: '2026-09-09T12:00:00', own: false }
        ];
        const section = ui.section('Отзывы учеников');
        const controls = ui.element('form', 'row g-2');
        const filter = ui.field(controls, 'review-filter', 'Оценка', 'select');
        filter.input.append(ui.option('', 'Все отзывы'), ...[5, 4, 3, 2, 1].map(value => ui.option(value, `${value} из 5`)), ui.option('none', 'Без оценки'));
        const resetBox = ui.element('div', 'col-12 col-md-6 d-flex align-items-end mb-2');
        const reset = ui.button('Сбросить фильтр', 'btn btn-outline-primary btn-sm');
        resetBox.append(reset);
        controls.append(resetBox);
        const count = ui.status();
        const list = ui.element('div', 'mt-3');
        const notice = ui.status();
        const open = ui.button('Написать отзыв');
        open.setAttribute('aria-controls', 'review-form');
        open.setAttribute('aria-expanded', 'false');
        const form = ui.element('form', 'row g-2 mt-3 d-none');
        form.id = 'review-form';
        form.noValidate = true;
        const name = ui.field(form, 'review-name', 'Ваше имя');
        name.input.autocomplete = 'name';
        name.input.maxLength = 60;
        const email = ui.field(form, 'review-email', 'Email (не публикуется)', 'email');
        email.input.autocomplete = 'email';
        email.input.maxLength = 100;
        const rating = ui.field(form, 'review-rating', 'Оценка', 'select');
        rating.input.append(ui.option('', 'Выберите оценку'), ...[5, 4, 3, 2, 1].map(value => ui.option(value, `${value} из 5`)));
        const text = ui.field(form, 'review-text', 'Ваш отзыв', 'textarea');
        text.input.maxLength = 600;
        const counter = ui.element('small', 'text-muted', '0 / 600 символов; минимум 20');
        counter.id = 'review-counter';
        text.input.after(counter);
        text.input.setAttribute('aria-describedby', `${text.error.id} ${counter.id}`);
        const submitBox = ui.element('div', 'col-12');
        const submit = ui.button('Добавить отзыв');
        submit.type = 'submit';
        submitBox.append(submit);
        const feedback = ui.status();
        form.append(submitBox, feedback);
        section.append(controls, count, list, notice, open, form);
        content.append(section);
        const fields = [name, email, rating, text];
        function renderReview(review) {
            const card = ui.element('article', 'card mb-2');
            const body = ui.element('div', 'card-body p-3');
            const time = ui.element('time', 'small text-muted', review.own
                ? new Date(review.date).toLocaleString('ru-RU') : new Date(review.date).toLocaleDateString('ru-RU'));
            time.dateTime = review.date;
            body.append(ui.element('h3', 'h6 text-break mb-1', review.name),
                ui.element('p', 'small text-primary mb-1', review.rating === null ? 'Без оценки' : `Оценка: ${review.rating} из 5`),
                time, ui.element('p', 'small text-break mt-2 mb-1', review.text));
            if (review.own) {
                const remove = ui.button('Удалить', 'btn btn-outline-primary btn-sm mt-2');
                let confirmed = false;
                remove.addEventListener('click', () => {
                    if (!confirmed) {
                        confirmed = true;
                        remove.textContent = 'Подтвердить удаление';
                        return;
                    }
                    reviews.splice(reviews.indexOf(review), 1);
                    feedback.textContent = '';
                    renderReviews();
                    notice.textContent = 'Ваш отзыв удалён.';
                    filter.input.focus();
                });
                body.append(remove);
            }
            card.append(body);
            return card;
        }
        function renderReviews() {
            const items = reviews.filter(review => filter.input.value === ''
                || (filter.input.value === 'none' ? review.rating === null : review.rating === Number(filter.input.value)));
            list.replaceChildren();
            count.textContent = `Показано отзывов: ${items.length} из ${reviews.length}.`;
            if (items.length === 0) list.append(ui.element('p', 'small text-muted', 'Таких отзывов пока нет. Сбросьте фильтр или напишите свой.'));
            else items.forEach(review => list.append(renderReview(review)));
        }
        form.addEventListener('submit', event => {
            event.preventDefault();
            feedback.textContent = '';
            notice.textContent = '';
            const messages = [
                name.input.value.trim().length >= 2 && name.input.value.trim().length <= 60 ? '' : 'Введите имя от 2 до 60 символов.',
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.input.value.trim()) && email.input.value.trim().length <= 100 ? '' : 'Введите корректный email.',
                /^[1-5]$/.test(rating.input.value) ? '' : 'Выберите оценку от 1 до 5.',
                text.input.value.trim().length >= 20 && text.input.value.trim().length <= 600 ? '' : 'Напишите от 20 до 600 символов.'
            ];
            if (!ui.validate(fields, messages)) return;
            if (reviews.some(review => review.own && review.name === name.input.value.trim() && review.text === text.input.value.trim())) {
                feedback.textContent = 'Этот отзыв уже добавлен.';
                return;
            }
            reviews.unshift({ name: name.input.value.trim(), text: text.input.value.trim(), rating: Number(rating.input.value), date: new Date().toISOString(), own: true });
            form.reset();
            ui.clearErrors(fields);
            counter.textContent = '0 / 600 символов; минимум 20';
            filter.input.value = '';
            renderReviews();
            feedback.textContent = 'Отзыв добавлен. Данные не отправлены на сервер; отзыв виден в этом окне до перезагрузки.';
        });
        form.addEventListener('input', () => {
            ui.clearErrors(fields);
            feedback.textContent = '';
            counter.textContent = `${text.input.value.length} / 600 символов; минимум 20`;
        });
        open.addEventListener('click', () => {
            const show = form.classList.contains('d-none');
            form.classList.toggle('d-none', !show);
            open.textContent = show ? 'Скрыть форму' : 'Написать отзыв';
            open.setAttribute('aria-expanded', String(show));
            if (show) name.input.focus();
        });
        controls.addEventListener('submit', event => event.preventDefault());
        filter.input.addEventListener('change', () => { notice.textContent = ''; renderReviews(); });
        reset.addEventListener('click', () => { filter.input.value = ''; renderReviews(); });
        renderReviews();

    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else init();
})();


// ===== price.js: предыдущая версия на обычном JavaScript =====
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
                phone: (raw.phone || '').trim(), comment: (raw.comment || '').trim(),
                date: raw.date || '', category: raw.category,
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
            if (data.comment) list.append(createEl('li', '', 'Комментарий: ' + data.comment));
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
        selectSubcategory(linkedProgram || findSub(categorySelect.value));
        const instructor = findInstructor(params.get('instructor'));
        if (params.has('instructor')) {
            notice.classList.remove('d-none');
            if (instructor && instructor.categories.includes(categorySelect.value)) {
                instructorSelect.value = instructor.id;
                notice.textContent = 'Выбран инструктор ' + instructor.name + ', категория ' + selectedSub.code + '.';
            } else notice.textContent = 'Указанный инструктор не подходит выбранной категории. Выберите инструктора из списка.';
        } else if (linkedProgram) {
            notice.classList.remove('d-none');
            notice.textContent = 'Вы выбрали категорию ' + linkedProgram.code
                + '. Стоимость: ' + formatPrice(linkedProgram.price) + '.';
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


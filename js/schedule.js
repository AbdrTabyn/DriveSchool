'use strict';

// Каждый файл подключается только на своей странице.
(() => {
    function init() {
        const practice = document.querySelector('#practice-section');
        if (!practice || document.querySelector('#lesson-search')) return;
        function createEl(tag, classes = '', text = '') {
            const node = document.createElement(tag);
            node.className = classes;
            node.textContent = text;
            return node;
        }
        function createField(title, input, classes = 'mb-3') {
            const box = createEl('div', classes);
            const label = createEl('label', 'form-label', title);
            label.htmlFor = input.id;
            box.append(label, input);
            return box;
        }
        function renderList(items, box, render, emptyText) {
            box.replaceChildren();
            if (items.length === 0) box.append(createEl('p', 'col-12 text-muted', emptyText));
            else items.forEach(item => box.append(render(item)));
        }
        const instructors = [
            { id: 'aman', name: 'Артықбаев Аман' },
            { id: 'bekzat', name: 'Жақсыбай Бекзат' },
            { id: 'aigerim', name: 'Серікқызы Айгерім' },
            { id: 'daniyar', name: 'Омаров Данияр' },
            { id: 'madina', name: 'Төлегенова Мадина' },
            { id: 'ruslan', name: 'Әлиев Руслан' },
            { id: 'marat', name: 'Ахметов Марат' },
            { id: 'zhanar', name: 'Рахимова Жанар' }
        ];
        const lessons = [
            { id: 1, title: 'Основы ПДД', category: 'B', type: 'Теория', day: 'Понедельник', time: '18:00', duration: 90, instructorId: 'aman' },
            { id: 2, title: 'Дорожные знаки', category: 'B', type: 'Теория', day: 'Среда', time: '18:00', duration: 90, instructorId: 'madina' },
            { id: 3, title: 'Практика на автодроме', category: 'B', type: 'Практика', day: 'Вторник', time: '10:00', duration: 60, instructorId: 'bekzat' },
            { id: 4, title: 'Вождение в городе', category: 'B', type: 'Практика', day: 'Четверг', time: '15:00', duration: 60, instructorId: 'aigerim' },
            { id: 5, title: 'Управление мотоциклом', category: 'A', type: 'Практика', day: 'Пятница', time: '11:00', duration: 60, instructorId: 'ruslan' },
            { id: 6, title: 'Управление грузовым автомобилем', category: 'C', type: 'Практика', day: 'Суббота', time: '12:00', duration: 90, instructorId: 'daniyar' },
            { id: 7, title: 'Разметка и сигналы регулировщика', category: 'B', type: 'Теория', day: 'Пятница', time: '18:00', duration: 90, instructorId: 'zhanar' },
            { id: 8, title: 'Требования КАП', category: 'B', type: 'Теория', day: 'Суббота', time: '18:00', duration: 90, instructorId: 'marat' }
        ];
        const HINT = 'Выбери занятие, чтобы посмотреть детали.';
        function filterLessons(list, query, category, type) {
            const text = query.trim().toLocaleLowerCase('ru');
            return list.filter(lesson => {
                const instructor = instructors.find(item => item.id === lesson.instructorId);
                const haystack = (lesson.title + ' ' + lesson.day + ' ' + (instructor ? instructor.name : '')).toLocaleLowerCase('ru');
                return haystack.includes(text) && (category === 'all' || lesson.category === category)
                    && (type === 'all' || lesson.type === type);
            });
        }
        function createSelect(id, options) {
            const select = createEl('select', 'form-select');
            select.id = id;
            for (const [value, text] of options) {
                const option = createEl('option', '', text);
                option.value = value;
                select.append(option);
            }
            return select;
        }
        function showSelection(box, lesson) {
            const instructor = instructors.find(item => item.id === lesson.instructorId);
            if (!instructor) { box.textContent = 'Инструктор не найден. Выберите другое занятие.'; return; }
            const reference = 'SCH-' + (1000 + Math.floor(Math.random() * 9000));
            const book = createEl('a', 'btn btn-primary me-2', 'Записаться на пробный урок');
            const params = new URLSearchParams({ category: lesson.category, instructor: instructor.id,
                type: lesson.type === 'Практика' ? 'practice' : 'theory' });
            book.href = 'price.html?' + params;
            const cancel = createEl('button', 'btn btn-outline-secondary', 'Отменить выбор');
            cancel.type = 'button';
            cancel.addEventListener('click', () => { box.textContent = 'Выбор отменён. ' + HINT; });
            box.replaceChildren(
                createEl('p', 'fw-bold mb-1', lesson.title),
                createEl('p', 'mb-1', 'Инструктор: ' + instructor.name),
                createEl('p', 'mb-1', 'Категория ' + lesson.category + ' · ' + lesson.type + ' · '
                    + lesson.day + ', ' + lesson.time + ' · ' + lesson.duration + ' мин'),
                createEl('p', 'small text-muted', 'Это предварительный выбор, а не подтверждённая запись. Временный номер: ' + reference + '.'),
                book, cancel);
        }
        function createLessonCard(lesson, onSelect) {
            const instructor = instructors.find(item => item.id === lesson.instructorId);
            const button = createEl('button', 'btn btn-primary', 'Выбрать занятие');
            button.type = 'button';
            button.addEventListener('click', () => onSelect(lesson));
            const body = createEl('div', 'card-body');
            body.append(createEl('h4', 'h5', lesson.title),
                createEl('p', 'small text-muted', 'Инструктор: ' + (instructor ? instructor.name : 'не назначен')),
                createEl('p', '', 'Категория ' + lesson.category + ' · ' + lesson.type + ' · ' + lesson.day + ', ' + lesson.time),
                createEl('p', '', 'Продолжительность: ' + lesson.duration + ' минут'), button);
            const card = createEl('article', 'card h-100');
            card.append(body);
            const column = createEl('div', 'col-12 col-md-6');
            column.append(card);
            return column;
        }
        const search = createEl('input', 'form-control');
        search.type = 'search';
        search.id = 'lesson-search';
        search.placeholder = 'Например, знаки или имя инструктора';
        const category = createSelect('lesson-category', [['all', 'Все категории'], ['A', 'Категория A'], ['B', 'Категория B'], ['C', 'Категория C']]);
        const type = createSelect('lesson-type-filter', [['all', 'Все типы'], ['Теория', 'Теория'], ['Практика', 'Практика']]);
        const controls = createEl('div', 'row g-3 mb-3');
        controls.append(createField('Поиск', search, 'col-12 col-md-4'), createField('Категория', category, 'col-12 col-md-4'), createField('Тип занятия', type, 'col-12 col-md-4'));
        const count = createEl('p', 'fw-semibold mb-0');
        count.setAttribute('aria-live', 'polite');
        const reset = createEl('button', 'btn btn-outline-secondary btn-sm', 'Сбросить фильтры');
        reset.type = 'button';
        const statusRow = createEl('div', 'd-flex flex-wrap justify-content-between align-items-center gap-2 mb-3');
        statusRow.append(count, reset);
        const results = createEl('div', 'row g-3');
        const selection = createEl('div', 'mt-3 p-3 bg-white border rounded-3', HINT);
        selection.setAttribute('aria-live', 'polite');
        const section = createEl('section', 'mb-4 p-3 bg-light border rounded-3');
        section.append(createEl('h3', '', 'Подбор занятий'), controls, statusRow, results, selection);
        practice.before(section);
        function renderLessons() {
            const found = filterLessons(lessons, search.value, category.value, type.value);
            renderList(found, results, lesson => createLessonCard(lesson, chosen => showSelection(selection, chosen)),
                'Занятия не найдены. Измени поиск или сбрось фильтры.');
            count.textContent = 'Найдено занятий: ' + found.length + ' из ' + lessons.length;
        }
        search.addEventListener('input', renderLessons);
        category.addEventListener('change', renderLessons);
        type.addEventListener('change', renderLessons);
        reset.addEventListener('click', () => {
            search.value = '';
            category.value = 'all';
            type.value = 'all';
            selection.textContent = HINT;
            renderLessons();
            search.focus();
        });
        renderLessons();

    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else init();
})();

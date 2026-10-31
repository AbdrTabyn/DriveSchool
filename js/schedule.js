'use strict';

const lessons = [
    { id: 1, title: 'Основы ПДД', category: 'B', type: 'Теория', day: 'Понедельник', time: '18:00', duration: 90 },
    { id: 2, title: 'Дорожные знаки', category: 'B', type: 'Теория', day: 'Среда', time: '18:00', duration: 90 },
    { id: 3, title: 'Практика на автодроме', category: 'B', type: 'Практика', day: 'Вторник', time: '10:00', duration: 60 },
    { id: 4, title: 'Вождение в городе', category: 'B', type: 'Практика', day: 'Четверг', time: '15:00', duration: 60 },
    { id: 5, title: 'Управление мотоциклом', category: 'A', type: 'Практика', day: 'Пятница', time: '11:00', duration: 60 },
    { id: 6, title: 'Управление грузовым автомобилем', category: 'C', type: 'Практика', day: 'Суббота', time: '12:00', duration: 90 },
    { id: 7, title: 'Разметка и сигналы регулировщика', category: 'B', type: 'Теория', day: 'Пятница', time: '18:00', duration: 90 },
    { id: 8, title: 'Требования КАП', category: 'B', type: 'Теория', day: 'Суббота', time: '18:00', duration: 90 }
];

const HINT = 'Выбери занятие, чтобы посмотреть детали.';

// Возвращает новый массив занятий по поиску, категории и типу
function filterLessons(list, query, category, type) {
    const text = query.trim().toLocaleLowerCase('ru');
    return list.filter(function (lesson) {
        const haystack = (lesson.title + ' ' + lesson.day).toLocaleLowerCase('ru');
        return haystack.includes(text) &&
            (category === 'all' || lesson.category === category) &&
            (type === 'all' || lesson.type === type);
    });
}

// Создаёт select из пар [значение, текст] и возвращает его
function createSelect(id, options) {
    const select = createEl('select', 'form-select');
    select.id = id;
    for (const [value, text] of options) {
        const option = createEl('option', '', text);
        option.value = value;
        select.appendChild(option);
    }
    return select;
}

// Показывает детали выбранного занятия в блоке box
function showSelection(box, lesson) {
    const reference = 'SCH-' + (1000 + Math.floor(Math.random() * 9000));

    const book = createEl('a', 'btn btn-primary me-2', 'Записаться на пробный урок');
    book.href = 'price.html?category=' + lesson.category;

    const cancel = createEl('button', 'btn btn-outline-secondary', 'Отменить выбор');
    cancel.type = 'button';
    cancel.addEventListener('click', function () {
        box.textContent = 'Выбор отменён. ' + HINT;
    });

    box.replaceChildren(
        createEl('p', 'fw-bold mb-1', lesson.title),
        createEl('p', 'mb-1', 'Категория ' + lesson.category + ' · ' + lesson.type + ' · ' +
            lesson.day + ', ' + lesson.time + ' · ' + lesson.duration + ' мин'),
        createEl('p', 'small text-muted', 'Это предварительный выбор, а не подтверждённая запись. ' +
            'Временный номер: ' + reference + '.'),
        book,
        cancel
    );
}

// Создаёт карточку занятия; при нажатии вызывает onSelect(lesson)
function createLessonCard(lesson, onSelect) {
    const button = createEl('button', 'btn btn-primary', 'Выбрать занятие');
    button.type = 'button';
    button.addEventListener('click', function () {
        onSelect(lesson);
    });

    const body = createEl('div', 'card-body');
    body.append(
        createEl('h4', 'h5', lesson.title),
        createEl('p', '', 'Категория ' + lesson.category + ' · ' + lesson.type + ' · ' +
            lesson.day + ', ' + lesson.time),
        createEl('p', '', 'Продолжительность: ' + lesson.duration + ' минут'),
        button
    );

    const card = createEl('article', 'card h-100');
    card.appendChild(body);
    const col = createEl('div', 'col-12 col-md-6');
    col.appendChild(card);
    return col;
}

const practice = document.querySelector('#practice-section');

if (practice) {
    const search = createEl('input', 'form-control');
    search.type = 'search';
    search.id = 'lesson-search';
    search.placeholder = 'Например, знаки';

    const category = createSelect('lesson-category', [
        ['all', 'Все категории'], ['A', 'Категория A'], ['B', 'Категория B'], ['C', 'Категория C']
    ]);
    const type = createSelect('lesson-type-filter', [
        ['all', 'Все типы'], ['Теория', 'Теория'], ['Практика', 'Практика']
    ]);

    const controls = createEl('div', 'row g-3 mb-3');
    controls.append(
        createField('Поиск', search, 'col-12 col-md-4'),
        createField('Категория', category, 'col-12 col-md-4'),
        createField('Тип занятия', type, 'col-12 col-md-4')
    );

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
        renderList(found, results, function (lesson) {
            return createLessonCard(lesson, function (chosen) {
                showSelection(selection, chosen);
            });
        }, 'Занятия не найдены. Измени поиск или сбрось фильтры.');
        count.textContent = 'Найдено занятий: ' + found.length + ' из ' + lessons.length;
    }

    search.addEventListener('input', renderLessons);
    category.addEventListener('change', renderLessons);
    type.addEventListener('change', renderLessons);
    reset.addEventListener('click', function () {
        search.value = '';
        category.value = 'all';
        type.value = 'all';
        selection.textContent = HINT;
        renderLessons();
        search.focus();
    });

    renderLessons();
}
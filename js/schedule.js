
'use strict';

$(function () {

    // Data
    const lessons = [
        { id: 1, title: 'Основы ПДД', category: 'B', type: 'Теория', day: 'Понедельник', time: '18:00', duration: 90 },
        { id: 2, title: 'Дорожные знаки', category: 'B', type: 'Теория', day: 'Среда', time: '18:00', duration: 90 },
        { id: 3, title: 'Практика на автодроме', category: 'B', type: 'Практика', day: 'Вторник', time: '10:00', duration: 60 },
        { id: 4, title: 'Вождение в городе', category: 'B', type: 'Практика', day: 'Четверг', time: '15:00', duration: 60 },
        { id: 5, title: 'Управление мотоциклом', category: 'A', type: 'Практика', day: 'Пятница', time: '11:00', duration: 60 },
        { id: 6, title: 'Управление грузовым автомобилем', category: 'C', type: 'Практика', day: 'Суббота', time: '12:00', duration: 90 },
        { id: 7, title: 'Разметка и сигналы регулировщика', category: 'B', type: 'Теория', day: 'Пятница', time: '18:00', duration: 90 },
        { id: 8, title: 'Требования КАП', category: 'B', type: 'Теория', day: 'Суббота', time: '18:00', duration: 90 },
        { id: 9, title: 'Первая помощь при ДТП', category: 'B', type: 'Теория', day: 'Воскресенье', time: '14:00', duration: 90 }
    ];
    const HINT = 'Выбери занятие, чтобы посмотреть детали.';
    const $main = $('main');
    if (!$main.length) return;

    // Navbar
    $('.navbar').css({ background: '#10203e', padding: '8px 0', minHeight: 0 });
    $('.navbar .nav-link').css('color', 'rgba(255,255,255,.7)');
    $('.navbar .nav-link.active').css({ color: '#fff', fontWeight: 700 });
    $('body').css('background', '#f4f7fb');
    $('footer').css('background', '#10203e');

    // Layout
    $main.removeClass('bg-white p-4 rounded-3 border shadow-sm')
        .css({ maxWidth: '1320px', margin: '0 auto' });
    $main.parent().removeClass('container').addClass('container-fluid')
        .css({ maxWidth: '1370px', padding: '0 24px' });
    $main.empty();

    $main.css('paddingTop', '10px');

    // Weekly Schedule
    const weeks = [
        {
            week: 1,
            icon: '🚦',
            title: 'Основы дорожного движения',
            topics: ['Правила дорожного движения', 'Дорожные знаки']
        },
        {
            week: 2,
            icon: '🛡️',
            title: 'Дорожная безопасность',
            topics: ['Разметка и сигналы регулировщика', 'Обязанности водителей']
        },
        {
            week: 3,
            icon: '🚗',
            title: 'Правила движения',
            topics: ['Проезд перекрёстков', 'Обгон, остановка и стоянка']
        },
        {
            week: 4,
            icon: '🎓',
            title: 'Подготовка к экзамену',
            topics: ['Первая помощь при ДТП', 'Разбор экзаменационных вопросов']
        }
    ];

    const $weeks = $(`
        <section class="mb-5">
            <h2 class="h3 fw-bold mb-4" style="color:#10203e">Теория по неделям</h2>
            <div class="row g-4" id="weekly-cards"></div>
            <p class="text-secondary mt-3 mb-0">
                После 4 недель теории ученики самостоятельно готовятся к экзамену с помощью тестов.
            </p>
        </section>
    `).appendTo($main);

    weeks.forEach(week => {
        const $card = $(`
            <div class="col-12 col-md-6">
                <div class="bg-white border rounded-4 p-4 h-100">
                    <span class="badge bg-primary mb-3"></span>
                    <h3 class="h5 fw-bold mb-3"></h3>
                    <p class="text-secondary mb-2 topic-one"></p>
                    <p class="text-secondary mb-0 topic-two"></p>
                </div>
            </div>
        `);

        $card.find('.badge').text('Неделя ' + week.week);
        $card.find('h3').text(week.title);
        $card.find('.topic-one').text(week.topics[0]);
        $card.find('.topic-two').text(week.topics[1]);

        $weeks.find('#weekly-cards').append($card);
    });

    // Filters
    $main.append(`
        <section id="schedule-lessons" class="mb-5">
            <h2 class="h3 fw-bold mb-2" style="color:#10203e">Подбор занятий</h2>
            <p class="text-secondary mb-4">Найдите подходящее занятие по категории, типу или названию.</p>
            <div class="bg-white border rounded-4 p-4 mb-4">
                <div class="row g-3">
                    <div class="col-12 col-md-4">
                        <label for="lesson-search" class="form-label fw-semibold">Поиск</label>
                        <input id="lesson-search" type="search" class="form-control" placeholder="Например, знаки">
                    </div>
                    <div class="col-12 col-md-4">
                        <label for="lesson-category" class="form-label fw-semibold">Категория</label>
                        <select id="lesson-category" class="form-select">
                            <option value="all">Все категории</option>
                            <option value="A">Категория A</option>
                            <option value="B">Категория B</option>
                            <option value="C">Категория C</option>
                        </select>
                    </div>
                    <div class="col-12 col-md-4">
                        <label for="lesson-type-filter" class="form-label fw-semibold">Тип занятия</label>
                        <select id="lesson-type-filter" class="form-select">
                            <option value="all">Все типы</option>
                            <option value="Теория">Теория</option>
                            <option value="Практика">Практика</option>
                        </select>
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-4">
                    <p id="lesson-count" class="fw-semibold mb-0" aria-live="polite"></p>
                    <button id="reset-filters" type="button" class="btn btn-outline-secondary">Сбросить фильтры</button>
                </div>
            </div>
            <div id="lesson-results" class="row g-4"></div>
            <div id="lesson-selection" class="mt-4" aria-live="polite"></div>
        </section>`);

    // Filter Function
    function filterLessons(list, query, category, type) {
        const text = query.trim().toLocaleLowerCase('ru');
        return list.filter(lesson => {
            const content = `${lesson.title} ${lesson.day}`.toLocaleLowerCase('ru');
            return content.includes(text)
                && (category === 'all' || lesson.category === category)
                && (type === 'all' || lesson.type === type);
        });
    }

    // Lesson Cards
    function createLessonCard(lesson) {
        const $card = $(`
            <div class="col-12 col-md-6 col-lg-4">
                <article class="bg-white border rounded-4 p-4 h-100">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <span class="badge bg-primary"></span>
                        <span class="small text-secondary lesson-type"></span>
                    </div>
                    <h3 class="h5 fw-bold mb-3 lesson-title" style="color:#10203e"></h3>
                    <p class="text-secondary mb-2 lesson-day"></p>
                    <p class="text-secondary mb-3 lesson-duration"></p>
                    <button type="button" class="btn btn-outline-primary w-100">Выбрать занятие</button>
                </article>
            </div>`);
        $card.find('.badge').text('Категория ' + lesson.category);
        $card.find('.lesson-type').text(lesson.type);
        $card.find('.lesson-title').text(lesson.title);
        $card.find('.lesson-day').text(`${lesson.day}, ${lesson.time}`);
        $card.find('.lesson-duration').text(`Продолжительность: ${lesson.duration} минут`);
        $card.find('button').on('click', () => showSelection(lesson));
        return $card;
    }

    // Selection
    function showSelection(lesson) {
        const reference = 'SCH-' + (1000 + Math.floor(Math.random() * 9000));
        const $box = $('<div class="bg-white border rounded-4 p-4"></div>');
        $box.append(
            $('<h3 class="h5 fw-bold mb-3"></h3>').text('Выбранное занятие'),
            $('<p class="fw-semibold mb-2"></p>').text(lesson.title),
            $('<p class="text-secondary mb-2"></p>').text(
                `Категория ${lesson.category} · ${lesson.type} · ${lesson.day}, ${lesson.time} · ${lesson.duration} мин`
            ),
            $('<p class="small text-secondary mb-4"></p>').text(
                `Это предварительный выбор, а не подтверждённая запись. Временный номер: ${reference}.`
            ),
            $('<a class="btn btn-primary me-2 mb-2"></a>')
                .attr('href', `price.html?category=${lesson.category}`)
                .text('Записаться на пробный урок'),
            $('<button type="button" class="btn btn-outline-secondary mb-2"></button>')
                .text('Отменить выбор')
                .on('click', () => $('#lesson-selection').empty())
        );
        $('#lesson-selection').empty().append($box);
        document.getElementById('lesson-selection').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Render
    function renderLessons() {
        const found = filterLessons(
            lessons,
            $('#lesson-search').val(),
            $('#lesson-category').val(),
            $('#lesson-type-filter').val()
        );
        const $results = $('#lesson-results').empty();
        found.forEach(lesson => $results.append(createLessonCard(lesson)));
        if (!found.length) {
            $results.append('<p class="text-secondary text-center py-4">Занятия не найдены. Измените поиск или сбросьте фильтры.</p>');
        }
        $('#lesson-count').text(`Найдено занятий: ${found.length} из ${lessons.length}`);
    }

    // Events
    $('#lesson-search').on('input', renderLessons);
    $('#lesson-category, #lesson-type-filter').on('change', renderLessons);

    $('#reset-filters').on('click', function () {
        $('#lesson-search').val('');
        $('#lesson-category, #lesson-type-filter').val('all');
        $('#lesson-selection').empty();
        renderLessons();
        $('#lesson-search').trigger('focus');
    });

    // Back to Top
    const $top = $('<button type="button" class="btn btn-primary"></button>')
        .text('↑ Наверх')
        .css({ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000, display: 'none' })
        .appendTo('body');
    $top.on('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    $(window).on('scroll', () => $top.toggle($(window).scrollTop() > 400));

    // Init
    renderLessons();
});

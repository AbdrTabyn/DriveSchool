
'use strict';

$(function () {
    // Programs
    const programs = [
        ['A1', 'A', 'Лёгкие мотоциклы', 40000, 4, '🏍️'],
        ['A', 'A', 'Мотоциклы', 50000, 6, '🏍️'],
        ['B1', 'B', 'Трициклы и квадрициклы', 60000, 5, '🛺'],
        ['B', 'B', 'Легковые автомобили', 80000, 8, '🚗'],
        ['C1', 'C', 'Средние грузовики', 90000, 8, '🚚'],
        ['C', 'C', 'Грузовые автомобили', 100000, 10, '🚛']
    ];

    // Instructors
    const teachers = [
        ['aman', 'Артықбаев Аман', 'AB', [1, 3, 5]],
        ['bekzat', 'Жақсыбай Бекзат', 'AB', [2, 4, 6]],
        ['aigerim', 'Серікқызы Айгерім', 'B', [1, 2, 4]],
        ['daniyar', 'Омаров Данияр', 'BC', [2, 3, 6]],
        ['madina', 'Төлегенова Мадина', 'B', [3, 5, 6]],
        ['ruslan', 'Әлиев Руслан', 'AB', [1, 4, 5]],
        ['erzhan', 'Нұрланов Ержан', 'BC', [1, 3, 6]],
        ['asel', 'Сапарова Әсел', 'B', [2, 4, 5]],
        ['timur', 'Қасымов Тимур', 'AB', [1, 2, 5]],
        ['dana', 'Мұратова Дана', 'B', [3, 4, 6]],
        ['alibek', 'Ибраев Әлібек', 'BC', [1, 4, 6]],
        ['nursultan', 'Сейітов Нұрсұлтан', 'AB', [2, 3, 5]],
        ['aruzhan', 'Қуанышова Аружан', 'B', [1, 3, 5]],
        ['marat', 'Ахметов Марат', 'BC', [2, 4, 6]],
        ['aliya', 'Бекенова Алия', 'B', [1, 2, 4]],
        ['arman', 'Тұрсынов Арман', 'AB', [3, 5, 6]],
        ['zhanar', 'Рахимова Жанар', 'B', [1, 4, 5]],
        ['erlan', 'Смағұлов Ерлан', 'BC', [2, 3, 6]],
        ['dauren', 'Оспанов Дәурен', 'AB', [1, 3, 4]],
        ['diana', 'Кәрімова Диана', 'B', [2, 5, 6]]
    ];

    // Schedule data
    const fallback = [
        [1, 'Основы ПДД', 'B', 'theory', 1, '18:00', 90],
        [2, 'Дорожные знаки', 'B', 'theory', 3, '18:00', 90],
        [3, 'Практика на автодроме', 'B', 'practice', 2, '10:00', 60],
        [4, 'Вождение в городе', 'B', 'practice', 4, '15:00', 60],
        [5, 'Управление мотоциклом', 'A', 'practice', 5, '11:00', 60],
        [6, 'Управление грузовым автомобилем', 'C', 'practice', 6, '12:00', 90],
        [7, 'Разметка и сигналы регулировщика', 'B', 'theory', 5, '18:00', 90],
        [8, 'Требования КАП', 'B', 'theory', 6, '18:00', 90],
        [9, 'Первая помощь при ДТП', 'B', 'theory', 0, '14:00', 90]
    ].map(x => ({
        id: String(x[0]), title: x[1], category: x[2],
        type: x[3], day: x[4], time: x[5], duration: x[6]
    }));

    // Page settings
    const $form = $('#trial-form'), $main = $('main');
    const $section = $main.find('section').first(), $aside = $main.find('aside').first();
    if (!$form.length || !$section.length) return;

    const params = new URLSearchParams(location.search);
    const types = { theory: 'Теория', practice: 'Практика', full: 'Теория + практика' };
    const category = (params.get('category') || '').toUpperCase();
    const type = params.get('type');
    const initial = programs.find(p => p[0] === category) || programs[3];
    const locked = params.get('locked') === '1' && ['theory', 'practice'].includes(type) && programs.some(p => p[0] === category);
    const source = typeof scheduleLessons !== 'undefined' ? scheduleLessons : fallback;
    const lesson = locked ? source.find(x => String(x.id) === params.get('lesson') && x.category === category && x.type === type) : null;
    const group = lesson?.group === true;
    const fromIndex = !locked && !!category && !params.has('type') && programs.some(p => p[0] === category);
    const fixed = locked || fromIndex, fixedType = locked ? type : 'full';
    const money = n => n.toLocaleString('ru-RU') + ' ₸';
    const dateText = d => [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-');
    const now = new Date(), max = new Date(now);
    max.setDate(max.getDate() + 90);

    const today = dateText(now), lastDate = dateText(max);
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    let selected = initial, extra = 0, promo = false, validExtra = true;

    // Available dates
    const dates = [];
    if (lesson) {
        const [h, m] = lesson.time.split(':').map(Number), d = new Date(now);
        d.setHours(h, m, 0, 0);
        d.setDate(d.getDate() + (lesson.day - d.getDay() + 7) % 7);
        if (d < now) d.setDate(d.getDate() + 7);
        while (dateText(d) <= lastDate) {
            dates.push(new Date(d));
            d.setDate(d.getDate() + 7);
        }
    }

    // Page layout
    $('body').css('background', '#f4f7fb');
    $('.navbar, footer').css('background', '#10203e');
    $main.css('maxWidth', '1320px');
    $section.parent().addClass('row g-4 align-items-stretch');
    $section.removeClass('col-lg-12').addClass('col-12 col-lg-8');
    $aside.removeClass('col-lg-12').addClass('col-12 col-lg-4');

    // Gift card and calculator
    $section.html(`
        <div class="bg-white rounded-4 p-4 mb-4 shadow-sm">
            <h2 class="h4 fw-bold">🎁 Подарочный сертификат</h2>
            <p class="text-secondary">Подарите близкому человеку обучение в Drive School</p>
            <div class="rounded-4 p-4 text-white mb-3" style="background:linear-gradient(135deg,#10203e,#34598b)">
                <strong>DRIVE SCHOOL</strong><p class="small mt-3">ПОДАРОЧНЫЙ СЕРТИФИКАТ</p>
                <h3 class="h5">Путь к свободе начинается здесь</h3>
                <div class="d-flex justify-content-between mt-4">
                    <div>Для кого<div id="gift-to" class="fw-bold">Имя получателя</div></div>
                    <div>От кого<div id="gift-from-preview" class="fw-bold">Ваше имя</div></div>
                </div>
            </div>
            <div class="row g-3">
                <div class="col-sm-6"><input id="gift-name" class="form-control" maxlength="40" placeholder="Имя получателя"></div>
                <div class="col-sm-6"><input id="gift-from" class="form-control" maxlength="40" placeholder="Ваше имя"></div>
            </div>
            <button id="gift-copy" class="btn btn-outline-primary w-100 mt-3" type="button">Скопировать поздравление</button>
            <p id="gift-message" class="small text-secondary mt-2 mb-0"></p>
        </div>
        <div class="rounded-4 p-4 text-white" style="background:#10203e">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div><small>ВАШ ПАКЕТ ОБУЧЕНИЯ</small><h2 id="package-name" class="h5 mt-2"></h2><p id="package-details"></p></div>
                <span id="package-icon" class="display-4"></span>
            </div>
            <div class="row g-3">
                <div class="col-sm-6"><label class="form-label">Категория</label><select id="package-category" class="form-select"></select></div>
                <div class="col-sm-6">
                    <label class="form-label">Доп. занятия · 9 000 ₸</label>
                    <div class="input-group">
                        <button id="minus" type="button" class="btn btn-outline-light">−</button>
                        <input id="extra-lessons" type="number" min="0" max="20" value="0" class="form-control text-center">
                        <button id="plus" type="button" class="btn btn-outline-light">+</button>
                    </div>
                </div>
            </div>
            <p id="calc-error" class="small text-warning d-none mt-2">Введите от 0 до 20 занятий.</p>
            <h3 class="h6 mt-4">📊 Структура стоимости</h3>
            <div class="d-flex justify-content-between"><span>Базовая программа</span><span id="base-price"></span></div>
            <div class="progress my-2" style="height:10px"><div id="base-bar" class="progress-bar"></div></div>
            <div class="d-flex justify-content-between"><span>Дополнительные занятия</span><span id="extra-price"></span></div>
            <div class="progress my-2" style="height:10px"><div id="extra-bar" class="progress-bar bg-info"></div></div>
            <div id="discount-row" class="d-none"><div class="d-flex justify-content-between"><span>Скидка 10%</span><span id="discount-price"></span></div></div>
            <div class="input-group mt-4">
                <input id="promo-code" class="form-control" placeholder="Промокод DRIVE10">
                <button id="apply-promo" type="button" class="btn btn-outline-light">Применить</button>
            </div>
            <p id="promo-message" class="small text-white-50 mt-2">DRIVE10 — скидка 10% (демо).</p>
            <hr><div class="d-flex justify-content-between align-items-center">
                <strong>Итоговая стоимость</strong><strong id="total-price" class="h3 mb-0"></strong>
            </div>
            <a href="#trial-form" class="btn btn-light w-100 mt-3">Записаться на обучение →</a>
        </div>
    `);

    // Gift events
    $('#gift-name, #gift-from').on('input', () => {
        $('#gift-to').text($('#gift-name').val().trim() || 'Имя получателя');
        $('#gift-from-preview').text($('#gift-from').val().trim() || 'Ваше имя');
    });

    $('#gift-copy').on('click', async () => {
        const a = $('#gift-name').val().trim(), b = $('#gift-from').val().trim();
        if (!a || !b) return $('#gift-message').text('Заполните оба имени.');
        try {
            await navigator.clipboard.writeText(`${a}, поздравляем! ${b} дарит вам обучение в Drive School!`);
            $('#gift-message').text('✓ Скопировано!');
        } catch {
            $('#gift-message').text('Копирование недоступно.');
        }
    });

    // Form fields
    const options = programs.map(p => `<option value="${p[0]}">Категория ${p[0]}</option>`).join('');
    $('#category, #package-category').html(options);

    const $contact = $(`<div class="mb-3"><label for="contact" class="form-label">Email или телефон</label><input id="contact" name="contact" class="form-control" placeholder="Email или +7 700 000 00 00" required></div>`);
    $('#name').closest('.mb-3').after($contact);
    $('#email, #phone').each(function () { $(this).closest('.mb-3').remove(); });

    $('#instructor').closest('.mb-3').remove();
    const $instructor = $('<select id="instructor" name="instructor" class="form-select">').prop('required', !group).prop('disabled', group);
    const $hint = $('<div class="form-text">');
    $('#category').closest('.mb-3').after(
        $('<div class="mb-3">').toggleClass('d-none', group).append('<label for="instructor" class="form-label">Инструктор</label>', $instructor, $hint)
    );

    const $types = $form.find('[name="lesson-type"]');
    const $typeBlock = $types.first().closest('fieldset').length ? $types.first().closest('fieldset') : $types.first().closest('.mb-3');

    if (fromIndex) {
        $typeBlock.hide();
        $types.prop('checked', false);
        $typeBlock.after('<div class="alert alert-light border py-2">✓ Полный курс: теория + практика</div>');
    } else if (locked) {
        $types.filter(`[value="${fixedType}"]`).prop('checked', true);
        $types.prop('disabled', true);
    } else if (types[type]) {
        $types.filter(`[value="${type}"]`).prop('checked', true);
    }
    if (fixed) $('#category, #package-category').prop('disabled', true);

    // Date after contact
    let $date = $('#date'), $dateBlock = $date.closest('.mb-3');
    if (!$dateBlock.length) $dateBlock = $date.closest('.col-sm-6');
    if (!$date.length) {
        $dateBlock = $('<div class="mb-3"><label for="date" class="form-label">Дата занятия</label><input id="date" name="date" type="date" class="form-control" required></div>');
        $date = $dateBlock.find('#date');
    }

    $dateBlock.removeClass('col-sm-6').addClass('mb-3');
    if (!$dateBlock.find('label[for="date"]').length) $date.before('<label for="date" class="form-label">Дата занятия</label>');

    if (lesson) {
        const $select = $('<select id="date" name="date" class="form-select" required><option value="">Выберите дату занятия</option></select>');
        const fmt = new Intl.DateTimeFormat('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' });
        dates.forEach(d => $('<option>').val(dateText(d)).text(`${fmt.format(d)}, ${lesson.time}`).appendTo($select));
        $date.replaceWith($select);
        $date = $select;
        $('<div class="alert alert-light border mb-3">').text(`${lesson.title} · ${lesson.time}`).prependTo($form);
        $aside.find('h2').first().text('Запись на занятие');
    } else {
        $date.attr({ min: today, max: lastDate });
    }
    $contact.after($dateBlock);

    // Form summary
    const $summary = $('<div class="rounded-3 p-3 mb-3" style="background:#edf2fa">');
    $form.find('button[type="submit"]').first().parent().before($summary);
    const $feedback = $('<div class="mt-3" role="status">').insertAfter($form);
    $form.prop('noValidate', true);
    $('#name').attr('maxlength', 60);
    $('#comment').prop('required', false).attr('maxlength', 600);
    $('label[for="comment"]').text('Комментарий (необязательно)');

    // Instructor filter
    function canTeach(t) {
        return t[2].includes(selected[1]) && (!lesson || t[3].includes(lesson.day));
    }
    function hint() {
        const t = teachers.find(x => x[0] === $instructor.val());
        $hint.text(t ? 'Дни занятий: ' + t[3].map(d => days[d]).join(', ') : '');
    }
    function updateTeachers() {
        if (group) return;
        const old = $instructor.val(), available = teachers.filter(canTeach);
        $instructor.html('<option value="">Выберите инструктора</option>');
        available.forEach(t => $('<option>').val(t[0]).text(t[1]).appendTo($instructor));
        if (available.some(t => t[0] === old)) $instructor.val(old);
        hint();
    }

    // Price calculator
    function total() {
        return (selected[3] + extra * 9000) * (promo ? 0.9 : 1);
    }
    function update() {
        const base = selected[3], add = extra * 9000, sum = base + add;
        $('#category, #package-category').val(selected[0]);
        $('#package-name').text(`Категория ${selected[0]} — ${selected[2]}`);
        $('#package-details').text(`${selected[4]} недель обучения`);
        $('#package-icon').text(selected[5]);
        $('#base-price').text(money(base));
        $('#extra-price').text(validExtra ? money(add) : '—');
        $('#base-bar').css('width', validExtra ? `${base / sum * 100}%` : '0%');
        $('#extra-bar').css('width', validExtra ? `${add / sum * 100}%` : '0%');
        $('#discount-row').toggleClass('d-none', !promo);
        $('#discount-price').text('-' + money(sum * 0.1));
        $('#total-price').text(validExtra ? money(total()) : '—');
        $summary.text(validExtra ? `Категория ${selected[0]} · ${selected[4]} недель · ${money(total())}` : 'Исправьте количество занятий.');
    }
    function setExtra(v) {
        const n = Number(v);
        validExtra = v !== '' && Number.isInteger(n) && n >= 0 && n <= 20;
        $('#extra-lessons').toggleClass('is-invalid', !validExtra);
        $('#calc-error').toggleClass('d-none', validExtra);
        if (validExtra) extra = n;
        update();
    }

    // Calculator events
    $('#category, #package-category').on('change', function () {
        if (fixed) return;
        selected = programs.find(p => p[0] === $(this).val()) || selected;
        updateTeachers();
        update();
        $feedback.empty();
    });
    $instructor.on('change', hint);
    $('#minus, #plus').on('click', function () {
        const n = Math.max(0, Math.min(20, extra + (this.id === 'plus' ? 1 : -1)));
        $('#extra-lessons').val(n);
        setExtra(n);
    });
    $('#extra-lessons').on('input', function () {
        setExtra($(this).val());
    }).on('blur', function () {
        if (!validExtra) { $(this).val(extra); setExtra(extra); }
    });
    $('#apply-promo').on('click', function () {
        promo = $('#promo-code').val().trim().toUpperCase() === 'DRIVE10';
        $('#promo-message').text(promo ? '✓ Скидка 10% применена!' : 'Неверный промокод.');
        update();
    });
    $('#promo-code').on('input', function () {
        promo = false;
        $('#promo-message').text('DRIVE10 — скидка 10% (демо).');
        update();
    });

    // Form validation
    function validate() {
        const d = {
            name: ($('#name').val() || '').trim(),
            contact: ($('#contact').val() || '').trim(),
            date: $date.val(),
            instructor: $instructor.val(),
            type: fixed ? fixedType : $types.filter(':checked').val(),
            comment: ($('#comment').val() || '').trim()
        };
        const errors = {}, teacher = teachers.find(t => t[0] === d.instructor);
        const day = new Date((d.date || '') + 'T12:00:00');

        if (!/^[\p{L}\s'-]{2,60}$/u.test(d.name)) errors.name = 'Введите корректное имя.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.contact) && !/^(\+7|8)\d{10}$/.test(d.contact.replace(/[\s()-]/g, ''))) errors.contact = 'Введите email или телефон.';
        if (!group && (!teacher || !canTeach(teacher))) errors.instructor = 'Выберите инструктора.';
        if (!d.date || isNaN(day.getTime()) || dateText(day) !== d.date || d.date < today || d.date > lastDate) errors.date = 'Выберите дату в ближайшие 90 дней.';
        else if (lesson && !dates.some(x => dateText(x) === d.date)) errors.date = 'Выберите дату из расписания.';
        else if (!lesson && teacher && !teacher[3].includes(day.getDay())) errors.date = 'Инструктор не работает в этот день.';
        if (!types[d.type]) errors['lesson-type'] = 'Выберите тип занятия.';
        if (!$('#consent').is(':checked')) errors.consent = 'Подтвердите согласие.';
        return { d, errors, teacher };
    }
    function showErrors(errors) {
        $form.find('[data-error]').remove();
        $form.find('.is-invalid').removeClass('is-invalid');
        Object.entries(errors).forEach(([key, msg]) => {
            const $field = $form.find(`[name="${key}"]`).first();
            const $anchor = key === 'lesson-type' ? $typeBlock : key === 'consent' ? $field.closest('.form-check') : $field;
            $field.addClass('is-invalid');
            $('<div class="small text-danger mt-1">').attr('data-error', key).text(msg).insertAfter($anchor);
        });
    }
    $form.on('input change', 'input, select, textarea', function () {
        $form.find(`[name="${this.name}"]`).removeClass('is-invalid');
        $form.find(`[data-error="${this.name}"]`).remove();
    });

    // Submit form
    $form.on('submit', function (e) {
        e.preventDefault();
        $feedback.empty();
        const { d, errors, teacher } = validate();
        showErrors(errors);

        if (!validExtra || Object.keys(errors).length) {
            if (!validExtra) $('#extra-lessons').trigger('focus');
            else $form.find('.is-invalid').first().trigger('focus');
            return;
        }
        const details = [
            ['Имя', d.name], ['Контакт', d.contact], ['Категория', selected[0]],
            ['Тип обучения', types[d.type]], ['Дата', d.date]
        ];
        if (!group) details.push(['Инструктор', teacher[1]]);
        if (lesson) details.push(['Занятие', lesson.title], ['Время', lesson.time]);
        else details.push(['Доп. занятия', extra], ['Промокод', promo ? 'DRIVE10' : 'Нет'], ['Стоимость', money(total())]);
        if (d.comment) details.push(['Комментарий', d.comment]);

        const $list = $('<ul class="mb-2">');
        details.forEach(([k, v]) => $('<li>').text(`${k}: ${v}`).appendTo($list));
        $feedback.append($('<div class="alert alert-success">').append(
            '<strong>Заявка сформирована!</strong>', $list,
            '<small>Демо: данные не отправлены на сервер.</small>'
        ));
    });

    // Reset form
    $form.on('reset', function () {
        setTimeout(() => {
            selected = initial; extra = 0; promo = false; validExtra = true;
            $('#extra-lessons').val(0);
            $('#promo-code').val('');
            $('#promo-message').text('DRIVE10 — скидка 10% (демо).');
            $('#calc-error').addClass('d-none');
            showErrors({});
            $feedback.empty();
            updateTeachers();
            update();
            if (locked) $types.filter(`[value="${fixedType}"]`).prop('checked', true);
        }, 0);
    });

    // Initialize
    updateTeachers();
    update();
    const teacher = teachers.find(t => t[0] === params.get('instructor') && canTeach(t));
    if (teacher) { $instructor.val(teacher[0]); hint(); }
    if (location.hash === '#trial-form') {
        requestAnimationFrame(() => $form[0].scrollIntoView({ behavior: 'smooth' }));
    }
});

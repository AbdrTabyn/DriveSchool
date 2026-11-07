$(function () {
    'use strict';

    // Data
    const programs = [
        { code: 'A1', parent: 'A', title: 'Лёгкие мотоциклы', price: 40000, weeks: 4, icon: '🏍️' },
        { code: 'A', parent: 'A', title: 'Мотоциклы', price: 50000, weeks: 6, icon: '🏍️' },
        { code: 'B1', parent: 'B', title: 'Трициклы и квадрициклы', price: 60000, weeks: 5, icon: '🛺' },
        { code: 'B', parent: 'B', title: 'Легковые автомобили', price: 80000, weeks: 8, icon: '🚗' },
        { code: 'C1', parent: 'C', title: 'Средние грузовики', price: 90000, weeks: 8, icon: '🚚' },
        { code: 'C', parent: 'C', title: 'Грузовые автомобили', price: 100000, weeks: 10, icon: '🚛' }
    ];

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

    const steps = [
        ['01', 'Теория', 'Изучаем правила дорожного движения.'],
        ['02', 'Автодром', 'Отрабатываем основные навыки управления.'],
        ['03', 'Город', 'Практикуемся в реальных дорожных условиях.'],
        ['04', 'Экзамен', 'Закрепляем знания и готовимся к сдаче.']
    ];

    const DAYS = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const LESSONS = { theory: 'Теория', practice: 'Практика' };
    const $main = $('main'), $section = $main.find('section').first();
    const $aside = $main.find('aside').first(), $form = $('#trial-form');
    if (!$section.length || !$form.length) return;

    const params = new URLSearchParams(location.search);
    const money = n => n.toLocaleString('ru-RU') + ' ₸';
    const localDate = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const today = localDate(new Date()), max = new Date();
    max.setDate(max.getDate() + 90);

    const lastDate = localDate(max);
    const findInstructor = id => instructors.find(i => i.id === id);
    let selected = programs.find(p => p.code === (params.get('category') || 'B').toUpperCase()) || programs[3];
    let extra = 0, extraValid = true;

    // Navbar
    $('.navbar').css({ background: '#10203e', padding: '8px 0', minHeight: 0 });
    $('.navbar .nav-link').css('color', 'rgba(255,255,255,.7)');
    $('.navbar .nav-link.active').css({ color: '#fff', fontWeight: 700 });
    $('body').css('background', '#f4f7fb');
    $('footer').css('background', '#10203e');

    // Layout
    $main.css('maxWidth', '1320px').find('.row.g-4').first().removeClass('row g-4');
    $section.removeClass('col-12 col-lg-8').empty();
    $aside.removeClass('col-12 col-lg-4').find('> div').removeClass('rounded-3')
        .addClass('rounded-4 p-lg-5').css({ border: '1px solid #e5eaf2', boxShadow: '0 12px 35px rgba(16,32,62,.08)' });

    // Hero
    $section.append(`
        <div class="rounded-4 p-4 p-lg-5 mb-5 text-white" style="background:#10203e;overflow:hidden">
            <div class="row align-items-center g-4">
                <div class="col-12 col-lg-6">
                    <h1 class="fw-bold mb-3" style="font-size:clamp(30px,3vw,44px);line-height:1.15">Выбери свою категорию прав</h1>
                    <p class="mb-4" style="color:#cbd5e1;font-size:17px;line-height:1.7">Прозрачные цены, удобное обучение и уверенность за рулём с первого занятия.</p>
                    <a href="#price-programs" class="btn btn-primary btn-lg">Смотреть программы</a>
                </div>
                <div class="col-12 col-lg-6">
                    <img src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=85"
                         alt="Автомобиль" class="img-fluid w-100 rounded-3" style="height:300px;object-fit:cover">
                </div>
            </div>
        </div>`);

    // Programs
    $section.append(`<div id="price-programs" class="mb-5">
        <h2 class="h3 fw-bold text-center mb-2">Программы обучения</h2>
        <p class="text-secondary text-center mb-4">Выберите категорию, которая подходит именно вам.</p>
        <div id="program-cards" class="row g-4"></div></div>`);

    $('#program-cards').html(programs.map(p => `
        <div class="col-12 col-md-6 col-lg-4"><div class="bg-white border rounded-4 p-4 h-100" data-card="${p.code}" style="transition:transform .2s">
            <div class="fs-1 mb-3">${p.icon}</div>
            <span class="badge bg-primary mb-3">Категория ${p.code}</span>
            <h3 class="h5 fw-bold mb-2">${p.title}</h3>
            <p class="text-secondary mb-3">Срок: ${p.weeks} недель</p>
            <div class="h3 fw-bold mb-4" style="color:#10203e">${money(p.price)}</div>
            <button type="button" class="btn btn-outline-primary w-100" data-select="${p.code}">Выбрать программу</button>
        </div></div>`).join(''));

    // Calculator
    $section.append(`<div class="bg-white border rounded-4 p-4 p-lg-5 mb-5">
        <h2 class="h3 fw-bold mb-2">Калькулятор стоимости</h2>
        <p class="text-secondary mb-4">Добавьте практические занятия и рассчитайте итоговую стоимость.</p>
        <div class="row g-4 align-items-center">
            <div class="col-12 col-md-6">
                <h3 id="selected-name" class="h5 fw-bold mb-3"></h3>
                <label for="extra-lessons" class="form-label fw-semibold">Дополнительные занятия</label>
                <div class="d-flex gap-2 align-items-center">
                    <button id="minus-lesson" type="button" class="btn btn-outline-secondary">−</button>
                    <input id="extra-lessons" type="number" min="0" max="20" value="0" class="form-control text-center" style="max-width:90px">
                    <button id="plus-lesson" type="button" class="btn btn-outline-secondary">+</button>
                </div>
                <p class="small text-secondary mt-2 mb-0">9 000 ₸ за занятие</p>
                <p id="calc-error" class="small text-danger mt-2 d-none">Введите число от 0 до 20.</p>
            </div>
            <div class="col-12 col-md-6"><div class="rounded-4 p-4 text-white" style="background:#10203e">
                <p class="mb-2 text-white-50">Итоговая стоимость</p>
                <div id="total-price" class="display-6 fw-bold"></div>
                <p class="small mb-0 text-white-50">Предварительный расчёт</p>
            </div></div>
        </div></div>`);

    // Steps
    $section.append(`<div class="mb-5">
        <h2 class="h3 fw-bold text-center mb-4">Как проходит обучение?</h2>
        <div id="learning-steps" class="row g-3"></div></div>`);

    $('#learning-steps').html(steps.map(s => `
        <div class="col-12 col-sm-6 col-lg-3"><div class="bg-white border rounded-4 p-4 h-100">
            <div class="h2 fw-bold text-primary mb-3">${s[0]}</div>
            <h3 class="h5 fw-bold">${s[1]}</h3>
            <p class="text-secondary small mb-0">${s[2]}</p>
        </div></div>`).join(''));

    // Form
    $aside.find('h2').first().addClass('fw-bold').css('fontSize', '27px');
    $form.prop('noValidate', true).find('input, select, textarea').addClass('rounded-3');

    const $category = $('#category').html(programs.map(p => `<option value="${p.code}">Категория ${p.code}</option>`).join(''));
    const $instructor = $('<select id="instructor" name="instructor" class="form-select rounded-3" required></select>');
    const $hint = $('<p class="small text-muted mt-2 mb-0" aria-live="polite"></p>');
    $category.closest('.mb-3').after($('<div class="mb-3"></div>').append(
        '<label for="instructor" class="form-label">Инструктор:</label>', $instructor, $hint
    ));
    const $summary = $('<div class="rounded-3 p-3 mb-3"></div>').css('background', '#edf2fa');
    const $submit = $form.find('button[type="submit"]').first();
    $submit.parent().before($summary);
    $submit.addClass('fw-semibold').css({ background: '#10203e', borderColor: '#10203e' });

    const $feedback = $('<div class="mt-3" role="status"></div>').insertAfter($form);
    const $notice = $('<div class="alert alert-info d-none mb-3" role="status"></div>').insertBefore($form);
    $('#date').attr({ min: today, max: lastDate });
    $('#name').attr('maxlength', 60);
    $('#email').attr('maxlength', 100);
    $('#comment').attr('maxlength', 600);

    // Instructors
    function updateInstructorHint() {
        const teacher = findInstructor($instructor.val());
        $hint.text(teacher ? `Дни занятий: ${teacher.days.map(d => DAYS[d]).join(', ')}. ${teacher.description}`
            : 'Выберите инструктора для выбранной категории.');
    }

    function updateInstructors() {
        const previous = $instructor.val();
        const matches = instructors.filter(i => i.categories.includes(selected.parent));

        $instructor.empty().append($('<option>').val('').text('Выберите инструктора'));
        matches.forEach(i => $instructor.append($('<option>').val(i.id).text(`${i.name} · ⭐ ${i.rating} · ${i.experience} лет`)));
        if (matches.some(i => i.id === previous)) $instructor.val(previous);
        updateInstructorHint();
    }

    // Update UI
    function update() {
        $('#selected-name').text(`Категория ${selected.code} — ${selected.title}`);
        $('#total-price').text(extraValid ? money(selected.price + extra * 9000) : '—');

        $summary.text(`Категория ${selected.code} · ${money(selected.price + extra * 9000)} · ${selected.weeks} недель`);
        $category.val(selected.code);

        $('[data-card]').each(function () {
            const active = $(this).data('card') === selected.code;
            $(this).css({ borderColor: active ? '#2563eb' : '#dee2e6',
                boxShadow: active ? '0 10px 30px rgba(37,99,235,.15)' : '0 5px 20px rgba(16,32,62,.05)' });
            $(this).find('button').removeClass('btn-primary').addClass('btn-outline-primary').text('Выбрать программу');
        });
    }

    function selectProgram(code) {
        selected = programs.find(p => p.code === code) || programs[3];
        update();
        updateInstructors();
        $feedback.empty();
    }

    // Calculator Events
    function setExtra(value) {
        const number = Number(value);
        extraValid = value !== '' && Number.isInteger(number) && number >= 0 && number <= 20;

        $('#extra-lessons').toggleClass('is-invalid', !extraValid);
        $('#calc-error').toggleClass('d-none', extraValid);
        if (extraValid) { extra = number; $('#extra-lessons').val(number); }
        update();
    }

    // Validation
    function readForm() {
        return {
            name: $('#name').val().trim(), email: $('#email').val().trim(),
            phone: $('#phone').val().trim(), date: $('#date').val(),
            instructor: $instructor.val(), lesson: $form.find('[name="lesson-type"]:checked').val() || '',
            consent: $('#consent').is(':checked'), comment: ($('#comment').val() || '').trim()
        };
    }

    function validate(d) {
        const errors = {}, teacher = findInstructor(d.instructor);
        const date = new Date(d.date + 'T12:00:00');

        if (!/^[\p{L}\s'-]{2,60}$/u.test(d.name) || d.name.replace(/[^\p{L}]/gu, '').length < 2)
            errors.name = 'Введите имя от 2 до 60 символов.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) || d.email.length > 100)
            errors.email = 'Введите корректный email.';
        if (d.phone && !/^(\+7|8)\d{10}$/.test(d.phone.replace(/[\s()-]/g, '')))
            errors.phone = 'Формат телефона: +7 700 000 00 00.';

        if (!d.phone && d.lesson === 'practice') errors.phone = 'Для практики укажите телефон.';
        if (!teacher) errors.instructor = 'Выберите инструктора.';
        else if (!teacher.categories.includes(selected.parent)) errors.instructor = 'Инструктор не подходит категории.';

        if (!d.date || Number.isNaN(date.getTime()) || localDate(date) !== d.date)
            errors.date = 'Выберите корректную дату.';
        else if (d.date < today || d.date > lastDate) errors.date = 'Выберите дату в ближайшие 90 дней.';
        else if (teacher && !teacher.days.includes(date.getDay()))
            errors.date = `Дни работы инструктора: ${teacher.days.map(x => DAYS[x]).join(', ')}.`;

        if (!Object.hasOwn(LESSONS, d.lesson)) errors['lesson-type'] = 'Выберите тип занятия.';
        if (!d.consent) errors.consent = 'Необходимо согласие на обработку данных.';
        if (d.comment.length > 600) errors.comment = 'Максимум 600 символов.';
        return errors;
    }

    function showErrors(errors) {
        $form.find('.is-invalid').removeClass('is-invalid');
        $form.find('[data-error]').remove();

        Object.entries(errors).forEach(([key, message]) => {
            const $field = $form.find(`[name="${key}"]`).first();
            const $anchor = key === 'lesson-type' ? $field.closest('fieldset')
                : key === 'consent' ? $field.closest('.form-check') : $field;
            $form.find(`[name="${key}"]`).addClass('is-invalid');
            $anchor.after($('<div class="text-danger small mt-1" data-error></div>')
                .attr('data-error', key).text(message));
        });
    }

    // Events
    $('#program-cards').on('click', '[data-select]', function () {
        selectProgram($(this).data('select'));
    });
    $('#program-cards').on('mouseenter mouseleave', '[data-card]', function (e) {
        $(this).css('transform', e.type === 'mouseenter' ? 'translateY(-5px)' : '');
    });

    $category.on('change', function () { selectProgram($(this).val()); });
    $instructor.on('change', function () { updateInstructorHint(); $notice.addClass('d-none'); });
    $('#minus-lesson').on('click', () => setExtra(Math.max(0, extra - 1)));
    $('#plus-lesson').on('click', () => setExtra(Math.min(20, extra + 1)));
    $('#extra-lessons').on('input', function () { setExtra($(this).val()); });
    $('#extra-lessons').on('blur', function () {
        if (!extraValid) setExtra(extra);
    });

    $form.on('input change', 'input, select, textarea', function () {
        const key = $(this).attr('name');
        $(this).removeClass('is-invalid');
        if (key) $form.find('[data-error]').filter(function () {
            return $(this).attr('data-error') === key;
        }).remove();
    });

    // Submit
    $form.on('submit', function (event) {
        event.preventDefault();
        $feedback.empty();

        const data = readForm(), errors = validate(data);
        showErrors(errors);
        if (Object.keys(errors).length) {
            $form.find('.is-invalid').first().trigger('focus');
            return;
        }
        if (!extraValid) { $('#extra-lessons').trigger('focus'); return; }
        const teacher = findInstructor(data.instructor);

        const lines = [
            `Имя: ${data.name}`, `Email: ${data.email}`, `Телефон: ${data.phone || 'не указан'}`,
            `Инструктор: ${teacher.name}`, `Программа: ${selected.code} (${selected.title})`,
            `Тип занятия: ${LESSONS[data.lesson]}`, `Дата: ${data.date.split('-').reverse().join('.')}`,
            `Дополнительные занятия: ${extra}`, `Стоимость: ${money(selected.price + extra * 9000)}`
        ];
        if (data.comment) lines.push(`Комментарий: ${data.comment}`);
        const $list = $('<ul class="mb-2"></ul>');
        lines.forEach(line => $list.append($('<li>').text(line)));

        const reference = `REQ-${1000 + Math.floor(Math.random() * 9000)}`;
        $feedback.append($('<div class="alert alert-success"></div>').append(
            '<p class="fw-bold mb-2">Заявка на пробный урок сформирована</p>', $list,
            $('<p class="small mb-0"></p>').text(`Данные не отправляются на сервер. Временный номер: ${reference}.`)
        )).hide().fadeIn(220);
    });

    // Reset
    $form.on('reset', function () {
        setTimeout(function () {
            selected = programs[3];
            extra = 0;
            extraValid = true;
            $('#extra-lessons').val(0).removeClass('is-invalid');
            $('#calc-error').addClass('d-none');
            $feedback.empty();
            $notice.addClass('d-none');
            showErrors({});
            update();
            updateInstructors();
        }, 0);
    });

    // Init
    update();
    updateInstructors();
    const teacher = findInstructor(params.get('instructor'));

    if (params.has('instructor')) {
        $notice.removeClass('d-none');
        if (teacher && teacher.categories.includes(selected.parent)) {
            $instructor.val(teacher.id);
            $notice.text(`Выбран инструктор ${teacher.name}, категория ${selected.code}.`);
        } else $notice.text('Указанный инструктор не подходит выбранной категории.');
    } else if (params.has('category')) {
        $notice.removeClass('d-none').text(`Вы выбрали категорию ${selected.code}. Стоимость: ${money(selected.price)}.`);
    }

    const type = params.get('type');
    if (Object.hasOwn(LESSONS, type)) $form.find(`[name="lesson-type"][value="${type}"]`).prop('checked', true);
    updateInstructorHint();
});

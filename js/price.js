
'use strict';

$(function () {
    const programs = [
        ['A1','A','Лёгкие мотоциклы',40000,4,'🏍️'],
        ['A','A','Мотоциклы',50000,6,'🏍️'],
        ['B1','B','Трициклы и квадрициклы',60000,5,'🛺'],
        ['B','B','Легковые автомобили',80000,8,'🚗'],
        ['C1','C','Средние грузовики',90000,8,'🚚'],
        ['C','C','Грузовые автомобили',100000,10,'🚛']
    ];

    const teachers = [
        ['aman','Артықбаев Аман','AB',[1,3,5]],
        ['bekzat','Жақсыбай Бекзат','AB',[2,4,6]],
        ['aigerim','Серікқызы Айгерім','B',[1,2,4]],
        ['daniyar','Омаров Данияр','BC',[2,3,6]],
        ['madina','Төлегенова Мадина','B',[3,5,6]],
        ['ruslan','Әлиев Руслан','AB',[1,4,5]],
        ['erzhan','Нұрланов Ержан','BC',[1,3,6]],
        ['asel','Сапарова Әсел','B',[2,4,5]],
        ['timur','Қасымов Тимур','AB',[1,2,5]],
        ['dana','Мұратова Дана','B',[3,4,6]],
        ['alibek','Ибраев Әлібек','BC',[1,4,6]],
        ['nursultan','Сейітов Нұрсұлтан','AB',[2,3,5]],
        ['aruzhan','Қуанышова Аружан','B',[1,3,5]],
        ['marat','Ахметов Марат','BC',[2,4,6]],
        ['aliya','Бекенова Алия','B',[1,2,4]],
        ['arman','Тұрсынов Арман','AB',[3,5,6]],
        ['zhanar','Рахимова Жанар','B',[1,4,5]],
        ['erlan','Смағұлов Ерлан','BC',[2,3,6]],
        ['dauren','Оспанов Дәурен','AB',[1,3,4]],
        ['diana','Кәрімова Диана','B',[2,5,6]]
    ];

    const $main = $('main');
    const $section = $main.find('section').first();
    const $aside = $main.find('aside').first();
    const $form = $('#trial-form');
    if (!$section.length || !$form.length) return;

    const params = new URLSearchParams(location.search);
    const types = { theory:'Теория', practice:'Практика', full:'Теория + практика' };
    const requested = (params.get('category') || '').toUpperCase();
    const initial = programs.find(p => p[0] === requested) || programs[3];

    const schedule = params.get('locked') === '1' &&
        ['theory','practice'].includes(params.get('type')) &&
        programs.some(p => p[0] === requested);

    const fromIndex = !schedule && !!requested &&
        programs.some(p => p[0] === requested) && !params.has('type');

    const fixed = schedule || fromIndex;
    const fixedType = schedule ? params.get('type') : 'full';
    const money = n => n.toLocaleString('ru-RU') + ' ₸';

    const dateText = d => [
        d.getFullYear(),
        String(d.getMonth() + 1).padStart(2,'0'),
        String(d.getDate()).padStart(2,'0')
    ].join('-');

    const max = new Date();
    max.setDate(max.getDate() + 90);

    const today = dateText(new Date());
    const lastDate = dateText(max);
    const days = ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'];

    let selected = initial;
    let extra = 0;
    let validExtra = true;
    let promo = false;

    // Design
    $('body').css('background','#f4f7fb');
    $('.navbar, footer').css('background','#10203e');
    $('.navbar .nav-link').css('color','#d4dbea');
    $('.navbar .nav-link.active').css('color','#fff');

    $main.css('maxWidth','1320px');
    $section.parent().removeClass('align-items-start')
        .addClass('row g-4 align-items-stretch');

    $section.removeClass('col-lg-12')
        .addClass('col-12 col-lg-8 d-flex flex-column').empty();

    $aside.removeClass('col-lg-12')
        .addClass('col-12 col-lg-4 d-flex flex-column');

    $aside.find('> div').addClass('rounded-4 h-100').css({
        border:'1px solid #e3e9f2',
        boxShadow:'0 12px 35px #10203e12'
    });

    // Calculator
    $section.html(`
        <div class="rounded-4 p-4 p-lg-5 text-white flex-grow-1 d-flex flex-column"
             style="background:#10203e">
            <div class="d-flex justify-content-between align-items-start mb-4">
                <div>
                    <span class="small text-white-50">ВАШ ПАКЕТ ОБУЧЕНИЯ</span>
                    <div class="mt-2 mb-2">
                        <h2 id="package-name"
                            class="fs-5 fw-semibold d-inline-block rounded-3 px-3 py-2 mb-0"
                            style="background:#263956;color:#fff;font-family:Arial,sans-serif;text-decoration:none;line-height:1.5">
                        </h2>
                    </div>
                    <p id="package-details" class="text-white-50 mb-0"></p>
                </div>
                <span id="package-icon" class="display-4"></span>
            </div>

            <div class="row g-3">
                <div class="col-sm-6">
                    <label for="package-category" class="form-label">Категория</label>
                    <select id="package-category" class="form-select"></select>
                </div>
                <div class="col-sm-6">
                    <label for="extra-lessons" class="form-label">Доп. занятия · 9 000 ₸</label>
                    <div class="input-group">
                        <button id="minus" class="btn btn-outline-light" type="button">−</button>
                        <input id="extra-lessons" type="number" min="0" max="20"
                               value="0" class="form-control text-center">
                        <button id="plus" class="btn btn-outline-light" type="button">+</button>
                    </div>
                </div>
            </div>

            <p id="calc-error" class="small text-warning mt-2 d-none">
                Введите от 0 до 20 занятий.
            </p>

            <div class="mt-4">
                <h3 class="h6 fw-semibold mb-3">📊 Структура стоимости</h3>
                <div class="d-flex justify-content-between small mb-2">
                    <span>Базовая программа</span><span id="base-price"></span>
                </div>
                <div class="progress mb-3" style="height:10px">
                    <div id="base-bar" class="progress-bar" style="background:#5c91ee"></div>
                </div>
                <div class="d-flex justify-content-between small mb-2">
                    <span>Дополнительные занятия</span><span id="extra-price"></span>
                </div>
                <div class="progress mb-3" style="height:10px">
                    <div id="extra-bar" class="progress-bar" style="background:#65d5ca"></div>
                </div>
                <div id="discount-row" class="d-none">
                    <div class="d-flex justify-content-between small mb-2">
                        <span>Скидка 10%</span><span id="discount-price"></span>
                    </div>
                    <div class="progress mb-3" style="height:10px">
                        <div id="discount-bar" class="progress-bar bg-success"></div>
                    </div>
                </div>
            </div>

            <div class="mt-4">
                <label for="promo-code" class="form-label">🎁 Промокод</label>
                <div class="input-group">
                    <input id="promo-code" class="form-control" placeholder="Введите промокод">
                    <button id="apply-promo" class="btn btn-outline-light" type="button">
                        Применить
                    </button>
                </div>
                <p id="promo-message" class="small mt-2 mb-0 text-white-50">
                    Промокод DRIVE10 — скидка 10% (демо).
                </p>
            </div>

            <div class="mt-auto pt-4">
                <hr class="border-secondary my-4">
                <div class="d-flex justify-content-between align-items-center gap-2">
                    <strong>Итоговая стоимость</strong>
                    <strong id="total-price" class="display-6 text-end"></strong>
                </div>
                <a href="#trial-form" class="btn btn-light fw-semibold w-100 mt-4 py-3">
                    Записаться на обучение →
                </a>
            </div>
        </div>
    `);

    // Form
    const options = programs.map(p =>
        `<option value="${p[0]}">Категория ${p[0]}</option>`
    ).join('');

    $('#package-category, #category').html(options);

    const $email = $('#email');
    const $phone = $('#phone');
    const $contact = $(`
        <div class="mb-3">
            <label for="contact" class="form-label">Email или телефон</label>
            <input id="contact" name="contact" class="form-control"
                   placeholder="example@mail.com или +7 700 000 00 00" required>
            <div class="form-text">Укажите один удобный способ связи.</div>
        </div>
    `);

    if ($email.length) $email.closest('.mb-3').before($contact);
    else if ($phone.length) $phone.closest('.mb-3').before($contact);
    else $('#name').closest('.mb-3').after($contact);

    $email.closest('.mb-3').remove();
    $phone.closest('.mb-3').remove();

    $('#instructor').closest('.mb-3').remove();
    const $instructor = $('<select id="instructor" name="instructor" class="form-select" required>');
    const $hint = $('<div class="form-text"></div>');

    $('#category').closest('.mb-3').after(
        $('<div class="mb-3">').append(
            '<label for="instructor" class="form-label">Инструктор</label>',
            $instructor, $hint
        )
    );

    const $lessonTypes = $form.find('[name="lesson-type"]');
    const $lessonBlock = $lessonTypes.first().closest('fieldset').length
        ? $lessonTypes.first().closest('fieldset')
        : $lessonTypes.first().closest('.mb-3');

    if (fromIndex) {
        $lessonBlock.hide();
        $lessonTypes.prop('checked',false);
        $lessonBlock.after(
            $('<div class="alert alert-light border py-2 mb-3"></div>')
                .text('✓ Полный курс: теория + практика')
        );
    } else if (schedule) {
        $lessonTypes.filter(`[value="${fixedType}"]`).prop('checked',true);
        $lessonTypes.prop('disabled',true);
        $lessonBlock.after(
            $('<div class="form-text mb-3"></div>')
                .text('Тип занятия выбран в расписании.')
        );
    } else if (types[params.get('type')]) {
        $lessonTypes.filter(`[value="${params.get('type')}"]`).prop('checked',true);
    }

    if (fixed) {
        $('#category, #package-category').prop('disabled',true);
        $('#category').closest('.mb-3').append(
            $('<div class="form-text"></div>')
                .text('Категория выбрана ранее и не изменяется.')
        );
    }

    const $summary = $('<div class="rounded-3 p-3 mb-3">')
        .css('background','#edf2fa');

    $form.find('button[type="submit"]').first().parent().before($summary);
    const $feedback = $('<div class="mt-3" role="status">').insertAfter($form);

    $form.prop('noValidate',true);
    $('#date').attr({min:today,max:lastDate});
    $('#name').attr('maxlength',60);
    $('#comment').prop('required',false).attr({
        maxlength:600,
        placeholder:'Укажите пожелания по обучению, если они есть'
    });
    $('label[for="comment"]').text('Комментарий (необязательно)');

    // Instructors
    function updateInstructors() {
        const previous = $instructor.val();
        const available = teachers.filter(t => t[2].includes(selected[1]));

        $instructor.empty().append('<option value="">Выберите инструктора</option>');
        available.forEach(t =>
            $instructor.append($('<option>').val(t[0]).text(t[1]))
        );

        if (available.some(t => t[0] === previous)) $instructor.val(previous);
        updateHint();
    }

    function updateHint() {
        const teacher = teachers.find(t => t[0] === $instructor.val());
        $hint.text(teacher
            ? 'Дни занятий: ' + teacher[3].map(d => days[d]).join(', ')
            : '');
    }

    // Price calculation
    function totalPrice() {
        const sum = selected[3] + extra * 9000;
        return promo ? sum * .9 : sum;
    }

    function update() {
        const base = selected[3];
        const additional = extra * 9000;
        const sum = base + additional;

        $('#package-name').text(`Категория ${selected[0]} — ${selected[2]}`);
        $('#package-details').text(`${selected[4]} недель обучения`);
        $('#package-icon').text(selected[5]);
        $('#package-category, #category').val(selected[0]);
        $('#base-price').text(money(base));
        $('#extra-price').text(validExtra ? money(additional) : '—');
        $('#discount-price').text('-' + money(sum * .1));
        $('#discount-row').toggleClass('d-none',!promo);
        $('#base-bar').css('width',validExtra ? `${base/sum*100}%` : '0%');
        $('#extra-bar').css('width',validExtra ? `${additional/sum*100}%` : '0%');
        $('#discount-bar').css('width',validExtra ? '10%' : '0%');
        $('#total-price').text(validExtra ? money(totalPrice()) : '—');

        $summary.text(validExtra
            ? `Категория ${selected[0]} · ${money(totalPrice())} · ${selected[4]} недель`
            : 'Исправьте количество дополнительных занятий.');
    }

    function selectProgram(code) {
        if (fixed) return;
        const program = programs.find(p => p[0] === code);
        if (!program || program === selected) return;

        selected = program;
        updateInstructors();
        update();
        $feedback.empty();
    }

    function setExtra(value) {
        const n = Number(value);
        validExtra = value !== '' && Number.isInteger(n) && n >= 0 && n <= 20;
        $('#extra-lessons').toggleClass('is-invalid',!validExtra);
        $('#calc-error').toggleClass('d-none',validExtra);
        if (validExtra) extra = n;
        update();
    }

    // Events
    $('#package-category, #category').on('change',function () {
        selectProgram($(this).val());
    });
    $instructor.on('change',updateHint);

    $('#minus').on('click',() => {
        $('#extra-lessons').val(Math.max(0,extra-1));
        setExtra($('#extra-lessons').val());
    });
    $('#plus').on('click',() => {
        $('#extra-lessons').val(Math.min(20,extra+1));
        setExtra($('#extra-lessons').val());
    });
    $('#extra-lessons').on('input',function () {
        setExtra($(this).val());
    }).on('blur',function () {
        if (!validExtra) {
            $(this).val(extra);
            setExtra(extra);
        }
    });

    $('#apply-promo').on('click',function () {
        promo = $('#promo-code').val().trim().toUpperCase() === 'DRIVE10';
        $('#promo-message')
            .text(promo ? '✓ Промокод применён. Скидка 10%!' : 'Неверный промокод.')
            .toggleClass('text-success',promo)
            .toggleClass('text-warning',!promo)
            .removeClass('text-white-50');
        update();
    });

    $('#promo-code').on('input',function () {
        if (!promo) return;
        promo = false;
        $('#promo-message').text('Промокод DRIVE10 — скидка 10% (демо).')
            .removeClass('text-success text-warning').addClass('text-white-50');
        update();
    });

    // Form validation
    function lessonType() {
        return fixed ? fixedType : $lessonTypes.filter(':checked').val();
    }

    function readForm() {
        return {
            name: ($('#name').val() || '').trim(),
            contact: ($('#contact').val() || '').trim(),
            date: $('#date').val(),
            instructor: $instructor.val(),
            lesson: lessonType(),
            consent: $('#consent').is(':checked'),
            comment: ($('#comment').val() || '').trim()
        };
    }

    function validate(d) {
        const errors = {};
        const teacher = teachers.find(t => t[0] === d.instructor);
        const date = new Date((d.date || '') + 'T12:00:00');
        const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.contact);
        const phone = /^(\+7|8)\d{10}$/.test(d.contact.replace(/[\s()-]/g,''));

        if (!/^[\p{L}\s'-]{2,60}$/u.test(d.name))
            errors.name = 'Введите корректное имя.';
        if (!email && !phone)
            errors.contact = 'Введите корректный email или телефон.';
        if (!teacher || !teacher[2].includes(selected[1]))
            errors.instructor = 'Выберите инструктора.';
        if (!d.date || isNaN(date.getTime()) || dateText(date) !== d.date ||
            d.date < today || d.date > lastDate)
            errors.date = 'Выберите дату в ближайшие 90 дней.';
        else if (teacher && !teacher[3].includes(date.getDay()))
            errors.date = 'Инструктор не работает в этот день.';
        if (!types[d.lesson])
            errors['lesson-type'] = 'Выберите тип занятия.';
        if (!d.consent)
            errors.consent = 'Подтвердите согласие.';

        return errors;
    }

    function showErrors(errors) {
        $form.find('.is-invalid').removeClass('is-invalid');
        $form.find('[data-error]').remove();

        Object.entries(errors).forEach(([key,message]) => {
            const $field = $form.find(`[name="${key}"]`).first();
            const $anchor = key === 'lesson-type' ? $lessonBlock
                : key === 'consent' ? $field.closest('.form-check') : $field;

            $field.addClass('is-invalid');
            $('<div class="small text-danger mt-1" data-error>')
                .text(message).insertAfter($anchor);
        });
    }

    $form.on('input change','input, select, textarea',function () {
        $(this).removeClass('is-invalid');
        $form.find('[data-error]').remove();
    });

    // Form submission
    $form.on('submit',function (e) {
        e.preventDefault();
        $feedback.empty();

        const d = readForm();
        const errors = validate(d);
        showErrors(errors);

        if (!validExtra) return $('#extra-lessons').trigger('focus');
        if (Object.keys(errors).length) {
            return $form.find('.is-invalid').first().trigger('focus');
        }

        const teacher = teachers.find(t => t[0] === d.instructor);
        const details = [
            ['Имя',d.name],['Контакт',d.contact],
            ['Категория',selected[0]],['Инструктор',teacher[1]],
            ['Тип обучения',types[d.lesson]],['Дата',d.date],
            ['Доп. занятия',extra],
            ['Промокод',promo ? 'DRIVE10 (−10%)' : 'Нет'],
            ['Стоимость',money(totalPrice())]
        ];

        if (d.comment) details.push(['Комментарий',d.comment]);

        const $list = $('<ul class="mb-2">');
        details.forEach(([key,value]) =>
            $('<li>').text(`${key}: ${value}`).appendTo($list)
        );

        $feedback.append(
            $('<div class="alert alert-success">').append(
                '<strong>Заявка сформирована!</strong>',
                $list,
                '<small>Демонстрация: данные не отправлены на сервер.</small>'
            )
        );
    });

    // Form reset
    $form.on('reset',function () {
        setTimeout(() => {
            selected = initial;
            extra = 0;
            validExtra = true;
            promo = false;

            $('#extra-lessons').val(0).removeClass('is-invalid');
            $('#promo-code').val('');
            $('#calc-error').addClass('d-none');
            $('#promo-message').text('Промокод DRIVE10 — скидка 10% (демо).')
                .removeClass('text-success text-warning').addClass('text-white-50');

            $feedback.empty();
            showErrors({});
            updateInstructors();
            update();

            if (schedule) {
                $lessonTypes.filter(`[value="${fixedType}"]`).prop('checked',true);
            }
        },0);
    });

    // Initial state
    updateInstructors();
    update();

    const teacher = teachers.find(t => t[0] === params.get('instructor'));
    if (teacher && teacher[2].includes(selected[1])) {
        $instructor.val(teacher[0]);
        updateHint();
    }

    if (location.hash === '#trial-form') {
        requestAnimationFrame(() =>
            $form[0].scrollIntoView({behavior:'smooth'})
        );
    }
});

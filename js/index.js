'use strict';

$(function () {
    const $home = $('.home-layout');
    if (!$home.length) return;

    // Data
    const programs = [
        { category: 'A1', parent: 'A', title: 'Лёгкие мотоциклы', price: 40000, weeks: 4 },
        { category: 'A', parent: 'A', title: 'Мотоциклы', price: 50000, weeks: 6 },
        { category: 'B1', parent: 'B', title: 'Трициклы и квадрициклы', price: 60000, weeks: 5 },
        { category: 'B', parent: 'B', title: 'Легковые автомобили', price: 80000, weeks: 8 },
        { category: 'C1', parent: 'C', title: 'Средние грузовики', price: 90000, weeks: 8 },
        { category: 'C', parent: 'C', title: 'Грузовые автомобили', price: 100000, weeks: 10 }
    ];

    const categories = [
        ['all', 'Все программы'],
        ['A', 'Категория A'],
        ['B', 'Категория B'],
        ['C', 'Категория C']
    ];

    const advantages = [
        {
            icon: '🚗',
            title: 'Практическое обучение',
            description: 'Учебная площадка и вождение в городе.'
        },
        {
            icon: '👨‍🏫',
            title: 'Опытные инструкторы',
            description: 'Индивидуальный подход к каждому ученику.'
        },
        {
            icon: '📅',
            title: 'Удобное расписание',
            description: 'Выбирайте подходящее время для занятий.'
        }
    ];

    const steps = [
        {
            title: '01. Теория',
            description: 'Изучение правил дорожного движения.',
            image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80'
        },
        {
            title: '02. Практика',
            description: 'Обучение управлению автомобилем.',
            image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80'
        },
        {
            title: '03. Подготовка к экзамену',
            description: 'Повторение теории и отработка навыков.',
            image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80'
        }
    ];

    const passwordRules = [
        { text: 'Не менее 8 символов', regex: /.{8,}/ },
        { text: 'Заглавная буква', regex: /[A-ZА-ЯЁ]/ },
        { text: 'Строчная буква', regex: /[a-zа-яё]/ },
        { text: 'Цифра', regex: /\d/ },
        { text: 'Спецсимвол', regex: /[^A-Za-zА-Яа-яЁё0-9\s]/ }
    ];

    // Helpers
    function el(tag, classes, content) {
        return $('<' + tag + '>')
            .addClass(classes || '')
            .text(content === undefined ? '' : content);
    }

    function createImage(src, alt) {
        return $('<img>')
            .attr({
                src: src,
                alt: alt,
                loading: 'lazy'
            })
            .addClass('img-fluid rounded-3 shadow-sm w-100');
    }

    function formatPrice(price) {
        return new Intl.NumberFormat('ru-RU').format(price) + ' ₸';
    }

    // Navbar
    $('.navbar-brand').text('Drive School');

    // Layout
    const $main = $home.closest('main');
    const $layout = $main.closest('.row');
    const $aside = $layout.find('aside');

    $main.removeClass('col-lg-8').addClass('col-lg-12');
    $aside.removeClass('col-lg-4').addClass('col-lg-12');

    $home.empty()
        .removeClass('bg-white border shadow-sm')
        .addClass('bg-dark text-white p-4 p-lg-5 rounded-4');

    // Hero
    const $heroRow = el('div', 'row align-items-center g-4');
    const $heroText = el('div', 'col-12 col-lg-6');

    $heroText.append(
        el('h1', 'display-5 fw-bold mb-4',
            'Уверенность за рулём начинается здесь.'),
        el('p', 'lead text-white-50 mb-4',
            'От первого занятия до подготовки к экзамену. ' +
            'Выберите подходящую программу и начните обучение.')
    );

    const $heroActions = el('div', 'd-flex flex-wrap gap-3');
    el('a', 'btn btn-primary btn-lg', 'Выбрать программу')
        .attr('href', '#program-picker')
        .appendTo($heroActions);

    $heroText.append($heroActions);
    const $heroPhoto = el('div', 'col-12 col-lg-6').append(
        createImage(
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85',
            'Автомобиль — иллюстрация'
        )
    );

    $heroRow.append($heroText, $heroPhoto);
    $home.append($heroRow);

    $home.css({
        background: '#10203e',
        padding: '32px',
        marginBottom: '32px'
    });

    $home.find('h1').css({
        fontSize: 'clamp(30px, 3vw, 44px)',
        lineHeight: '1.15',
        marginBottom: '16px'
    });

    $home.find('img').css({
        height: '300px',
        width: '100%',
        objectFit: 'cover'
    });

    $home.find('p').css({
        fontSize: '17px',
        lineHeight: '1.7',
        marginBottom: '24px'
    });

    $home.find('.btn').css({
        fontSize: '16px',
        padding: '10px 20px'
    });

    // Advantages
    const $advantages = el('section', 'mt-5 mb-5');
    $advantages.append(
        el('h2', 'h3 fw-bold text-center mb-4',
            'Почему выбирают Drive School?')
    );

    const $advantagesRow = el('div', 'row g-4');
    $.each(advantages, function (index, item) {
        const $card = el(
            'div',
            'bg-white border rounded-4 shadow-sm p-4 h-100'
        );

        $card.append(
            el('div', 'fs-1 mb-3', item.icon),
            el('h3', 'h5 fw-bold', item.title),
            el('p', 'text-muted mb-0', item.description)
        );

        el('div', 'col-12 col-md-4')
            .append($card)
            .appendTo($advantagesRow);
    });
    $advantages.append($advantagesRow);
    $main.append($advantages);

    // Learning Steps
    const $learning = el('section', 'mb-5');

    $learning.append(
        el('h2', 'h3 fw-bold text-center mb-4',
            'Как проходит обучение?')
    );

    const $stepsRow = el('div', 'row g-4');
    $.each(steps, function (index, step) {
        const $card = el('div', 'card h-100 shadow-sm');
        const $image = createImage(step.image, step.title)
            .addClass('card-img-top');
        const $body = el('div', 'card-body');

        $body.append(
            el('h3', 'h5 fw-bold', step.title),
            el('p', 'card-text text-muted', step.description)
        );

        $card.append($image, $body);
        el('div', 'col-12 col-md-4')
            .append($card)
            .appendTo($stepsRow);
    });

    $learning.append($stepsRow);
    $main.append($learning);

    // Program Filter
    $('#program-picker').remove();

    const $programSection = el(
        'section',
        'bg-white p-4 rounded-4 border shadow-sm mb-5'
    ).attr('id', 'program-picker');

    const $buttons = el(
        'div',
        'd-flex flex-wrap gap-2 mb-4'
    ).attr({
        role: 'group',
        'aria-label': 'Выбор категории'
    });

    const $cards = el('div', 'row g-3');
    const $count = el('p', 'text-muted mt-3 mb-0');

    function createProgramCard(program) {
        const $content = el(
            'div',
            'program-card border rounded-4 p-4 h-100'
        );

        $content.append(
            el('span', 'badge bg-primary mb-3',
                'Категория ' + program.category),
            el('h3', 'h5 fw-bold', program.title),
            el('p', 'text-muted mb-2',
                'Продолжительность: ' + program.weeks + ' нед.'),
            el('p', 'h4 fw-bold text-primary',
                formatPrice(program.price))
        );

        el('a', 'btn btn-outline-primary w-100', 'Подробнее')
            .attr('href', 'price.html?category=' + program.category)
            .appendTo($content);

        return el('div', 'col-12 col-md-6 col-xl-4')
            .append($content);
    }

    function renderPrograms(category) {
        const filtered = programs.filter(function (program) {
            return category === 'all' || program.parent === category;
        });

        $cards.stop(true, true).show().empty();

        if (!filtered.length) {
            $cards.append(
                el('p', 'text-muted',
                    'Программы в этой категории не найдены.')
            );
        }

        filtered.forEach(function (program) {
            createProgramCard(program).appendTo($cards);
        });

        $count.text('Найдено программ: ' + filtered.length);
        $buttons.find('button').each(function () {
            const active = $(this).attr('data-category') === category;

            $(this)
                .toggleClass('btn-primary', active)
                .toggleClass('btn-outline-primary', !active)
                .attr('aria-pressed', String(active));
        });
    }

    $.each(categories, function (index, category) {
        el('button', 'btn btn-outline-primary', category[1])
            .attr({
                type: 'button',
                'data-category': category[0]
            })
            .appendTo($buttons);
    });

    $buttons.on('click', 'button', function () {
        const category = $(this).attr('data-category');
        renderPrograms(category);
    });

    $cards.on('mouseenter mouseleave', '.program-card', function () {
        $(this).toggleClass('shadow');
    });

    $programSection.append(
        el('h2', 'h3 fw-bold mb-2',
            'Выбери свою программу обучения'),
        el('p', 'text-muted mb-4',
            'Сравните категории, стоимость и продолжительность.'),
        $buttons,
        $cards,
        $count
    );
    $main.append($programSection);
    renderPrograms('all');

    // Login Form
    const $form = $aside.find('form');
    if (!$form.length) return;
    $aside.find('h2').addClass('fw-bold');

    const $user = $form.find('#login-username');
    const $pass = $form.find('#login-password');

    const $userError = el('div', 'text-danger small mt-1 d-none');
    const $passError = el('div', 'text-danger small mt-1 d-none');
    const $list = el('ul', 'list-unstyled small mt-2 mb-1');

    const $toggle = el(
        'button',
        'btn btn-outline-secondary btn-sm mt-2',
        'Показать пароль'
    ).attr('type', 'button');

    const $result = el(
        'div',
        'alert alert-success mt-3 mb-0 small d-none'
    ).attr('role', 'status');

    $form.prop('noValidate', true);
    $user.after($userError);
    $pass.after($toggle, $list, $passError);
    $form.append($result);

    function renderChecklist(password) {
        let valid = true;
        $list.empty();

        $.each(passwordRules, function (index, rule) {
            const passed = rule.regex.test(password);
            valid = valid && passed;

            el(
                'li',
                passed ? 'text-success' : 'text-muted',
                (passed ? '✓ ' : '✗ ') + rule.text
            ).appendTo($list);
        });
        return valid;
    }

    function showError($input, $error, message) {
        const invalid = message !== '';

        $input
            .toggleClass('is-invalid', invalid)
            .attr('aria-invalid', String(invalid));

        $error.stop(true, true);
        if (invalid) {
            $error
                .text(message)
                .removeClass('d-none')
                .hide()
                .slideDown(150);
        } else {
            $error.addClass('d-none').text('');
        }
    }

    renderChecklist('');
    $user.on('input', function () {
        showError($user, $userError, '');
        $result.addClass('d-none');
    });

    $pass.on('input', function () {
        renderChecklist($(this).val());
        showError($pass, $passError, '');
        $result.addClass('d-none');
    });

    $toggle.on('click', function () {
        const hidden = $pass.prop('type') === 'password';
        $pass.prop('type', hidden ? 'text' : 'password');

        $(this).text(
            hidden ? 'Скрыть пароль' : 'Показать пароль'
        );
    });

    $form.on('submit', function (event) {
        event.preventDefault();
        $result.addClass('d-none');

        const username = $user.val().trim();
        const userMessage = username.length < 3
            ? 'Логин должен содержать минимум 3 символа.'
            : '';

        const passMessage = renderChecklist($pass.val())
            ? ''
            : 'Пароль не соответствует требованиям.';

        showError($user, $userError, userMessage);
        showError($pass, $passError, passMessage);

        const $invalid = $form.find('.is-invalid:first');
        if ($invalid.length) {
            $invalid.trigger('focus');
            return;
        }

        $result
            .text(
                'Данные для пользователя «' + username +
                '» проверены. Это демонстрационная форма: ' +
                'настоящий вход без сервера не выполняется.'
            )
            .removeClass('d-none')
            .hide()
            .fadeIn(200);

        $pass.val('');
        renderChecklist('');
    });
});
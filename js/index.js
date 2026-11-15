'use strict';

$(function () {
    const $home = $('.home-layout');
    if (!$home.length) return;

    const programs = [
        ['A1','A','Лёгкие мотоциклы',40000,4,'🏍️'],
        ['A','A','Мотоциклы',50000,6,'🏍️'],
        ['B1','B','Трициклы и квадрициклы',60000,5,'🚗'],
        ['B','B','Легковые автомобили',80000,8,'🚗'],
        ['C1','C','Средние грузовики',90000,8,'🚚'],
        ['C','C','Грузовые автомобили',100000,10,'🚚']
    ];

    const advantages = [
        ['🚗','Практическое обучение','Учебная площадка и вождение в городе.'],
        ['👨‍🏫','Опытные инструкторы','Индивидуальный подход к каждому ученику.'],
        ['📅','Удобное расписание','Выбирайте подходящее время для занятий.']
    ];

    const schools = [
        ['Drive School','НАША АВТОШКОЛА','Полный курс обучения вождению',
            'Теория и практика · 6 категорий · Выбор инструктора',
            '#program-picker'],
        ['Kulager Auto','АВТОШКОЛА','Обучение теории и практике',
            'Учебные материалы · Вождение с инструктором',
            'https://kulager-auto.kz/ru'],
        ['PDDTest.kz','ПОДГОТОВКА К ПДД','Сервис подготовки к экзамену',
            'Изучение правил и проверка знаний',
            'https://pddtest.kz/'],
        ['Avtomektep.kz','КАТАЛОГ АВТОШКОЛ','Поиск автошкол и программ обучения',
            'Информация об автошколах и категориях',
            'https://avtomektep.kz/']
    ];

    const $main = $home.closest('main');
    const $aside = $main.closest('.row').find('aside').first();
    const money = n => n.toLocaleString('ru-RU') + ' ₸';

    function el(tag, cls, value) {
        const $item = $('<' + tag + '>').addClass(cls || '');
        if (value !== undefined) $item.text(value);
        return $item;
    }

    // Layout
    $('.navbar-brand').text('Drive School');
    $main.removeClass('col-lg-8').addClass('col-lg-12');
    $aside.removeClass('col-lg-4').addClass('col-lg-12');
    $home.empty()
        .removeClass('bg-white border shadow-sm')
        .addClass('text-white p-4 p-lg-5 rounded-4 mb-5')
        .css('background','#10203e');

    // Hero
    $home.html(`
        <div class="row align-items-center g-4">
            <div class="col-12 col-lg-6">
                <h1 class="display-5 fw-bold mb-4">
                    Уверенность за рулём начинается здесь.
                </h1>
                <p class="lead text-white-50 mb-4">
                    От первого занятия до подготовки к экзамену.
                    Выберите подходящую программу и начните обучение.
                </p>
                <a href="#program-picker" class="btn btn-primary btn-lg">
                    Выбрать программу
                </a>
            </div>
            <div class="col-12 col-lg-6">
                <img
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85"
                    alt="Автомобиль"
                    loading="lazy"
                    class="img-fluid rounded-3 shadow-sm w-100"
                    style="height:300px;object-fit:cover">
            </div>
        </div>
    `);

    // Advantages
    const $advantages = el('section','mb-5').append(
        el('h2','h3 fw-bold text-center mb-4','Почему выбирают Drive School?')
    );
    const $advRow = el('div','row g-4');

    advantages.forEach(([icon,title,description]) => {
        const $card = el('div','bg-white border rounded-4 shadow-sm p-4 h-100').append(
            el('div','fs-1 mb-3',icon),
            el('h3','h5 fw-bold',title),
            el('p','text-secondary mb-0',description)
        );
        el('div','col-12 col-md-4').append($card).appendTo($advRow);
    });
    $main.append($advantages.append($advRow));

    // Schools
    const $comparison = el('section','mb-5').attr('id','comparison');

    $comparison.append(
        el('h2','h3 fw-bold text-center mb-2',
            'Найдите подходящий формат обучения')
            .css('color','#10203e'),
        el('p','text-secondary text-center mb-4',
            'Сравните форматы подготовки и выберите подходящий вариант.')
    );

    const $schoolRow = el('div','row g-3 align-items-stretch');
    schools.forEach(([name,tag,description,details,url],index) => {
        const main = index === 0;
        const $card = el('article','rounded-4 p-4 h-100 d-flex flex-column').css({
            background: main ? '#10203e' : '#fff',
            color: main ? '#fff' : '#10203e',
            border: '1px solid ' + (main ? '#10203e' : '#e2e8f0'),
            boxShadow: '0 8px 22px rgba(16,32,62,.06)',
            minHeight: '265px'
        });

        const linkClass = main ? 'btn btn-light' : 'btn btn-outline-primary';
        const $link = el('a',linkClass + ' fw-semibold w-100 mt-auto',
            main ? 'Выбрать программу' : 'Посетить сайт').attr('href',url);

        if (!main) $link.attr({target:'_blank',rel:'noopener noreferrer'});
        $card.append(
            el('span','small fw-semibold mb-3',tag)
                .css('color',main ? '#9fc2ff' : '#64748b'),
            el('h3','h5 fw-bold mb-3',name),
            el('p','fw-semibold mb-2',description),
            el('p','small mb-4',details)
                .css({
                    color:main ? '#c9d6eb' : '#64748b',
                    lineHeight:'1.7'
                }),
            $link
        );
        el('div','col-12 col-md-6 col-xl-3').append($card).appendTo($schoolRow);
    });
    $main.append($comparison.append($schoolRow));

    // Programs
    const $programSection = el('section',
        'bg-white p-4 rounded-4 border shadow-sm mb-5').attr('id','program-picker');
    const $buttons = el('div','d-flex flex-wrap gap-2 mb-4');
    const $cards = el('div','row g-4');
    const $count = el('p','text-secondary mt-3 mb-0');
    const categories = [
        ['all','Все программы'],
        ['A','Категория A'],
        ['B','Категория B'],
        ['C','Категория C']
    ];

    categories.forEach(([value,label]) => {
        el('button','btn btn-outline-primary',label)
            .attr({
                type:'button',
                'data-category':value
            })
            .appendTo($buttons);
    });

    function renderPrograms(category) {
        const filtered = programs.filter(p =>
            category === 'all' || p[1] === category
        );
        $cards.empty();
        filtered.forEach(([code, ,title,price,weeks,icon]) => {
            const $card = el('div',
                'program-card bg-white border rounded-4 p-4 h-100 d-flex flex-column align-items-start');
            $card.append(
                el('div','fs-1 mb-3',icon),
                el('span','badge bg-primary mb-3','Категория ' + code),
                el('h3','h5 fw-bold mb-2',title),
                el('p','text-secondary mb-3','Срок: ' + weeks + ' недель'),
                el('div','h3 fw-bold mb-4',money(price))
                    .css('color','#10203e'),
                el('a','btn btn-outline-primary w-100 mt-auto',
                    'Выбрать программу')
                    .attr(
                        'href',
                        'price.html?category=' + encodeURIComponent(code)
                    )
            );
            el('div','col-12 col-md-6 col-lg-4').append($card).appendTo($cards);
        });

        $count.text('Найдено программ: ' + filtered.length);
        $buttons.find('button').each(function () {
            const active = $(this).data('category') === category;
            $(this)
                .toggleClass('btn-primary',active)
                .toggleClass('btn-outline-primary',!active)
                .attr('aria-pressed',String(active));
        });
    }
    $buttons.on('click','button',function () {
        renderPrograms($(this).data('category'));
    });

    $programSection.append(
        el('h2','h3 fw-bold mb-2','Выбери свою программу обучения'),
        el('p','text-secondary mb-4',
            'Сравните категории, стоимость и продолжительность.'),
        $buttons,$cards,$count
    );
    $main.append($programSection);
    renderPrograms('all');

    // Login form
    const USER_KEY = 'driveSchoolUser';
    const $username = $('#login-username');
    const $password = $('#login-password');
    const $loginForm = $username.closest('form');
    let loggedIn = false;
    try {
        const user = JSON.parse(localStorage.getItem(USER_KEY));
        loggedIn = Boolean(user && typeof user.name === 'string' && user.name.trim());
    } catch {
        loggedIn = false;
    }

    // Hide the original login section
    $aside.hide();
    if ($loginForm.length && !loggedIn) {
        // Ensure the login button submits the form
        $loginForm.find('button').filter(function () {
            return /войти/i.test($(this).text().trim());
        }).attr('type', 'submit').addClass('w-100');
        $loginForm.find('input[type=submit]').addClass('w-100');

        // Remove the registration notice
        $loginForm.find('p, small, span, div').filter(function () {
            return !$(this).children().length &&
                $(this).text().trim() === 'Регистрация будет доступна позже';
        }).remove();

        // Create the navbar login dropdown
        const $dropdown = $('<div>', {
            class: 'drive-login-dropdown position-relative ms-lg-auto mt-2 mt-lg-0'
        });
        const $openButton = $('<button>', {
            type: 'button',
            class: 'btn btn-outline-light',
            text: 'Войти',
            'aria-expanded': 'false'
        });
        const $panel = $('<div>', {
            class: 'bg-white text-dark rounded-4 shadow p-3'
        }).css({
            display: 'none',
            position: 'absolute',
            top: 'calc(100% + 10px)',
            right: 0,
            width: 'min(340px, 90vw)',
            maxHeight: '80vh',
            overflowY: 'auto',
            zIndex: 9999
        });

        // Move the existing form into the dropdown
        $loginForm.find('input').addClass('form-control-sm');
        $panel.append(
            $('<h3>', {
                class: 'h6 fw-bold mb-3',
                text: 'Вход в аккаунт'
            }),
            $loginForm
        );

        $dropdown.append($openButton, $panel);
        const $nav = $('.navbar .navbar-collapse').first();
        const $target = $nav.length
            ? $nav
            : $('.navbar .container, .navbar .container-fluid').first();
        if ($target.length) $target.append($dropdown);

        // Open or close the dropdown
        $openButton.on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            $panel.toggle();
            const opened = $panel.is(':visible');
            $openButton.attr('aria-expanded', String(opened));
            if (opened) $username.trigger('focus');
        });

        // Keep the dropdown open while using the form
        $panel.on('click', function (event) {
            event.stopPropagation();
        });

        // Close the dropdown when clicking outside
        $(document).on('click.driveLoginDropdown', function () {
            $panel.hide();
            $openButton.attr('aria-expanded', 'false');
        });

        // Close the dropdown with Escape
        $(document).on('keydown.driveLoginDropdown', function (event) {
            if (event.key === 'Escape') {
                $panel.hide();
                $openButton.attr('aria-expanded', 'false');
            }
        });

        // Validate and submit the login form
        $loginForm.off('submit.driveLogin').on('submit.driveLogin', function (event) {
            event.preventDefault();
            const name = String($username.val() || '').trim();
            const password = String($password.val() || '');
            if (name.length < 3) {
                alert('Логин должен содержать минимум 3 символа.');
                $username.trigger('focus');
                return;
            }
            const validPassword =
                password.length >= 8 &&
                /[A-ZА-ЯЁ]/.test(password) &&
                /[a-zа-яё]/.test(password) &&
                /\d/.test(password) &&
                /[^A-Za-zА-Яа-яЁё0-9\s]/.test(password);
            if (!validPassword) {
                alert('Пароль должен содержать минимум 8 символов, заглавную и строчную буквы, цифру и спецсимвол.');
                $password.trigger('focus');
                return;
            }
            try {
                localStorage.setItem(USER_KEY, JSON.stringify({ name }));
                window.location.reload();
            } catch {
                alert('Не удалось сохранить вход.');
            }
        });
    }
});

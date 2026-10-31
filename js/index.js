'use strict';

// jQuery 3.7.1 (loaded before this file); ready() waits until the DOM is built.
$(function () {
    const $home = $('.home-layout');
    if (!$home.length || $('#program-picker').length) return;

    const programs = [
        { category: 'A1', parent: 'A', title: 'Лёгкие мотоциклы', price: 40000, weeks: 4 },
        { category: 'A', parent: 'A', title: 'Мотоциклы', price: 50000, weeks: 6 },
        { category: 'B1', parent: 'B', title: 'Трициклы и квадроциклы', price: 60000, weeks: 5 },
        { category: 'B', parent: 'B', title: 'Легковые автомобили', price: 80000, weeks: 8 },
        { category: 'C1', parent: 'C', title: 'Средние грузовики', price: 90000, weeks: 8 },
        { category: 'C', parent: 'C', title: 'Грузовые автомобили', price: 100000, weeks: 10 }
    ];
    const choices = [
        ['all', 'Все программы'], ['A', 'A — мотоциклы'], ['B', 'B — легковые'], ['C', 'C — грузовые']
    ];
    const passwordRules = [
        { text: 'Не менее 8 символов', regex: /.{8,}/ },
        { text: 'Заглавная буква', regex: /[A-ZА-ЯЁ]/ },
        { text: 'Строчная буква', regex: /[a-zа-яё]/ },
        { text: 'Цифра', regex: /\d/ },
        { text: 'Спецсимвол (например, ! ? # $)', regex: /[^A-Za-zА-Яа-яЁё0-9\s]/ }
    ];

    function el(tag, classes, text) {
        return $('<' + tag + '>').addClass(classes || '').text(text || '');
    }

    function money(number) {
        return new Intl.NumberFormat('ru-RU').format(number) + ' ₸';
    }

    // ---------- Program picker ----------
    // Was -> now: createElement/appendChild/addEventListener per button -> $.each + .appendTo() + one delegated .on().
    // Clearly shorter: no manual loop over children and no handler per button.
    const $buttons = el('div', 'd-flex flex-wrap gap-2 mb-3').attr({ role: 'group', 'aria-label': 'Категория обучения' });
    const $cards = el('div', 'row g-3');

    function createCard(program) {
        const $link = el('a', 'btn btn-outline-primary btn-sm', 'Записаться')
            .attr('href', 'price.html?category=' + program.category);
        const $card = el('div', 'program-card border rounded-3 p-3 h-100').append(
            el('h4', 'h6 fw-bold', 'Категория ' + program.category + ': ' + program.title),
            el('p', 'small mb-2', 'Срок: ' + program.weeks + ' нед.'),
            el('p', 'fw-bold text-primary mb-2', money(program.price)),
            $link
        );
        return el('div', 'col-12 col-md-6').append($card);
    }

    function showCategory(category) {
        const found = $.grep(programs, function (item) {
            return category === 'all' || item.parent === category;
        });
        // Callback runs after fadeOut ends, so the cards are swapped while invisible.
        $cards.stop(true, true).fadeOut(120, function () {
            $cards.empty();
            if (!found.length) {
                $cards.append(el('p', 'text-muted mb-0', 'Нет программ в этой категории.'));
            }
            $.each(found, function (index, program) {
                createCard(program).appendTo($cards);
            });
            $cards.fadeIn(180);
        });
        $buttons.children().each(function () {
            $(this).attr('aria-pressed', String($(this).attr('data-category') === category));
        });
    }

    $.each(choices, function (index, choice) {
        el('button', 'btn btn-outline-primary', choice[1])
            .attr({ type: 'button', 'data-category': choice[0] })
            .appendTo($buttons);
    });

    // Delegated: buttons are created by code, so binding to them directly would not work.
    $buttons.on('click', 'button', function () {
        showCategory($(this).attr('data-category'));
    });

    // Delegated: cards are rebuilt on every category change, a direct handler would be lost.
    $cards.on('mouseenter mouseleave', '.program-card', function () {
        $(this).toggleClass('shadow');
    });

    el('section', 'bg-white p-4 rounded-3 border shadow-sm mt-4')
        .attr('id', 'program-picker')
        .append(el('h2', 'h4 mb-3', 'Выбери свою программу обучения'), $buttons, $cards)
        .insertAfter($home);
    showCategory('all');

    // ---------- Login form (demo, no server) ----------
    const $form = $('aside form');
    if (!$form.length) return;

    const $user = $form.find('#login-username');
    const $pass = $form.find('[name="login-password"]');
    const $userError = el('div', 'text-danger small mt-1 d-none');
    const $passError = el('div', 'text-danger small mt-1 d-none');
    const $list = el('ul', 'list-unstyled small mt-2 mb-1');
    const $toggle = el('button', 'btn btn-outline-secondary btn-sm mt-2', 'Показать пароль').attr('type', 'button');
    const $result = el('div', 'alert alert-success mt-3 mb-0 small d-none').attr('role', 'status');

    // required stays in HTML as the first line of defence; noValidate lets us show our own errors.
    $form.prop('noValidate', true);
    $user.after($userError);
    $pass.after($toggle, $list, $passError);
    $form.append($result);

    // Was -> now: for...of + createElement + replaceChildren -> $.each + .appendTo(); the result is shorter.
    function renderChecklist(password) {
        let allOk = true;
        $list.empty();
        $.each(passwordRules, function (index, rule) {
            const ok = rule.regex.test(password);
            allOk = allOk && ok;
            el('li', ok ? 'text-success' : 'text-muted', (ok ? '✓ ' : '✗ ') + rule.text).appendTo($list);
        });
        return allOk;
    }

    function showError($input, $error, message) {
        const hasError = message !== '';
        $input.toggleClass('is-invalid', hasError).attr('aria-invalid', String(hasError));
        $error.stop(true, true);
        if (hasError) {
            $error.text('Ошибка: ' + message);
            if ($error.hasClass('d-none')) {
                $error.removeClass('d-none').hide().slideDown(150);
            }
        } else if (!$error.hasClass('d-none')) {
            $error.slideUp(150, function () {
                $(this).addClass('d-none').text('');
            });
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
        $(this).text(hidden ? 'Скрыть пароль' : 'Показать пароль');
    });

    // Was -> now: value/classList/focus/textContent -> .val()/.toggleClass()/:first + .trigger()/.text().
    // The checks are the same, but "find the first invalid field" became one selector.
    $form.on('submit', function (event) {
        // Without preventDefault the browser would post to action="#" and reload the page.
        event.preventDefault();
        $result.addClass('d-none');

        const username = $user.val().trim();
        const userMsg = username.length < 3 ? 'логин должен содержать не менее 3 символов.' : '';
        const passMsg = renderChecklist($pass.val())
            ? ''
            : 'не выполнено правил: ' + $list.children('li:not(.text-success)').length + '.';

        showError($user, $userError, userMsg);
        showError($pass, $passError, passMsg);

        const $firstInvalid = $form.find('.is-invalid:first');
        if ($firstInvalid.length) {
            $firstInvalid.trigger('focus');
            return;
        }

        // .text(), not .html(): the login comes from the visitor and must never be parsed as markup.
        $result.text('Формат данных для логина «' + username +
            '» проверен, но вход не выполнен. Данные никуда не отправляются, аккаунт не создаётся.')
            .removeClass('d-none').hide().fadeIn(200);
        $pass.val('');
        renderChecklist('');
        // Browser checks can be bypassed, so a real server must validate again.
    });
});
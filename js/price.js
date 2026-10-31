'use strict';

// jQuery 3.7.1; ready() runs the code only after the DOM is built.
$(function () {
    const $form = $('#trial-form');
    const $table = $('.table-responsive').first();
    if (!$form.length || !$table.find('tbody').length || $('#calc-extra').length) return;

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
    const programmes = [
        { code: 'A1', parent: 'A', vehicle: 'Лёгкие мотоциклы', price: 40000, weeks: 4 },
        { code: 'A', parent: 'A', vehicle: 'Мотоциклы', price: 50000, weeks: 6 },
        { code: 'B1', parent: 'B', vehicle: 'Трициклы и квадроциклы', price: 60000, weeks: 5 },
        { code: 'B', parent: 'B', vehicle: 'Легковые автомобили', price: 80000, weeks: 8 },
        { code: 'C1', parent: 'C', vehicle: 'Средние грузовики', price: 90000, weeks: 8 },
        { code: 'C', parent: 'C', vehicle: 'Грузовые автомобили', price: 100000, weeks: 10 }
    ];
    let selected = programmes.find(item => item.code === 'B');

    function element(tag, classes = '', text = '') {
        return $('<' + tag + '>').addClass(classes).text(text);
    }
    function option(value, text) { return element('option', '', text).val(value); }
    function money(number) { return new Intl.NumberFormat('ru-RU').format(number) + ' ₸'; }
    function localDate(date = new Date()) {
        return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
    }
    function lastDate() { const date = new Date(); date.setDate(date.getDate() + 90); return localDate(date); }
    function findInstructor(id) { return instructors.find(item => item.id === id); }
    function parseExtra(value) {
        const number = Number(value);
        return String(value).trim() !== '' && Number.isInteger(number) && number >= 0 && number <= MAX_EXTRA ? number : null;
    }
    function fieldBox(title, $input, classes = 'mb-3') {
        return element('div', classes).append(element('label', 'form-label', title).attr('for', $input.attr('id')), $input);
    }

    // required/type stay in HTML as the first line of defence.
    $form.prop('noValidate', true);
    const $category = $form.find('[name="category"]').prop('required', true);
    const $instructor = element('select', 'form-select').attr({ id: 'instructor', name: 'instructor' }).prop('required', true);
    const $hint = element('p', 'small text-muted mt-2 mb-0').attr('aria-live', 'polite');
    $category.closest('.mb-3').after(fieldBox('Инструктор:', $instructor).append($hint));
    const $extra = element('input', 'form-control').attr({ id: 'calc-extra', type: 'number', min: '0', max: MAX_EXTRA, step: '1', 'aria-describedby': 'calc-extra-error' }).val('0');
    const $extraError = element('div', 'text-danger small mt-1 d-none').attr('id', 'calc-extra-error');
    const $calc = element('div', 'mt-3').attr('aria-live', 'polite');
    const $calcSection = element('section', 'border rounded-3 p-3 mt-4').append(
        element('h2', 'h4 mb-2', 'Калькулятор стоимости'),
        element('p', 'small text-muted', 'Программа выбирается в таблице выше.'),
        fieldBox('Дополнительные занятия вождения, шт.', $extra).append($extraError), $calc);
    const $subNote = element('p', 'small text-muted mt-2 mb-0').attr('aria-live', 'polite');
    $table.after($subNote);
    $subNote.after($calcSection);
    const $live = element('p', 'small text-break mt-3').attr('role', 'status');
    $form.find('button[type="submit"]').parent().before($live);
    const $result = element('div', 'alert alert-success mt-3 mb-0 d-none text-break').attr('role', 'status');
    $form.after($result);
    const $notice = element('p', 'alert alert-info d-none').attr('role', 'status');
    $form.before($notice);
    // .html() only for fixed markup; .text() would show the tags as plain text.
    $form.find('[name="phone"]').closest('.row').after(element('p', 'small text-muted')
        .html('Для практики <strong>укажите телефон</strong>, чтобы школа могла согласовать занятие.'));

    const fields = {};
    const messages = {};
    const keys = ['name', 'email', 'phone', 'date', 'category', 'instructor', 'lesson-type', 'consent', 'comment'];
    keys.forEach(key => {
        const $input = $form.find('[name="' + key + '"]');
        if (!$input.length) return;
        fields[key] = $input;
        messages[key] = element('div', 'text-danger small mt-1 d-none').attr('id', key + '-error');
        const $anchor = key === 'lesson-type' ? $input.first().closest('fieldset')
            : key === 'consent' ? $input.closest('.form-check') : $input;
        $anchor.after(messages[key]);
        $input.attr('aria-describedby', key + '-error');
    });
    fields.date.attr({ min: localDate(), max: lastDate(), required: 'required' });
    fields.name.attr('maxlength', '60');
    fields.email.attr('maxlength', '100');
    if (fields.comment) fields.comment.attr('maxlength', '600');

    function setError(key, message) {
        const $box = messages[key].stop(true, true);
        fields[key].toggleClass('is-invalid', Boolean(message)).attr('aria-invalid', String(Boolean(message)));
        if (message) {
            $box.text(message);
            if ($box.hasClass('d-none')) $box.removeClass('d-none').hide().slideDown(150);
        } else if (!$box.hasClass('d-none')) {
            // Callback runs after the animation ends.
            $box.slideUp(150, function () { $(this).addClass('d-none').text(''); });
        }
    }
    function hideResult() { $result.stop(true, true).addClass('d-none'); }
    function readForm() {
        return { name: fields.name.val().trim(), email: fields.email.val().trim(), phone: fields.phone.val().trim(),
            date: fields.date.val(), category: $category.val(), instructor: $instructor.val() || '',
            lesson: $form.find('[name="lesson-type"]:checked').val() || '',
            // attr('checked') is the HTML attribute; prop('checked') is the current state.
            consent: fields.consent.prop('checked'), comment: fields.comment ? fields.comment.val().trim() : '' };
    }

    // Was -> now: querySelector/value/classList/addEventListener -> .find()/.val()/.toggleClass()/.on().
    // Field access is shorter; the rules are the same, so the function is not much shorter.
    function validate(data) {
        const errors = {};
        const instructor = findInstructor(data.instructor);
        const date = new Date(data.date + 'T12:00:00');
        if (!/^[\p{L}\s'-]{2,60}$/u.test(data.name) || data.name.replace(/[^\p{L}]/gu, '').length < 2) errors.name = 'Введите имя: от 2 до 60 символов, минимум две буквы.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.email.length > 100) errors.email = 'Формат email: name@example.com.';
        if (data.phone && !/^(\+7|8)\d{10}$/.test(data.phone.replace(/[\s()-]/g, ''))) errors.phone = 'Формат телефона: +7 700 000 00 00.';
        else if (!data.phone && data.lesson === 'practice') errors.phone = 'Для практики укажите телефон.';
        if (!['A', 'B', 'C'].includes(data.category)) errors.category = 'Выберите категорию.';
        if (!instructor) errors.instructor = 'Выберите инструктора.';
        else if (!instructor.categories.includes(data.category)) errors.instructor = 'Инструктор не работает с выбранной категорией.';
        if (!data.date || Number.isNaN(date.getTime()) || localDate(date) !== data.date) errors.date = 'Выберите корректную дату.';
        else if (data.date < localDate()) errors.date = 'Дата не может быть в прошлом.';
        else if (data.date > lastDate()) errors.date = 'Выберите дату в ближайшие 90 дней.';
        else if (instructor && !instructor.days.includes(date.getDay())) errors.date = 'Дни работы инструктора: ' + instructor.days.map(day => DAYS[day]).join(', ') + '.';
        if (!Object.hasOwn(LESSONS, data.lesson)) errors['lesson-type'] = 'Выберите тип занятия.';
        if (!data.consent) errors.consent = 'Нужно согласие на обработку данных.';
        if (data.comment.length > 600) errors.comment = 'Комментарий должен быть не длиннее 600 символов.';
        return errors;
    }

    function updateInstructorHint() {
        const instructor = findInstructor($instructor.val());
        $hint.text(instructor ? 'Дни занятий: ' + instructor.days.map(day => DAYS[day]).join(', ') + '. ' + instructor.description
            : 'Выберите инструктора для выбранной категории.');
    }
    function updateInstructors() {
        const previous = $instructor.val();
        const matches = instructors.filter(item => item.categories.includes($category.val()));
        $instructor.empty().append(option('', 'Выберите инструктора'), matches.map(item => option(item.id, item.name)));
        if (matches.some(item => item.id === previous)) $instructor.val(previous);
        setError('instructor', '');
        updateInstructorHint();
    }

    // Was -> now: createElement/textContent/appendChild -> element().append(); the code is clearly shorter.
    function updateCalc() {
        const extra = parseExtra($extra.val());
        $extraError.text(extra === null ? 'Введите целое число от 0 до ' + MAX_EXTRA + '.' : '').toggleClass('d-none', extra !== null);
        $extra.toggleClass('is-invalid', extra === null).attr('aria-invalid', String(extra === null));
        $calc.empty();
        if (extra === null) return;
        $calc.append(element('p', 'mb-1', 'Программа ' + selected.code + ' (' + selected.vehicle + '): ' + money(selected.price)),
            element('p', 'mb-1', 'Доп. занятия: ' + extra + ' × ' + money(EXTRA_PRICE) + ' = ' + money(extra * EXTRA_PRICE)),
            element('p', 'fw-bold fs-5 text-primary mb-1', 'Итого: ' + money(selected.price + extra * EXTRA_PRICE)),
            element('p', 'small text-muted mb-0', 'Предварительный расчёт, не является счётом или договором.'));
    }
    function updateLiveSummary() {
        const data = readForm();
        const teacher = findInstructor(data.instructor);
        const extra = parseExtra($extra.val());
        $live.text('Программа: ' + selected.code + '. Инструктор: ' + (teacher ? teacher.name : 'не выбран')
            + '. Тип: ' + (LESSONS[data.lesson] || 'не выбран') + '. Дата: ' + (data.date || 'не выбрана') + '. '
            + (extra === null ? 'Проверьте количество дополнительных занятий.' : 'Доп. занятий: ' + extra
                + '. Стоимость курса: ' + money(selected.price + extra * EXTRA_PRICE) + '.'));
    }
    function selectProgramme(programme) {
        selected = programme || programmes.find(item => item.code === 'B');
        $table.find('tbody tr').removeClass('table-active').filter('[data-program="' + selected.code + '"]').addClass('table-active');
        $category.val(selected.parent);
        $subNote.text('Выбрана программа ' + selected.code + ': ' + selected.vehicle + '.');
        updateInstructors();
        updateCalc();
        updateLiveSummary();
        hideResult();
    }

    const $body = $table.find('tbody');
    const $head = $table.find('thead tr');
    ['Срок', 'Действие'].forEach(title => $head.append(element('th', '', title).attr('scope', 'col')));

    // Was -> now: loop with createElement/appendChild -> element().append().appendTo().
    // Delegated on tbody: the buttons are created by code later, so binding directly to them would not work.
    $body.on('click', 'button[data-program]', function () {
        // Chain: clicked button -> its row -> highlight it -> other rows -> remove highlight.
        $(this).closest('tr').addClass('table-active').siblings().removeClass('table-active');
        selectProgramme(programmes.find(item => item.code === $(this).attr('data-program')));
        $notice.addClass('d-none');
    });

    $body.empty();
    programmes.forEach(item => {
        const $button = element('button', 'btn btn-outline-primary btn-sm', 'Выбрать')
            .attr({ type: 'button', 'data-program': item.code, 'aria-label': 'Выбрать программу ' + item.code });
        element('tr').attr('data-program', item.code).append(element('th', '', item.code).attr('scope', 'row'),
            element('td', '', item.vehicle), element('td', '', money(item.price)), element('td', '', item.weeks + ' нед.'),
            element('td').append($button)).appendTo($body);
    });

    $form.on('input change', 'input, select, textarea', function () {
        const key = $(this).attr('name');
        hideResult();
        if (key === 'category') { selectProgramme(programmes.find(item => item.code === $category.val())); $notice.addClass('d-none'); }
        if (key === 'instructor') { updateInstructorHint(); $notice.addClass('d-none'); }
        const errors = validate(readForm());
        if (fields[key] && fields[key].hasClass('is-invalid')) setError(key, errors[key] || '');
        if (['category', 'instructor'].includes(key) && fields.date.val()) setError('date', errors.date || '');
        updateLiveSummary();
    });
    $extra.on('input change', function () { hideResult(); updateCalc(); updateLiveSummary(); });

    $form.on('reset', function (event) {
        // Cancel native reset and restore defaults manually, so the result is not wiped.
        event.preventDefault();
        $form.find('input, select, textarea').each(function () {
            const $input = $(this);
            if ($input.is(':checkbox, :radio')) $input.prop('checked', $input.prop('defaultChecked'));
            else if ($input.is('select')) {
                const $defaults = $input.find('option').filter(function () { return $(this).prop('defaultSelected'); });
                $input.val(($defaults.length ? $defaults.first() : $input.find('option').first()).val());
            } else $input.val($input.prop('defaultValue') || '');
        });
        Object.keys(fields).forEach(key => setError(key, ''));
        $notice.addClass('d-none');
        selectProgramme(programmes.find(item => item.code === $category.val()));
    });

    $form.on('submit', function (event) {
        // Without preventDefault the browser would submit to action="#" and reload the page.
        event.preventDefault();
        hideResult();
        const data = readForm();
        const errors = validate(data);
        let first = '';
        Object.keys(fields).forEach(key => { setError(key, errors[key] || ''); if (errors[key] && !first) first = key; });
        updateCalc();
        if (first) { fields[first].first().trigger('focus'); return; }
        const extra = parseExtra($extra.val());
        if (extra === null) { $extra.trigger('focus'); return; }
        const teacher = findInstructor(data.instructor);
        const $summary = element('ul', 'mb-2');
        ['Имя: ' + data.name, 'Email: ' + data.email, 'Телефон: ' + (data.phone || 'не указан'),
            'Инструктор: ' + teacher.name, 'Программа: ' + selected.code + ' (' + selected.vehicle + ')',
            'Тип занятия: ' + LESSONS[data.lesson], 'Желаемая дата: ' + data.date.split('-').reverse().join('.'),
            'Стоимость курса (предварительно): ' + money(selected.price + extra * EXTRA_PRICE)]
            .forEach(line => $summary.append(element('li', '', line)));
        if (data.comment) $summary.append(element('li', '', 'Комментарий: ' + data.comment));
        const reference = 'REQ-' + (1000 + Math.floor(Math.random() * 9000));
        $form.trigger('reset');
        $result.empty().append(element('p', 'fw-bold mb-2', 'Заявка на пробный урок сформирована'), $summary,
            element('p', 'small mb-0', 'Данные не отправляются на сервер, реальная запись не создана. Временный номер: ' + reference + '.'));
        $result.stop(true, true).removeClass('d-none').fadeOut(0).fadeIn(220);
        // Browser checks can be bypassed, so the server must validate again before saving.
    });

    const params = new URLSearchParams(location.search);
    const linkedProgramme = programmes.find(item => item.code === params.get('category'));
    selectProgramme(linkedProgramme || programmes.find(item => item.code === $category.val()));
    const linkedTeacher = findInstructor(params.get('instructor'));
    if (params.has('instructor')) {
        $notice.removeClass('d-none');
        if (linkedTeacher && linkedTeacher.categories.includes($category.val())) {
            $instructor.val(linkedTeacher.id);
            $notice.text('Выбран инструктор ' + linkedTeacher.name + ', категория ' + selected.code + '.');
        } else $notice.text('Указанный инструктор не подходит выбранной категории. Выберите инструктора из списка.');
    } else if (linkedProgramme) {
        $notice.removeClass('d-none').text('Вы выбрали категорию ' + linkedProgramme.code + '. Стоимость: ' + money(linkedProgramme.price) + '.');
    }
    const type = params.get('type');
    if (Object.hasOwn(LESSONS, type)) $form.find('[name="lesson-type"][value="' + type + '"]').prop('checked', true);
    updateInstructorHint();
    updateLiveSummary();
});
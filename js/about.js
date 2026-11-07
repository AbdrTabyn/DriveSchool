'use strict';

// jQuery 3.7.1 full: библиотека подключена первой, а ready запускает код после готовности DOM.
$(function () {
    const $history = $('.history');
    if (!$history.length || $('#review-form').length) return;
    const $content = $history.parent();
    const topics = {
        general: 'Общий отзыв',
        theory: 'Теория',
        practice: 'Практика',
        instructors: 'Инструкторы',
        organization: 'Организация'
    };
    const reviewStoragePrefix = 'drive-school-about-review:';
    const originalReviews = [
        { id: 1, name: 'Ұлан', text: 'Великие дела начинаются с мечтаний', rating: null, date: '2026-09-05T12:00:00', own: false },
        { id: 2, name: 'Abdurrakhim Yestaiuly', topic: 'instructors', text: 'Уроки проходят хорошо и на позитиве. Инструкторы добрые и всегда стараются помочь', rating: null, date: '2026-09-09T12:00:00', own: false }
    ];
    let savedReviews = [];

    function readSavedReviews() {
        const reviews = [];
        for (let index = 0; index < localStorage.length; index++) {
            const key = localStorage.key(index);
            if (!key?.startsWith(reviewStoragePrefix)) continue;
            let review;
            try {
                review = JSON.parse(localStorage.getItem(key));
            } catch (error) {
                if (error instanceof SyntaxError) continue;
                throw error;
            }
            if (!review || typeof review.name !== 'string' || typeof review.text !== 'string'
                || !Number.isInteger(review.rating) || review.rating < 1 || review.rating > 5
                || typeof review.date !== 'string' || !Number.isFinite(Date.parse(review.date))) continue;
            reviews.push({
                id: key.slice(reviewStoragePrefix.length),
                name: review.name, text: review.text,
                topic: Object.hasOwn(topics, review.topic) ? review.topic : 'general',
                rating: review.rating, date: review.date, own: true
            });
        }
        return reviews.sort((first, second) => second.date.localeCompare(first.date));
    }

    function element(tag, classes = '', text = '') {
        return $('<' + tag + '>').addClass(classes).text(text);
    }
    function option(value, text) {
        return element('option', '', text).val(value);
    }
    function field(id, title, type = 'text') {
        const $box = element('div', 'col-12 col-md-6 mb-2');
        const $input = element(['select', 'textarea'].includes(type) ? type : 'input',
            type === 'select' ? 'form-select form-select-sm' : 'form-control form-control-sm');
        if (!['select', 'textarea'].includes(type)) $input.attr('type', type);
        $input.attr({ id: id, name: id, required: 'required', 'aria-describedby': id + '-error' });
        if (type === 'textarea') $input.attr('rows', '2');
        const $error = element('div', 'invalid-feedback').attr('id', id + '-error');
        $box.append(element('label', 'form-label small fw-bold mb-1', title).attr('for', id), $input, $error).appendTo($form);
        return { $input, $error };
    }
    const $classroom = $history.children('figure.classroom-photo');
    if ($classroom.length) {
        const figureClasses = 'col-12 col-sm-6 col-lg-5 mb-0';
        const $photos = element('div', 'row justify-content-center g-3 mb-3').insertBefore($classroom);
        $classroom.removeClass('classroom-photo float-start me-3 mb-2').addClass(figureClasses);
        $classroom.children('img').removeClass('img-fluid').addClass('object-fit-cover')
            .wrap(element('div', 'ratio ratio-1x1'));
        $classroom.children('figcaption').addClass('mt-2');

        const $resultPhoto = element('img', 'rounded object-fit-cover').attr({
            src: 'images/student-result-blurred.png',
            alt: 'Водительское удостоверение в руке, имя и портрет размыты',
            width: 1068, height: 1472, loading: 'lazy'
        });
        const $resultFigure = element('figure', figureClasses).append(
            element('div', 'ratio ratio-1x1').append($resultPhoto),
            element('figcaption', 'mt-2', 'Ученик автошколы получил водительское удостоверение.'));
        $photos.append($classroom, $resultFigure);
    }

    const $section = element('section', 'border rounded p-3 mt-4').attr('id', 'reviews-section');
    const $filter = element('select', 'form-select form-select-sm').attr('id', 'review-filter');
    $filter.append(option('', 'Любая оценка'), [5, 4, 3, 2, 1].map(n => option(n, n + ' из 5')), option('none', 'Без оценки'));
    const topicOptions = Object.entries(topics);
    const $topicFilter = element('select', 'form-select form-select-sm').attr('id', 'review-topic-filter');
    $topicFilter.append(option('', 'Все темы'), topicOptions.map(([value, label]) => option(value, label)));
    const $reset = element('button', 'btn btn-outline-primary btn-sm', 'Сбросить фильтры').attr('type', 'button');
    const $controls = element('div', 'd-flex flex-wrap align-items-end gap-2').append(
        element('div').append(element('label', 'small fw-bold', 'Тема отзыва').attr('for', 'review-topic-filter'), $topicFilter),
        element('div').append(element('label', 'small fw-bold', 'Оценка').attr('for', 'review-filter'), $filter), $reset);
    const $count = element('p', 'small mt-2 mb-0').attr('role', 'status');
    const $list = element('div', 'mt-3').attr('id', 'review-list');
    const $notice = element('p', 'small text-break mt-2 mb-0').attr('role', 'status');
    const $open = element('button', 'btn btn-primary btn-sm', 'Написать отзыв')
        .attr({ type: 'button', 'aria-controls': 'review-form', 'aria-expanded': 'false' });
    const $form = element('form', 'row g-2 mt-3 mb-3 d-none').attr('id', 'review-form').prop('noValidate', true);
    const name = field('review-name', 'Ваше имя');
    name.$input.attr({ maxlength: '60', autocomplete: 'name' });
    const email = field('review-email', 'Email (не сохраняется)', 'email');
    email.$input.attr({ maxlength: '100', autocomplete: 'email' });
    const rating = field('review-rating', 'Оценка', 'select');
    rating.$input.append(option('', 'Выберите оценку'), [5, 4, 3, 2, 1].map(n => option(n, n + ' из 5')));
    const topic = field('review-topic', 'Тема отзыва', 'select');
    topic.$input.append(option('', 'Выберите тему'), topicOptions.map(([value, label]) => option(value, label)));
    const text = field('review-text', 'Ваш отзыв', 'textarea');
    text.$input.attr({ minlength: '20', maxlength: '600', 'aria-describedby': 'review-text-error review-counter' });
    const $counter = element('small', 'text-muted', '0 / 600 символов; минимум 20').attr('id', 'review-counter');
    text.$input.after($counter);
    const $submit = element('button', 'btn btn-primary btn-sm', 'Добавить отзыв').attr('type', 'submit');
    const $feedback = element('p', 'small text-break mt-2 mb-0').attr('role', 'status');
    $form.append(element('div', 'col-12').append($submit, $feedback));
    const $heading = element('div', 'd-flex flex-wrap align-items-center justify-content-between gap-2 border-bottom pb-2 mb-3');
    $heading.append(element('h2', 'h4 border-0 pb-0 mb-0', 'Отзывы учеников'), $open);
    $section.append($heading, $form, $controls, $count, $list, $notice).appendTo($content);
    const fields = { 'review-name': name, 'review-email': email, 'review-rating': rating, 'review-topic': topic, 'review-text': text };

    function setError(key, message) {
        fields[key].$error.text(message);
        fields[key].$input.toggleClass('is-invalid', Boolean(message)).attr('aria-invalid', String(Boolean(message)));
    }
    function readValues() {
        return { name: name.$input.val().trim(), email: email.$input.val().trim(),
            rating: rating.$input.val(), topic: topic.$input.val(), text: text.$input.val().trim() };
    }
    function validate(data) {
        return {
            'review-name': data.name.length >= 2 && data.name.length <= 60 ? '' : 'Введите имя от 2 до 60 символов.',
            'review-email': /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) && data.email.length <= 100 ? '' : 'Введите корректный email.',
            'review-rating': /^[1-5]$/.test(data.rating) ? '' : 'Выберите оценку от 1 до 5.',
            'review-topic': Object.hasOwn(topics, data.topic) ? '' : 'Выберите тему отзыва.',
            'review-text': data.text.length >= 20 && data.text.length <= 600 ? '' : 'Напишите от 20 до 600 символов.'
        };
    }
    function renderReview(review) {
        const $card = element('article', 'card mb-2').attr('data-review-id', review.id);
        const $body = element('div', 'card-body p-3');
        const date = new Date(review.date);
        $body.append(element('h3', 'h6 text-break mb-1', review.name),
            element('span', 'badge bg-light text-dark mb-1', topics[review.topic || 'general']),
            element('p', 'small text-primary mb-1', review.rating === null ? 'Без оценки' : 'Оценка: ' + review.rating + ' из 5'),
            element('time', 'small text-muted', review.own ? date.toLocaleString('ru-RU') : date.toLocaleDateString('ru-RU')).attr('datetime', review.date),
            element('p', 'small text-break mt-2 mb-1', review.text));
        if (review.own) $body.append(element('button', 'btn btn-outline-primary btn-sm mt-2', 'Удалить')
            .attr({ type: 'button', 'data-action': 'delete-review' }));
        return $card.append($body);
    }
    function renderReviews() {
        const reviews = [...savedReviews, ...originalReviews];
        const selectedRating = $filter.val();
        const selectedTopic = $topicFilter.val();
        const items = reviews.filter(review => {
            const matchesRating = !selectedRating || (selectedRating === 'none'
                ? review.rating === null : review.rating === Number(selectedRating));
            const matchesTopic = !selectedTopic || (review.topic || 'general') === selectedTopic;
            return matchesRating && matchesTopic;
        });
        // Цепочка: empty очищает старый список, attr задаёт состояние, append добавляет новые карточки.
        $list.empty().attr('aria-busy', 'false').append(items.map(renderReview));
        if (!items.length) $list.append(element('p', 'small text-muted', 'Таких отзывов пока нет. Сбросьте фильтр или напишите свой.'));
        $count.text('Показано отзывов: ' + items.length + ' из ' + reviews.length + '.');
    }

    // Переписано 2: addEventListener и classList заменены на .on(), .hasClass(), .addClass()/removeClass().
    // Переключение слайда понятнее; код немного длиннее из-за анимации, ARIA и возврата фокуса.
    $open.on('click', function () {
        const $button = $(this);
        $form.stop(true, true);
        const show = $form.hasClass('d-none');
        $button.text(show ? 'Скрыть форму' : 'Написать отзыв').attr('aria-expanded', String(show));
        if (show) {
            $form.removeClass('d-none').slideUp(0).slideDown(180, function () {
                // Callback после открытия переводит курсор в первое поле.
                name.$input.trigger('focus');
            });
        } else {
            $form.slideUp(180, function () { $form.addClass('d-none'); $button.trigger('focus'); });
        }
    });

    // Делегирование: родитель существует до появления кнопок новых отзывов.
    // Прямая привязка к текущим кнопкам не обработала бы кнопки, созданные после отправки формы.
    $list.on('click', '[data-action="delete-review"]', function () {
        const $button = $(this);
        if ($button.attr('data-confirmed') !== 'true') {
            $button.attr('data-confirmed', 'true').text('Подтвердить удаление');
            return;
        }
        const $card = $button.closest('article');
        const id = $card.attr('data-review-id');
        try {
            const remaining = readSavedReviews().filter(review => review.id !== id);
            localStorage.removeItem(reviewStoragePrefix + id);
            savedReviews = remaining;
        } catch {
            $notice.text('Не удалось удалить отзыв из хранилища браузера. Попробуйте ещё раз.');
            return;
        }
        $button.prop('disabled', true);
        $card.fadeOut(180, function () {
            renderReviews();
            $notice.text('Ваш отзыв удалён.');
            $filter.trigger('focus');
        });
    });
    $form.on('submit', function (event) {
        // Обрабатываем форму на этой странице и сохраняем отзыв в браузере.
        event.preventDefault();
        const data = readValues();
        const errors = validate(data);
        let first = '';
        Object.keys(fields).forEach(key => { setError(key, errors[key]); if (errors[key] && !first) first = key; });
        $feedback.text('');
        $notice.text('');
        if (first) { fields[first].$input.trigger('focus'); return; }
        try {
            const existing = readSavedReviews();
            if (existing.some(review => review.name === data.name && review.text === data.text)) {
                $feedback.text('Этот отзыв уже добавлен.');
                return;
            }
            const id = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
            const review = {
                id, name: data.name, text: data.text, topic: data.topic,
                rating: Number(data.rating), date: new Date().toISOString(), own: true
            };
            localStorage.setItem(reviewStoragePrefix + id, JSON.stringify(review));
            savedReviews = [review, ...existing];
        } catch {
            $feedback.text('Не удалось сохранить отзыв в браузере. Попробуйте ещё раз.');
            return;
        }
        $form.trigger('reset');
        $filter.val('');
        $topicFilter.val(data.topic);
        renderReviews();
        $feedback.stop(true, true).text('Отзыв сохранён в этом браузере.')
            .fadeOut(0).fadeIn(180);
        // Любая проверка в браузере обходится: реальный сервер должен повторно проверять и сохранять данные.
    });
    $form.on('input change', 'input, select, textarea', function () {
        const key = $(this).attr('name');
        if (fields[key] && fields[key].$input.hasClass('is-invalid')) setError(key, validate(readValues())[key]);
        $feedback.stop(true, true).text('');
        $counter.text(text.$input.val().length + ' / 600 символов; минимум 20');
    });
    $form.on('reset', function () {
        // Сброс выполняется через jQuery, поэтому не смешиваем DOM-методы в этой функции.
        Object.keys(fields).forEach(key => { fields[key].$input.val(''); setError(key, ''); });
        $counter.text('0 / 600 символов; минимум 20');
        $feedback.stop(true, true).text('');
    });
    $filter.add($topicFilter).on('change', function () {
        $notice.text('');
        renderReviews();
    });
    $reset.on('click', function () {
        $filter.val('');
        $topicFilter.val('');
        $notice.text('');
        renderReviews();
    });
    try {
        savedReviews = readSavedReviews();
    } catch {
        $notice.text('Не удалось загрузить сохранённые отзывы из браузера.');
    }
    renderReviews();

    const $newbutton = element('button','btn btn-primary','btn-sm')
});

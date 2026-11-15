(function () {
    'use strict';

    const storagePrefix = 'drive-school-about-review:';
    const topics = {
        general: 'Общий отзыв',
        theory: 'Теория',
        practice: 'Практика',
        instructors: 'Инструкторы',
        organization: 'Организация'
    };
    const dateFormat = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

    function readSavedReviews() {
        const reviews = [];
        for (let index = 0; index < localStorage.length; index++) {
            const key = localStorage.key(index);
            if (!key?.startsWith(storagePrefix)) continue;

            const storedReview = localStorage.getItem(key);
            let review;
            try {
                review = JSON.parse(storedReview);
            } catch {
                continue;
            }
            if (!review) continue;
            const { name, text, rating, date, topic } = review;
            if (typeof name !== 'string' || typeof text !== 'string' || !Number.isInteger(rating) ||
                rating < 1 || rating > 5 || typeof date !== 'string' || !Number.isFinite(Date.parse(date))) continue;

            reviews.push({
                id: key.slice(storagePrefix.length),
                name, text, rating, date,
                topic: Object.hasOwn(topics, topic) ? topic : 'general',
                own: true
            });
        }
        return reviews.sort((first, second) => Date.parse(second.date) - Date.parse(first.date));
    }

    function element(tag, className, text = '') {
        const node = document.createElement(tag);
        node.className = className;
        node.textContent = text;
        return node;
    }

    function reviewCard(review) {
        const card = element('article', 'card h-100 bg-light border-0 border-start border-primary border-3');
        card.dataset.reviewId = review.id;
        const content = element('div', 'card-body p-2 px-md-3');
        const heading = element('div', 'd-flex flex-wrap justify-content-between align-items-baseline gap-2 mb-1');
        const time = element('time', 'text-body-secondary');
        time.dateTime = review.date;
        time.append(element('small', '', dateFormat.format(new Date(review.date))));
        heading.append(element('h3', 'h6 fw-bold text-break mb-0', review.name), time);

        const rating = review.rating === null ? 'Без оценки' : '★ ' + review.rating + ' из 5';
        const metadata = element('p', 'mb-1 text-body-secondary');
        metadata.append(element('small', '', rating + ' · ' + topics[review.topic]));
        const comment = element('p', 'mb-0 text-break');
        comment.append(element('small', '', review.text));
        content.append(heading, metadata, comment);

        if (review.own) {
            const remove = reviewButton('Удалить', 'btn btn-outline-primary btn-sm mt-2');
            remove.dataset.action = 'delete-review';
            content.append(remove);
        }
        card.append(content);
        const column = element('div', 'col');
        column.append(card);
        return column;
    }

    function setupReviews(section, originalReviews) {
        const form = section.querySelector('#review-form');
        const open = section.querySelector('#review-open');
        const filter = section.querySelector('#review-filter');
        const topicFilter = section.querySelector('#review-topic-filter');
        const list = section.querySelector('#review-list');
        const count = section.querySelector('#review-count');
        const notice = section.querySelector('#review-notice');
        const feedback = section.querySelector('#review-feedback');
        const counter = section.querySelector('#review-counter');
        const nameField = form.elements.namedItem('name');
        const textField = form.elements.namedItem('text');
        let savedReviews = [];

        function renderReviews() {
            const reviews = [...savedReviews, ...originalReviews];
            const shown = reviews.filter(review =>
                (!topicFilter.value || review.topic === topicFilter.value) &&
                (!filter.value || String(review.rating ?? 'none') === filter.value));
            list.replaceChildren(...shown.map(reviewCard));
            if (!shown.length) {
                list.append(element('p', 'small text-body-secondary', 'Таких отзывов пока нет. Сбросьте фильтры или напишите свой.'));
            }
            count.textContent = 'Показано отзывов: ' + shown.length + ' из ' + reviews.length + '.';
        }

        function clearFilters() {
            filter.value = '';
            topicFilter.value = '';
        }

        function setFormOpen(visible) {
            form.hidden = !visible;
            open.textContent = visible ? 'Скрыть форму' : 'Написать отзыв';
            open.setAttribute('aria-expanded', String(visible));
            (visible ? nameField : open).focus();
        }

        function readForm() {
            return Object.fromEntries([...new FormData(form)].map(([name, value]) => [name, value.trim()]));
        }

        function validate(data) {
            return {
                name: data.name.length >= 2 && data.name.length <= 60 ? '' : 'Введите имя от 2 до 60 символов.',
                email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) && data.email.length <= 100 ? '' : 'Введите корректный email.',
                rating: /^[1-5]$/.test(data.rating) ? '' : 'Выберите оценку от 1 до 5.',
                topic: Object.hasOwn(topics, data.topic) ? '' : 'Выберите тему отзыва.',
                text: data.text.length >= 20 && data.text.length <= 600 ? '' : 'Напишите от 20 до 600 символов.'
            };
        }

        function setError(name, message) {
            const input = form.elements.namedItem(name);
            input.classList.toggle('is-invalid', Boolean(message));
            input.setAttribute('aria-invalid', String(Boolean(message)));
            const error = section.querySelector('#' + input.id + '-error');
            error.hidden = !message;
            error.textContent = message;
        }

        function renderCount() {
            counter.textContent = textField.value.length + ' / 600 символов; минимум 20';
        }

        open.addEventListener('click', () => setFormOpen(form.hidden));
        form.addEventListener('submit', event => {
            event.preventDefault();
            notice.textContent = '';
            feedback.textContent = '';
            const data = readForm();
            const errors = validate(data);
            const validation = Object.entries(errors);
            validation.forEach(([id, message]) => setError(id, message));
            const firstInvalid = validation.find(([, message]) => message)?.[0];
            if (firstInvalid) {
                form.elements.namedItem(firstInvalid).focus();
                return;
            }

            try {
                const existing = readSavedReviews();
                if (existing.some(review => review.name === data.name && review.text === data.text)) {
                    feedback.textContent = 'Этот отзыв уже добавлен.';
                    return;
                }
                const id = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
                // Email нужен для проверки формы и не сохраняется вместе с отзывом.
                const review = { id, name: data.name, text: data.text, topic: data.topic,
                    rating: Number(data.rating), date: new Date().toISOString(), own: true };
                localStorage.setItem(storagePrefix + id, JSON.stringify(review));
                savedReviews = [review, ...existing];
            } catch {
                feedback.textContent = 'Не удалось сохранить отзыв в браузере. Попробуйте ещё раз.';
                return;
            }

            form.reset();
            renderCount();
            clearFilters();
            setFormOpen(false);
            renderReviews();
            notice.textContent = 'Отзыв добавлен. Показаны все отзывы.';
        });

        function updateField(event) {
            const input = event.target;
            if (input.classList.contains('is-invalid')) setError(input.name, validate(readForm())[input.name]);
            feedback.textContent = '';
            if (input === textField) renderCount();
        }

        form.addEventListener('input', updateField);
        form.addEventListener('change', updateField);
        list.addEventListener('click', event => {
            const button = event.target.closest('[data-action="delete-review"]');
            if (!button) return;
            if (button.dataset.confirmed !== 'true') {
                button.dataset.confirmed = 'true';
                button.textContent = 'Подтвердить удаление';
                return;
            }
            const id = button.closest('[data-review-id]').dataset.reviewId;
            try {
                const remaining = readSavedReviews().filter(review => review.id !== id);
                localStorage.removeItem(storagePrefix + id);
                savedReviews = remaining;
            } catch {
                notice.textContent = 'Не удалось удалить отзыв из хранилища браузера. Попробуйте ещё раз.';
                return;
            }
            renderReviews();
            notice.textContent = 'Ваш отзыв удалён.';
            filter.focus();
        });

        function onFilterChange() {
            notice.textContent = '';
            renderReviews();
        }
        filter.addEventListener('change', onFilterChange);
        topicFilter.addEventListener('change', onFilterChange);
        section.querySelector('#review-reset').addEventListener('click', () => {
            clearFilters();
            onFilterChange();
        });

        try {
            savedReviews = readSavedReviews();
        } catch {
            notice.textContent = 'Не удалось загрузить сохранённые отзывы из браузера.';
        }
        renderReviews();
    }

    function setupMenu() {
        const toggle = document.querySelector('#menu-toggle');
        const menu = document.querySelector('.navbar .mobile-nav');
        const label = document.querySelector('label[for="menu-toggle"]');
        if (!toggle || !menu || !label) return;
        menu.id ||= 'primary-navigation';
        toggle.setAttribute('aria-controls', menu.id);
        toggle.classList.add('visually-hidden');
        label.removeAttribute('aria-label');
        label.querySelector('.navbar-toggler-icon')?.setAttribute('aria-hidden', 'true');
        if (!label.querySelector('.visually-hidden')) {
            label.append(element('span', 'visually-hidden', 'Меню навигации'));
        }
    }

    function readOriginalReviews(history) {
        const quote = history?.querySelector('blockquote');
        const credit = quote?.nextElementSibling;
        const first = {
            id: 1,
            name: credit?.querySelector('cite')?.textContent.split(',')[0].trim() || 'Ұлан',
            text: quote?.textContent.trim().replace(/^«|»$/g, '') || 'Великие дела начинаются с мечтаний',
            topic: 'general', rating: null, date: '2026-09-05T12:00:00'
        };
        quote?.remove();
        credit?.remove();
        return [first, {
            id: 2,
            name: 'Abdurrakhim Yestaiuly',
            text: 'Уроки проходят хорошо и на позитиве. Инструкторы добрые и всегда стараются помочь',
            topic: 'instructors', rating: null, date: '2026-09-09T12:00:00'
        }];
    }

    function arrangePhotos(classroomFigure) {
        const classroom = classroomFigure.querySelector('img');
        classroom.classList.add('w-100', 'h-100', 'object-fit-cover');
        classroom.width = 160;
        classroom.removeAttribute('height');
        classroomFigure.classList.remove('classroom-photo', 'float-start', 'me-3', 'mb-2');

        const result = element('figure', '');
        const resultPhoto = element('img', 'img-fluid rounded w-100 h-100 object-fit-cover');
        resultPhoto.src = 'images/student-result-blurred.png';
        resultPhoto.alt = 'Ученик держит водительское удостоверение с закрытыми реквизитами';
        resultPhoto.width = 160;
        result.append(resultPhoto, element('figcaption', '', 'После экзамена'));

        const row = element('div', 'row row-cols-2 g-2');
        for (const figure of [classroomFigure, result]) {
            const frame = element('div', 'ratio ratio-1x1');
            frame.append(figure.querySelector('img'));
            const caption = figure.querySelector('figcaption');
            caption.classList.add('small', 'mt-1');
            figure.prepend(frame);
            figure.classList.add('col', 'mb-0');
            row.append(figure);
        }
        return row;
    }

    function arrangeHistory(history, classroom) {
        classroom.remove();
        const details = element('details', 'mt-3');
        details.append(element('summary', 'fw-semibold', 'Подробнее об автошколе'), ...history.children);
        details.querySelector('h2').className = 'h5 border-0 mt-3 mb-2';
        const title = element('h1', 'display-5 mb-3', 'Об автошколе');
        title.append(document.createElement('br'), element('span', 'fs-2', 'Drive School'));
        const link = element('a', 'btn btn-light btn-sm', 'Отзывы учеников ↓');
        link.href = '#reviews-section';
        const copy = element('div', 'col-12 col-md-6');
        copy.append(title, element('p', '',
            'Готовим учеников к вождению с нуля: изучаем ПДД, отрабатываем навыки на автодроме и выезжаем в город с инструктором.'), link);
        const photos = element('div', 'col-12 col-md-6');
        photos.append(arrangePhotos(classroom));
        const intro = element('div', 'row align-items-center g-3');
        intro.append(copy, photos);

        history.classList.add('rounded-3', 'border', 'p-3', 'p-md-4');
        if (getComputedStyle(document.documentElement).getPropertyValue('--bs-body-color').trim()) {
            history.classList.add('bg-brand-dark', 'text-white');
        }
        history.append(intro, details);
    }

    function addStages(history, note) {
        const training = element('section', 'bg-primary-subtle border rounded-3 p-3 mb-3');
        training.append(element('h2', 'h4 border-0 pb-0 mb-3', 'Как проходит обучение'));
        const row = element('div', 'row row-cols-1 row-cols-md-3 g-2');
        for (const [title, description] of stages) {
            const step = element('article', 'col');
            step.append(element('h3', 'h6 text-primary mb-1', title), element('p', 'small mb-0', description));
            row.append(step);
        }
        training.append(row);
        history.after(training);
        if (note) {
            const details = element('details', 'mt-3');
            note.className = 'small mt-2';
            details.append(element('summary', 'small fw-semibold', 'Факт об автошколе'), note);
            training.append(details);
        }
        return training;
    }

    function arrangeGlossary(glossary) {
        const title = glossary?.querySelector('h3');
        const terms = glossary?.querySelector('dl');
        if (!title || !terms) return;
        const details = element('details', '');
        details.append(element('summary', 'fw-semibold', title.textContent), terms);
        glossary.classList.add('bg-white', 'border', 'rounded-3', 'p-3');
        glossary.replaceChildren(details);
    }

    function addReviewsSection(main, history, classroom) {
        const column = history.parentElement;
        column.classList.remove('col-lg-8');
        column.closest('.container')?.classList.remove('bg-white', 'rounded', 'shadow-sm', 'p-4');
        main.classList.remove('container-fluid', 'px-4');
        main.classList.add('container-lg', 'px-3');
        document.querySelector('meta[name="description"]')?.setAttribute('content',
            'Как проходит обучение в автошколе Drive School и что о нём говорят ученики.');

        arrangeHistory(history, classroom);
        const training = addStages(history, column.querySelector('.school-note'));
        const section = element('section', 'bg-white border rounded-3 p-3 mb-3');
        section.id = 'reviews-section';
        training.after(section);
        arrangeGlossary(column.querySelector('.glossary'));
        return section;
    }

    const ratingOptions = [5, 4, 3, 2, 1].map(rating => [rating, rating + ' из 5']);
    const topicOptions = Object.entries(topics);
    const reviewFields = [
        { name: 'name', title: 'Ваше имя', props: { autocomplete: 'name', minLength: 2, maxLength: 60 } },
        { name: 'email', title: 'Email (не сохраняется)', props: { type: 'email', autocomplete: 'email', maxLength: 100 } },
        { name: 'rating', title: 'Оценка', prompt: 'Выберите оценку', options: ratingOptions },
        { name: 'topic', title: 'Тема отзыва', prompt: 'Выберите тему', options: topicOptions },
        { name: 'text', title: 'Ваш отзыв', tag: 'textarea', props: { rows: 2, minLength: 20, maxLength: 600 } }
    ];

    function reviewButton(text, classes, type = 'button') {
        const button = element('button', classes, text);
        button.type = type;
        return button;
    }

    function reviewSelect(id, prompt, options) {
        const select = element('select', 'form-select form-select-sm');
        select.id = id;
        select.add(new Option(prompt, ''));
        for (const [value, text] of options) select.add(new Option(text, value));
        return select;
    }

    function labelControl(control, title, classes = '') {
        const container = element('div', classes);
        const label = element('label', 'form-label small fw-semibold mb-1 d-block', title);
        label.htmlFor = control.id;
        container.append(label, control);
        return container;
    }

    function reviewStatus(id, classes = 'small text-body-secondary mb-0') {
        const message = element('p', classes);
        message.id = id;
        message.setAttribute('role', 'status');
        return message;
    }

    function buildReviewField({ name, title, tag = 'input', props, prompt, options }) {
        const id = 'review-' + name;
        const multiline = tag === 'textarea';
        const control = options
            ? reviewSelect(id, prompt, options)
            : element(tag, 'form-control form-control-sm');
        Object.assign(control, props, { id, name, required: true });

        const error = element('p', 'small text-danger mb-0 mt-1');
        error.id = id + '-error';
        error.hidden = true;
        const field = labelControl(control, title, multiline ? 'col-12' : 'col-12 col-md-6');
        field.append(error);
        if (multiline) {
            const counter = element('small', 'text-body-secondary', '0 / 600 символов; минимум 20');
            counter.id = 'review-counter';
            field.append(counter);
        }
        control.setAttribute('aria-describedby', error.id + (multiline ? ' review-counter' : ''));
        return field;
    }

    function buildReviewFilters() {
        const filters = element('div', 'd-flex flex-wrap align-items-end gap-2 mb-2');
        const topic = reviewSelect('review-topic-filter', 'Все темы', topicOptions);
        const rating = reviewSelect('review-filter', 'Любая оценка', [...ratingOptions, ['none', 'Без оценки']]);
        const reset = reviewButton('Сбросить фильтры', 'btn btn-outline-primary btn-sm');
        reset.id = 'review-reset';
        filters.append(labelControl(topic, 'Тема отзыва'), labelControl(rating, 'Оценка'), reset);
        return filters;
    }

    function renderReviewForm(section) {
        const heading = section.querySelector('h2') || element('h2', 'h3 border-0 p-0 mb-0', 'Отзывы учеников');
        heading.id = 'about-reviews-title';
        const open = reviewButton('Написать отзыв', 'btn btn-primary btn-sm');
        open.id = 'review-open';
        open.setAttribute('aria-controls', 'review-form');
        open.setAttribute('aria-expanded', 'false');

        let header = heading.closest('.about-review-heading');
        if (!header) {
            header = element('div', 'd-flex flex-wrap align-items-center justify-content-between gap-2 border-bottom pb-2 mb-3');
            header.append(heading);
            section.prepend(header);
        }
        header.append(open);

        const form = element('form', 'row g-2 mb-3');
        form.id = 'review-form';
        form.noValidate = true;
        form.hidden = true;
        const actions = element('div', 'col-12');
        actions.append(reviewButton('Добавить отзыв', 'btn btn-primary btn-sm', 'submit'), reviewStatus('review-feedback'));
        form.append(...reviewFields.map(buildReviewField), actions);

        const list = element('div', 'row row-cols-1 row-cols-md-2 g-2 mt-1');
        list.id = 'review-list';
        section.append(form, buildReviewFilters(), reviewStatus('review-count'),
            reviewStatus('review-notice', 'small text-body-secondary mt-1 mb-0'), list);
        section.setAttribute('aria-labelledby', heading.id);
    }

    function init() {
        const main = document.querySelector('main');
        if (!main || main.querySelector('#review-form')) return;

        // Ранний макет создаёт секцию здесь, а обновлённый уже содержит её в HTML.
        let section = main.querySelector('#reviews-section');
        const history = main.querySelector('.history');
        const classroom = history?.querySelector('.classroom-photo');
        if (!section && !classroom) return;

        const originalReviews = readOriginalReviews(section ? null : history);
        if (!section) section = addReviewsSection(main, history, classroom);
        setupMenu();
        renderReviewForm(section);
        setupReviews(section, originalReviews);
        if (window.location.hash === '#reviews-section') section.scrollIntoView();
    }

    const stages = [
        ['Теория', 'ПДД, дорожные знаки и разбор дорожных ситуаций.'],
        ['Практика', 'Упражнения на автодроме и выезды в город.'],
        ['Подготовка к экзамену', 'Повторение правил и решение экзаменационных билетов.']
    ];

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
        return;
    }
    init();
})();

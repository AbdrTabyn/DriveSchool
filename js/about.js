'use strict';

// Каждый файл подключается только на своей странице.
(() => {
    function init() {
        // Локальные помощники: доступны только этому файлу.
        const ui = (() => {
            function element(tag, classes = '', text = '') {
                const node = document.createElement(tag);
                node.className = classes;
                node.textContent = text;
                return node;
            }
            function button(text, classes = 'btn btn-primary btn-sm') {
                const node = element('button', classes, text);
                node.type = 'button';
                return node;
            }
            function option(value, text) {
                const node = element('option', '', text);
                node.value = value;
                return node;
            }
            function field(form, id, title, type = 'text') {
                const box = element('div', 'col-12 col-md-6 mb-2');
                const label = element('label', 'form-label small fw-bold mb-1', title);
                label.htmlFor = id;
                const input = element(['select', 'textarea'].includes(type) ? type : 'input',
                    type === 'select' ? 'form-select form-select-sm' : 'form-control form-control-sm');
                if (input.tagName === 'INPUT') input.type = type;
                if (type === 'textarea') input.rows = 2;
                input.id = id;
                input.name = id;
                const error = element('div', 'invalid-feedback');
                error.id = `${id}-error`;
                input.setAttribute('aria-describedby', error.id);
                box.append(label, input, error);
                form.append(box);
                return { input, error };
            }
            function validate(fields, messages) {
                fields.forEach((field, index) => {
                    field.error.textContent = messages[index];
                    field.input.classList.toggle('is-invalid', messages[index] !== '');
                    field.input.classList.toggle('is-valid', messages[index] === '');
                    field.input.setAttribute('aria-invalid', String(messages[index] !== ''));
                });
                const first = messages.findIndex(message => message !== '');
                if (first !== -1) fields[first].input.focus();
                return first === -1;
            }
            function clearErrors(fields) {
                fields.forEach(field => {
                    field.error.textContent = '';
                    field.input.classList.remove('is-invalid', 'is-valid');
                    field.input.removeAttribute('aria-invalid');
                });
            }
            function status() {
                const node = element('p', 'col-12 small text-break mt-2 mb-0');
                node.setAttribute('role', 'status');
                return node;
            }
            function section(title) {
                const node = element('section', 'border rounded p-3 mt-4');
                node.append(element('h2', 'h4 mb-3', title));
                return node;
            }
            return { element, button, option, field, validate, clearErrors, status, section };
        })();
        const history = document.querySelector('.history');
        if (!history || document.querySelector('#review-form')) return;
        const content = history.parentElement;
        const reviews = [
            { name: 'Ұлан', text: 'Великие дела начинаются с мечтаний', rating: null, date: '2026-09-05T12:00:00', own: false },
            { name: 'Abdurrakhim Yestaiuly', text: 'Уроки проходят хорошо и на позитиве. Инструкторы добрые и всегда стараются помочь', rating: null, date: '2026-09-09T12:00:00', own: false }
        ];
        const section = ui.section('Отзывы учеников');
        const controls = ui.element('form', 'row g-2');
        const filter = ui.field(controls, 'review-filter', 'Оценка', 'select');
        filter.input.append(ui.option('', 'Все отзывы'), ...[5, 4, 3, 2, 1].map(value => ui.option(value, `${value} из 5`)), ui.option('none', 'Без оценки'));
        const resetBox = ui.element('div', 'col-12 col-md-6 d-flex align-items-end mb-2');
        const reset = ui.button('Сбросить фильтр', 'btn btn-outline-primary btn-sm');
        resetBox.append(reset);
        controls.append(resetBox);
        const count = ui.status();
        const list = ui.element('div', 'mt-3');
        const notice = ui.status();
        const open = ui.button('Написать отзыв');
        open.setAttribute('aria-controls', 'review-form');
        open.setAttribute('aria-expanded', 'false');
        const form = ui.element('form', 'row g-2 mt-3 d-none');
        form.id = 'review-form';
        form.noValidate = true;
        const name = ui.field(form, 'review-name', 'Ваше имя');
        name.input.autocomplete = 'name';
        name.input.maxLength = 60;
        const email = ui.field(form, 'review-email', 'Email (не публикуется)', 'email');
        email.input.autocomplete = 'email';
        email.input.maxLength = 100;
        const rating = ui.field(form, 'review-rating', 'Оценка', 'select');
        rating.input.append(ui.option('', 'Выберите оценку'), ...[5, 4, 3, 2, 1].map(value => ui.option(value, `${value} из 5`)));
        const text = ui.field(form, 'review-text', 'Ваш отзыв', 'textarea');
        text.input.maxLength = 600;
        const counter = ui.element('small', 'text-muted', '0 / 600 символов; минимум 20');
        counter.id = 'review-counter';
        text.input.after(counter);
        text.input.setAttribute('aria-describedby', `${text.error.id} ${counter.id}`);
        const submitBox = ui.element('div', 'col-12');
        const submit = ui.button('Добавить отзыв');
        submit.type = 'submit';
        submitBox.append(submit);
        const feedback = ui.status();
        form.append(submitBox, feedback);
        section.append(controls, count, list, notice, open, form);
        content.append(section);
        const fields = [name, email, rating, text];
        function renderReview(review) {
            const card = ui.element('article', 'card mb-2');
            const body = ui.element('div', 'card-body p-3');
            const time = ui.element('time', 'small text-muted', review.own
                ? new Date(review.date).toLocaleString('ru-RU') : new Date(review.date).toLocaleDateString('ru-RU'));
            time.dateTime = review.date;
            body.append(ui.element('h3', 'h6 text-break mb-1', review.name),
                ui.element('p', 'small text-primary mb-1', review.rating === null ? 'Без оценки' : `Оценка: ${review.rating} из 5`),
                time, ui.element('p', 'small text-break mt-2 mb-1', review.text));
            if (review.own) {
                const remove = ui.button('Удалить', 'btn btn-outline-primary btn-sm mt-2');
                let confirmed = false;
                remove.addEventListener('click', () => {
                    if (!confirmed) {
                        confirmed = true;
                        remove.textContent = 'Подтвердить удаление';
                        return;
                    }
                    reviews.splice(reviews.indexOf(review), 1);
                    feedback.textContent = '';
                    renderReviews();
                    notice.textContent = 'Ваш отзыв удалён.';
                    filter.input.focus();
                });
                body.append(remove);
            }
            card.append(body);
            return card;
        }
        function renderReviews() {
            const items = reviews.filter(review => filter.input.value === ''
                || (filter.input.value === 'none' ? review.rating === null : review.rating === Number(filter.input.value)));
            list.replaceChildren();
            count.textContent = `Показано отзывов: ${items.length} из ${reviews.length}.`;
            if (items.length === 0) list.append(ui.element('p', 'small text-muted', 'Таких отзывов пока нет. Сбросьте фильтр или напишите свой.'));
            else items.forEach(review => list.append(renderReview(review)));
        }
        form.addEventListener('submit', event => {
            event.preventDefault();
            feedback.textContent = '';
            notice.textContent = '';
            const messages = [
                name.input.value.trim().length >= 2 && name.input.value.trim().length <= 60 ? '' : 'Введите имя от 2 до 60 символов.',
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.input.value.trim()) && email.input.value.trim().length <= 100 ? '' : 'Введите корректный email.',
                /^[1-5]$/.test(rating.input.value) ? '' : 'Выберите оценку от 1 до 5.',
                text.input.value.trim().length >= 20 && text.input.value.trim().length <= 600 ? '' : 'Напишите от 20 до 600 символов.'
            ];
            if (!ui.validate(fields, messages)) return;
            if (reviews.some(review => review.own && review.name === name.input.value.trim() && review.text === text.input.value.trim())) {
                feedback.textContent = 'Этот отзыв уже добавлен.';
                return;
            }
            reviews.unshift({ name: name.input.value.trim(), text: text.input.value.trim(), rating: Number(rating.input.value), date: new Date().toISOString(), own: true });
            form.reset();
            ui.clearErrors(fields);
            counter.textContent = '0 / 600 символов; минимум 20';
            filter.input.value = '';
            renderReviews();
            feedback.textContent = 'Отзыв добавлен. Данные не отправлены на сервер; отзыв виден в этом окне до перезагрузки.';
        });
        form.addEventListener('input', () => {
            ui.clearErrors(fields);
            feedback.textContent = '';
            counter.textContent = `${text.input.value.length} / 600 символов; минимум 20`;
        });
        open.addEventListener('click', () => {
            const show = form.classList.contains('d-none');
            form.classList.toggle('d-none', !show);
            open.textContent = show ? 'Скрыть форму' : 'Написать отзыв';
            open.setAttribute('aria-expanded', String(show));
            if (show) name.input.focus();
        });
        controls.addEventListener('submit', event => event.preventDefault());
        filter.input.addEventListener('change', () => { notice.textContent = ''; renderReviews(); });
        reset.addEventListener('click', () => { filter.input.value = ''; renderReviews(); });
        renderReviews();

    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else init();
})();

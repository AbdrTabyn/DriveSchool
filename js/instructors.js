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
            function status() {
                const node = element('p', 'col-12 small text-break mt-2 mb-0');
                node.setAttribute('role', 'status');
                return node;
            }
            return { element, button, option, field, status };
        })();
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
        const main = document.querySelector('main');
        if (!main || !main.querySelector('#training-steps')) return;
        const team = main.querySelector('details');
        if (!team) return;
        const grid = team.querySelector('.row');
        if (!grid || document.querySelector('#instructor-search')) return;
        const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        const filters = ui.element('form', 'row g-2 border rounded p-3 mb-3 mt-3 mx-0');
        const search = ui.field(filters, 'instructor-search', 'Поиск по имени', 'search');
        const category = ui.field(filters, 'filter-category', 'Категория', 'select');
        category.input.append(ui.option('', 'Все категории'), ...['A', 'B', 'C'].map(value => ui.option(value, value)));
        const day = ui.field(filters, 'filter-day', 'Удобный день', 'select');
        day.input.append(ui.option('', 'Любой день'), ...[1, 2, 3, 4, 5, 6].map(value => ui.option(value, days[value])));
        const resetBox = ui.element('div', 'col-12 col-md-6 d-flex align-items-end mb-2');
        const reset = ui.button('Сбросить фильтры', 'btn btn-outline-primary btn-sm');
        resetBox.append(reset);
        const count = ui.status();
        filters.append(resetBox, count);
        grid.before(filters);

        function renderCards(items) {
            grid.replaceChildren();
            count.textContent = `Найдено: ${items.length} из ${instructors.length}.`;
            if (items.length === 0) grid.append(ui.element('p', 'col-12 text-muted', 'Ничего не найдено. Измените условия или сбросьте фильтры.'));
            items.forEach(item => {
                const column = ui.element('div', 'col-12 col-md-6');
                const card = ui.element('article', 'card h-100 shadow-sm instructor-card');
                const body = ui.element('div', 'card-body d-flex flex-column');
                const heading = ui.element('div', 'd-flex flex-wrap align-items-center gap-3 mb-2');
                heading.append(ui.element('span', 'rounded-circle bg-light border p-3 text-primary fw-bold', item.name.split(' ').map(part => part[0]).join('')),
                    ui.element('h3', 'h4 card-title mb-0', item.name));
                const rating = ui.element('span', 'badge bg-primary mb-2 align-self-start', `★ ${item.rating.toFixed(1)}`);
                rating.setAttribute('aria-label', `Рейтинг: ${item.rating} из 5`);
                const chosenCategory = category.input.value || item.categories[0];
                const link = ui.element('a', 'btn btn-primary btn-sm mt-auto align-self-start', 'Записаться на пробный урок');
                link.href = 'price.html?' + new URLSearchParams({ category: chosenCategory, instructor: item.id, type: 'practice' });
                link.setAttribute('aria-label', `Записаться на пробный урок: ${item.name}`);
                body.append(heading, rating,
                    ui.element('p', 'small mb-1', `Стаж: ${item.experience} лет. Категории: ${item.categories.join(', ')}.`),
                    ui.element('p', 'small text-muted mb-2', `Дни занятий: ${item.days.map(value => days[value]).join(', ')}.`),
                    ui.element('p', 'small card-text', item.description), link);
                card.append(body);
                column.append(card);
                grid.append(column);
            });
        }
        function filterCards() {
            const query = search.input.value.trim().toLocaleLowerCase('ru');
            renderCards(instructors.filter(item => item.name.toLocaleLowerCase('ru').includes(query)
                && (category.input.value === '' || item.categories.includes(category.input.value))
                && (day.input.value === '' || item.days.includes(Number(day.input.value)))));
        }
        filters.addEventListener('submit', event => event.preventDefault());
        search.input.addEventListener('input', filterCards);
        [category.input, day.input].forEach(input => input.addEventListener('change', filterCards));
        reset.addEventListener('click', () => { filters.reset(); filterCards(); search.input.focus(); });
        main.querySelector('.table-responsive')?.remove();
        const oldContact = Array.from(main.children).find(node => node.tagName === 'P' && node.textContent.includes('Записаться к конкретному'));
        oldContact?.remove();
        team.classList.remove('toggle');
        team.querySelector('summary').classList.add('mb-3');
        const training = main.querySelector('#training-steps');
        const trainingSection = ui.element('section', 'mb-4');
        trainingSection.id = training.id;
        trainingSection.append(ui.element('h2', 'h4 mb-3', training.querySelector('summary').textContent));
        Array.from(training.children).forEach(child => {
            if (child.tagName !== 'SUMMARY') trainingSection.append(child);
        });
        training.replaceWith(trainingSection);
        filterCards();

    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else init();
})();

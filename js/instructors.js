'use strict';

// jQuery 3.7.1 full загружается из CDN раньше этого файла; $(function) ждёт готовности DOM.
$(function () {
    const $main = $('main');
    const $training = $main.find('#training-steps');
    const $team = $main.children('details').first();
    const $grid = $team.children('.row').first();
    if (!$training.length || !$grid.length || $('#instructor-search').length) return;

    const instructors = [
            { id: 'aman', name: 'Артықбаев Аман', experience: 10, rating: 4.9, categories: ['A', 'B'], gearbox: 'manual', days: [1, 3, 5], description: 'Спокойно объясняет основы управления автомобилем и помогает освоить городские маршруты.' },
            { id: 'bekzat', name: 'Жақсыбай Бекзат', experience: 7, rating: 4.7, categories: ['A', 'B'], gearbox: 'automatic', days: [2, 4, 6], description: 'Работает с начинающими водителями, уделяет внимание парковке и подготовке к экзамену.' },
            { id: 'aigerim', name: 'Серікқызы Айгерім', experience: 8, rating: 4.8, categories: ['B'], gearbox: 'automatic', days: [1, 2, 4], description: 'Помогает преодолеть волнение за рулём и постепенно перейти от площадки к городу.' },
            { id: 'daniyar', name: 'Омаров Данияр', experience: 12, rating: 4.9, categories: ['B', 'C'], gearbox: 'automatic', days: [2, 3, 6], description: 'Обучает вождению легковых и грузовых автомобилей, подробно разбирает работу с габаритами.' },
            { id: 'madina', name: 'Төлегенова Мадина', experience: 6, rating: 4.8, categories: ['B'], gearbox: 'automatic', days: [3, 5, 6], description: 'Помогает восстановить навыки после перерыва и увереннее проезжать сложные перекрёстки.' },
            { id: 'ruslan', name: 'Әлиев Руслан', experience: 9, rating: 4.6, categories: ['A', 'B'], gearbox: 'manual', days: [1, 4, 5], description: 'Объясняет управление мотоциклом и автомобилем, делает акцент на безопасных манёврах.' },
            { id: 'erzhan', name: 'Нұрланов Ержан', experience: 11, rating: 4.9, categories: ['B', 'C'], gearbox: 'manual', days: [1, 3, 6], description: 'Отрабатывает с учениками движение в потоке, развороты и маневрирование на ограниченной площадке.' },
            { id: 'asel', name: 'Сапарова Әсел', experience: 5, rating: 4.8, categories: ['B'], gearbox: 'manual', days: [2, 4, 5], description: 'Понятно объясняет действия водителя и помогает освоить парковку без спешки.' },
            { id: 'timur', name: 'Қасымов Тимур', experience: 14, rating: 4.9, categories: ['A', 'B'], gearbox: 'manual', days: [1, 2, 5], description: 'Уделяет внимание наблюдению за дорогой, выбору дистанции и предупреждению опасных ситуаций.' },
            { id: 'dana', name: 'Мұратова Дана', experience: 6, rating: 4.7, categories: ['B'], gearbox: 'manual', days: [3, 4, 6], description: 'Помогает начинающим водителям освоить базовые навыки и последовательность действий на дороге.' },
            { id: 'alibek', name: 'Ибраев Әлібек', experience: 9, rating: 4.8, categories: ['B', 'C'], gearbox: 'automatic', days: [1, 4, 6], description: 'Подробно объясняет повороты, перестроения и особенности управления крупным автомобилем.' },
            { id: 'nursultan', name: 'Сейітов Нұрсұлтан', experience: 8, rating: 4.8, categories: ['A', 'B'], gearbox: 'automatic', days: [2, 3, 5], description: 'Обучает плавному управлению, правильной посадке и уверенной работе с органами управления.' },
            { id: 'aruzhan', name: 'Қуанышова Аружан', experience: 4, rating: 4.6, categories: ['B'], gearbox: 'automatic', days: [1, 3, 5], description: 'Поддерживает спокойный темп занятий и помогает закрепить навыки парковки и движения в городе.' },
            { id: 'marat', name: 'Ахметов Марат', experience: 16, rating: 4.9, categories: ['B', 'C'], gearbox: 'manual', days: [2, 4, 6], description: 'Готовит учеников к управлению легковыми и грузовыми автомобилями, уделяя внимание безопасности.' },
            { id: 'aliya', name: 'Бекенова Алия', experience: 7, rating: 4.8, categories: ['B'], gearbox: 'automatic', days: [1, 2, 4], description: 'Разбирает типичные ошибки новичков и помогает увереннее действовать на перекрёстках.' },
            { id: 'arman', name: 'Тұрсынов Арман', experience: 10, rating: 4.7, categories: ['A', 'B'], gearbox: 'automatic', days: [3, 5, 6], description: 'Помогает освоить мотоцикл и автомобиль, отрабатывает повороты и безопасное торможение.' },
            { id: 'zhanar', name: 'Рахимова Жанар', experience: 8, rating: 4.9, categories: ['B'], gearbox: 'manual', days: [1, 4, 5], description: 'Работает над уверенностью за рулём, парковкой и самостоятельным планированием маршрута.' },
            { id: 'erlan', name: 'Смағұлов Ерлан', experience: 13, rating: 4.8, categories: ['B', 'C'], gearbox: 'automatic', days: [2, 3, 6], description: 'Объясняет работу с габаритами, выбор траектории и безопасное движение в городском потоке.' },
            { id: 'dauren', name: 'Оспанов Дәурен', experience: 6, rating: 4.7, categories: ['A', 'B'], gearbox: 'manual', days: [1, 3, 4], description: 'Пошагово разбирает базовые манёвры и помогает закрепить навыки на площадке и в городе.' },
            { id: 'diana', name: 'Кәрімова Диана', experience: 5, rating: 4.8, categories: ['B'], gearbox: 'manual', days: [2, 5, 6], description: 'Обучает с нуля, уделяет внимание плавному вождению и спокойной подготовке к самостоятельным поездкам.' }
        ];
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];


    const gearboxLabels = { automatic: 'Автомат', manual: 'Механика' };

    function element(tag, classes = '', text = '') {
        return $('<' + tag + '>').addClass(classes).text(text);
    }
    function field($form, id, title, type) {
        const $box = element('div', 'col-12 col-sm-6 col-lg-3');
        const $input = element(type === 'select' ? 'select' : 'input', type === 'select' ? 'form-select' : 'form-control');
        $input.attr({ id: id, name: id });
        if (type !== 'select') $input.attr('type', type);
        $box.append(element('label', 'form-label small fw-bold', title).attr('for', id), $input).appendTo($form);
        return $input;
    }
    function option(value, text) {
        return element('option', '', text).val(value);
    }

    const $filters = element('form', 'row g-2 border rounded p-3 mb-3 mt-3 mx-0');
    const $search = field($filters, 'instructor-search', 'Поиск по имени', 'search');
    const $category = field($filters, 'filter-category', 'Категория', 'select');
    $category.append(option('', 'Все категории'), ['A', 'B', 'C'].map(value => option(value, value)));
    const $day = field($filters, 'filter-day', 'Удобный день', 'select');
    $day.append(option('', 'Любой день'), [1, 2, 3, 4, 5, 6].map(value => option(value, days[value])));
    const $gearbox = field($filters, 'filter-gearbox', 'Коробка (категория B)', 'select');
    $gearbox.append(option('', 'Любая коробка'),
        Object.entries(gearboxLabels).map(([value, label]) => option(value, label)));
    const $gearboxHint = element('p', 'col-12 small text-muted mb-0').attr({
        id: 'filter-gearbox-hint', role: 'status'
    });
    $gearbox.attr('aria-describedby', 'filter-gearbox-hint');
    const $reset = element('button', 'btn btn-outline-primary btn-sm', 'Сбросить фильтры').attr('type', 'button');
    const $count = element('p', 'col-12 small mb-0').attr('role', 'status');
    $filters.append($gearboxHint, element('div', 'col-12').append($reset), $count).insertBefore($grid);

    // Переписано 1: createElement/textContent/appendChild заменены на $(), .text(), .append().
    // Создание карточек короче; расчёт инициалов и фильтрация массива остались обычной логикой JS.
    function renderCards(items) {
        $grid.empty();
        $count.text('Найдено: ' + items.length + ' из ' + instructors.length + '.');
        if (!items.length) $grid.append(element('p', 'col-12 text-muted', 'Ничего не найдено. Измените условия или сбросьте фильтры.'));
        items.forEach(item => {
            const $card = element('article', 'card h-100 shadow-sm instructor-card');
            const $body = element('div', 'card-body d-flex flex-column');
            const $heading = element('div', 'd-flex flex-wrap align-items-center gap-3 mb-2');
            const initials = item.name.split(' ').map(part => part[0]).join('');
            $heading.append(element('span', 'rounded-circle bg-light border p-3 text-primary fw-bold', initials),
                element('h3', 'h4 card-title mb-0', item.name));
            const $rating = element('span', 'badge bg-primary mb-2 align-self-start', '★ ' + item.rating.toFixed(1));
            $rating.attr('aria-label', 'Рейтинг: ' + item.rating + ' из 5');
            const category = $category.val() || ($gearbox.val() ? 'B' : item.categories[0]);
            const params = new URLSearchParams({ category, instructor: item.id, type: 'practice' });
            const $link = element('a', 'btn btn-primary btn-sm mt-auto align-self-start', 'Записаться на пробный урок');
            $link.attr({ href: 'price.html?' + params + '#trial-form', 'aria-label': 'Записаться на пробный урок: ' + item.name });
            $body.append($heading, $rating,
                element('p', 'small mb-1', 'Стаж: ' + item.experience + ' лет. Категории: ' + item.categories.join(', ') + '.'),
                element('p', 'small text-muted mb-2', 'Дни занятий: ' + item.days.map(day => days[day]).join(', ') + '.'),
                element('p', 'small card-text', item.description));
            if (item.gearbox) {
                $body.append(element('p', 'small text-muted mb-2', 'Коробка для категории B: ' + gearboxLabels[item.gearbox]));
            }
            $body.append($link);
            $card.append($body).appendTo(element('div', 'col-12 col-md-6').appendTo($grid));
        });
    }
    function filterCards() {
        const query = $search.val().trim().toLocaleLowerCase('ru');
        const category = $category.val();
        const day = $day.val();
        const canFilterGearbox = !category || category === 'B';
        $gearbox.prop('disabled', !canFilterGearbox);
        if (!canFilterGearbox) $gearbox.val('');
        $gearboxHint.text(canFilterGearbox
            ? 'Фильтр по коробке действует для категории B. Коробки указаны условно.'
            : 'Для категории ' + category + ' фильтр по коробке недоступен.');
        const gearbox = $gearbox.val();
        renderCards(instructors.filter(item => item.name.toLocaleLowerCase('ru').includes(query)
            && (!category || item.categories.includes(category))
            && (!day || item.days.includes(Number(day)))
            && (!gearbox || item.gearbox === gearbox)));
    }
    $filters.on('submit', function (event) {
        // Без preventDefault браузер отправил бы форму фильтра и перезагрузил страницу.
        event.preventDefault();
    });
    $search.on('input', filterCards);
    $category.add($day).add($gearbox).on('change', filterCards);
    $reset.on('click', function () {
        // $(this) — нажатая кнопка; closest находит только её форму, а не чужие поля.
        $(this).closest('form').find('input[type="search"], select').val('');
        filterCards();
        $search.trigger('focus');
    });

    $main.find('.table-responsive').remove();
    $main.children('p').filter(function () {
        return $(this).text().includes('Записаться к конкретному');
    }).remove();
    $team.removeClass('toggle').children('summary').addClass('mb-3');
    const $quote = $main.children('blockquote').first();
    if ($quote.length) {
        const $credit = $quote.next('p');
        const $extraQuote = $credit.next('p').has('q');
        $extraQuote.next('hr').remove();
        $extraQuote.remove();

        const $caption = element('figcaption', 'small text-muted mt-2').append($credit.contents());
        $credit.remove();
        const $review = element('figure', 'mb-0').append($quote, $caption);
        const $reviewColumn = element('div', 'col-12 col-md-7').append(
            element('h2', 'h5 text-primary border-0 pb-0 mb-2', 'Отзыв ученика'),
            $review);
        const $carDrawing = $(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 166" width="300" height="166"
                 class="img-fluid d-block mx-auto text-primary" aria-hidden="true" focusable="false">
                <circle cx="150" cy="76" r="61" fill="currentColor" opacity=".09"/>
                <path d="M24 139c60 10 121 7 245-16" fill="none" stroke="currentColor" opacity=".24"/>
                <path d="M37 149c66 8 139 2 228-15" fill="none" stroke="currentColor"
                      stroke-dasharray="8 7" opacity=".55"/>
                <g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m101 77 13-28a10 10 0 0 1 9-6h54a10 10 0 0 1 9 6l13 28"/>
                    <path d="M102 77h96a10 10 0 0 1 10 10v27a7 7 0 0 1-7 7H99a7 7 0 0 1-7-7V87a10 10 0 0 1 10-10Z"/>
                    <path d="M101 121v7a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4v-7m62 0v7a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4v-7"/>
                    <path d="M108 96h12m60 0h12m-53 10h22M93 77h-7m121 0h7"/>
                </g>
                <path d="m65 55 5 5-5 5-5-5zm168-19 5 5-5 5-5-5z" fill="none" stroke="currentColor" opacity=".62"/>
            </svg>`);
        const $drawingColumn = element('div', 'col-12 col-md-5').append($carDrawing);
        const $reviewSection = element('section', 'bg-white border rounded-3 p-3 p-md-4 mt-4');
        $reviewSection.append(element('div', 'row align-items-center g-3').append($reviewColumn, $drawingColumn));
        $training.replaceWith($reviewSection);
    }
    filterCards();
});

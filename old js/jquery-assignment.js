'use strict';

/*
 * Assignment 6: jQuery 3.7.1
 * jQuery is loaded before this file on every page that uses it.
 * jQuery is needed here to simplify DOM selection, events, traversal,
 * effects, dynamic content creation and form validation.
 */
$(function () {
    console.log('Drive School jQuery assignment initialized.');

    // ============================================================
    // 1. NAVIGATION: selectors, filter, traversal, .each(), chaining
    // ============================================================
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const $navLinks = $('nav .navbar-nav .nav-link'); // class + element selectors

    $navLinks.each(function () {
        const $link = $(this); // $(this) inside a handler/each callback
        const href = $link.attr('href'); // attr() reads an HTML attribute

        if (href === currentPath) {
            // 3-method chain: addClass -> removeClass -> attr.
            $link.addClass('active fw-bold')
                .removeClass('text-white-50')
                .attr('aria-current', 'page');
        } else {
            $link.removeClass('active fw-bold').attr('aria-current', null);
        }
    });

    // Filter selector :not() selects links that are not already active.
    $('nav').find('.nav-link').filter(':not(.active)').each(function () {
        $(this).attr('data-jquery-checked', 'true');
    });

    // ============================================================
    // 2. BACK-TO-TOP: event + preventDefault + animate
    // ============================================================
    if ($('.back-to-top').length) {
        $('.back-to-top').on('click', function (event) {
            event.preventDefault();
            // Without preventDefault(), the browser would follow the link's href.
            $('html, body').animate({ scrollTop: 0 }, 500);
        });
    } else {
        const $scrollTopBtn = $('<button>', {
            type: 'button',
            text: '↑ Наверх',
            class: 'btn btn-primary position-fixed bottom-0 end-0 m-4 shadow d-none',
            'aria-label': 'Прокрутить страницу наверх'
        });

        $('body').append($scrollTopBtn);

        $(window).on('scroll', function () {
            $scrollTopBtn.toggleClass('d-none', window.scrollY <= 300);
        });

        $scrollTopBtn.on('click', function () {
            $('html, body').animate({ scrollTop: 0 }, 500);
        });
    }

    // ============================================================
    // 3. FLEET: keep the existing array and build the UI with jQuery
    // ============================================================
    if (typeof fleetData !== 'undefined') {
        initFleetWithJQuery();
    }

    function filterFleet(items, category, query) {
        return items.filter(function (car) {
            const matchesCategory = category === 'ALL' || car.category === category;
            const matchesSearch = car.brand.toLowerCase().includes(query.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }

    function sortFleet(items, sortBy) {
        const sorted = items.slice();
        sorted.sort(function (a, b) {
            if (sortBy === 'price-asc') return a.pricePerLesson - b.pricePerLesson;
            if (sortBy === 'price-desc') return b.pricePerLesson - a.pricePerLesson;
            if (sortBy === 'year-desc') return b.year - a.year;
            return 0;
        });
        return sorted;
    }

    function initFleetWithJQuery() {
        const $main = $('main');
        const $table = $('.table');
        const $tableBody = $('.table tbody');
        const $photosHeading = $('main h2').filter(function () {
            return $(this).text().includes('Фотографии');
        });

        if (!$main.length || !$tableBody.length) return;

        // The controls are created in JavaScript, not hand-written in HTML.
        if (!$('#jquery-fleet-controls').length) {
            const $controls = $('<div>', {
                id: 'jquery-fleet-controls',
                class: 'row g-3 mb-4 p-3 bg-light rounded fs-6'
            });

            $controls.html(`
                <div class="col-md-3">
                    <label for="fleet-search-jq" class="form-label fw-bold">Поиск:</label>
                    <input type="text" id="fleet-search-jq" class="form-control" placeholder="Марка...">
                </div>
                <div class="col-md-3">
                    <label for="fleet-category-jq" class="form-label fw-bold">Категория:</label>
                    <select id="fleet-category-jq" class="form-select">
                        <option value="ALL">Все категории</option>
                        <option value="A">Категория A</option>
                        <option value="B">Категория B</option>
                        <option value="C">Категория C</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label for="fleet-sort-jq" class="form-label fw-bold">Сортировка:</label>
                    <select id="fleet-sort-jq" class="form-select">
                        <option value="default">По умолчанию</option>
                        <option value="price-asc">Цена: по возрастанию</option>
                        <option value="price-desc">Цена: по убыванию</option>
                        <option value="year-desc">Год: новейшие</option>
                    </select>
                </div>
                <div class="col-md-3 d-flex align-items-end">
                    <button type="button" id="fleet-reset-jq" class="btn btn-outline-secondary w-100">Сбросить</button>
                </div>
                <div class="col-12 text-muted small" id="fleet-counter-jq"></div>
            `);

            $main.find('h2').first().before($controls);
        }

        // Add an action column to the existing table through jQuery.
        if (!$table.find('thead th[data-action-column]').length) {
            $table.find('thead tr').append(
                $('<th>', { scope: 'col', 'data-action-column': 'true', text: 'Бронирование' })
            );
        }

        const $search = $('#fleet-search-jq');
        const $category = $('#fleet-category-jq');
        const $sort = $('#fleet-sort-jq');
        const $reset = $('#fleet-reset-jq');
        const $counter = $('#fleet-counter-jq');

        function renderFleet(items) {
            $tableBody.empty();

            if (!items.length) {
                $tableBody.append(
                    $('<tr>').append(
                        $('<td>', {
                            colspan: 4,
                            class: 'text-center text-muted py-4',
                            text: 'По вашему запросу транспортных средств не найдено.'
                        })
                    )
                );
                return;
            }

            // The existing fleetData array remains the source of the rows/cards.
            $.each(items, function (_, car) {
                const badgeClass = car.category === 'A'
                    ? 'badge bg-success'
                    : car.category === 'C'
                        ? 'badge bg-warning text-dark'
                        : 'badge bg-secondary';

                const $row = $('<tr>', {
                    class: 'fleet-item',
                    'data-car-id': car.id,
                    title: 'Нажмите на строку, чтобы выбрать автомобиль'
                });

                $row.append($('<td>', { class: 'fw-bold', text: car.brand }));
                $row.append($('<td>').append($('<span>', { class: badgeClass, text: car.category })));
                $row.append($('<td>', { text: String(car.year) }));

                const $actionCell = $('<td>');
                if (car.available) {
                    $actionCell.append(
                        $('<button>', {
                            type: 'button',
                            class: 'btn btn-primary btn-sm book-car-btn',
                            'data-car-id': car.id,
                            text: 'Забронировать'
                        })
                    );
                } else {
                    $actionCell.append(
                        $('<button>', {
                            type: 'button',
                            class: 'btn btn-secondary btn-sm',
                            disabled: true,
                            text: 'Недоступно'
                        })
                    );
                }
                $row.append($actionCell);
                $tableBody.append($row);
            });
        }

        function renderGallery(items) {
            if (!$photosHeading.length) return;

            let $gallery = $photosHeading.next('.row');
            if (!$gallery.length) {
                $gallery = $('<div>', { class: 'row g-4 mt-2 fs-6' });
                $photosHeading.after($gallery);
            }

            $gallery.empty();

            $.each(items.slice(0, 6), function (_, car) {
                const $col = $('<div>', { class: 'col-md-6' });
                const $card = $('<div>', { class: 'card h-100 border-0 bg-light shadow-sm' });
                const $image = $('<img>', {
                    src: car.image,
                    class: 'card-img-top img-fluid rounded',
                    alt: car.brand
                });

                // attr() is correct for HTML attributes such as src/alt.
                $image.attr('data-car-id', car.id);
                $image.on('error', function () {
                    $(this).attr('alt', 'Фото недоступно: ' + car.brand);
                });

                const $body = $('<div>', { class: 'card-body text-center py-3' });
                $body.append($('<h5>', { class: 'fw-bold mb-1', text: car.brand }));
                $body.append($('<p>', {
                    class: 'text-muted mb-2 small',
                    text: `Категория: ${car.category} | ${car.year} г.в. | ${car.pricePerLesson} ₸/ч`
                }));

                if (car.available) {
                    $body.append(
                        $('<button>', {
                            type: 'button',
                            class: 'btn btn-primary btn-sm book-car-btn',
                            'data-car-id': car.id,
                            text: 'Забронировать этот автомобиль'
                        })
                    );
                } else {
                    $body.append(
                        $('<button>', {
                            type: 'button',
                            class: 'btn btn-secondary btn-sm',
                            disabled: true,
                            text: 'Автомобиль недоступен'
                        })
                    );
                }

                $card.append($image).append($body);
                $col.append($card);
                $gallery.append($col);
            });
        }

        function updateFleetView() {
            const query = String($search.val() || '').trim(); // val() reads form values.
            const category = $category.val();
            const sortBy = $sort.val();
            const filtered = filterFleet(fleetData, category, query);
            const sorted = sortFleet(filtered, sortBy);

            renderFleet(sorted);
            renderGallery(sorted);
            $counter.text(`Найдено транспорта: ${sorted.length}`)
                .removeClass('text-danger')
                .addClass('text-muted');
        }

        $search.on('input', updateFleetView);
        $category.on('change', updateFleetView);
        $sort.on('change', updateFleetView);

        $reset.on('click', function () {
            $search.val('');
            $category.val('ALL');
            $sort.val('default');
            updateFleetView();
        });

        // Delegation: rows/buttons are created later by renderFleet/renderGallery.
        // Direct binding would miss elements that did not exist at binding time.
        $main.on('click', '.book-car-btn', function (event) {
            event.preventDefault();
            const carId = Number($(this).attr('data-car-id'));
            const selectedCar = fleetData.find(function (car) { return car.id === carId; });
            if (!selectedCar || !selectedCar.available) return;

            $('#booking-car-id').val(String(selectedCar.id));
            $('#booking-car-name').text(selectedCar.brand);
            $('#booking-price').text(`${selectedCar.pricePerLesson} ₸/ч`);

            const $booking = $('#fleet-booking-form');
            $booking.removeClass('d-none').hide().fadeIn(400);
            $('html, body').animate({ scrollTop: $booking.offset().top - 30 }, 500);
        });

        // Delegated row click + $(this), .parent(), .siblings(), .closest().
        $tableBody.on('click', '.fleet-item', function (event) {
            if ($(event.target).closest('.book-car-btn').length) return;

            const $row = $(this);
            const carId = Number($row.attr('data-car-id'));

            // Chain: closest -> find -> not -> removeClass.
            $row.closest('tbody').find('.fleet-item').not($row).removeClass('table-primary');
            $row.toggleClass('table-primary');

            const selectedCar = fleetData.find(function (car) { return car.id === carId; });
            if (selectedCar) {
                $counter.text(`Выбрано: ${selectedCar.brand} — ${selectedCar.pricePerLesson} ₸/ч`);
            }
        });

        $tableBody.on('mouseenter', '.fleet-item', function () {
            $(this).addClass('shadow-sm').siblings('.fleet-item').removeClass('shadow-sm');
        });

        createBookingForm();
        updateFleetView();
    }

    // ============================================================
    // 4. BOOKING FORM: fully created/validated with jQuery
    // ============================================================
    function createBookingForm() {
        if ($('#fleet-booking-form').length) return;
        if (!$('#jquery-fleet-controls').length) return;

        const $booking = $('<form>', {
            id: 'fleet-booking-form',
            class: 'border rounded p-4 mt-5 bg-light d-none',
            // required stays on every field; novalidate lets our jQuery messages run first.
            novalidate: true
        });

        $booking.html(`
            <h2 class="mb-3">Бронирование автомобиля</h2>
            <p class="mb-4">Выбранный автомобиль: <strong id="booking-car-name">—</strong> (<span id="booking-price">—</span>)</p>
            <input type="hidden" id="booking-car-id" name="carId">
            <div class="mb-3">
                <label for="booking-name" class="form-label">Ваше имя</label>
                <input type="text" id="booking-name" name="name" class="form-control" required>
                <div class="invalid-feedback"></div>
            </div>
            <div class="mb-3">
                <label for="booking-phone" class="form-label">Телефон</label>
                <input type="tel" id="booking-phone" name="phone" class="form-control" placeholder="+77011234567" required>
                <div class="invalid-feedback"></div>
            </div>
            <div class="mb-3">
                <label for="booking-email" class="form-label">Email</label>
                <input type="email" id="booking-email" name="email" class="form-control" placeholder="example@mail.com" required>
                <div class="invalid-feedback"></div>
            </div>
            <div class="mb-3">
                <label for="booking-date" class="form-label">Дата занятия</label>
                <input type="date" id="booking-date" name="date" class="form-control" required>
                <div class="invalid-feedback"></div>
            </div>
            <div class="form-check mb-3">
                <input type="checkbox" id="booking-consent" class="form-check-input" required>
                <label for="booking-consent" class="form-check-label">Я подтверждаю заявку на бронирование.</label>
                <div class="invalid-feedback">Необходимо подтвердить заявку.</div>
            </div>
            <button type="submit" class="btn btn-success">Забронировать</button>
            <button type="reset" class="btn btn-outline-secondary ms-2">Очистить</button>
            <p class="small text-muted mt-3 mb-0">Проверка выполняется в браузере. Для реального сайта серверная валидация также обязательна.</p>
        `);

        $('main').append($booking);

        function setFieldState($field, valid, message) {
            const $group = $field.closest('.mb-3, .form-check');
            const $message = $group.find('.invalid-feedback');
            $message.text(message);
            $field.toggleClass('is-invalid', !valid);
            $field.toggleClass('is-valid', valid);
        }

        function validateBookingField($field) {
            const id = $field.attr('id');
            const value = String($field.val() || '').trim();

            if (id === 'booking-name') {
                const valid = value.length >= 2;
                setFieldState($field, valid, 'Введите имя (минимум 2 символа).');
                return valid;
            }

            if (id === 'booking-phone') {
                const valid = /^\+?[0-9\s()\-]{10,18}$/.test(value);
                setFieldState($field, valid, 'Введите корректный номер телефона.');
                return valid;
            }

            if (id === 'booking-email') {
                const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                setFieldState($field, valid, 'Введите корректный email адрес.');
                return valid;
            }

            if (id === 'booking-date') {
                const valid = value !== '';
                setFieldState($field, valid, 'Выберите дату занятия.');
                return valid;
            }

            return true;
        }

        // Delegated validation handler clears an error immediately after fixing a field.
        $booking.on('input change', 'input:not(#booking-consent)', function () {
            validateBookingField($(this));
        });

        $booking.on('change', '#booking-consent', function () {
            const valid = $(this).prop('checked');
            $(this).toggleClass('is-invalid', !valid).toggleClass('is-valid', valid);
        });

        $booking.on('submit', function (event) {
            event.preventDefault();
            // Without preventDefault(), the browser would submit/reload the page.

            let isValid = true;
            const $fields = $booking.find('#booking-name, #booking-phone, #booking-email, #booking-date');

            $fields.each(function () {
                if (!validateBookingField($(this))) isValid = false;
            });

            const consentValid = $('#booking-consent').prop('checked');
            $('#booking-consent').toggleClass('is-invalid', !consentValid)
                .toggleClass('is-valid', consentValid);
            if (!consentValid) isValid = false;

            if (!isValid) {
                const $firstInvalid = $booking.find('.is-invalid').first();
                if ($firstInvalid.length) $firstInvalid.trigger('focus');
                return;
            }

            const selectedCarName = $('#booking-car-name').text();
            const userName = $('#booking-name').val().trim();

            // text() writes plain text and prevents HTML parsing; html() parses markup.
        // Here html() is intentional because the success message contains <strong>.
            let $success = $('#booking-success');
            if (!$success.length) {
                $success = $('<div>', {
                    id: 'booking-success',
                    class: 'alert alert-success mt-4'
                });
                $booking.append($success);
            }

            $success.html(`<strong>Заявка создана!</strong> ${userName}, автомобиль ${selectedCarName} добавлен в вашу заявку на бронирование.`)
                .hide()
                .fadeIn(400);

            $booking[0].reset();
            $booking.find('.is-valid, .is-invalid').removeClass('is-valid is-invalid');

            // Callback after the effect finishes.
            $success.delay(4000).fadeOut(500, function () {
                $(this).remove();
            });
        });

        $booking.on('reset', function () {
            $(this).find('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
        });
    }

    // ============================================================
    // 5. ABOUT PAGE: slideToggle effect
    // ============================================================
    if ($('.school-note').length) {
        const $note = $('.school-note');
        const $toggleButton = $('<button>', {
            type: 'button',
            class: 'btn btn-outline-primary btn-sm mb-3',
            text: 'Показать/скрыть дополнительную информацию'
        });
        $note.before($toggleButton);

        $toggleButton.on('click', function () {
            $note.slideToggle(400);
        });
    }

    // ============================================================
    // 6. INSTRUCTOR PAGE: prop() + find() + fadeIn
    // ============================================================
    $('#training-steps').on('toggle', function () {
        const $details = $(this);
        if ($details.prop('open')) {
            $details.find('.steps-list').hide().fadeIn(500);
        }
    });

    // ============================================================
    // 7. COMMON MENU CHECKBOX: prop() vs attr()
    // ============================================================
    $('#menu-toggle').on('change', function () {
        const isOpen = $(this).prop('checked');
        // prop() reads the current boolean property; attr() reads the HTML attribute value.
        $(this).closest('nav').attr('aria-expanded-state', String(isOpen));
    });
});

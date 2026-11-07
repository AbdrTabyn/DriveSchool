// Используем jQuery 3.7.1 (версия загружена через CDN)
$(function() {
    'use strict';

    // ==========================================
    // 1. ИТЕРАТИВНЫЙ БЛОК FAQ (ВОПРОСЫ И ОТВЕТЫ)
    // ==========================================
    const faqData = [
        {
            question: "Можно ли оплатить обучение в рассрочку?",
            answer: "Да, автошкола Drive School предоставляет возможность беспроцентной рассрочки на весь период обучения с удобным поэтапным графиком выплат."
        },
        {
            question: "Сколько длятся практические занятия по вождению?",
            answer: "Одно стандартное практическое занятие на автодроме или в городе длится 90 минут (2 академических часа)."
        },
        {
            question: "Какие документы необходимы для поступления?",
            answer: "Для заключения договора вам потребуется удостоверение личности (паспорт) и медицинская справка установленного образца (форма 073/У)."
        },
        {
            question: "В каких районах проходят практические маршруты?",
            answer: "Практические занятия проводятся по утвержденным экзаменационным маршрутам города, согласованным с требованиями спецЦОНа."
        }
    ];

    const $faqSection = $('#faq-section');

    // Создаем структуру FAQ внутри контейнера
    $faqSection.html(`
        <h3 class="h4 mb-4">Часто задаваемые вопросы</h3>
        <div class="accordion" id="faq-accordion"></div>
    `);

    const $accordion = $('#faq-accordion');

    // Рендерим элементы FAQ из массива объектов
    $.each(faqData, function(index, item) {
        const $faqItem = $('<div>', { class: 'card mb-2 border rounded shadow-sm faq-wrapper' }).html(`
            <div class="card-header bg-light border-0 py-3">
                <button class="faq-question-btn btn btn-link text-dark text-decoration-none fw-bold w-100 text-start d-flex justify-content-between align-items-center" type="button">
                    <span>${item.question}</span>
                    <span class="faq-icon fs-5 text-primary">▼</span>
                </button>
            </div>
            <div class="faq-answer-body card-body bg-white" style="display: none;">
                <p class="mb-0 text-secondary">${item.answer}</p>
            </div>
        `);
        $accordion.append($faqItem);
    });

    // Делегированный обработчик клика с использованием методов траверса (.closest(), .find()) и эффекта .slideToggle()
    $faqSection.on('click', '.faq-question-btn', function() {
        const $btn = $(this);
        // Траверс: поднимаемся к родителю карточки и находим блок с ответом
        const $answerBody = $btn.closest('.faq-wrapper').find('.faq-answer-body');
        const $icon = $btn.find('.faq-icon');

        // Эффект плавного открытия/закрытия
        $answerBody.slideToggle(300, function() {
            // Коллбэк после завершения анимации (меняем иконку стрелки)
            if ($answerBody.is(':visible')) {
                $icon.text('▲');
            } else {
                $icon.text('▼');
            }
        });
    });

    // ==========================================
    // 2. ФОРМА ОБРАТНОЙ СВЯЗИ И ВАЛИДАЦИЯ
    // ==========================================
    const $formContainer = $('#contact-form-container');

    const $contactForm = $('<form>', { id: 'contacts-booking-form', novalidate: true }).html(`
        <h3 class="h4 mb-3">Остались вопросы? Напишите нам</h3>
        <div class="mb-3">
            <label for="visitor-name" class="form-label fw-bold">Ваше имя:</label>
            <input type="text" id="visitor-name" class="form-control" placeholder="Введите имя" required>
            <div class="invalid-feedback">Пожалуйста, введите ваше имя.</div>
        </div>
        <div class="mb-3">
            <label for="visitor-phone" class="form-label fw-bold">Телефон:</label>
            <input type="tel" id="visitor-phone" class="form-control" placeholder="+77011234567" required>
            <div class="invalid-feedback">Введите корректный номер телефона (10-12 цифр).</div>
        </div>
        <div class="mb-3">
            <label for="visitor-message" class="form-label fw-bold">Сообщение:</label>
            <textarea id="visitor-message" class="form-control" rows="3" placeholder="Ваш вопрос..." required></textarea>
            <div class="invalid-feedback">Введите текст сообщения (не менее 5 символов).</div>
        </div>
        <button type="submit" class="btn btn-primary w-100">Отправить сообщение</button>
    `);

    $formContainer.append($contactForm);

    // Очистка ошибок при вводе
    $contactForm.on('input change', 'input, textarea', function() {
        $(this).removeClass('is-invalid');
    });

    // Обработка отправки формы
    $contactForm.on('submit', function(event) {
        event.preventDefault(); // Предотвращаем перезагрузку страницы

        let isValid = true;
        const $name = $('#visitor-name');
        const $phone = $('#visitor-phone');
        const $msg = $('#visitor-message');

        if ($.trim($name.val()) === '') {
            isValid = false;
            $name.addClass('is-invalid');
        }

        const phoneRegex = /^\+?[0-9]{10,12}$/;
        if (!phoneRegex.test($.trim($phone.val()))) {
            isValid = false;
            $phone.addClass('is-invalid');
        }

        if ($.trim($msg.val()).length < 5) {
            isValid = false;
            $msg.addClass('is-invalid');
        }

        if (!isValid) {
            $contactForm.find('.is-invalid').first().focus();
            return;
        }

        // Генерация демонстрационного номера заявки через Math.random()
        const refNumber = 'FAQ-' + (Math.floor(Math.random() * 900000) + 100000);
        $('#success-alert').remove();

        const $successAlert = $('<div>', {
            id: 'success-alert',
            class: 'alert alert-success mt-4 fs-6'
        }).html(`
            <h4 class="alert-heading">Сообщение отправлено!</h4>
            <p>Спасибо, <strong>${$name.val().trim()}</strong>! Мы свяжемся с вами в ближайшее время.</p>
            <hr>
            <p class="mb-0"><strong>Номер вашей заявки:</strong> ${refNumber}</p>
        `).hide();

        $contactForm.after($successAlert);
        $successAlert.fadeIn(400); // Эффект плавного появления сообщения

        this.reset();
    });
});

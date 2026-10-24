'use strict';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    if (!form) {
        return;
    }

    const cardBody = form;
    if (!document.querySelector('#visitor-phone')) {
        const additionalFieldsHTML = document.createElement('div');
        additionalFieldsHTML.innerHTML = `
            <div class="mb-3">
                <label for="visitor-name" class="form-label fw-bold">Ваше имя:</label>
                <input type="text" id="visitor-name" class="form-control" placeholder="Введите имя">
                <div class="invalid-feedback">Пожалуйста, введите ваше имя.</div>
            </div>
            <div class="mb-3">
                <label for="visitor-phone" class="form-label fw-bold">Телефон:</label>
                <input type="tel" id="visitor-phone" class="form-control" placeholder="+77011234567">
                <div class="invalid-feedback">Введите корректный номер телефона (10-12 цифр).</div>
            </div>
            <div class="mb-3">
                <label for="visitor-email" class="form-label fw-bold">Электронная почта:</label>
                <input type="email" id="visitor-email" class="form-control" placeholder="example@mail.com">
                <div class="invalid-feedback">Введите корректный email адрес.</div>
            </div>
            <div class="mb-3">
                <label for="visitor-hours" class="form-label fw-bold">Количество часов вождения:</label>
                <input type="number" id="visitor-hours" class="form-control" min="2" max="50" value="10">
                <div class="invalid-feedback">Укажите от 2 до 50 часов.</div>
            </div>
            <button type="submit" class="btn btn-primary w-100">Отправить заявку</button>
        `;
        form.appendChild(additionalFieldsHTML);
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let isValid = true;

        // 1. Поле: Имя (обязательное, trimmed)
        const nameInput = document.querySelector('#visitor-name') || form.querySelector('input[type="text"]');
        if (nameInput) {
            const val = nameInput.value.trim();
            if (val === '') {
                isValid = false;
                nameInput.classList.add('is-invalid');
                nameInput.classList.remove('is-valid');
            } else {
                nameInput.classList.remove('is-invalid');
                nameInput.classList.add('is-valid');
            }
        }

        // 2. Поле: Телефон (по регулярному выражению)
        const phoneInput = document.querySelector('#visitor-phone') || form.querySelector('input[type="tel"]');
        const phoneRegex = /^\+?[0-9]{10,12}$/;
        if (phoneInput) {
            if (!phoneRegex.test(phoneInput.value.trim())) {
                isValid = false;
                phoneInput.classList.add('is-invalid');
                phoneInput.classList.remove('is-valid');
            } else {
                phoneInput.classList.remove('is-invalid');
                phoneInput.classList.add('is-valid');
            }
        }

        const emailInput = document.querySelector('#visitor-email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput) {
            if (!emailRegex.test(emailInput.value.trim())) {
                isValid = false;
                emailInput.classList.add('is-invalid');
                emailInput.classList.remove('is-valid');
            } else {
                emailInput.classList.remove('is-invalid');
                emailInput.classList.add('is-valid');
            }
        }

        const hoursInput = document.querySelector('#visitor-hours');
        if (hoursInput) {
            const hoursVal = parseInt(hoursInput.value, 10);
            if (isNaN(hoursVal) || hoursVal < 2 || hoursVal > 50) {
                isValid = false;
                hoursInput.classList.add('is-invalid');
                hoursInput.classList.remove('is-valid');
            } else {
                hoursInput.classList.remove('is-invalid');
                hoursInput.classList.add('is-valid');
            }
        }

        if (!isValid) {
            const firstInvalid = form.querySelector('.is-invalid');
            if (firstInvalid) {
                firstInvalid.focus();
            }
            return;
        }

        const refNumber = generateRandomReference('DS');

        const oldAlert = document.getElementById('success-booking-alert');
        if (oldAlert) {
            oldAlert.remove();
        }

        const successAlert = document.createElement('div');
        successAlert.id = 'success-booking-alert';
        successAlert.className = 'alert alert-success mt-4 fs-6';
        successAlert.innerHTML = `
            <h4 class="alert-heading">Заявка успешно сформирована!</h4>
            <p>Спасибо, ${nameInput ? nameInput.value.trim() : 'Гость'}! Ваши данные успешно прошли проверку на клиенте.</p>
            <hr>
            <p class="mb-0"><strong>Референс бронирования:</strong> ${refNumber}.<br>
            <em>Внимание: Данные никуда не отправляются, реальная запись или оплата не производятся.</em></p>
        `;
        form.insertAdjacentElement('afterend', successAlert);
        form.reset();

        form.querySelectorAll('.is-valid').forEach(function(el) {
            el.classList.remove('is-valid');
        });
    });
});

function generateRandomReference(prefix) {
    const randomNum = Math.floor(Math.random() * 900000) + 100000;
    return prefix + '-' + randomNum;
}
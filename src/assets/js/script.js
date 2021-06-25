"use strict"

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.header__burger').addEventListener('click', event => {
        document.querySelector('.header__menu').classList.toggle('header__menu_active')
        if (document.querySelector('.header__menu').classList.contains('header__menu_active')) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
    })

    let rentalPeriodInput = document.querySelector('.rental-period__input')
    calculatorRentalPeriod(rentalPeriodInput)
    rentalPeriodInput.addEventListener('change', event => {
        calculatorRentalPeriod(rentalPeriodInput)
    })

    function calculatorRentalPeriod(block) {
        document.querySelector('.rental-period__text_result').innerHTML = `
        ${block.value} months
        <span>${block.value * 200} $</span>`
    }

    const placeholder = 'Your Telegram or\nWhatsApp number';
    document.querySelectorAll('.short-form__input_textarea').forEach(formInput => {
        formInput.value = placeholder
        formInput.onfocus = function () {
            if (formInput.value === placeholder) {
                formInput.value = ''
            }
        }
        formInput.onblur = function () {
            if (formInput.value === '') {
                formInput.value = placeholder
            }
        }
    })

    document.querySelectorAll('.short-form').forEach(form => {
        form.addEventListener('submit', event => {
            formSend(event, form)
        })
    })

    async function formSend(e, form) {
        e.preventDefault()

        let error = formValidate(form),
            formData = new FormData(form)

        if (error === 0) {
            let buttonText = form.querySelector('.short-form__submit').textContent

            form.querySelector('.short-form__error-text').style.opacity = '0'
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            })
            if (response.ok) {
                form.reset()

                form.querySelector('.short-form__submit').textContent = 'Successfully sent'
                form.querySelector('.short-form__submit').classList.add('short-form__submit_correct')
                form.querySelector('.short-form__input_textarea').value = placeholder
                setTimeout(() => {
                    form.querySelector('.short-form__submit').textContent = buttonText
                    form.querySelector('.short-form__submit').classList.remove('short-form__submit_correct')
                }, 2000)
            } else {
                form.querySelector('.short-form__submit').textContent = 'Oops... The form was not submitted'
                form.querySelector('.short-form__submit').classList.add('short-form__submit_error')
                setTimeout(() => {
                    form.querySelector('.short-form__submit').textContent = buttonText
                    form.querySelector('.short-form__submit').classList.remove('short-form__submit_error')
                }, 2000)
            }
        } else {
            form.querySelector('.short-form__error-text').style.opacity = '1'
        }

    }

    function formValidate(form) {
        let error,
            formInput = form.querySelector('input'),
            formTextarea = form.querySelector('textarea')
        if (formInput.required && formTextarea.value !== placeholder && formTextarea.required) {
            error = 0
            formTextarea.classList.remove('short-form__input_wrong')
        } else {
            error = 1
            formTextarea.classList.add('short-form__input_wrong')
        }
        return error
    }
})

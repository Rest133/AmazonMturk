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
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            })
            if (response.ok) {
                form.reset()
            } else {
                alert('Oops... The form was not submitted.')
            }
        } else {
            alert('Please, fill in all the fields in form')
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

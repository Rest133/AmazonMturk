"use strict"

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.header__burger').addEventListener('click', event => {
        document.querySelector('.header__menu').classList.toggle('header__menu_active')
        checkMenuActive()

        document.querySelector('.header__menu').querySelectorAll('.header__menu-item').forEach(menuItem => {
            menuItem.addEventListener('click', event => {
                document.querySelector('.header__menu').classList.remove('header__menu_active')
                checkMenuActive()
            })
        })
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
                formInput.classList.add('short-form__input_textarea_active')
            }
        }
        formInput.onblur = function () {
            if (formInput.value === '') {
                formInput.value = placeholder
                formInput.classList.remove('short-form__input_textarea_active')
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
                form.querySelector('.short-form__input_textarea').classList.remove('short-form__input_textarea_active')
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

    function checkMenuActive() {
        if (document.querySelector('.header__menu').classList.contains('header__menu_active')) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
    }

    //Video

    function findVideos() {
        let videos = document.querySelectorAll('.video');

        for (let i = 0; i < videos.length; i++) {
            setupVideo(videos[i]);
        }
    }

    function setupVideo(video) {
        let link = video.querySelector('.video__link');
        let media = video.querySelector('.video__media');
        let button = video.querySelector('.video__button');
        let id = parseMediaURL(media);

        video.addEventListener('click', () => {
            let iframe = createIframe(id);

            link.remove();
            button.remove();
            video.appendChild(iframe);
        });

        link.removeAttribute('href');
        video.classList.add('video_enabled');
    }

    function parseMediaURL(media) {
        let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/hqdefault\.jpg/i;
        let url = media.src;
        let match = url.match(regexp);

        return match[1];
    }

    function createIframe(id) {
        let iframe = document.createElement('iframe');

        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('allow', 'autoplay');
        iframe.setAttribute('src', generateURL(id));
        iframe.classList.add('video__media');

        return iframe;
    }

    function generateURL(id) {
        let query = '?rel=0&showinfo=0&autoplay=1';

        return 'https://www.youtube.com/embed/' + id + query;
    }

    findVideos();
})

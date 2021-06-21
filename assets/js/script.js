document.querySelector('.header__burger').addEventListener('click', event => {
    document.querySelector('.header__menu').classList.toggle('header__menu_active')
    if (document.querySelector('.header__menu').classList.contains('header__menu_active')) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = ''
    }
})
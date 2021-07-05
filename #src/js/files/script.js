// lock

function body_lock(delay) {
    let body = document.querySelector("body");
    if (body.classList.contains('-lock')) {
        body_lock_remove(delay);
    } else {
        body_lock_add(delay);
    }
}
function body_lock_remove(delay) {
    let body = document.querySelector("body");
    if (unlock) {
        let lock_padding = document.querySelectorAll("._lp");
        setTimeout(() => {
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = '0px';
            }
            body.style.paddingRight = '0px';
            body.classList.remove("-lock");
        }, delay);

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, delay);
    }
}
function body_lock_add(delay) {
    let body = document.querySelector("body");
    if (unlock) {
        let lock_padding = document.querySelectorAll(".-lp");
        for (let index = 0; index < lock_padding.length; index++) {
            const el = lock_padding[index];
            el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        }
        body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        body.classList.add("-lock");

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, delay);
    }
}



// popups

let unlock = true;
let popup_link = document.querySelectorAll('.-popup-link');
let popups = document.querySelectorAll('.popup');


for (let index = 0; index < popup_link.length; index++) {
    const el = popup_link[index];
    el.addEventListener('click', function (e) {
        if (unlock) {
            let item = el.getAttribute('href').replace('#', '');
            let video = el.getAttribute('data-video');
            popup_open(item, video);
        }
        e.preventDefault();
    })
}
for (let index = 0; index < popups.length; index++) {
    const popup = popups[index];
    popup.addEventListener("click", function (e) {
        if (!e.target.closest('.popup__body')) {
            popup_close(e.target.closest('.popup'));
        }
    });
}
function popup_open(item, video = '') {
    let activePopup = document.querySelectorAll('.popup.-active');
    if (activePopup.length > 0) {
        popup_close('', false);
    }
    let curent_popup = document.querySelector('.popup__' + item);
    if (curent_popup && unlock) {
        if (video != '' && video != null) {
            let popup_video = document.querySelector('.popup_video');
            popup_video.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
        }
        if (!document.querySelector('.menu__body.-active')) {
            body_lock_add(500);
        }
        curent_popup.classList.add('-active');
        history.pushState('', '', '#' + item);
    }
}
function popup_close(item, bodyUnlock = true) {
    if (unlock) {
        if (!item) {
            for (let index = 0; index < popups.length; index++) {
                const popup = popups[index];
                let video = popup.querySelector('.popup__video');
                if (video) {
                    video.innerHTML = '';
                }
                popup.classList.remove('-active');
            }
        } else {
            let video = item.querySelector('.popup__video');
            if (video) {
                video.innerHTML = '';
            }
            item.classList.remove('-active');
        }
        if (!document.querySelector('.menu__body._active') && bodyUnlock) {
            body_lock_remove(500);
        }
        history.pushState('', '', window.location.href.split('#')[0]);
    }
}
let popup_close_icon = document.querySelectorAll('.popup__close');
let popup_close_button = document.querySelectorAll('.button__close');

if (popup_close_icon) {
    for (let index = 0; index < popup_close_icon.length; index++) {
        const el = popup_close_icon[index];
        el.addEventListener('click', function () {
            popup_close(el.closest('.popup'));
        })
    }
}
if (popup_close_button) {
    for (let index = 0; index < popup_close_button.length; index++) {
        const el = popup_close_button[index];
        el.addEventListener('click', function () {
            popup_close(el.closest('.popup'));
        })
    }
}


document.addEventListener('keydown', function (e) {
    if (e.which == 27) {
        popup_close();
    }
});




// submit
function email_test(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input);
}

function name_test(input) {
    for (let el of input) {
        if (!/^[a-zA-Z -\s]/.test(el) && !/^[а-яёА-ЯЁ\s]/.test(el)) return true;
    }
    return false;
}



let feed = {
    submit: function (e, elem) {
        let valid = true;
        let form = $(elem);
        let email = form.find('[name=email]').val();
        let name = form.find('[name=name]').val();
        let country = form.find('select').val();
        let agree = form.find('.checkbox:checked').val();
        $('.form__field').removeClass('-error');

        if (email_test(email) || !email.length) {
            e.preventDefault();
            form.find('[name=email]').parents('.form__field').addClass('-error');
            valid = false;
        }

        if (name_test(name) || name.length < 3) {
            e.preventDefault();
            form.find('[name=name]').parents('.form__field').addClass('-error');
            valid = false;
        }

        if (!country.length) {
            e.preventDefault();
            form.find('select').parents('.form__field').addClass('-error');
            valid = false;
        }

        if (typeof agree == "undefined" && !agree) {
            e.preventDefault();
            $('.checkbox').parents('.form__field').addClass('-error');
            valid = false;
        }

        if (valid) {
            e.preventDefault();
            feed.reachGoal(form);
        } else {
            return valid;
        }
    },
    reachGoal: function (form) {
        let name = form.find('[name=name]').val();
        alert(name + ', your request has been sent!');
        form.trigger('reset');

    }
}



$(document).ready(function () {
    $(document).on('submit', '.form__validation', function (e) {
        feed.submit(e, this);
    });

    $('input[type="text"], input[type="checkbox"], select').on('focus', function () {
        $('.form__field').removeClass('-error');
        $('.form__clean').removeClass('-active');
    });
});


// clean buttons for form
$('.form__input').on('input', function (e) {
    if ($(this).val()) {
        $(this).siblings('.form__clean').addClass('-active');
    } else {
        $(this).siblings('.form__clean').removeClass('-active');
    }
});


$('.form__clean').on('click', function (e) {
    $(this).siblings('.form__input').val('');
    $(this).removeClass('-active');
});

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

$(document).ready(function () {
  // Browser check
  var userAgent = navigator.userAgent.toLowerCase();
  var Mozila = /firefox/.test(userAgent);
  var Chrome = /chrome/.test(userAgent);
  var Safari = /safari/.test(userAgent);
  var Opera = /opera/.test(userAgent);
  var InternetExplorer = false;
  if (/mozilla/.test(userAgent) && !/firefox/.test(userAgent) && !/chrome/.test(userAgent) && !/safari/.test(userAgent) && !/opera/.test(userAgent) || /msie/.test(userAgent)) InternetExplorer = true; // lock

  function body_lock(delay) {
    var body = document.querySelector("body");

    if (body.classList.contains('-lock')) {
      body_lock_remove(delay);
    } else {
      body_lock_add(delay);
    }
  }

  function body_lock_remove(delay) {
    var body = document.querySelector("body");

    if (unlock) {
      var lock_padding = document.querySelectorAll("._lp");
      setTimeout(function () {
        for (var index = 0; index < lock_padding.length; index++) {
          var el = lock_padding[index];
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
    var body = document.querySelector("body");

    if (unlock) {
      var lock_padding = document.querySelectorAll(".-lp");

      for (var index = 0; index < lock_padding.length; index++) {
        var el = lock_padding[index];
        el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
      }

      body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
      body.classList.add("-lock");
      unlock = false;
      setTimeout(function () {
        unlock = true;
      }, delay);
    }
  } // popups


  var unlock = true;
  var popup_link = document.querySelectorAll('.-popup-link');
  var popups = document.querySelectorAll('.popup');

  var _loop = function _loop(index) {
    var el = popup_link[index];
    el.addEventListener('click', function (e) {
      if (unlock) {
        var item = el.getAttribute('href').replace('#', '');
        var video = el.getAttribute('data-video');
        popup_open(item, video);
      }

      e.preventDefault();
    });
  };

  for (var index = 0; index < popup_link.length; index++) {
    _loop(index);
  }

  for (var _index = 0; _index < popups.length; _index++) {
    var popup = popups[_index];
    popup.addEventListener("click", function (e) {
      if (!e.target.closest('.popup__body')) {
        popup_close(e.target.closest('.popup'));
      }
    });
  }

  function popup_open(item) {
    var video = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var activePopup = document.querySelectorAll('.popup.-active');

    if (activePopup.length > 0) {
      popup_close('', false);
    }

    var curent_popup = document.querySelector('.popup__' + item);

    if (curent_popup && unlock) {
      if (video != '' && video != null) {
        var popup_video = document.querySelector('.popup_video');
        popup_video.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
      }

      if (!document.querySelector('.menu__body.-active')) {
        body_lock_add(500);
      }

      curent_popup.classList.add('-active');
      history.pushState('', '', '#' + item);
    }
  }

  function popup_close(item) {
    var bodyUnlock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (unlock) {
      if (!item) {
        for (var _index2 = 0; _index2 < popups.length; _index2++) {
          var _popup = popups[_index2];

          var video = _popup.querySelector('.popup__video');

          if (video) {
            video.innerHTML = '';
          }

          _popup.classList.remove('-active');
        }
      } else {
        var _video = item.querySelector('.popup__video');

        if (_video) {
          _video.innerHTML = '';
        }

        item.classList.remove('-active');
      }

      if (!document.querySelector('.menu__body._active') && bodyUnlock) {
        body_lock_remove(500);
      }

      history.pushState('', '', window.location.href.split('#')[0]);
    }
  }

  var popup_close_icon = document.querySelectorAll('.popup__close');
  var popup_close_button = document.querySelectorAll('.button__close');

  if (popup_close_icon) {
    var _loop2 = function _loop2(_index3) {
      var el = popup_close_icon[_index3];
      el.addEventListener('click', function () {
        popup_close(el.closest('.popup'));
      });
    };

    for (var _index3 = 0; _index3 < popup_close_icon.length; _index3++) {
      _loop2(_index3);
    }
  }

  if (popup_close_button) {
    var _loop3 = function _loop3(_index4) {
      var el = popup_close_button[_index4];
      el.addEventListener('click', function () {
        popup_close(el.closest('.popup'));
      });
    };

    for (var _index4 = 0; _index4 < popup_close_button.length; _index4++) {
      _loop3(_index4);
    }
  }

  document.addEventListener('keydown', function (e) {
    if (e.which == 27) {
      popup_close();
    }
  }); // submit

  function email_test(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input);
  }

  function name_test(input) {
    var _iterator = _createForOfIteratorHelper(input),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var el = _step.value;
        if (!/^[a-zA-Z -\s]/.test(el) && !/^[а-яёА-ЯЁ\s]/.test(el)) return true;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return false;
  }

  var feed = {
    submit: function submit(e, elem) {
      var valid = true;
      var form = $(elem);
      var email = form.find('[name=email]').val();
      var name = form.find('[name=name]').val();
      var country = form.find('select').val();
      var agree = form.find('.checkbox:checked').val();
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
    reachGoal: function reachGoal(form) {
      var name = form.find('[name=name]').val();
      alert(name + ', your request has been sent!');
      form.trigger('reset');
    }
  };
  $(document).ready(function () {
    $(document).on('submit', '.form__validation', function (e) {
      feed.submit(e, this);
    });
    $('input[type="text"], input[type="checkbox"], select').on('focus', function () {
      $('.form__field').removeClass('-error');
      $('.form__clean').removeClass('-active');
    });
  }); // for Internet Explorer

  if (InternetExplorer) {
    // delete labels
    $('.form__label[for=name], .form__label[for=email]').remove();
    $(".form__input[name=name]").attr("placeholder", "Enter your name");
    $(".form__input[name=email]").attr("placeholder", "Enter your E-Mail");
    $('.form__input').css('color', '#aaa'); // add closest with matches

    (function (e) {
      e.closest = e.closest || function (css) {
        var node = this;

        while (node) {
          if (node.matches(css)) return node;else node = node.parentElement;
        }

        return null;
      };
    })(Element.prototype);

    if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i = matches.length;

        while (--i >= 0 && matches.item(i) !== this) {}

        return i > -1;
      };
    } // clean buttons for form


    $('.form__input').on('input', function (e) {
      if ($(this).val()) {
        $(this).siblings('.form__clean').addClass('-active');
        $(this).css('color', '#48b');
      } else {
        $(this).siblings('.form__clean').removeClass('-active');
        $(this).css('color', '#aaa');
      }
    });
    $('.form__clean').on('click', function (e) {
      $(this).siblings('.form__input').val('');
      $(this).removeClass('-active');
      $(this).siblings('.form__input').css('color', '#aaa');
    });
  } else {
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
  }
});
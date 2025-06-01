/*============================
   js index
==============================

==========================================*/

(function ($) {
  var audio = new Audio('./music/i-do-911.mp3');
  var isFirst = true;
  audio.load();
  var swiper = new Swiper('.swiper-container', {
    loop: true,
    speed: 4000,
    autoplay: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  /*================================
    Window Load
    ==================================*/
  $(window).on('load', function () {
    smoothScrolling($(".main-menu nav ul li a[href^='#']"), headerHeight);
    smoothScrolling($(".scrollup a[href^='#']"), 0);
    smoothScrolling($(".welcome-content .btn a[href^='#']"), 0);
    $('.slider-two').addClass('scontent_loaded');
    $('.slider-parallax').addClass('scontent_loaded');
    sliderLoadedAddClass();
    preloader();
  });

  audio.addEventListener('canplaythrough', () => {
    audio.play();
    console.log('Audio đã load xong, đang phát...');
  });

  window.onclick = function (e) {
    if (isFirst) {
      playAudio(true);
      isFirst = false;
    }
  };

  /*================================
    Preloader
    ==================================*/
  /*------------------------------------------
        = HIDE PRELOADER
    -------------------------------------------*/
  function preloader() {
    if ($('.preloader').length) {
      $('.preloader')
        .delay(100)
        .fadeOut(500, function () {});
    }
  }

  /*================================
     sticky-header
     ==================================*/
  $(window).scroll(function () {
    if ($(window).scrollTop() > 10) {
      $('.sticky-header').addClass('sticky'), $('.scrollup').addClass('show_hide');
    } else {
      $('.sticky-header').removeClass('sticky'), $('.scrollup').removeClass('show_hide');
    }
  });

  /*================================
    slicknav
    ==================================*/

  $('#nav_mobile_menu').slicknav({
    label: '',
    duration: 1000,
    easingOpen: 'easeOutBounce', //available with jQuery UI
    prependTo: '#mobile_menu',
  });
  /*------------------------------------------
        = RSVP FORM SUBMISSION
    -------------------------------------------*/
  if ($('#rsvp-form').length) {
    $('#rsvp-form').validate({
      rules: {
        name: {
          required: true,
          minlength: 4,
        },
        email: {
          required: true,
          minlength: 8,
        },

        guest: {
          required: true,
        },

        events: {
          required: true,
        },
      },

      messages: {
        name: 'Bạn chưa nhập họ tên.',
        email: 'Bạn chưa nhập email.',
        guest: 'Bạn chưa chọn số lượng khách.',
        events: 'Bạn chưa chọn sự kiện',
      },

      submitHandler: function (form) {
        if ($('#loader').css('display') === 'inline-block') return 0;
        var params = $(form).serialize();
        $('#loader').css('display', 'inline-block');
        $.ajax({
          type: 'GET',
          url: 'https://script.google.com/macros/s/AKfycbycz38PFfhU2Xd2_cu_qwQ8nmllQ8qUJvxqqgrom6qLpQTd_3XG_lk0gNZCKIqnnAry/exec',
          data: params,
          success: function () {
            $('#loader').hide();
            $('#success').slideDown('slow');
            setTimeout(function () {
              $('#success').slideUp('slow');
            }, 5000);
            form.reset();
          },
          error: function () {
            $('#loader').hide();
            $('#error').slideDown('slow');
            setTimeout(function () {
              $('#error').slideUp('slow');
            }, 5000);
          },
        });
        return false; // required to block normal submit since you used ajax
      },
    });
  }

  /*================================
    slider-area content effect
    ==================================*/
  function sliderLoadedAddClass() {
    $('.slider-two').addClass('scontent_loaded');
    $('.slider-parallax').addClass('scontent_loaded');
  }

  /*================================
      Isotope Portfolio
     ==================================*/
  $('.grid').imagesLoaded(function () {
    // filter items on button click
    $('.gallery-menu').on('click', 'button', function () {
      var filterValue = $(this).attr('data-filter');
      $grid.isotope({
        filter: filterValue,
      });
    });

    // init Isotope
    var $grid = $('.grid').isotope({
      itemSelector: '.grid-item',
      percentPosition: true,
      masonry: {
        // use outer width of grid-sizer for columnWidth
        columnWidth: '.grid-item',
      },
    });
  });

  $('.gallery-menu button').on('click', function () {
    $('.gallery-menu button').removeClass('active');
    $(this).addClass('active');
  });

  /*------------------------------------------
        = COUNTDOWN CLOCK
    -------------------------------------------*/
  if ($('#clock').length) {
    $('#clock').countdown('2025/06/21', function (event) {
      var $this = $(this).html(
        event.strftime(
          '' +
            '<div class="box"><div class="date">%D</div> <span>Days</span> </div>' +
            '<div class="box"><div class="date">%H</div> <span>Hours</span> </div>' +
            '<div class="box"><div class="date">%M</div> <span>Mins</span> </div>' +
            '<div class="box"><div class="date">%S</div> <span>Secs</span> </div>'
        )
      );
    });
  }

  /*================================
     Variable Initialize
    ==================================*/
  var headerHeight = $('.header-area').innerHeight();

  //. smooth scrolling
  function smoothScrolling($links, $topGap) {
    var links = $links;
    var topGap = $topGap;

    links.on('click', function (e) {
      e.preventDefault();
      if (
        location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
        location.hostname === this.hostname
      ) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          gsap.to(window, {
            duration: 1,
            scrollTo: {
              y: target.offset().top - topGap,
              autoKill: false,
            },
            ease: 'power2.inOut',
          });
          return false;
        }
      }
      return false;
    });
  }

  /*------------------------------------------
    = BACK TO TOP
-------------------------------------------*/
  if ($('.scrollup').length) {
    $('.scrollup').on('click', function (e) {
      e.preventDefault();
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: 0,
          autoKill: false,
        },
        ease: 'power2.inOut',
      });
      return false;
    });
  }

  /*================================
    Magnific Popup
    ==================================*/
  if ($('.expand-img').length) {
    $('.expand-img').magnificPopup({
      type: 'image',
      gallery: {
        enabled: true,
      },
    });

    $('.expand-video').magnificPopup({
      type: 'iframe',
      gallery: {
        enabled: true,
      },
    });
  }
  /*------------------------------------------
    = WATER RIPPLE
-------------------------------------------*/
  if ($('.ripple').length) {
    $('.ripple').ripples({
      resolution: 512,
      dropRadius: 20, //px
      perturbance: 0.04,
    });

    // Automatic drops
    setInterval(function () {
      var $el = $('.ripple');
      var x = Math.random() * $el.outerWidth();
      var y = Math.random() * $el.outerHeight();
      var dropRadius = 20;
      var strength = 0.04 + Math.random() * 0.04;

      $el.ripples('drop', x, y, dropRadius, strength);
    }, 400);
  }

  if ($('.particleground').length) {
    $('.particleground').particleground({
      dotColor: '#999999',
      lineColor: '#999999',
      particleRadius: 5,
      lineWidth: 2,
      curvedLines: true,
      proximity: 20,
      parallaxMultiplier: 10,
    });
  }

  /*------------------------------------------
        = VIDEO BACKGROUND
    -------------------------------------------*/
  if ($('#video-background').length) {
    $('#video-background').YTPlayer({
      showControls: false,
      playerVars: {
        modestbranding: 0,
        autoplay: 1,
        controls: 1,
        showinfo: 0,
        wmode: 'transparent',
        branding: 0,
        rel: 0,
        autohide: 0,
        origin: window.location.origin,
      },
    });
  }

  /*------------------------------------------
        = POPUP YOUTUBE, VIMEO, GMAPS
    -------------------------------------------*/
  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
  });

  /*------------------------------------------
        = TOGGLE MUSUC BIX
    -------------------------------------------*/
  if ($('.music-box').length) {
    var musicBtn = $('.music-box-toggle-btn');

    musicBtn.on('click', function () {
      playAudio();
      return false;
    });
  }

  function playAudio(play) {
    if (audio.paused) {
      audio.loop = true;
      $('.music-box').addClass('mute');
      audio.play();
    } else if (!play) {
      audio.pause();
      $('.music-box').removeClass('mute');
    }
  }

  function createHearts() {
    const heartCount = Math.floor(Math.random() * 3) + 1; // 1 đến 3 trái tim

    for (let i = 0; i < heartCount; i++) {
      createHeart();
    }
  }

  function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-icon');
    // heart.innerHTML = '♥';

    const size = Math.random() * 20 + 10;
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;

    const maxLeft = window.innerWidth - size;
    const maxTop = window.innerHeight - size;

    heart.style.left = `${Math.random() * maxLeft}px`;
    heart.style.top = `${Math.random() * maxTop}px`;

    heart.style.opacity = Math.random() * 0.6 + 0.4;

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 4000);
  }

  // Chỉ tạo vài trái tim mỗi lần, và mỗi lần cách nhau 1.5 giây
  setInterval(createHearts, 1500);
})(jQuery);

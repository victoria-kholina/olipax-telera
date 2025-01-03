import './assets/css/bootstrap-grid.min.css'
import '@splidejs/splide/css/core';
import './scss/main.scss'

import $ from 'jquery';
import Splide from '@splidejs/splide';


 $(function() {

    // Инициализация слайдеров SPLIDE
    if (document.querySelector('.splide')) {
      var splide = new Splide('.splide', {
          type: 'fade',
          width: '100%',
          pagination: false,
          arrows: false,
          autoplay: true,
          interval: 2500,
          speed: 2000,
          cover: true,
          rewind: true,
      });
  
      splide.mount();
  }
  
  // Check if a "our-projects-slider" element exists before initializing
  if (document.querySelector('.our-projects-slider')) {
      var ourProjectsSlider = new Splide('.our-projects-slider', {
          type: 'loop',
          speed: 1000,
          arrowPath: 'M37.8452 18.8217C37.9996 18.9769 38.1219 19.1609 38.2052 19.3634C38.2899 19.5649 38.3335 19.7814 38.3335 20C38.3335 20.2187 38.2899 20.4351 38.2052 20.6367C38.1219 20.8391 37.9996 21.0232 37.8452 21.1784L24.5118 34.5117C24.3581 34.6709 24.1742 34.7978 23.9708 34.8852C23.7675 34.9725 23.5488 35.0185 23.3275 35.0204C23.1062 35.0224 22.8867 34.9802 22.6819 34.8964C22.4771 34.8126 22.291 34.6888 22.1345 34.5324C21.978 34.3759 21.8543 34.1898 21.7705 33.985C21.6867 33.7801 21.6445 33.5607 21.6464 33.3394C21.6483 33.1181 21.6943 32.8994 21.7817 32.696C21.869 32.4927 21.996 32.3088 22.1552 32.155L32.6435 21.6667H3.33349C2.89146 21.6667 2.46754 21.4911 2.15498 21.1785C1.84241 20.866 1.66682 20.4421 1.66682 20C1.66682 19.558 1.84241 19.1341 2.15498 18.8215C2.46754 18.509 2.89146 18.3334 3.33349 18.3334H32.6435L22.1552 7.84503C21.8516 7.53069 21.6836 7.10969 21.6874 6.67269C21.6912 6.2357 21.8664 5.81768 22.1755 5.50866C22.4845 5.19965 22.9025 5.02437 23.3395 5.02057C23.7765 5.01677 24.1975 5.18476 24.5118 5.48836L37.8452 18.8217Z',
          cover: true,
      });
  
      ourProjectsSlider.mount();
    }
    // Устанавливаем SVG data с внешнего файла на страницу. Нужно для поддержки SVG спрайтов разными браузерами. 

    const basePath = window.location.pathname.includes('/services/')
    ? '../assets/img/sprite.svg' : './assets/img/sprite.svg'; 

    $.ajax({
      url: basePath, 
      method: 'GET',
      dataType: 'text',
      success: function (data) {
        const parser = new DOMParser();
        const svgDocument = parser.parseFromString(data, 'image/svg+xml');
        const svgElement = svgDocument.documentElement;
        $('body').append(svgElement); 
      },
      error: function () {
        console.error('Error in downloading svg');
      },
    });

    // ФОРМЫ. Проверка встроенной HTML5 валидации и отправка данных.

    $('#footer-form').on('submit', function (e) {
      e.preventDefault(); 
      
      if (!this.checkValidity()) {
          this.reportValidity();
          return;
      }

      let formData = $(this).serialize();

      $.ajax({
          type: 'POST',
          url: './php/send_email.php', // Путь к серверному обработчику
          data: formData,
          success: function (response) {
              $('#form-status')
                  .removeClass('error')
                  .addClass('success')
                  .text('Сообщение успешно отправлено!')
                  .css("display", "inline-block");
              $('#contact-form')[0].reset(); 
          },
          error: function () {
              $('#form-status')
                  .removeClass('success')
                  .addClass('error')
                  .text('Произошла ошибка при отправке сообщения.')
                  .css("display", "inline-block");
          }
      });
    });

    // Анимация background для header 

    let header = $("#sticky-header"); 

    if ($(window).scrollTop() > 0) {
      header.addClass("active"); 
    }

    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 0) {
            header.addClass("active"); 
        } else {
            header.removeClass("active"); 
        }
    });

    // Анимация при прокрутке страницы. 

    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return rect.top < (window.innerHeight || document.documentElement.clientHeight) && rect.bottom > 0;
    }
    
    function checkVisibility() {
      $(".animate").each(function () {
        if (isElementInViewport(this) && !$(this).hasClass("animated")) {
          $(this).addClass("in-view animated");
        }
      });
    }
    
    let ticking = false;
    
    function optimizedCheckVisibility() {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          checkVisibility();
          ticking = false;
        });
        ticking = true;
      }
    }
    
    $(window).on("scroll resize", optimizedCheckVisibility);
    checkVisibility();

    // Анимация Мобильного меню

    let menuToggle = $(".mobile-menu-toggle");
    let mobileMenu = $(".mobile-menu");

    menuToggle.on("click", function () {
        $(this).toggleClass("open"); 
        mobileMenu.toggleClass("open"); 
    });

    $(".menu-item a").on("click", function () {
        menuToggle.removeClass("open");
        mobileMenu.removeClass("open");
    });

    // Аккордеон

    $('.accordion-item__title').on('click', function() {
      const content = $(this).next('.accordion-item__content');

      $('.accordion-item__content').not(content).slideUp().removeClass('active');

      content.slideToggle().toggleClass('active');
    });

    // Cookies

    const notification = $('#cookie-notification');
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');

    if (!cookiesAccepted) {
      notification.css("display","flex");
    }

    $('#accept-cookies').on('click', function () {
      localStorage.setItem('cookiesAccepted', 'true'); 
      notification.css("display","none"); 
    });
      

    //     // Функция для проверки поддержки WebP
//     function supportsWebP(callback) {
//       var webP = new Image();
//       webP.onload = webP.onerror = function () {
//         callback(webP.height == 2); 
//       };
//       webP.src = "data:image/webp;base64,UklGRhYAAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";
//     }
  
//     // Проверяем поддержку WebP
//     supportsWebP(function (supported) {
//       if (!supported) {
//         // Если WebP не поддерживается, заменяем изображения на JPG
//         $('img[src$=".webp"]').each(function () {
//           var imgSrc = $(this).attr('src');
//           var jpgSrc = imgSrc.replace('.webp', '.jpg'); 
//           $(this).attr('src', jpgSrc); 
//         });
//       }
    
//     });

// Функция, устанавливающая одинаковую высоту для элементов

  // function setEqualHeight(elements) {
  //   let maxHeight = 0;

  //   $(elements).css('height', 'auto');

  //   $(elements).each(function () {
  //     let elementHeight = $(this).outerHeight();
  //     if (elementHeight > maxHeight) {
  //       maxHeight = elementHeight;
  //     }
  //   });

  //   $(elements).css('height', maxHeight + 'px');
  // }

  //   setEqualHeight('.services-item h5'); 

  //   $(window).on('resize', function () {
  //     setEqualHeight('.services-item h5');
  //   });

});



  
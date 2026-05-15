(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Modal Video
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    })


    // Project and Testimonial carousel
    $(".project-carousel, .testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
			0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });

    // Lead forms to Google Sheet via Google Apps Script
    const GOOGLE_SHEET_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbx-Qbde2BB2WACbXqZytIvd3FB1kZaE09Doz33QqyL1mEYQvlodmo2Y1pmpc95EsAscQQ/exec';

    const initLeadForms = () => {
        const forms = document.querySelectorAll('form[data-google-sheet-form]');

        forms.forEach((form) => {
            form.addEventListener('submit', async (event) => {
                event.preventDefault();

                if (!GOOGLE_SHEET_WEB_APP_URL || GOOGLE_SHEET_WEB_APP_URL.includes('PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE')) {
                    alert('Please paste your Google Apps Script Web App URL in js/main.js first.');
                    return;
                }

                const submitButton = form.querySelector('[type="submit"]');
                const originalButtonText = submitButton ? submitButton.textContent : '';
                const formData = new FormData(form);

                formData.append('source', form.dataset.formSource || window.location.pathname.split('/').pop() || 'index.html');
                formData.append('pageUrl', window.location.href);
                formData.append('submittedAt', new Date().toISOString());

                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.textContent = 'Sending...';
                }

                try {
                    await fetch(GOOGLE_SHEET_WEB_APP_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        body: formData
                    });

                    form.reset();
                    alert('Thank you! Your details have been sent successfully.');
                } catch (error) {
                    alert('Form could not be sent right now. Please try again or call us directly.');
                } finally {
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.textContent = originalButtonText;
                    }
                }
            });
        });
    };

    initLeadForms();
    
})(jQuery);

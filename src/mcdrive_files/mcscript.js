/* mcDonalds scripts */
/*global TweenLite*/
/*global TweenMax*/
/*global TimelineLite*/
/*global Linear*/
/**@namespace $.jScrollPane*/



$(function () {
    $(window).resize(function() {
        var wheight = $(window).height();
        $('.owl-item').children('.item').css('height',  wheight);
    });


    /* page elements */
    var w = $(window),
        d = $(document),
        b = $('body'),
        logoLarge = $('#mc-menu-logo-large'),
        topMenuHolder = $('#mc-top-menu-holder'),
        topMenuBlocks = $('.mc-menu-top-section', topMenuHolder),
        filterGrid = $('#mc-filter-grid-wrapper'),
        menuProductsHeaders = $('.mc-products-row-holder'),
        menuFilterLinks = $('.mc-menu-filter-link'),
        productsHeaderDynamic = $('#mc-products-header-dynamic'),
        draggableProducts = $('.mc-draggable'),
        droppableSalver = $('#mc-products-chosen-salver-holder'),
        salverRequestImageHolder = ge('mc-salver-request-image-holder'),
        productClearAllLink = $('#mc-products-chosendata-clear-link'),
        chosenList = $('#mc-products-chosenlist-data'),
        chosenDataListScrollHolder = $('#mc-chosenData-scroll-holder'),
        footer = $('#footer'),
        footerCollapsedPart = $('#mc-footer-collapsed-part'),
        productinfoPopupHolder = ge('mc-products-popup-holder'),
    /* restaurants page */
        restaurantsMapCanvas = ge('mc-restaurants-map-canvas'),
        restaurantPopupHolder = ge('mc-restaurant-popup-holder'),
        restaurantMiddleColumn = $('#mc-restaurant-middle-column'),
        restaurantRouteModeHolder = $('#mc-restaurants-right-col-route-mode-holder'),
        restaurantRoteStepsHolder = ge('mc-restaurant-route-steps-holder'),
        restaurantRouteName = ge('mc-restaurants-right-col-name'),
        restaurantRouteAddress = ge('mc-restaurants-right-col-address'),
    /* main page and society pages slider */
        owlSliderHolder = $('#mc-owl-slider-holder'),
        owlSlider = $('#mc-owl-slider'),
        mainpageSliderHolder = $('#mc-main-fullpage-slider'),
        mainpageSlider = owlSlider,
        mainpageOuterWrapper = $('#mc-main-outer-wrapper'),
        birthdaysRestaurantsList = $('#mc-happy-birtdays-choose-list'),
        happyBirthdaysActionLink = ge('mc-happy-birthdays-choose-action'),
    /* balanced diet */
        balancedDietDetailedList = $('#mc-balanced-diet-detailed-info-list'),
    /* happy meal */
        happyMealPopupWrapper = ge('mc-children-happymeal-popup-wrapper'),
        happyMealPopupContent = ge('mc-children-happymeal-popup-huge-content'),
        happyMealToysWrapper = $('#mc-children-happymeal-toys-wrapper'),
        happyMealPopup = ge('mc-children-popup-huge'),
        scrollTopLink = $('#mc-scroll-top-link'),
        productsInfo = {},
    /* autofill form elements */
        fillFormVk = $('#mc-fill-form-vk'),
        fillFormFb = $('#mc-fill-form-fb'),
        contactsBlocksHolder = $('#mc-contacts-blocks'),
        videoHolder = $('#mc-advertisement-video-holder'),
        audioHolder = $('#mc-audio-holder'),
    /* order birthday */
        calendar = $('#mc-calendar');

    /*проверка языковой версии сайта*/
    var url = window.location.href;
    //console.log(url);
    var lang = url.indexOf("/by/");
    // console.log(lang);


    /* scroll page a little bit on mobile devices */
    if (topMenuHolder.length && (w.width() < 771)) {
        w.scrollTo(500, 700);
    }

    /* custom selects */
    $('select.mc-custom-select').selectize({
  render: {
 option: function(data) {
     if (data.code) {
         return '<div class="option" data-code="' + data.code +'">' + data.text +'</div>'
     }
     else {
         return '<div class="option">' + data.text +'</div>'
     }
 }
  }
});

    // process tab links
    d.on('click', '.tab-link', function (e) {
        e.preventDefault();
        var self = $(this),
            tabGroup = self.data('group'),
            tabGroupSelector = tabGroup ? '[data-group="' + tabGroup + '"]' : '',
            tabs = $('.tab' + tabGroupSelector),
            tabLinks = $('.tab-link' + tabGroupSelector),
            targetTab = $('#' + self.data('tab')),
            topValue;
        tabs.removeClass('active').hide();
        targetTab.addClass('active').show();
        tabLinks.removeClass('active');
        self.addClass('active');
        if (targetTab.data('center') != null) {
            topValue = (w.scrollTop() - targetTab.parent().offset().top) + (w.outerHeight() - targetTab.outerHeight()) / 2;
            topValue = topValue < 0 ? 0 : topValue;
            targetTab.css({top: topValue + 'px'});
        }
        $(window).trigger('tab-clicked');
    });

    // apply custom scroll
    $('.custom-scroll').mCustomScrollbar({
        scrollbarPosition: 'outside',
        autoDraggerLength: false,
        autoHideScrollbar: true,
        autoExpandScrollbar: false,
        scrollButtons: {
            enable: false
        },
        contentTouchScroll: 15,
        theme: 'minimal-dark'
    });

    if (lang == -1) /*если русская или английская версия*/

    {
        var langEn = url.indexOf("/en/");
        //console.log(langEn);
        if (langEn == -1) {
            //console.log(" рус ");
            if (calendar.length) {
                var restaurantId = $('#mc-restaurant-id').val(),
                    validOrderTimes = ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00'],
                    validOrderTimesLen = validOrderTimes.length;
                calendar.fullCalendar({
                    firstDay: 1,
                    header: {
                        left: 'prev',
                        center: 'title',
                        right: 'next'
                    },
                    weekMode: 'liquid',
                    aspectRatio: 2.4,
                    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                    dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
                    dayNamesShort: ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
                    buttonText: {
                        prev: '<span class="glyphicon glyphicon-chevron-left"></span>',
                        next: '<span class="glyphicon glyphicon-chevron-right"></span>'
                    },
                    events: {
                        url: '/requests.js',
                        type: 'GET',
                        data: {
                            topic: 'calendar',
                            restaurant: restaurantId
                        },
                        cache: true,
                        success: function (r) {
                            var eventsData, i, iLen, dateInfo;
    
                            if (r.response) {
                            
                                  ;
                                   
                                eventsData = JSON.parse(r.response);
                                //log(eventsData, 'dir');
                                //console.log(123)
                                if (Object.prototype.toString.call(eventsData).slice(8, -1) === 'Array') {
                                    for (i = 0, iLen = eventsData.length; i < iLen; i += 1) {
                                        dateInfo = eventsData[i];
                                        
                                        /* process only unavailable  days */
                                        if (dateInfo['dateClass']) {
                                            $('td[data-date="' + dateInfo['orderDate'] + '"]').addClass(dateInfo['dateClass']);
                                        }
                                    }
                                }
                            }
                        },
                        error: function (e) {
                            log(e, 'warn');
                        }
                    }
                });

                $.datepicker.regional['ru'] = {
                    closeText: 'Закрыть',
                    prevText: '&#x3c;Пред',
                    nextText: 'След&#x3e;',
                    currentText: 'Сегодня',
                    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                    monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
                        'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
                    dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
                    dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
                    dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                    weekHeader: 'Не',
                    dateFormat: 'dd.mm.yy',
                    firstDay: 1,
                    isRTL: false,
                    showMonthAfterYear: false,
                    yearSuffix: ''
                };

                $.datepicker.setDefaults($.datepicker.regional['ru']);

            }
        } else {
            //console.log(" англ ");
            /*англйская*/
            if (calendar.length) {
                var restaurantId = $('#mc-restaurant-id').val(),
                    validOrderTimes = ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00'],
                    validOrderTimesLen = validOrderTimes.length;
                calendar.fullCalendar({
                    firstDay: 1,
                    header: {
                        left: 'prev',
                        center: 'title',
                        right: 'next'
                    },
                    weekMode: 'liquid',
                    aspectRatio: 2.4,
                    monthNames: ['January', 'Fabruary', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'],
                    dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
                    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    buttonText: {
                        prev: '<span class="glyphicon glyphicon-chevron-left"></span>',
                        next: '<span class="glyphicon glyphicon-chevron-right"></span>'
                    },
                    events: {
                        url: '/requests.js',
                        type: 'GET',
                        data: {
                            topic: 'calendar',
                            restaurant: restaurantId
                        },
                        cache: true,
                        success: function (r) {
                            var eventsData, i, iLen, dateInfo;
                            if (r.response) {
                                eventsData = JSON.parse(r.response);
                                //log(eventsData, 'dir');
                                if (Object.prototype.toString.call(eventsData).slice(8, -1) === 'Array') {
                                    for (i = 0, iLen = eventsData.length; i < iLen; i += 1) {
                                        dateInfo = eventsData[i];
                                        /* process only unavailable  days */
                                        if (dateInfo['dateClass']) {
                                            $('td[data-date="' + dateInfo['orderDate'] + '"]').addClass(dateInfo['dateClass']);
                                        }
                                    }
                                }
                            }
                        },
                        error: function (e) {
                            log(e, 'warn');
                        }
                    }
                });

                $.datepicker.regional['ru'] = {
                    closeText: 'Закрыть',
                    prevText: '&#x3c;Пред',
                    nextText: 'След&#x3e;',
                    currentText: 'Сегодня',
                    monthNames: ['January', 'Fabruary', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'],
                    monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
                        'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
                    dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
                    dayNamesShort: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
                    dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    weekHeader: 'Не',
                    dateFormat: 'dd.mm.yy',
                    firstDay: 1,
                    isRTL: false,
                    showMonthAfterYear: false,
                    yearSuffix: ''
                };

                $.datepicker.setDefaults($.datepicker.regional['ru']);

            }
        }
    } else { /*если бел версия*/

        if (calendar.length) {
            var restaurantId = $('#mc-restaurant-id').val(),
                validOrderTimes = ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00'],
                validOrderTimesLen = validOrderTimes.length;
            calendar.fullCalendar({
                firstDay: 1,
                header: {
                    left: 'prev',
                    center: 'title',
                    right: 'next'
                },
                weekMode: 'liquid',
                aspectRatio: 2.4,
                monthNames: ['Студзень', 'Люты', 'Сакавік', 'Красавік', 'Май', 'Чэрвень', 'Ліпень', 'Жнівень', 'Верасень', 'Кастрычнік', 'Лістапад', 'Снежань'],
                dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
                dayNamesShort: ['Нядз', 'Пн', 'Аўт', 'Сер', 'Чц', 'Пт', 'Сб'],
                buttonText: {
                    prev: '<span class="glyphicon glyphicon-chevron-left"></span>',
                    next: '<span class="glyphicon glyphicon-chevron-right"></span>'
                },
                events: {
                    url: '/requests.js',
                    type: 'GET',
                    data: {
                        topic: 'calendar',
                        restaurant: restaurantId
                    },
                    cache: true,
                    success: function (r) {
                        var eventsData, i, iLen, dateInfo;
                        if (r.response) {
                            eventsData = JSON.parse(r.response);
                            //log(eventsData, 'dir');
                            if (Object.prototype.toString.call(eventsData).slice(8, -1) === 'Array') {
                                for (i = 0, iLen = eventsData.length; i < iLen; i += 1) {
                                    dateInfo = eventsData[i];
                                    /* process only unavailable  days */
                                    if (dateInfo['dateClass']) {
                                        $('td[data-date="' + dateInfo['orderDate'] + '"]').addClass(dateInfo['dateClass']);
                                    }
                                }
                            }
                        }
                    },
                    error: function (e) {
                        log(e, 'warn');
                    }
                }
            });

            $.datepicker.regional['ru'] = {
                closeText: 'Закрыть',
                prevText: '&#x3c;Пред',
                nextText: 'След&#x3e;',
                currentText: 'Сегодня',
                monthNames: ['Студзень', 'Люты', 'Сакавік', 'Красавік', 'Май', 'Чэрвень',
                    'Ліпень', 'Жнівень', 'Верасень', 'Кастрычнік', 'Лістапад', 'Снежань'],
                monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
                    'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
                dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
                dayNamesShort: ['нядз', 'пнд', 'аўт', 'сер', 'чтв', 'птн', 'сбт'],
                dayNamesMin: ['Нядз', 'Пн', 'Вт', 'Сер', 'Чц', 'Пт', 'Сбт'],
                weekHeader: 'Не',
                dateFormat: 'dd.mm.yy',
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: false,
                yearSuffix: ''
            };

            $.datepicker.setDefaults($.datepicker.regional['ru']);

        }
    }

    var orderDatepicker = $('#mc-datepicker'),
        orderTimeSelect = $('#mc-order-birthday-select').selectize(),
        orderTimeSelectSelectize = orderTimeSelect.length && orderTimeSelect[0].selectize;
    orderDatepicker.datepicker({
        onSelect: function (date, instance) {
            var i = 0, orderTimeOptions, oLen;
            $(this).trigger('change');
            $.ajax({
                url: '/requests.js',
                method: 'GET',
                dataType: 'json',
                data: {
                    topic: 'checkHours',
                    restaurant: restaurantId,
                    selectedDate: date
                },
                success: function (r) {
                    orderTimeSelectSelectize.clearOptions();
                    for (; i < validOrderTimesLen; i += 1) {
                        orderTimeSelectSelectize.addOption({
                            id: i,
                            text: validOrderTimes[i],
                            value: validOrderTimes[i]
                        });
                    }
                    if (r.response && Object.prototype.toString.call(r.response).slice(8, -1) === 'Array') {
                        orderTimeOptions = r.response;
                        i = 0;
                        if (orderTimeOptions.length) {
                            for (oLen = orderTimeOptions.length; i < oLen; i += 1) {
                                orderTimeSelectSelectize.removeOption(orderTimeOptions[i]);
                            }
                        }
                        orderTimeSelectSelectize.refreshOptions(true);
                    }
                },
                error: function (e) {
                    log(e);
                }
            });
        }
    });
    /* disable clicks on inactive links */
    $('a.inactive').click(function (e) {
        e.preventDefault();
    });

    scrollTopLink.click(function (e) {
        e.preventDefault();
        d.scrollTo(0, 600);
    });

    /* flowplayer */
    /**@namespace $.fn.flowplayer*/
    if (videoHolder.length) {
        $("#mc-advertisement-video-holder").flowplayer({
            swf: '/assets/mcdonalds/js/flowplayer.swf'
        });
    }

    /* jPlayer */
    if (audioHolder.length) {
        var audioContainers = $('.mc-audio-player', audioHolder);
        audioContainers.each(function () {
            var self, mediaData, audioFormat, audioFile, audioContainer, audioId;
            self = $(this);
            mediaData = {};
            audioFormat = self.attr('data-format');
            audioFile = self.attr('data-file');
            if (audioFormat && audioFile) {
                mediaData[audioFormat] = document.location.origin + '/' + audioFile;
            }
            audioContainer = self.attr('data-container');
            audioId = self.attr('data-id');

            self.jPlayer({
                ready: function () {
                    self.jPlayer("setMedia", mediaData);
                },
                swfPath: '',
                solution: 'html, flash',
                supplied: audioFormat,
                preload: 'metadata',
                volume: 0.8,
                muted: false,
                backgroundColor: '#000000',
                cssSelectorAncestor: '#' + audioContainer + audioId,
                cssSelector: {
                    play: '.jp-play',
                    pause: '.jp-pause',
                    stop: '.jp-stop',
                    seekBar: '.jp-seek-bar',
                    playBar: '.jp-play-bar',
                    mute: '.jp-mute',
                    unmute: '.jp-unmute',
                    volumeBar: '.jp-volume-bar',
                    volumeBarValue: '.jp-volume-bar-value',
                    volumeMax: '.jp-volume-max',
                    playbackRateBar: '.jp-playback-rate-bar',
                    playbackRateBarValue: '.jp-playback-rate-bar-value',
                    currentTime: '.jp-current-time',
                    duration: '.jp-duration',
                    noSolution: '.jp-no-solution'
                },
                errorAlerts: false,
                warningAlerts: false
            });
        });
    }

    /* store default values in element's data */
    $('input.storable, textarea').each(function () {
        var self = $(this),
            type = self.attr('type'),
            defaultValue = self.val();
        if (type !== 'submit' && type !== 'button') {
            self.data('defaultValue', defaultValue);
            self.focus(function () {
                if (self.val() === defaultValue) {
                    self.val('');
                }
            });
            self.blur(function () {
                if (self.val() === '') {
                    self.val(defaultValue);
                }
            });
        }
    });

    var closestOrderDate = (function () {
        var _d = new Date(new Date().getTime() + 4*24*60*60*1000),
            out = [], d, m;
        d = _d.getDate();
        m = _d.getMonth() + 1;
        out.push(d.toString().length == 1 ? '0' + d : d);
        out.push(m.toString().length == 1 ? '0' + m : m);
        out.push(_d.getFullYear());
        return out.join('.');
    }());
    /*перевод валидации формы*/

    if (lang == -1)
    {
        var langEn = url.indexOf("/en/");
        //console.log(langEn);
        if (langEn == -1) {
            //console.log(" рус ");
            $('#mc-form, #mc-newsletter-form').validate({
                onKeyup: true,
                onChange: true,
                onBlur: true,
                eachInvalidField: function () {
                    $(this).addClass('mc-error');
                },
                eachValidField: function () {
                    $(this).removeClass('mc-error');
                },
                invalid: function () {
                    $('#mc-form-global-error').html('<div class="mc-form-error-message">Пожалуйста, проверьте правильность заполнения выделенных полей.</div>');
                },
                valid: function () {
                    $('.error').removeClass('mc-error');
                    $('#mc-form-global-error').html('');
                    $('#mc-response-message').html('Пожалуйста, подождите. Ваше сообщение отправляется.');
                },
                description: {
                    wrongValue: {
                        required: '<div class="mc-form-error-message">Пожалуйста, заполните это поле.</div>',
                        conditional: '<div class="mc-form-error-message">Пожалуйста, заполните это поле.</div>',
                        pattern: '<div class="mc-form-error-message">Пожалуйста, заполните это поле.</div>'
                    },
                    wrongDay: {
                        required: '<div class="mc-form-error-message">Пожалуйста, укажите день вашего рождения.</div>',
                        conditional: '<div class="mc-form-error-message">Пожалуйста, укажите день вашего рождения.</div>'
                    },
                    wrongMonth: {
                        required: '<div class="mc-form-error-message">Пожалуйста, укажите месяц вашего рождения.</div>',
                        conditional: '<div class="mc-form-error-message">Пожалуйста, укажите месяц вашего рождения.</div>'
                    },
                    wrongYear: {
                        required: '<div class="mc-form-error-message">Пожалуйста, укажите год вашего рождения.</div>',
                        conditional: '<div class="mc-form-error-message">Пожалуйста, укажите год вашего рождения.</div>'
                    },
                    wrongStartDay: {
                        required: '<div class="mc-form-error-message">Пожалуйста, укажите число.</div>',
                        conditional: '<div class="mc-form-error-message">Пожалуйста, укажите число.</div>'
                    },
                    wrongStartMonth: {
                        required: '<div class="mc-form-error-message">Пожалуйста, укажите месяц.</div>',
                        conditional: '<div class="mc-form-error-message">Пожалуйста, укажите месяц.</div>'
                    },
                    wrongStartYear: {
                        required: '<div class="mc-form-error-message">Пожалуйста, укажите год.</div>',
                        conditional: '<div class="mc-form-error-message">Пожалуйста, укажите год.</div>'
                    },
                    wrongEmail: {
                        required: '<div class="mc-form-error-message">Пожалуйста, укажите свой электронный адрес.</div>',
                        pattern: '<div class="mc-form-error-message">Пожалуйста, укажите свой электронный адрес.</div>',
                        conditional: '<div class="mc-form-error-message">Пожалуйста, укажите свой электронный адрес.</div>'
                    },
                    wrongWorkTime: {
                        required: '<div class="mc-form-error-message">Часы работ должны быть указаны в пределе от 0 до 24 включительно.</div>',
                        pattern: '<div class="mc-form-error-message">Часы работ должны быть указаны в пределе от 0 до 24 включительно.</div>',
                        conditional: '<div class="mc-form-error-message">Часы работ должны быть указаны в пределе от 0 до 24 включительно.</div>'
                    },
                    tooLongAbout: {
                        required: '<div class="mc-form-error-message">Пожалуйста, сообщите о себе кратко.</div>',
                        pattern: '<div class="mc-form-error-message">Пожалуйста, сообщите о себе кратко.</div>',
                        conditional: '<div class="mc-form-error-message">Пожалуйста, сообщите о себе кратко.</div>'
                    },
                    futureDate: {
                        required: '<div class="mc-form-error-message">Ближайшая возможная дата - ' + closestOrderDate + '</div>',
                        pattern: '<div class="mc-form-error-message">Ближайшая возможная дата - ' + closestOrderDate + '</div>',
                        conditional: '<div class="mc-form-error-message">Ближайшая возможная дата - ' + closestOrderDate + '</div>'
                    }
                }
            });
        }
        else {
            //console.log(" англ");
            $('#mc-form, #mc-newsletter-form').validate({
                onKeyup: true,
                onChange: true,
                onBlur: true,
                eachInvalidField: function () {
                    $(this).addClass('mc-error');
                },
                eachValidField: function () {
                    $(this).removeClass('mc-error');
                },
                invalid: function () {
                    $('#mc-form-global-error').html('<div class="mc-form-error-message">Пожалуйста, проверьте правильность заполнения выделенных полей.</div>');
                },
                valid: function () {
                    $('.error').removeClass('mc-error');
                    $('#mc-form-global-error').html('');
                    $('#mc-response-message').html('Пожалуйста, подождите. Ваше сообщение отправляется.');
                },
                description: {
                    wrongValue: {
                        required: '<div class="mc-form-error-message">Fill in the blank, please.</div>',
                        conditional: '<div class="mc-form-error-message">Fill in the blank, please.</div>',
                        pattern: '<div class="mc-form-error-message">Fill in the blank, please.</div>'
                    },
                    wrongDay: {
                        required: '<div class="mc-form-error-message">Пожалуйста, укажите день вашего рождения.</div>',
                        conditional: '<div class="mc-form-error-message">Пожалуйста, укажите день вашего рождения.</div>'
                    },
                    wrongMonth: {
                        required: '<div class="mc-form-error-message">Пожалуйста, укажите месяц вашего рождения.</div>',
                        conditional: '<div class="mc-form-error-message">Пожалуйста, укажите месяц вашего рождения.</div>'
                    },
                    wrongYear: {
                        required: '<div class="mc-form-error-message">Пожалуйста, укажите год вашего рождения.</div>',
                        conditional: '<div class="mc-form-error-message">Пожалуйста, укажите год вашего рождения.</div>'
                    },
                    wrongStartDay: {
                        required: '<div class="mc-form-error-message">Пожалуйста, укажите число.</div>',
                        conditional: '<div class="mc-form-error-message">Пожалуйста, укажите число.</div>'
                    },
                    wrongStartMonth: {
                        required: '<div class="mc-form-error-message">Пожалуйста, укажите месяц.</div>',
                        conditional: '<div class="mc-form-error-message">Пожалуйста, укажите месяц.</div>'
                    },
                    wrongStartYear: {
                        required: '<div class="mc-form-error-message">Пожалуйста, укажите год.</div>',
                        conditional: '<div class="mc-form-error-message">Пожалуйста, укажите год.</div>'
                    },
                    wrongEmail: {
                        required: '<div class="mc-form-error-message">Provide your e-mail, please.</div>',
                        pattern: '<div class="mc-form-error-message">Provide your e-mail, please.</div>',
                        conditional: '<div class="mc-form-error-message">Provide your e-mail, please.</div>'
                    },
                    wrongWorkTime: {
                        required: '<div class="mc-form-error-message">Часы работ должны быть указаны в пределе от 0 до 24 включительно.</div>',
                        pattern: '<div class="mc-form-error-message">Часы работ должны быть указаны в пределе от 0 до 24 включительно.</div>',
                        conditional: '<div class="mc-form-error-message">Часы работ должны быть указаны в пределе от 0 до 24 включительно.</div>'
                    },
                    tooLongAbout: {
                        required: '<div class="mc-form-error-message">Пожалуйста, сообщите о себе кратко.</div>',
                        pattern: '<div class="mc-form-error-message">Пожалуйста, сообщите о себе кратко.</div>',
                        conditional: '<div class="mc-form-error-message">Пожалуйста, сообщите о себе кратко.</div>'
                    },
                    futureDate: {
                        required: '<div class="mc-form-error-message">Nearest available date - ' + closestOrderDate + '</div>',
                        pattern: '<div class="mc-form-error-message">Nearest available date - ' + closestOrderDate + '</div>',
                        conditional: '<div class="mc-form-error-message">Nearest available date - ' + closestOrderDate + '</div>'
                    }
                }
            });
        }
    }
    else {

        //console.log("бел");
        $('#mc-form, #mc-newsletter-form').validate({
            onKeyup: true,
            onChange: true,
            onBlur: true,
            eachInvalidField: function () {
                $(this).addClass('mc-error');
            },
            eachValidField: function () {
                $(this).removeClass('mc-error');
            },
            invalid: function () {
                $('#mc-form-global-error').html('<div class="mc-form-error-message">Пожалуйста, проверьте правильность заполнения выделенных полей.</div>');
            },
            valid: function () {
                $('.error').removeClass('mc-error');
                $('#mc-form-global-error').html('');
                $('#mc-response-message').html('Пожалуйста, подождите. Ваше сообщение отправляется.');
            },
            description: {
                wrongValue: {
                    required: '<div class="mc-form-error-message">Калі ласка, запоўніце гэтае поле.</div>',
                    conditional: '<div class="mc-form-error-message">Калі ласка, запоўніце гэтае поле.</div>',
                    pattern: '<div class="mc-form-error-message">Калі ласка, запоўніце гэтае поле.</div>'
                },
                wrongDay: {
                    required: '<div class="mc-form-error-message">Калі ласка, узначце дзень вашага нараджэння.</div>',
                    conditional: '<div class="mc-form-error-message">Калі ласка, узначце дзень вашага нараджэння.</div>'
                },
                wrongMonth: {
                    required: '<div class="mc-form-error-message">Калі ласка, узначце месяц вашага нараджэння.</div>',
                    conditional: '<div class="mc-form-error-message">Калі ласка, узначце месяц вашага нараджэння.</div>'
                },
                wrongYear: {
                    required: '<div class="mc-form-error-message">Калі ласка, узначце год вашага нараджэння.</div>',
                    conditional: '<div class="mc-form-error-message">Калі ласка, узначце год вашага нараджэння.</div>'
                },
                wrongStartDay: {
                    required: '<div class="mc-form-error-message">Пожалуйста, укажите число.</div>',
                    conditional: '<div class="mc-form-error-message">Пожалуйста, укажите число.</div>'
                },
                wrongStartMonth: {
                    required: '<div class="mc-form-error-message">Пожалуйста, укажите месяц.</div>',
                    conditional: '<div class="mc-form-error-message">Пожалуйста, укажите месяц.</div>'
                },
                wrongStartYear: {
                    required: '<div class="mc-form-error-message">Пожалуйста, укажите год.</div>',
                    conditional: '<div class="mc-form-error-message">Пожалуйста, укажите год.</div>'
                },
                wrongEmail: {
                    required: '<div class="mc-form-error-message">Калі ласка, укажыце свой электронны адрас</div>',
                    pattern: '<div class="mc-form-error-message">Калі ласка, укажыце свой электронны адрас</div>',
                    conditional: '<div class="mc-form-error-message">Калі ласка, укажыце свой электронны адрас</div>'
                },
                wrongWorkTime: {
                    required: '<div class="mc-form-error-message">Часы работ должны быть указаны в пределе от 0 до 24 включительно.</div>',
                    pattern: '<div class="mc-form-error-message">Часы работ должны быть указаны в пределе от 0 до 24 включительно.</div>',
                    conditional: '<div class="mc-form-error-message">Часы работ должны быть указаны в пределе от 0 до 24 включительно.</div>'
                },
                tooLongAbout: {
                    required: '<div class="mc-form-error-message">Пожалуйста, сообщите о себе кратко.</div>',
                    pattern: '<div class="mc-form-error-message">Пожалуйста, сообщите о себе кратко.</div>',
                    conditional: '<div class="mc-form-error-message">Пожалуйста, сообщите о себе кратко.</div>'
                },
                futureDate: {
                    required: '<div class="mc-form-error-message">Найбліжэйшая магчымая дата - ' + closestOrderDate + '</div>',
                    pattern: '<div class="mc-form-error-message">Найбліжэйшая магчымая дата - ' + closestOrderDate + '</div>',
                    conditional: '<div class="mc-form-error-message">Найбліжэйшая магчымая дата - ' + closestOrderDate + '</div>'
                }
            }
        });
    }
    $.validateExtend({
        defaultOrEmpty: {
            conditional: function(value) {
                var self = $(this);
                return self.val().length && (self.val() != self.data('defaultValue')) ;
            }
        },
        futureDate: {
            /* useful with jquery datepicker */
            conditional: function () {
                var self, closestDay, selectedDate;
                
                self = $(this);
                closestDay = (new Date().getTime()) + 3*24*60*60*1000;
                selectedDate = self.datepicker('getDate') + '';
                selectedDate = selectedDate && Date.parse(selectedDate);
                
                console.log(selectedDate);
                
                return !!(selectedDate && (selectedDate > closestDay));
            }
        },
        phone: {
            pattern: /^(?:\+)?[\s\d\-]{4,}\d$/,
            conditional: function() {
                var self = $(this);
                return self.val().length && (self.val() != self.data('defaultValue'));
            }
        },
        email: {
            pattern: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
            conditional: function() {
                var self = $(this);
                return (self.val() != self.data('defaultValue'));
            }
        },
        workTime: {
            pattern: /^(?:(\d){1,2})?$/,
            conditional: function(value) {
                return (value.length === 0) || (value >= 0 && value <= 24);
            }
        },
        age: {
            pattern: /^(\d){1,2}$/
        },
        restaurant: {
            conditional: function(value) {
                return (value.length >= 1);
            }
        },
        about: {
            required: false,
            conditional: function(value) {
                return (value.length <= 350);
            }
        }
    });

    //$('#mc-form-phone').inputmask({mask: '9(9999) 999-99-99'});
    //$('.mc-our-team-worktime').inputmask({mask: '99', repeat: 1, greedy: false, placeholder: '', showMaskOnFocus: false, showMaskOnHover: false});

    /* used for switching label classes on radio buttons */
    var groupedLabels = $('label.mc-grouped-lable[data-group]');
    if (groupedLabels.length) {
        groupedLabels.click(function () {
            var self, groupName, _class;
            self = $(this);
            groupName = self.attr('data-group');
            _class = self.attr('data-class') || 'active';
            $('label.mc-grouped-lable[data-group = ' + groupName + ']').removeClass(_class);
            self.addClass(_class);
        });
    }

    var resetForm = function () {
        $('#mc-form, #mc-newsletter-form')[0].reset();
        $('#mc-response-message').html('');
    };

    var birthdayPage = url.indexOf("order-birthday");
    if (birthdayPage != -1) {
        //console.log('страница ДР');
        $('#mc-form').ajaxForm({
            url: '/requests.js',
            dataType: 'json',
            success: function (r) {
                var responseMessage = $('#mc-response-message'), response;
                log(r, 'dir');
                response = JSON.parse(r.response);
                if (response && response.success) {
                    responseMessage.html('Спасибо! Ваше сообщение успешно отправлено!!');
                    var langBy = url.indexOf("/by/");
                    if (langBy != -1) {
                        window.location.replace("https://mcdonalds.by/by/thank.html");
                    }
                    else {
                        window.location.replace("https://mcdonalds.by/ru/thank.html");
                    }
                } else {
                    responseMessage.html('Произошла непредвиденная ошибка. Попробуйте отправить данные чуть позже.');
                }
            },
            error: function () {
                $('#mc-response-message').html('Произошла непредвиденная ошибка. Попробуйте отправить данные чуть позже.');
                setTimeout(function () {
                    $('#mc-response-message').html('');
                }, 20000);
            }
        });
    }
    else {
        //console.log(' не страница ДР');
        $('#mc-form').ajaxForm({
            url: '/requests.js',
            dataType: 'json',
            success: function (r) {
                var responseMessage = $('#mc-response-message'), response;
                log(r, 'dir');
                response = JSON.parse(r.response);
                if (response && response.success) {
                    responseMessage.html('Спасибо! Ваше сообщение успешно отправлено!');
                    setTimeout(resetForm, 10000);
                } else {
                    responseMessage.html('Произошла непредвиденная ошибка. Попробуйте отправить данные чуть позже.');
                }
            },
            error: function () {
                $('#mc-response-message').html('Произошла непредвиденная ошибка. Попробуйте отправить данные чуть позже.');
                setTimeout(function () {
                    $('#mc-response-message').html('');
                }, 20000);
            }
        });
    }


    const newsletterForm = $('#mc-newsletter-form');
    if (newsletterForm) {

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }
      
      function validate() {
        var $result = $('#mc-response-message');
        var email = $("#email").val();
        $result.text("");
      

        if (validateEmail(email)) {
            
          $result.text("Спасибо! Ваше сообщение успешно отправлено!");
          $result.css("color", "green");
            setTimeout(function() {
                newsletterForm[0].reset();
            $('#mc-response-message').html('');
        }, 10000);
        return true;
        } else {
          $result.text("E-mail введён не верно. Пожалуйста, проверь электронный адрес");
          $result.css("color", "red");
        }
        return false;
      }
      
      newsletterForm.submit(function(e){
          e.preventDefault();
        validate();
        console.log(validate())
        if (validate() === true) {
                e.preventDefault();
                var form_data = $(this).serialize(); 
                $.ajax({
                type: "POST",
                url: "assets/mcdonalds/js/send.php", 
                data: form_data,
                success: function() {
                    newsletterForm.trigger('reset');
                }
            });
        }
    });





    


    
  
  

//         newsletterForm.submit(function(e){
//         e.preventDefault();
//         var form_data = $(this).serialize(); 
//         $.ajax({
//         type: "POST",
//         url: "assets/mcdonalds/js/send.php", 
//         data: form_data,
//         success: function (r) {
            
//             $('#mc-response-message').html('Спасибо! Ваше сообщение успешно отправлено!');
//                 setTimeout(function() {
//                     $('#mc-newsletter-form')[0].reset();
//                     $('#mc-response-message').html('');
//                 }, 10000);
//         },
//         error: function () {
//             $('#mc-response-message').html('Произошла непредвиденная ошибка. Попробуйте отправить данные чуть позже.');
//             setTimeout(function () {
//                 $('#mc-response-message').html('');
//             }, 20000);
//         }
//   }); 
//   });
    }

    /**@namespace window._restaurantsData*/
    var restaurantsFormData = $.extend({}, window._restaurantsData);

    var restaurantsSelect = $('#mc-restaurants-select');

    $('.mc-our-team-checkbox-label').click(function () {
        var self, restaurantKey, restaurants, selectNode, r, rLen, option;
        self = $(this);
        restaurantKey = self.attr('data-restaurantKey');
        if (restaurantsFormData.hasOwnProperty(restaurantKey)) {
            restaurants = restaurantsFormData[restaurantKey].restaurants;
            if (Object.prototype.toString.call(restaurants).slice(8, -1) === 'Array') {
                selectNode = restaurantsSelect[0];
                selectNode.options.length = 0;
                selectNode.selectize.clearOptions();
                for (r = 0, rLen = restaurants.length; r < rLen; r += 1) {
                    option = new Option(restaurants[r]['restaurantAddress'], restaurants[r]['restaurantId'], false, false);
                    selectNode.selectize.addOption(option);
                    r === 0 ? selectNode.selectize.setValue(restaurants[r]['restaurantId']) : false;
                    //selectNode.options.add(option, selectNode.options.length);
                }
                selectNode.selectize.refreshOptions(false);
            }
        }
    });

    /** @namespace window._pageData */
    var pageData = window._pageData || {};
    /**@namespace pageData.pageId*/
    /**@namespace pageData.parentId*/

    /* set active class for menu item */
    if (pageData.pageId != null) {
        var listItem = ge('mc-menu-set-active-' + pageData.pageId);
        if (listItem) {
            listItem.className += ' active';
        }
        var topMenuItem = ge('mc-menu-set-active-' + pageData.parentId);
        if (topMenuItem) {
            topMenuItem.className += ' active';
        }
    }

    /* happy meal page */
    if (happyMealPopupContent && happyMealPopup) {
        var _happyMealData, happyMealData = {};
        /**@namespace window._happyMealData*/
        _happyMealData = window._happyMealData || {};
        $.extend(happyMealData, _happyMealData);

        happyMealToysWrapper.on('click', '.mc-children-happymeal-toy-link', function (e) {
            e.preventDefault();
            var self, toyId, toyData, toyDescription, windowHeight, delta, scrollTop;
            self = this;
            toyId = self.getAttribute('data-id');
            if (toyId != null && happyMealData.hasOwnProperty(toyId)) {
                toyData = happyMealData[toyId];
                toyDescription = toyData.toyDescription || null;
                if (!toyDescription) {
                    return log('Toy\'s description is empty. Pop-up will not be shown.');
                }
                happyMealPopupContent.innerHTML = toyDescription;
                happyMealPopupWrapper.style.display = 'block';
                windowHeight = w.height();
                delta = (windowHeight - happyMealPopup.offsetHeight) / 2;
                scrollTop = w.scrollTop();
                happyMealPopup.style.top = (scrollTop + delta) + 'px';
                if (e.stopPropagation) {
                    e.stopPropagation();
                } else {
                    e.cancelBubble = true;
                }
                //TweenLite.to(happyMealPopupWrapper, 0.4, {css: {autoAlpha: 1}, ease: Linear.easeNone});
            } else {
                log('Cannot retrieve toy\'s data: invalid toy\'s id');
            }
            return false;
        });

        function hideHappyMealPopup () {
            happyMealPopupWrapper.style.display = 'none';
        }

        $(happyMealPopupWrapper).on('click', '#mc-children-happymeal-popup-huge-close', function (e) {
            e.preventDefault();
            hideHappyMealPopup();
            if (e.stopPropagation) {
                e.stopPropagation();
            } else {
                e.cancelBubble = true;
            }
            /*TweenLite.to(happyMealPopupWrapper, 0.4, {css: {autoAlpha: 0}, ease: Linear.easeNone, onComplete: function () {
             happyMealPopupWrapper.style.display = 'none';
             }});*/
        });
        d.click(function () {
            hideHappyMealPopup();
        });

    }

    /* Salver Class */
    var _Salver;

    _Salver = function (options) {
        this.totalPriceHolderMobile = ge(options.totalPriceHolderMobile);
        if (options.totalProductsLoader === true) {
            this.totalCountHolder = options.totalCountHolder;
            this.totalDeclinationHolder = options.totalDeclinationHolder;
            return;
        }
        var salver;
        salver = options.salver;
        if (typeof salver === 'string') salver = ge(salver);
        if (!salver) {
            throw new Error('Salver: cannot find element ' + salver);
        }
        this.salver = salver;
        this.chosenList = ge(options.chosenList);
        this.salverArea = ge(options.salverArea);
        /* output elements */
        this.caloriesTotalHolder = ge(options.caloriesTotalHolder);
        this.jouleTotalHolder = ge(options.jouleTotalHolder);
        this.caloriesPercentHolder = ge(options.caloriesPercentHolder);
        this.joulePercentHolder = ge(options.joulePercentHolder);
        this.proteinTotalHolder = ge(options.proteinTotalHolder);
        this.proteinPercentHolder = ge(options.proteinPercentHolder);
        this.fatTotalHolder = ge(options.fatTotalHolder);
        this.fatPercentHolder = ge(options.fatPercentHolder);
        this.carbohydratesTotalHolder = ge(options.carbohydratesTotalHolder);
        this.carbohydratesPercetHolder = ge(options.carbohydratesPercetHolder);
        this.saltTotalHolder = ge(options.saltTotalHolder);
        this.saltPercentHolder = ge(options.saltPercentHolder);
        this.saturatedFatsHolder = ge(options.saturatedFatsHolder);
        this.saturatedFatsPercentHolder = ge(options.saturatedFatsPercentHolder);
        this.sugarHolder = ge(options.sugarHolder);
        this.sugarPercentHolder = ge(options.sugarPercentHolder);
        this.fiberHolder = ge(options.fiberHolder);
        this.fiberPercentHolder = ge(options.fiberPercentHolder);

        this.totalPriceHolder = ge(options.totalPriceHolder);
        this.totalPriceHolderBYN = ge(options.totalPriceHolderBYN);

        this.totalCountHolder = ge(options.totalCountHolder);
        this.totalDeclinationHolder = ge(options.totalDeclinationHolder);
        this.requestMessage = {
            element: ge(options.requestMessage),
            isVisible: true
        };
        this.imagesOnSalver = 0;
        this.salverAreaClassPrefixes = {9:true, 12: true, 16: true, 20: true, 26: true, 31: true, 36: true, 49: true};
        this.salverAreaImages = {};
        this.chosenProducts = {};
        this.salverClasses = {};
    };

    /* adds product to salver dataObject */
    _Salver.prototype.addProduct = function (productKey, variant) {
        if (arguments.length < 2) {
            return log('_Salver.addProduct: not enough arguments.');
        }
        if (!(productKey && variant)) {
            return log('_Salver.addProduct: productKey or variant arguments are probably invalid');
        }
        var self = this, productData, chosenProducts, variantData, productStorageKey, salverGroup;

        if (productsInfo.hasOwnProperty(productKey)) {
            /* object with chosen products */
            chosenProducts = this.chosenProducts;
            /* product info */
            productData = productsInfo[productKey];
            if (productData && productData.variantNeedsToBeSelected) {
                return false;
            }
            variantData = productData.variants[variant] || {};
            productStorageKey = productKey + '---' + variant;
            salverGroup = productData.salverGroup;
            self.updateSalverClasses({
                salverClass: salverGroup,
                productStorageKey: productStorageKey,
                type: 'add'
            });
            if (chosenProducts.hasOwnProperty(productStorageKey)) {
                /* increase quantity if product already exists */
                chosenProducts[productStorageKey].quantity += 1;
                self.updateParam({
                    type: 'quantityOutput',
                    productStorageKey: productStorageKey,
                    value: chosenProducts[productStorageKey].quantity
                });
            } else {
                /* or add new product */
                chosenProducts[productStorageKey] = {
                    name: productData.name,
                    salverGroup: salverGroup, /* ??? */
                    data: variantData,
                    quantity: 1
                };
                /* add product to list of chosen products */
                self.addToList(productKey, variant);
                self.addImageToSalver(productKey, variant);
            }
            /* generate info-counter of chosen product quantity */
            self.showCounter(productKey, chosenProducts[productStorageKey].quantity);
            /* recalculate elements and GDA data */
            self.recalculate();
        } else {
            return log('_Salver.addProduct: invalid key of product.');
        }
        return false;
    };

    /* creates node with image to show product on salver */
    _Salver.prototype.addImageToSalver = function (productKey, variant) {
        if (arguments.length < 2) {
            return log('_Salver.addImageToSalver: not enough arguments.');
        }
        var self, salverArea, productData, variantData, variantImage, variantImgHolder, variantImgKey, variantImg,
            salverAreaClassPrefixes;
        self = this;
        if (!(productsInfo.hasOwnProperty(productKey))) {
            return log('_Salver.addImageToSalver: invalid product key.');
        }
        salverArea = self.salverArea || null;
        if (!salverArea) {
            return log('_Salver.addImageToSalver: invalid salver area');
        }
        productData = productsInfo[productKey];
        variantData = productData.variants && productData.variants[variant] || null;
        if (!variantData) {
            return log('_Salver.addImageToSalver: invalid product\'s variant data');
        }
        variantImage = variantData.variantImageSalver || variantData.variantImage || null;
        if (!variantImage) {
            return log('_Salver.addImageToSalver: invalid product\'s variant image. Skipping image creation.');
        }
        variantImgHolder = document.createElement('div');
        variantImgHolder.className = 'mc-variant-salver-image mc-variant-salver-image-' + (variantData.salverWidthClass || 1);
        variantImgKey = 'mc-salver-product-image-' + productKey + '---' + variant;
        variantImgHolder.id = variantImgKey;
        variantImg = new Image();
        variantImg.src = variantImage;
        variantImgHolder.appendChild(variantImg);
        salverArea.appendChild(variantImgHolder);
        self.imagesOnSalver += 1;
        self.salverAreaImages[variantImgKey] = variantImgHolder;
        salverAreaClassPrefixes = self.salverAreaClassPrefixes;
        if (salverAreaClassPrefixes.hasOwnProperty(self.imagesOnSalver.toString())) {
            salverArea.className = 'p' + self.imagesOnSalver;
        }
        return false;
    };

    /* removes node with image from salver */
    _Salver.prototype.removeImageFromSalver = function (productStorageKey) {
        if (!productStorageKey) {
            return log('_Salver.removeImageFromSalver: not enough arguments.');
        }
        var self, salverArea, variantImgKey, salverAreaImages, salverImgElement, salverAreaClassPrefixes;
        self = this;
        salverArea = self.salverArea || null;
        if (!salverArea) {
            return log('_salver.removeImageFromSalver: invalid salver area.');
        }
        variantImgKey = 'mc-salver-product-image-' + productStorageKey;
        salverAreaImages = self.salverAreaImages || {};
        if (salverAreaImages.hasOwnProperty(variantImgKey)) {
            salverImgElement = salverAreaImages[variantImgKey];
            salverImgElement.parentNode.removeChild(salverImgElement);
            self.imagesOnSalver -= 1;
            delete salverAreaImages[variantImgKey];
            salverAreaClassPrefixes = self.salverAreaClassPrefixes;
            if (salverAreaClassPrefixes.hasOwnProperty(self.imagesOnSalver.toString())) {
                salverArea.className = 'p' + self.imagesOnSalver;
            }
        }
        return false;
    };

    /* updates salver classes to hide/show products on salver */
    _Salver.prototype.updateSalverClasses = function (opt) {
        var self, salverClasses, salverClass, type, salver, productStorageKey, chosenProducts, cp,
            productImageData, productImageKey, productImageVariant;
        self = this;
        salverClasses = this.salverClasses;
        salverClass = opt.salverClass || null;
        type = opt.type || null;
        productStorageKey = opt.productStorageKey || null;
        salver = this.salver;
        if (!type) {
            return log('_Salver.updateSalverClasses: type is required.');
        }
        switch (type) {
            case 'add':
                if (!(productStorageKey && salverClass)) {
                    return log('_Salver.updateSalverClasses: not enough arguments. Missing productStorageKey or salverClass.');
                }
                /* don't increment class counter if we just encreasing product counter presented on salver */
                /* attention! _Salver.updateSalverClasses should be called before adding product to chosenProducts object. */
                /* ignore this if-construction when updating classes using "mode":"load". */
                if (salverClasses.hasOwnProperty(salverClass) && (this.chosenProducts.hasOwnProperty(productStorageKey)) && (opt.mode !== 'load')) {
                    return false;
                }
                /* increment class counter if such class has already been presented on salver. */
                if (salverClasses.hasOwnProperty(salverClass)/* && (this.chosenProducts.hasOwnProperty(productStorageKey))*/) {
                    salverClasses[salverClass] += 1;
                } else {
                    salverClasses[salverClass] = 1;
                    $(salver).addClass(salverClass);
                }
                break;
            case 'remove':
                if (!salverClass) {
                    return log('_Salver.updateSalverClasses: not enough arguments. Missing salverClass.');
                }
                if (salverClasses.hasOwnProperty(salverClass)) {
                    if (salverClasses[salverClass] > 1) {
                        salverClasses[salverClass] -= 1;
                    } else {
                        placeText('mc-products-chosen-price-byn', '0 руб.'); // BYN clear
                        delete salverClasses[salverClass];
                        $(salver).removeClass(salverClass);
                    }
                } else {
                    return log('_Salver.updateSalverClasses: there is no ' + salverClass + ' to remove.');
                }
                break;
            case 'load':
                chosenProducts = self.chosenProducts;
                for (cp in chosenProducts) {
                    if (chosenProducts.hasOwnProperty(cp)) {
                        self.updateSalverClasses({
                            type: 'add',
                            productStorageKey: cp,
                            salverClass: chosenProducts[cp].salverGroup,
                            mode: 'load'
                        });
                        productImageData = cp.split('---');
                        productImageKey = productImageData[0];
                        productImageVariant = productImageData[1];
                        self.addImageToSalver(productImageKey, productImageVariant);
                    }
                }
                break;
        }
        return false;
    };

    /* creates list element in chosenProducts list */
    _Salver.prototype.addToList = function (productKey, variant) {

        var chosenProducts, chosenProductData, mainProductData, productStorageKey;
        chosenProducts = this.chosenProducts;

        productStorageKey = productKey + '---' + variant;
        if (!(productStorageKey in chosenProducts)) {
            return log('_Salver.addToList: there is no product key in chosen products.');
        }
        if (!(productKey in productsInfo)) {
            return log('_Salver.addToList: could not retrieve information about product from info data');
        }

        chosenProductData = chosenProducts[productStorageKey];
        mainProductData = productsInfo[productKey];

        /*
         final element structure should be next:

         <li id="mc-list-{productKey}">
         <span class="mc-products-product-chosen-name">{productName}
         <span class="mc-product-variant-name">{productVariantName}</span>
         </span>
         <span class="mc-products-product-chosen-q">
         <span id="productQuantity{productKey}">{productQuantity}</span>
         </span>
         <span class="mc-products-product-controls">
         <a data-action="decrease" data-productKey="{productKey}" href="#">
         <span class="glyphicon glyphicon-minus"></span>
         </a>
         <a data-action="increase" data-productKey="{productKey}" href="#">
         <span class="glyphicon glyphicon-plus"></span>
         </a>
         </span>
         <span class="mc-products-product-controls">
         <a data-productKey="{productKey}" data-action="remove" href="#">
         <span class="glyphicon glyphicon-remove"></span>
         </a>
         </span>
         </li>

         */
        /* product list nodes variables */
        var listHolder, productLiEl, productNameEl, produtVariantName, productVariantNameText, productQuantityHolder, productQuantityEl, productQuantityControlsHolder,
            productDecrease, productDecreaseIcon, productIncrease, productIncreaseIcon,
            productRemoveHolder, productRemove, productRemoveIcon;
        listHolder = this.chosenList;
        if (!listHolder) {
            return log('_Salver.addToList: cannot find chosenList element.');
        }
        /* wrapping li element */
        productLiEl = ce('li');
        productLiEl.id = 'mc-list-' + productStorageKey;
        /* product name */
        productNameEl = ce('span');
        productNameEl.className = 'mc-products-product-chosen-name';
        productNameEl.appendChild(document.createTextNode(mainProductData.name + ' '));
        if (mainProductData['variants'][variant]['variantName']) {
            produtVariantName = ce('span');
            produtVariantName.className = 'mc-product-variant-name';
            productVariantNameText = (mainProductData['variants'][variant]['variantName']).toString().replace(/'/g, '"');
            produtVariantName.appendChild(document.createTextNode('(' + productVariantNameText + ')'));
            productNameEl.appendChild(produtVariantName);
        }
        /* product quantity */
        productQuantityHolder = ce('span');
        productQuantityHolder.className = 'mc-products-product-chosen-q';
        productQuantityEl = ce('span');
        productQuantityEl.id = 'mc-quantity-' + productStorageKey;
        productQuantityEl.appendChild(document.createTextNode(chosenProductData.quantity.toString()));
        /* product quantity controls */
        productQuantityHolder.appendChild(productQuantityEl);
        productQuantityControlsHolder = ce('span');
        productQuantityControlsHolder.className = 'mc-products-product-controls';
        productDecrease = ce('a');
        productDecrease.href = '#';
        productDecrease.setAttribute('data-productKey', productStorageKey);
        productDecrease.setAttribute('data-action', 'decrease');
        productDecreaseIcon = ce('span');
        productDecreaseIcon.className = 'glyphicon glyphicon-minus';
        productDecrease.appendChild(productDecreaseIcon);
        productIncrease = ce('a');
        productIncrease.href = '#';
        productIncrease.setAttribute('data-productKey', productStorageKey);
        productIncrease.setAttribute('data-action', 'increase');
        productIncreaseIcon = ce('span');
        productIncreaseIcon.className = 'glyphicon glyphicon-plus';
        productIncrease.appendChild(productIncreaseIcon);
        /* product remove controls */
        productRemoveHolder = ce('span');
        productRemoveHolder.className = 'mc-products-product-controls';
        productRemove = ce('a');
        productRemove.href = '#';
        productRemove.setAttribute('data-productKey', productStorageKey);
        productRemove.setAttribute('data-action', 'remove');
        productRemoveIcon = ce('span');
        productRemoveIcon.className = 'glyphicon glyphicon-remove';
        productRemove.appendChild(productRemoveIcon);
        productRemoveHolder.appendChild(productRemove);
        productQuantityControlsHolder.appendChild(productDecrease);
        productQuantityControlsHolder.appendChild(productIncrease);
        productLiEl.appendChild(productNameEl);
        productLiEl.appendChild(productQuantityHolder);
        productLiEl.appendChild(productQuantityControlsHolder);
        productLiEl.appendChild(productRemoveHolder);
        /* insert into DOM */
        listHolder.appendChild(productLiEl);
        this.listModified();
        return false;
    };

    /* updates params (like quantity) of chosen product. */
    _Salver.prototype.updateParam = function (opt) {
        var type, self;
        type = opt.type || null;
        if (!(type)) {
            return log('_Salver.updateParam: some of arguments are probably invalid or missing.');
        }
        self = this;
        if (typeof self.update[type] === 'function') {
            self.update[type](opt);
        } else {
            return log('_Salver.updateParam: cannot find chosen update type.');
        }
        return false;
    };

    /* salver update methods */
    _Salver.prototype.update = {
        quantityOutput: function (opt) {
            var outputElement, productStorageKey, value;
            productStorageKey = opt.productStorageKey;
            value = opt.value;
            outputElement = ge('mc-quantity-' + productStorageKey);
            if (outputElement != null) {
                placeText(outputElement, value);
            }
        },
        quantity: function (opt) {
            var chosenProducts, productStorageKey, action, self, product, currentQuantity, salverClass, listElement;
            self = opt.salver;
            chosenProducts = self.chosenProducts;
            productStorageKey = opt.productStorageKey;
            action = opt.action;
            if (chosenProducts.hasOwnProperty(productStorageKey)) {
                product = chosenProducts[productStorageKey];
                currentQuantity = product.quantity;
                switch (action) {
                    case 'increase':
                        product.quantity += 1;
                        break;
                    case 'decrease':
                        if (currentQuantity > 1) {
                            product.quantity -= 1;
                        } else {
                            return false;
                        }
                        break;
                    case 'remove':
                        /* salver classes, added before */
                        /* salver class of current product */
                        salverClass = product.salverGroup;
                        self.updateSalverClasses({
                            salverClass: salverClass,
                            type: 'remove'
                        });
                        delete chosenProducts[productStorageKey];
                        listElement = ge('mc-list-' + productStorageKey);
                        if (listElement != null) {
                            listElement.parentNode.removeChild(listElement);
                            self.listModified();
                        }
                        self.removeImageFromSalver(productStorageKey);
                        break;
                }
                if (action !== 'remove') {
                    self.updateParam({
                        type: 'quantityOutput',
                        value: product.quantity,
                        productStorageKey: productStorageKey
                    });
                }
                self.recalculate();
            } else {
                return log('quantity updating: invalid value of productStorageKey.' + productStorageKey);
            }
            return false;
        },
        listUpdate: function (opt) {
            var salver, chosenProducts, productStorageKey, keyVariantData, productKey, productVariant;
            salver = opt.salver || null;
            if (!salver) {
                return log('_Salver.listUpdate: instance of _salver is required');
            }
            chosenProducts = salver.chosenProducts;
            for (productStorageKey in chosenProducts) {
                if (chosenProducts.hasOwnProperty(productStorageKey)) {
                    if (~productStorageKey.indexOf('---')) {
                        keyVariantData = productStorageKey.toString().split('---');
                        productKey = keyVariantData[0];
                        productVariant = keyVariantData[1];
                        salver.addToList(productKey, productVariant);
                    } else {
                        log('_Salver.listUpdate: an invalid productStorageKey format was found. Missing "---" delimiter.');
                    }
                }
            }
            return false;
        }
    };


    /* recalculates elements and GDA of chosen products */
    _Salver.prototype.recalculate = function () {
        var chosenProductsCounter = 0,
            jouleTotal, joulePercent,
            caloriesTotal, caloriesPercent,
            proteinTotal, proteinPercent,
            fatTotal, fatPercent,
            carbohydratesTotal, carbohydratesPercent,
            saltTotal, saltPercent,
            saturatedFatsTotal, saturatedFatsPercent,
            sugarTotal, sugarPercent,
            fiberTotal, fiberPercent,
            chosenProducts, product, cp, productData, productDataElements, productQuantity,
            totalPrice = 0, requestMessageData, formattedPrice;

        caloriesTotal = proteinTotal = fatTotal = carbohydratesTotal = saltTotal = saturatedFatsTotal = sugarTotal = fiberTotal = jouleTotal =  0;
        caloriesPercent = proteinPercent = fatPercent = carbohydratesPercent = saltPercent = saturatedFatsPercent = sugarPercent = fiberPercent = joulePercent = 0;

        
        chosenProducts = this.chosenProducts || {};
        for (cp in chosenProducts) {
            if (chosenProducts.hasOwnProperty(cp)) {
                product = chosenProducts[cp];
                productData = product.data && product.data || {};
                productDataElements = product.data && product.data.elements || {};
                productQuantity = product.quantity || 0;
                chosenProductsCounter += productQuantity;

                /* total in products */
                caloriesTotal += (productDataElements.calories.value || 0) * productQuantity;
                jouleTotal += (productDataElements.joule.value || 0) * productQuantity;
                proteinTotal += (productDataElements.protein.value || 0) * productQuantity;
                fatTotal += (productDataElements.fat.value || 0) * productQuantity;
                carbohydratesTotal += (productDataElements.carbohydrates.value || 0) * productQuantity;
                saltTotal += (productDataElements.salt.value || 0) * productQuantity;
                saturatedFatsTotal += (productDataElements.saturatedFats.value || 0) * productQuantity;
                sugarTotal += (productDataElements.sugar.value || 0) * productQuantity;
                fiberTotal += (productDataElements.fiber.value || 0) * productQuantity;

                /* percents of day norm */
                caloriesPercent += (productDataElements.calories.gda || 0) * productQuantity;
                joulePercent += (productDataElements.joule.gda || 0) * productQuantity;
                proteinPercent += (productDataElements.protein.gda || 0) * productQuantity;
                fatPercent += (productDataElements.fat.gda || 0) * productQuantity;
                carbohydratesPercent += (productDataElements.carbohydrates.gda || 0) * productQuantity;
                saltPercent += (productDataElements.salt.gda || 0) * productQuantity;
                saturatedFatsPercent += (productDataElements.saturatedFats.gda || 0) * productQuantity;
                sugarPercent += (productDataElements.sugar.gda || 0) * productQuantity;
                fiberPercent += (productDataElements.fiber.gda || 0) * productQuantity;

                //console.log(productData.variantPrice);
                /* total price */
                //totalPrice += parseInt(productData.variantPrice) * productQuantity;
                totalPrice += productData.variantPrice * productQuantity;
            }
        }
        /* object with request element and it's status of visibility */
        requestMessageData = this.requestMessage;
        if (chosenProductsCounter > 0) {
            if (requestMessageData.isVisible === true) {
                requestMessageData.element.style.display = 'none';
                salverRequestImageHolder.style.display = 'none';
                requestMessageData.isVisible = false;
                productClearAllLink.css({display: 'inline-block'});
                chosenDataListScrollHolder.data('jsp') && chosenDataListScrollHolder.data('jsp').destroy();
            }
        } else {
            requestMessageData.element.style.display = 'block';
            salverRequestImageHolder.style.display = 'block';
            requestMessageData.isVisible = true;
            productClearAllLink.hide();
            //$('#mc-chosenData-scroll-holder').jScrollPane({
            //	verticalDragMinHeight: 15,
            //	verticalDragMaxHeight: 15
            //});
        }
        /* fill output elements with values */
        /* total products */
        placeText(this.totalCountHolder, chosenProductsCounter);
        if (lang == -1){
            var langEn = url.indexOf("/en/");
            if (langEn == -1) {
                //console.log(" рус");
                placeText(this.totalDeclinationHolder, declOfNum(chosenProductsCounter, ['продукт', 'продукта', 'продуктов']));
            }
            else {
                //console.log(" англ www");
                placeText(this.totalDeclinationHolder, declOfNum(chosenProductsCounter, ['item', 'items', 'items']));
            }
        }else {
            //console.log(" бел");
            placeText(this.totalDeclinationHolder, declOfNum(chosenProductsCounter, ['прадукт', 'прадукты', 'прадукт(ы)']));
        }
        /* elements */
        placeText(this.caloriesTotalHolder, caloriesTotal.toFixed(0));
        placeText(this.jouleTotalHolder, jouleTotal.toFixed(0));
        placeText(this.proteinTotalHolder, proteinTotal.toFixed(0));
        placeText(this.fatTotalHolder, fatTotal.toFixed(0));
        placeText(this.carbohydratesTotalHolder, carbohydratesTotal.toFixed(0));
        placeText(this.saltTotalHolder, saltTotal.toFixed(1));
        placeText(this.saturatedFatsHolder, saltTotal.toFixed(0));
        placeText(this.sugarHolder, sugarTotal.toFixed(0));
        placeText(this.fiberHolder, fiberTotal.toFixed(0));

        /* percents */
        placeText(this.caloriesPercentHolder, caloriesPercent.toFixed(0));
        placeText(this.joulePercentHolder, joulePercent.toFixed(0));
        placeText(this.proteinPercentHolder, proteinPercent.toFixed(0));
        placeText(this.fatPercentHolder, fatPercent.toFixed(0));
        placeText(this.carbohydratesPercetHolder, carbohydratesPercent.toFixed(0));
        placeText(this.saltPercentHolder, saltPercent.toFixed(0));
        placeText(this.saturatedFatsPercentHolder, saturatedFatsPercent.toFixed(0));
        placeText(this.sugarPercentHolder, sugarPercent.toFixed(0));
        placeText(this.fiberPercentHolder, fiberPercent.toFixed(0));

        /* total price */
        //formattedPrice = totalPrice.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        formattedPrice = number_format(totalPrice, 2, ',', ' ');
        placeText(this.totalPriceHolderMobile, formattedPrice);
        placeText(this.totalPriceHolder, formattedPrice);

        //formattedPriceBYN = totalPrice.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ').replace(/ /g,'');
        //new_price_value = formattedPriceBYN/10000;
        //new_price_value=Math.round(new_price_value * 100) / 100;
        //aTmp=new_price_value.toString().split('.');
        //value_rub=aTmp[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1&thinsp;");
        //value_kop="0";
        //value_kop=aTmp[1];
        //if(value_kop.length==1){
        //	value_kop=value_kop+'0';
        //}

        //if(value_kop){
        //    placeText(this.totalPriceHolderBYN, value_rub+','+value_kop+' руб.');
        //}else{
        //    placeText(this.totalPriceHolderBYN, value_rub+',00 руб.');
        //}


        formattedPriceBYN = number_format(totalPrice*10000, 0, '', ' ');
        placeText(this.totalPriceHolderBYN, formattedPriceBYN+' руб.');

        /* save chosen products to localStorage if available*/
        this.saveData();
    };


    /* function to call when output data list was changed */
    _Salver.prototype.listModified = function () {
        /*if (!chosenDataListScrollHolder.data('jsp')) {
         chosenDataListScrollHolder.jScrollPane({
         verticalDragMinHeight: 11,
         verticalDragMaxHeight: 11
         });
         }
         console.log(chosenDataListScrollHolder, chosenDataListScrollHolder.data('jsp'));
         chosenDataListScrollHolder && chosenDataListScrollHolder.data('jsp') && chosenDataListScrollHolder.data('jsp').reinitialise();*/
        /*  Damn it! jScrollPane doesn't fire "reinitialise" method in appropriate way =\ */
        //$('#mc-chosenData-scroll-holder').jScrollPane({
        //	verticalDragMinHeight: 15,
        //	verticalDragMaxHeight: 15
        //});
    };

    /* displays product's quantity */
    _Salver.prototype.showCounter = function (productKey, quantity) {
        if (!(productKey && quantity)) {
            return log('_Salver.showCounter: invalid arguments.');
        }
        var addLinkHolder, counterBubble;
        addLinkHolder = ge('mc-product-addlink-holder-' + productKey);
        if (addLinkHolder != null) {
            counterBubble = document.createElement('div');
            counterBubble.className = 'mc-product-counter-bubble';
            counterBubble.appendChild(document.createTextNode(quantity));
            addLinkHolder.appendChild(counterBubble);
            TweenLite.to(counterBubble, 0.5, {css: {top: -40, opacity: 1}, onComplete: function () {
                setTimeout(function () {
                    TweenLite.to(counterBubble, 0.5, {css: {opacity: 0}, onComplete: function () {
                        counterBubble.parentNode.removeChild(counterBubble);
                    }});
                }, 1000);
            }});
        }
        return false;
    };

    _Salver.prototype.updatePrice = function (productKey, variant) {
        if (arguments.length < 2) {
            return log('Salver.getPrice: not enough arguments.');
        }
        var productData, productVariantData, productPrice;
        if (productsInfo.hasOwnProperty(productKey)) {
            productData = productsInfo[productKey];
            productVariantData = productData.variants && productData.variants[variant];
            productPrice = productVariantData && productVariantData.variantPrice || null;
            if (productPrice) {
                productPrice = (productPrice.toString()).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');


                formattedPriceBYN = number_format(productPrice*10000, 0, '', ' ');

                placeText('mc-product-price-byn-' + productKey, formattedPriceBYN+' руб.');


                productPrice = number_format(productPrice, 2, ',', '');
                placeText('mc-product-price-' + productKey, productPrice);
            }
        }
        return false;
    };

    /* saves chosen products data in localStorage if available */
    _Salver.prototype.saveData = function () {
        var chosenProducts, dataVersion, encodedData;
        dataVersion = productsInfo.version;
        chosenProducts = this.chosenProducts;
        if (typeof window.JSON !== 'undefined') {
            encodedData = JSON.stringify(chosenProducts);
            if (typeof window.localStorage !== 'undefined') {
                window.localStorage.setItem('mc-salver-data', encodedData);
                window.localStorage.setItem('mc-salver-version', dataVersion);
            }
        }
    };

    /* load chosen products data from localStorage if presented */
    _Salver.prototype.loadData = function () {
        var self, encodedData, userSalverVersion, originalSalverVersion, decodedData;
        self = this;
        if (typeof window.localStorage !== 'undefined') {
            encodedData = window.localStorage.getItem('mc-salver-data');
            userSalverVersion = window.localStorage.getItem('mc-salver-version');
            originalSalverVersion = productsInfo.version;
            /* if there were any changes in structure and user has wrong version of encoded data - clear this data to prevent errors */
            if (userSalverVersion !== originalSalverVersion) {
                window.localStorage.removeItem('mc-salver-data');
                return;
            }
            if (encodedData != null) {
                if (typeof window.JSON !== 'undefined') {
                    try {
                        decodedData = JSON.parse(encodedData);
                    } catch (e) {
                        log(e.message);
                        decodedData = {};
                    } finally {
                        self.chosenProducts = decodedData;
                        self.recalculate();
                        self.updateParam({
                            type: 'listUpdate',
                            salver: self
                        });
                        self.updateSalverClasses({
                            type: 'load'
                        });
                    }
                }
            }
        }
    };

    _Salver.prototype.getProductsCount = function () {
        var self, totalCountHolder, totalDeclinationHolder, totalPriceHolderMobile,  encodedData, userSalverVersion,
            originalSalverVersion, decodedData, counter = 0, totalPrice = 0, p, quantity, formattedPrice;
        self = this;
        totalCountHolder = self.totalCountHolder;
        totalDeclinationHolder = self.totalDeclinationHolder;
        totalPriceHolderMobile = self.totalPriceHolderMobile;
        if (!(totalCountHolder && totalDeclinationHolder)) {
            return log('_Salver.getProductsCount: no elements to put data.');
        }
        if (typeof window.localStorage !== 'undefined') {
            encodedData = window.localStorage.getItem('mc-salver-data');
            userSalverVersion = window.localStorage.getItem('mc-salver-version');
            originalSalverVersion = productsInfo.version;
            /* if there were any changes in structure and user has wrong version of encoded data - clear this data to prevent errors */
            if (userSalverVersion !== originalSalverVersion) {
                window.localStorage.removeItem('mc-salver-data');
                return false;
            }
            if (encodedData != null) {
                if (typeof window.JSON !== 'undefined') {
                    try {
                        decodedData = JSON.parse(encodedData);
                    } catch (e) {
                        log(e.message);
                        decodedData = {};
                    } finally {
                        for (p in decodedData) {
                            if (decodedData.hasOwnProperty(p)) {
                                quantity = decodedData[p].quantity || 0;
                                counter += quantity;
                                totalPrice += (quantity * (+decodedData[p]['data']['variantPrice'] || 0));
                            }
                        }
                        //formattedPrice = totalPrice.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                        formattedPrice = totalPrice;
                        placeText(totalPriceHolderMobile, formattedPrice);
                        placeText(totalCountHolder, counter);
                        if (lang == -1){

                            var langEn = url.indexOf("/en/");
                            if (langEn == -1) {
                                //console.log("русcc");
                                placeText(totalDeclinationHolder, declOfNum(counter, ['продукт', 'продукта', 'продуктов']));
                            }
                            else {
                                //console.log("англ");
                                placeText(totalDeclinationHolder, declOfNum(counter, ['item', 'items', 'items']));
                            }
                        }else {
                            //console.log("  бел");
                            placeText(totalDeclinationHolder, declOfNum(counter, ['прадукт', 'прадукта', 'прадуктав']));
                        }

                    }
                }
            }
        }
        return false;
    };

    /* removes all data from salver */
    _Salver.prototype.clearAll = function () {
        var self, chosenProducts, productStorageKey, p;
        self = this;
        chosenProducts = self.chosenProducts;
        for (p in chosenProducts) {
            if (chosenProducts.hasOwnProperty(p)) {
                productStorageKey = p;
                self.updateParam({
                    type: 'quantity',
                    action: 'remove',
                    productStorageKey: productStorageKey,
                    salver: self
                });
            }
        }
    };

    /*global window._pageData */
    /**@namespace window._pageData.productsVersion*/
    if (!filterGrid.length) {
        if (Object.prototype.toString.call(productsInfo).substring(8,14) === 'Object') {
            productsInfo.version = window._pageData && window._pageData.productsVersion;
        } else {
            return log('invalid type of productsInfo variable.');
        }
        var salverTopLoader = new _Salver({
            totalProductsLoader: true,
            totalCountHolder: 'mc-header-menu-total',
            totalDeclinationHolder: 'mc-header-menu-total-pv',
            totalPriceHolderMobile: 'mc-products-chosen-price-mobile'
        });
        salverTopLoader.getProductsCount();
    }

    /* menu page with filters */
    if (filterGrid.length && menuFilterLinks.length) {

        $('#mc-chosenData-scroll-holder').mCustomScrollbar({
            scrollbarPosition: 'outside',
            autoDraggerLength: false,
            autoHideScrollbar: true,
            autoExpandScrollbar: false,
            scrollButtons: {
                enable: false
            },
            contentTouchScroll: 15,
            theme: 'minimal-dark'
        });

        $('img.lazy-product').unveil(50, function () {
            var self = $(this), preloader;
            self.load(function() {
                preloader = self.attr('data-preloader-id');
                $('#' + preloader).css({display: 'none'});
            });
        });

        var fixProductTitlesHeight, salver;
        /**@namespace productsInfo.productIds*/
        /*global _productsInfo*/
        $.extend(productsInfo, window._productsInfo);


        (fixProductTitlesHeight = function () {
            var processStatus = false, elementsCache = {titleWrappers: {}, productBlocks: {}, contentBlocks: {}};
            var process = function () {
                var productIdsArray, i, iLen, wrapperId, titleWrapper, titleContentBlock, titleContentBlockHeight , maxHeight = 0, productBlock, styles, isVisible;
                productIdsArray = productsInfo.productIds && ((Object.prototype.toString.call(productsInfo.productIds).substring(8, 13) === 'Array') ? productsInfo.productIds : []);
                if (productIdsArray.length) {
                    for (i = 0, iLen = productIdsArray.length; i < iLen; i += 1) {
                        wrapperId = productIdsArray[i];
                        titleWrapper = ge('mc-product-titles-wrapper-product' + wrapperId);
                        titleContentBlock = ge('mc-product-titles-content-product' + wrapperId);
                        if (titleWrapper && titleContentBlock) {
                            elementsCache.titleWrappers[wrapperId] = titleWrapper;
                            elementsCache.contentBlocks[wrapperId] = titleContentBlock;
                            //titleContentBlock.style.height = '';
                            titleContentBlockHeight = titleContentBlock.offsetHeight;
                            if (titleContentBlockHeight > maxHeight) {
                                maxHeight = titleContentBlockHeight;
                            }
                        }
                    }
                    for (i = 0, iLen = productIdsArray.length; i < iLen; i += 1) {
                        wrapperId = productIdsArray[i];
                        productBlock = elementsCache.productBlocks[wrapperId] || ge('mc-product-block-product' + wrapperId);
                        if (!elementsCache.productBlocks[wrapperId]) {
                            elementsCache.productBlocks[wrapperId] = ge('mc-product-titles-wrapper-product' + wrapperId);
                        }
                        titleWrapper = elementsCache.titleWrappers[wrapperId] || ge('mc-product-titles-wrapper-product' + wrapperId);
                        titleContentBlock = elementsCache.contentBlocks[wrapperId];
                        if (productBlock && titleContentBlock) {
                            styles = window.getComputedStyle(productBlock, null) || productBlock.currentStyle;
                            isVisible = styles.display !== 'none';
                            if (isVisible) {
                                TweenLite.to(titleWrapper, 0.3, {css: {height: maxHeight}, ease: Linear.easeNone});
                            }
                        }
                    }
                }
                processStatus = false;
            };
            return function () {
                if (processStatus === true) return;
                processStatus = true;
                setTimeout(process, 100);
            }
        }());

        fixProductTitlesHeight();

        $(window).resize(fixProductTitlesHeight);

        /* alternative filter stated */
        d.on('click', '.mc-menu-filter-link', (function () {
            var allProducts = $('.mc-menu-filter-item', filterGrid),
                filterLinks = $('.mc-menu-filter-link');
            return function (e) {
                e.preventDefault();
                var self, filterClass, appropriateProducts, hideTimeline, showTimeline;
                self = $(this);
                filterClass = self.attr('data-filter');
                filterLinks.removeClass('active');
                self.addClass('active');
                if (filterClass) {
                    menuProductsHeaders.hide();
                    if (w.width() < 770) {
                        setTimeout(function () {
                            w.scrollTo(productsHeaderDynamic, 700);
                        }, 400);
                    }
                    hideTimeline = new TimelineLite({paused: true});
                    hideTimeline.staggerTo(allProducts, 0.4, {css: {autoAlpha: 0}});

                    hideTimeline.play();
                    allProducts.hide();

                    appropriateProducts = $('.mc-menu-filter-item.' + filterClass, filterGrid);
                    appropriateProducts.css({display: 'inline-block'});
                    showTimeline = new TimelineLite({paused: true});
                    showTimeline.staggerTo(appropriateProducts, 1, {css: {autoAlpha: 1}, onComplete: function () {
                        //$('#' + this.target.getAttribute('data-lazy-image')).trigger('unveil');
                    }}, 0.15);
                    // triggering "scroll" event will not load all images with "unveil" method except those we can see
                    setTimeout(function () {
                        w.trigger('scroll');
                    }, 300);

                    showTimeline.play();
                    fixProductTitlesHeight();
                }
                return false;
            }
        }()));
        /* alternative filter ended */

        var allSpecifiedBlocks = $('.mc-filter-specified-block');

        menuFilterLinks.click(function (e) {
            e.preventDefault();
            var self, header, showBlocks, specifiedBlock, blocksIds, i, iLen;
            self = $(this);
            header = self.attr('data-header');
            if (header) {
                productsHeaderDynamic.text(header);
            }
            showBlocks = self.attr('data-show-categories') || null;
            if (showBlocks != null) {
                menuProductsHeaders.show();
                filterGrid.removeClass('mc-fast-switch-hidden');
            } else {
                filterGrid.addClass('mc-fast-switch-hidden');
            }
            allSpecifiedBlocks.hide();
            specifiedBlock = self.attr('data-showblock');
            if (specifiedBlock) {
                blocksIds = specifiedBlock.split(/\s*,\s*/);
                for (i = 0, iLen = blocksIds.length; i < iLen; i += 1) {
                    $('#' + blocksIds[i]).show();
                }
            }
        });

        /* each link opens additional navigation menu that allows to scroll page to appropriate group */
        filterGrid.on('click', '.mc-products-switching-show-link', function (e) {
            e.preventDefault();
            var self, switchBlockId, switchBlock;
            self = $(this);
            switchBlock = self.attr('data-block');
            switchBlockId = $('#mc-swith-block-' + switchBlock);
            switchBlockId.css({display: 'inline-block'});
            $('#mc-products-switching-block-' + switchBlock).addClass('opened');
        });

        /* each link scrolls page to apropriate group */
        filterGrid.on('click', '.mc-switching-link', function (e) {
            e.preventDefault();
            var self, groupId, group, offsetTop, scrollTime, parentBlockId, parentBlock;
            self = $(this);
            groupId = self.attr('data-group');
            group = $('#' + groupId);
            if (!group.length) return;
            offsetTop = Math.abs(group.offset().top);
            scrollTime = Math.abs((w.scrollTop() - offsetTop) / 1000).toFixed(0);
            scrollTime = Math.min(Math.max(scrollTime, 2), 2) * 1000;

            w.scrollTo(group, scrollTime);
            parentBlockId = self.attr('data-parent');
            parentBlock = $('#mc-swith-block-' + parentBlockId);
            parentBlock.hide();
            $('#mc-products-switching-block-' + parentBlockId).removeClass('opened');
        });

        filterGrid.on('click', '.mc-switching-block-close', function (e) {
            e.preventDefault();
            var self, blockId;
            self = $(this);
            blockId = self.attr('data-blockId');
            if (blockId) {
                $('#mc-swith-block-' + blockId).hide();
                $('#mc-products-switching-block-' + blockId).removeClass('opened');
            }
        });

        //$('#mc-products-chosen-list-data-scrollable').jScrollPane({
        //	verticalDragMinHeight: 15,
        //	verticalDragMaxHeight: 15
        //});

        //$('#mc-products-chosen-list-data-scrollable').mCustomScrollbar({
        //	scrollbarPosition: 'outside',
        //	autoDraggerLength: false,
        //	autoHideScrollbar: true,
        //	autoExpandScrollbar: false,
        //	scrollButtons: {
        //		enable: false
        //	},
        //	contentTouchScroll: 15,
        //	theme: 'minimal-dark'
        //});

        salver = new _Salver({
            salver: 'mc-products-salver-content',
            salverArea: 'mc-products-salver-area',
            chosenList: 'mc-products-chosenlist-data',
            caloriesTotalHolder: 'mc-elements-calories-count',
            jouleTotalHolder: 'mc-elements-joule-count',
            caloriesPercentHolder: 'mc-elements-calories-percent',
            joulePercentHolder: 'mc-elements-joule-percent',
            proteinTotalHolder: 'mc-elements-protein-count',
            proteinPercentHolder: 'mc-elements-protein-percent',
            fatTotalHolder: 'mc-elements-fat-count',
            fatPercentHolder: 'mc-elements-fat-percent',
            carbohydratesTotalHolder: 'mc-elements-carbohydrates-count',
            carbohydratesPercetHolder: 'mc-elements-carbohydrates-percent',
            saltTotalHolder: 'mc-elements-salt-count',
            saltPercentHolder: 'mc-elements-salt-percent',
            saturatedFatsHolder: 'mc-elements-saturatedFats-count',
            saturatedFatsPercentHolder: 'mc-elements-saturatedFats-percent',
            sugarHolder: 'mc-elements-sugar-count',
            sugarPercentHolder: 'mc-elements-sugar-percent',
            fiberHolder: 'mc-elements-fiber-count',
            fiberPercentHolder: 'mc-elements-fiber-percent',
            totalCountHolder: 'mc-header-menu-total',
            totalDeclinationHolder: 'mc-header-menu-total-pv',
            totalPriceHolder: 'mc-products-chosen-price',
            totalPriceHolderBYN: 'mc-products-chosen-price-byn',
            totalPriceHolderMobile: 'mc-products-chosen-price-mobile',
            requestMessage: 'mc-salver-request-message'
        });

        productClearAllLink.click(function (e) {
            placeText('mc-products-chosen-price-byn', '0 руб.'); // BYN clear
            e.preventDefault();
            salver.clearAll();
        });

        /* add event listener for product adding to salver */
        filterGrid.on('click', '.mc-add-product', function (e) {
            e.preventDefault();
            var self, productKey, productVariant;
            self = this;
            productKey = self.getAttribute('data-productKey') || null;
            productVariant = self.getAttribute('data-productVariant') || null;
            if (!productKey) {
                return log('.mc-add-product click event: product key is missing in "data-productKey" attribute.');
            }
            salver.addProduct(productKey, productVariant);
            return false;
        });

        /* event listener for generating product-info popup */
        filterGrid.on('click', '.mc-products-show-product-info', (function () {
            /* store cache in closure */
            var cache = {};
            return function (e) {
                e.preventDefault();
                var self, productKey, productVariant, _productInfo, productDataObject, cacheKey,
                    templateElement, templateSrc, template, templateData, templateOutput,
                    elementsDataAray = [], templateVariantNameText, generatedId, variantDataObject, variantElements, v,
                    elementTemplateElement, elementTemplateSrc, elementTemplate, windowHeight, scrollTop, generatedElement, delta;
                self = this;
                productKey = self.getAttribute('data-productKey');
                productVariant = self.getAttribute('data-productVariant');
                _productInfo = productsInfo;
                if (!(_productInfo.hasOwnProperty(productKey))) {
                    return log('productInfo popup: invalid param - productKey.');
                }
                productDataObject = _productInfo[productKey];
                if (!(productDataObject.variants.hasOwnProperty(productVariant))) {
                    return log('productInfo popup: invalid param - productVariant.');
                }
                /* cache key to store or retrieve cache */
                cacheKey = productKey + productVariant + '_cache';
                /* try to retrieve result from cache */
                if (cache.hasOwnProperty(cacheKey)) {
                    templateOutput = cache[cacheKey].output;
                    generatedId = cache[cacheKey].id;
                } else {
                    /* generate product-info popup content */
                    templateElement = ge('mc-productInfo-popup-template');
                    if (!templateElement) {
                        return log('productInfo popup: could not get popup template.');
                    }
                    elementTemplateElement = ge('mc-productInfo-popup-element-data-template');
                    /* html code of required template */
                    templateSrc = templateElement.innerHTML;
                    elementTemplateSrc = elementTemplateElement && elementTemplateElement.innerHTML;
                    /* handlebars compiled template */
                    template = Handlebars.compile(templateSrc);
                    /* unique id of recreated element */
                    generatedId = new Date().getTime().toString();
                    /* product data of selected variant */
                    variantDataObject = productDataObject.variants[productVariant];
                    /* variant elements data */
                    variantElements = variantDataObject.elements;
                    for (v in variantElements) {
                        if (variantElements.hasOwnProperty(v) && Object.prototype.toString.call(variantElements[v]).substring(8,14) === 'Object') {
                            elementsDataAray.push(variantElements[v]);
                        }
                    }
                    /* template data to fill template with */
                    templateVariantNameText = variantDataObject.variantName && (variantDataObject.variantName).replace(/'/g, '"');
                    templateData = {
                        name: productDataObject.name || '',
                        variant: templateVariantNameText || '',
                        description: productDataObject.description || '',
                        image: variantDataObject.variantImage || '',
                        id: generatedId,
                        elements: elementsDataAray,
                        allergens: productDataObject.allergens || {},
                        descriptionNavHiddenClass: productDataObject.descriptionNavHiddenClass
                    };
                    /* inner template (in other words: template in template) for each element data in popup */
                    Handlebars.registerHelper('element', function () {
                        var self = this;
                        elementTemplate = Handlebars.compile(elementTemplateSrc);
                        return elementTemplate({
                            name: self.name,
                            value: self.value,
                            gda: self.gda,
                            unitBefore: self.unitBefore || '',
                            unitAfter: self.unitAfter || ''
                        });
                    });
                    /* active class helper. required by bootstrap slider to show start item */
                    Handlebars.registerHelper('isFirst', function (index, options) {
                        index = index || 0;
                        if (index == 0) {
                            return options.fn(this);
                        }
                        return options.inverse(this);
                    });
                    /* even/odd helper. required to wrap each two elements slider item */
                    Handlebars.registerHelper('isEven', function (index, isLast, options) {
                        index = index || 0;
                        if ((index % 2) === 0) {
                            return options.fn(this);
                        } else if ((index % 2) === 1 || isLast) {
                            return options.inverse(this);
                        }
                        return false;
                    });
                    templateOutput = template(templateData);
                    /* save results in cache */
                    cache[cacheKey] = {
                        output: templateOutput,
                        id: generatedId
                    };
                }

                productinfoPopupHolder.innerHTML = templateOutput;
                scrollTop = w.scrollTop();
                windowHeight = w.height();
                generatedElement = ge(generatedId);
                TweenLite.set(productinfoPopupHolder, {display: 'block'});

                //console.log('окно открылось');
                $('.moretitle').each(function(i) {
                    if ($(this).html() == 'Сахар') {
                        //перебор variant 1 - 20
                        var j = 1;
                        while (j < 20) {
                            var enumeration = 'variant' + j;
                            j = j + 1;
                            if(!productsInfo[productKey].variants[enumeration]) {
                            }
                            else {
                                if (productsInfo[productKey].variants[enumeration].elements.sugar.value == '') {
                                    $(this).parent('.moreheader').parent('.more').parent('.item').remove();
                                }
                                j = 21;
                            }
                        }
                    }
                    if ($(this).html() == 'Соль') {
                        //перебор variant 1 - 20
                        //console.log('Соль');
                        var sol = 1;
                        while (sol < 20) {
                            var enumerationSol = 'variant' + sol;
                            sol = sol + 1;
                            if(!productsInfo[productKey].variants[enumerationSol]) {
                            }
                            else {
                                if (productsInfo[productKey].variants[enumerationSol].elements.salt.value == '') {
                                    //console.log(enumerationSol);
                                    $(this).parent('.moreheader').parent('.more').parent('.item').remove();
                                }
                                j = 21;
                            }
                        }
                    }
                });
                if (_productsInfo[productKey].allergens != 0) {
                    var i = 0;
                    while (i < 13) {
                        if (_productsInfo[productKey].allergens[i].allergenValue == '') {
                            i = i + 1;
                            if (i == 12) {
                                $('#allergens_tab').css('display', 'none');
                                //$('#descs_tab').css('margin-left', '120px');
                                $('#descs_tab').css('display', 'none');
                            }
                        }
                        else {
                            i = 16;
                        }
                    }
                }
                else {
                    console.log('поле аллергены не созданно');
                }
                delta = (windowHeight - generatedElement.offsetHeight) / 2;
                TweenLite.set(generatedElement, {css: {top: scrollTop + delta}});
                TweenLite.to(productinfoPopupHolder, 0.2, {css: {autoAlpha: 1}, ease: Linear.easeNone});
                if (e.stopPropagation) {
                    e.stopPropagation();
                } else {
                    e.cancelBubble = true;
                }
                return false;
            };

        }()));

        /* event listener for toggling variants list visibility class */
        filterGrid.on('click', '.mc-product-show-variants', function (e) {
            e.preventDefault();
            var self, productKey, productVariantsHolder;
            self = this;
            productKey = self.getAttribute('data-productKey');
            productVariantsHolder = ge('mc-product-variant-list-holder-' + productKey);
            if (productVariantsHolder != null) {
                $(productVariantsHolder).toggleClass('visible');
            }
        });

        filterGrid.on('click', '.mc-product-select-variant-link', function (e) {
            e.preventDefault();
            var self, productKey, productVariant, productData, productVariantData, productVariantImageSrc, productImageEl, productVariantText, productImageLink, productImage, productAddLink, productVariantTextHolder, listHolder;
            self = this;
            productKey = self.getAttribute('data-productKey');
            productVariant = self.getAttribute('data-productVariant');
            if (productsInfo.hasOwnProperty(productKey)) {
                productData = productsInfo[productKey];
                productData.variantNeedsToBeSelected = false;
                productVariantData = productData.variants[productVariant] || null;
                if (productVariantData != null) {
                    productVariantImageSrc = productVariantData.variantImage || null;
                    if (productVariantImageSrc) {
                        productImageEl = ge('mc-product-image-' + productKey);
                        productImageEl.src = productVariantImageSrc;
                    }
                }
            }
            productVariantText = self.getAttribute('data-variantText');
            productVariantText = productVariantText.replace(/'/g, '"');
            if (!(productKey && productVariant)) {
                return log('Switching product variant: missing params - productKey or productVariant');
            }
            $('#mc-product-block-' + productKey).removeClass('not-selected');
            productImageLink = ge('mc-product-image-link-' + productKey);
            productImage = ge('mc-product-image-' + productKey);
            productAddLink = ge('mc-add-product-' + productKey);
            listHolder = ge('mc-product-variant-list-holder-' + productKey);
            productVariantTextHolder = ge('mc-product-variant-text-' + productKey);
            if (productImageLink != null) {
                productImageLink.setAttribute('data-productVariant', productVariant);
            }
            if (productImage != null) {
                productImage.setAttribute('data-productVariant', productVariant);
            }
            if (productAddLink != null) {
                productAddLink.setAttribute('data-productVariant', productVariant);
            }
            placeText(productVariantTextHolder, productVariantText);
            if (listHolder != null) {
                $(listHolder).toggleClass('visible');
            }
            salver.updatePrice(productKey, productVariant);
            fixProductTitlesHeight();
            return false;
        });

        /* popup close button */

        var closeProductPopup = function () {
            if (productinfoPopupHolder != null) {
                TweenLite.to(productinfoPopupHolder, 0.2, {css: {autoAlpha: 0}, ease: Linear.easeNone, onComplete: function () {
                    productinfoPopupHolder.style.display = 'none';
                    productinfoPopupHolder.innerHTML = '';
                    TweenLite.set(productinfoPopupHolder, {display: 'none'});
                }});
            }
        };

        d.on('click', '.mc-products-popup-close', function (e) {
            e.preventDefault();
            closeProductPopup();
            if (e.stopPropagation) {
                e.stopPropagation();
            } else {
                e.cancelBubble = true;
            }
        });

        d.click(function (e) {
            var target = e.target;
            if (target.className.match(/(glyphicon)|(carousel\-control)/) === null) {
                closeProductPopup();
            }
        });

        /* event listener for products in chosen list for manipulating its quantity or to remove product from chosen ones */
        chosenList.on('click', 'a', function (e) {
            e.preventDefault();
            var self = this, productKey, action;
            productKey = self.getAttribute('data-productKey');
            action = self.getAttribute('data-action');
            if (!(productKey && action)) {
                return log('chosenList control event: not enough arguments. Check data-productKey or data-action values.');
            }
            salver.updateParam({
                type: 'quantity',
                action: action,
                productStorageKey: productKey,
                salver: salver
            });
            return false;
        });

        /* make products draggable */
        draggableProducts.draggable({
            addClasses: false,
            cursor: 'auto',
            distance: 3,
            helper: 'clone',
            zIndex: 10,
            containment: document.body
        });

        /* make salver block droppable for products */
        droppableSalver.droppable({
            accept: '.mc-draggable',
            tolerance: 'pointer',
            drop: function (e, ui) {
                var droppableItem, productKey, productVariant;
                droppableItem = ui.helper && ui.helper.context;
                productKey = droppableItem.getAttribute('data-productKey');
                productVariant = droppableItem.getAttribute('data-productVariant');
                salver.addProduct(productKey, productVariant);
            }
        });

        salver.loadData();

    }

    /* restaurants page */
    if (restaurantsMapCanvas != null) {
        // TODO: create helper class
        var mapMarkers = {};
        var _mapMarkers = window._mapMarkers || {};
        $.extend(mapMarkers, _mapMarkers);

        var head, script, mapOptions, map, m, mLen, restaurantData, markers = {}, marker, icon, lat, lng, infoWindowTemplateElement,
            infoWindowTemplateElementSrc, infoWindowTemplate, infoWindowContent,
            infoWindow = null,
            userPointerTemplateEl, userPointerTemplateSrc, userPointerInfoWindow,
            generatedInfoWindows = {},
            userPosition = {userMarker: null}, wasOpenedByMarker = false,
            selectedIndex, directionsDisplay, directionsService, routerMode = 'WALKING', request, validCityKeys = {}, cityKey = null;;

        head = document.getElementsByTagName('head')[0];
        script = document.createElement('script');
        /**@namespace google.maps.LatLng*/
        /**@namespace google.maps.ControlPosition*/
        /**@namespace google.maps.ZoomControlStyle*/
        /**@namespace google.maps.DirectionsService*/
        /**@namespace google.maps.DirectionsRenderer*/
        /**@namespace google.maps.Marker*/
        /**@namespace map.setCenter*/
        window.initMap = function () {
            mapOptions = {
                zoom: 11,
                center: new google.maps.LatLng(53.9025, 27.562),
                mapTypeControl: false,
                panControl: true,
                panControlOptions: {
                    position: google.maps.ControlPosition.LEFT_CENTER
                },
                zoomControl: true,
                zoomControlOptions: {

                },
                scaleControl: true,
                streetViewControl: true,
                streetViewControlOptions: {
                    style: google.maps.ZoomControlStyle.LARGE,
                    position: google.maps.ControlPosition.RIGHT_CENTER
                },
            };
            map = new google.maps.Map(document.getElementById('mc-restaurants-map-canvas'), mapOptions);
            directionsService = new google.maps.DirectionsService();
            directionsDisplay = new google.maps.DirectionsRenderer({
                markerOptions: {
                    visible: false
                }
            });
            directionsDisplay.setMap(map);

            infoWindowTemplateElement = ge('mc-restaurant-popup-template');
            if (!infoWindowTemplateElement) {
                log('Restaurants. Creating popup info window: cannot retrieve template element.');
            }
            infoWindowTemplateElementSrc = infoWindowTemplateElement && infoWindowTemplateElement.innerHTML || null;
            if (!infoWindowTemplateElementSrc) {
                log('Restaurants. Creating popup info window: info-window template is probably invalid.');
            }
            infoWindowTemplate = infoWindowTemplateElementSrc && Handlebars.compile(infoWindowTemplateElementSrc) || null;

            /* generate markers with apropriate info blocks */
            for (m = 0, mLen = _mapMarkers.length; m < mLen; m += 1) {
                restaurantData = _mapMarkers[m];
                restaurantData.index = m;
                lat = restaurantData.lat || null;
                lng = restaurantData.lng || null;
                if (!(lat && lng)) {
                    log('Placing map markers: missing params - latitude or longitude.');
                    continue;
                }
                //store cityKey to check them later.
                validCityKeys[restaurantData['cityKey']] = true;
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lng),
                    map: map,
                    icon: 'assets/mcdonalds/images/' + (restaurantData['workCenter'] == 1 ? 'mc-restaurants-map-location-workcenter-icon.png' : 'mc-restaurants-map-location-icon.png'),
                    title: (restaurantData.name || '') + ' ' + (restaurantData.address || '')
                });
                markers[restaurantData.id] = {
                    marker: marker,
                    services: restaurantData.services,
                    visible: true
                };
                if (infoWindowTemplate) {
                    infoWindowContent = infoWindowTemplate(restaurantData);
                    generatedInfoWindows[restaurantData.id] = infoWindowContent;
                }
                /* add event listener to show appropriate info block */
                (function (_marker, _id) {
                    google.maps.event.addListener(_marker, 'click', function() {
                        if (generatedInfoWindows.hasOwnProperty(_id)) {
                            if (restaurantPopupHolder != null) {
                                restaurantPopupHolder.innerHTML = generatedInfoWindows[_id];
                                w.scrollTo(restaurantPopupHolder, 600);
                                wasOpenedByMarker = true;
                                setTimeout(function () {
                                    wasOpenedByMarker = false;
                                }, 200);
                            }
                        }
                    });
                }(marker, restaurantData.id));
                infoWindow = null;
            }

            /* geolocation error hanlder */
            var geolocationError = function (error) {
                var errorCode, message, additionalMessage;
                errorCode = error && (error.code + '');
                if (!errorCode) {
                    return;
                }
                switch (errorCode) {
                    case '0':
                        message = 'Неизвестная ошибка.';
                        additionalMessage = 'Пожалуйста, попробуйте чуть позже.';
                        break;
                    case '1':
                        message = 'Не удалось получить координаты.';
                        additionalMessage = 'Для полноценного использования карты ресторанов потребуются ваши координаты. Пожалуйста, сбросьте настройки определения местоположения и повторите попытку.';
                        break;
                    case '2':
                        message = 'Местоположение не доступно.';
                        additionalMessage = 'К сожалению, нам не удалось определить ваше местоположение.';
                        break;
                    case '3':
                        message = 'Превышено время ожидания запроса. ';
                        additionalMessage = 'Пожалуйста, попробуйте еще раз.';
                        break;
                }
                alert(message + ' ' + additionalMessage);
                setPosition({coords: {latitude: 53.9025, longitude: 27.562}});
                log('geolocation error');
            };

            /* retrieves current position of user */
            function getPosition () {
                if (navigator.geolocation && (typeof navigator.geolocation.getCurrentPosition !== 'undefined')) {
                    navigator.geolocation.getCurrentPosition(setPosition, geolocationError);
                }
            }

            /* updates user marker position if exists, or creates  */
            function setPosition (data) {
                var dataCoords, coordinatesObject;
                if (!(data && data.coords)) {
                    return log('setPosition: invalid position data.');
                }
                dataCoords = data.coords;
                userPosition.lat = dataCoords.latitude;
                userPosition.lng = dataCoords.longitude;
                userPosition.accuracy = dataCoords.accuracy;
                coordinatesObject = new google.maps.LatLng(userPosition.lat, userPosition.lng);
                map.setCenter(coordinatesObject);
                if (userPosition.userMarker != null) {
                    userPosition.userMarker.setPosition(coordinatesObject);
                } else {
                    userPosition.userMarker = new google.maps.Marker({
                        position: coordinatesObject,
                        icon: {
                            path: google.maps.SymbolPath.CIRCLE,
                            scale: 10,
                            fillColor: '#264f36',
                            fillOpacity: 0.9,
                            strokeColor: '#ffc836',
                            strokeWeight: 2
                        },
                        draggable: true,
                        map: map
                    });

                    userPointerTemplateEl = ge('mc-restaurant-map-pointer-popup');
                    userPointerTemplateSrc = userPointerTemplateEl && userPointerTemplateEl.innerHTML || null;

                    if (userPointerTemplateSrc) {
                        userPointerInfoWindow = new google.maps.InfoWindow({
                            content: userPointerTemplateSrc
                        });

                        d.on('click', '#mc-restaurants-map-pointer-close', function (e) {
                            e.preventDefault();
                            userPointerInfoWindow.close();
                        });

                        if (userPosition.accuracy > 300) {
                            userPointerInfoWindow.open(map, userPosition.userMarker);
                        }

                        google.maps.event.addListener(userPosition.userMarker, 'click', function() {
                            if (userPointerInfoWindow) {
                                userPointerInfoWindow.open(map, userPosition.userMarker);
                            }
                        });
                    } else {
                        log('no template src');
                    }
                }
                return false;
            }

            /* shows markers with chosen service criteria */
            var filterMarkers = (function () {
                /* choosen service keys are saved in closure */
                var filterKeys = {}, keysCounter = 0;
                return function (key) {
                    var r, rData, services, marker, serviceKey, totalServicesCounter;
                    if (filterKeys.hasOwnProperty(key)) {
                        delete filterKeys[key];
                        if (keysCounter > 1) {
                            keysCounter -= 1;
                        } else {
                            keysCounter = 0;
                        }
                    } else {
                        filterKeys[key] = true;
                        keysCounter += 1;
                    }
                    /* iterate markers */
                    for (r in markers) {
                        if (markers.hasOwnProperty(r)) {
                            /* get marker object and appropriate services */
                            rData = markers[r];
                            services = rData.services;
                            marker = rData.marker;
                            if (keysCounter === 0) {
                                rData.visible = true;
                                marker.setVisible(true);
                            } else {
                                /* hide markers until we know they have services we have chosen */
                                marker.setVisible(false);
                                rData.visible = false;
                                totalServicesCounter = 0;
                                for (serviceKey in filterKeys) {
                                    if (filterKeys.hasOwnProperty(serviceKey)) {
                                        if (services.hasOwnProperty(serviceKey)) {
                                            totalServicesCounter += 1;
                                        }
                                    }
                                }
                                if (totalServicesCounter === keysCounter) {
                                    marker.setVisible(true);
                                    rData.visible = true;
                                }
                            }
                        }
                    }
                    map.setZoom(11);
                }
            }());

            function getRestaurantRoute (index, findWorkCenter) {
                var startObject, r, rLen, rData, mapMarkerObject, finalLat, finalLng, finalObject, distance,
                    minDistance = 0, restaurantIndex = null, outputData = {},
                    routeStepTemplateEl, routeStepTemplate, steps, s, sLen, stepData, templateData, routeStepOutput = '',
                    totalDistanceMetres = 0, totalTimeSeconds = 0, totalDistance, totalTime, totalInfoHolder,
                    w, wm, wmo, notWorkCenters = [];

                // hide all none workCenter markers and show them back in the end
                if (findWorkCenter === true) {
                    for (w = 0; w < _mapMarkers.length; w += 1) {
                        wm = _mapMarkers[w];
                        wmo = markers[wm.id] || null;;
                        if (!wmo) {
                            continue;
                        }
                        if (wm['workCenter'] === 0) {
                            wmo.visible = false;
                            notWorkCenters.push(wmo);
                        }
                    }
                }


                totalInfoHolder = ge('mc-restaurants-route-total-info');

                if (!(userPosition.userMarker)) {
                    getPosition();
                    return log('getRestaurantRoute: unknown user position');
                }
                startObject = userPosition.userMarker.getPosition();
                if (!(index || selectedIndex)) {
                    for (r = 0, rLen = _mapMarkers.length; r < rLen; r += 1) {
                        rData = _mapMarkers[r];
                        mapMarkerObject = markers[rData.id] || null;
                        if (!mapMarkerObject) {
                            log('getRestaurantRoute: invalid marker\'s data.');
                            continue;
                        }
                        /* skip hidden markers */
                        if (!mapMarkerObject.visible) {
                            continue;
                        }
                        /* skip markers with wrong cityKey if cityKey was selected */
                        if (cityKey && (rData['cityKey'] != cityKey)) {
                            continue;
                        }
                        finalLat = rData.lat || null;
                        finalLng = rData.lng || null;
                        if (!(finalLat && finalLng)) {
                            log('getRestaurantRoute: invalid values of restaurant coordinates.');
                            continue;
                        }
                        finalObject = new google.maps.LatLng(finalLat, finalLng);
                        distance = google.maps.geometry.spherical.computeDistanceBetween(startObject, finalObject);
                        distance = +(distance * 100).toFixed(0);
                        if (!minDistance || (distance < minDistance)) {
                            minDistance = distance;
                            restaurantIndex = r;
                        }
                    }
                    if (restaurantIndex != null) {
                        outputData = _mapMarkers[restaurantIndex];
                    }
                } else {
                    index = index || selectedIndex;
                    if (!_mapMarkers || Object.prototype.toString.call(_mapMarkers[index]).substring(8, 14) !== 'Object') {
                        return log('Cannot create route to restaurant with given index.');
                    }
                    outputData = _mapMarkers[index];
                }

                if (outputData.lat && outputData.lng) {
                    request = {
                        origin: startObject,
                        destination: new google.maps.LatLng(outputData.lat, outputData.lng),
                        travelMode: google.maps.TravelMode[routerMode]
                    };
                    directionsService.route(request, function(response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setDirections(response);
                            $(restaurantRouteName).text(outputData.name);
                            $(restaurantRouteAddress).text(outputData.address);
                            routeStepTemplateEl = ge('mc-restaurant-route-step');
                            routeStepTemplate = routeStepTemplateEl && routeStepTemplateEl.innerHTML && Handlebars.compile(routeStepTemplateEl.innerHTML) || null;
                            if (routeStepTemplate && restaurantRoteStepsHolder) {
                                steps = response.routes && response.routes[0] && response.routes[0].legs && response.routes[0].legs[0] && response.routes[0].legs[0].steps;
                                for (s = 0, sLen = steps.length; s < sLen; s += 1) {
                                    stepData = steps[s];
                                    totalDistanceMetres += stepData.distance.value;
                                    totalTimeSeconds += stepData.duration.value;
                                    templateData = {
                                        instructions: stepData.instructions || '',
                                        distance: stepData.distance && stepData.distance.text || '',
                                        duration: stepData.duration && stepData.duration.text || null
                                    };
                                    routeStepOutput += routeStepTemplate(templateData);
                                    restaurantRoteStepsHolder.innerHTML = routeStepOutput;
                                }
                            }
                            if (totalDistanceMetres && totalTimeSeconds) {
                                totalDistance = (totalDistanceMetres / 1000).toFixed(2) + 'км.';
                                placeText('mc-restaurants-total-distance', totalDistance);
                                totalTime = Math.floor(totalTimeSeconds / 3600) + 'ч. ' + Math.floor(totalTimeSeconds / 60) + 'м. ' + (totalTimeSeconds % 60) + 'с. ';
                                placeText('mc-restaurants-total-time', totalTime);
                                if (totalInfoHolder != null) {
                                    totalInfoHolder.style.display = 'block';
                                }
                            } else {
                                if (totalInfoHolder != null) {
                                    totalInfoHolder.style.display = 'block';
                                }
                            }
                        } else {
                            if (totalInfoHolder != null) {
                                totalInfoHolder.style.display = 'none';
                            }
                        }
                    });
                }

                // show all none workCenter markers that were hidden at the begining
                if (findWorkCenter === true) {
                    for (w = 0; w < notWorkCenters.length; w += 1) {
                        wmo = notWorkCenters[w];
                        wmo.visible = true;
                    }
                }

                return outputData;
            }

            getPosition();

            d.on('click', '.mc-map-change-route-mode', function (e) {
                e.preventDefault();
                var self, mode, findWorkCenter
                self = this;
                mode = self.getAttribute('data-mode');
                findWorkCenter = self.getAttribute('data-work-center') && true;
                if (mode) {
                    routerMode = mode;
                }
                $('a.mc-map-change-route-mode', restaurantRouteModeHolder).removeClass('active');
                $(self).addClass('active');
                getRestaurantRoute(null, findWorkCenter);
            });

            restaurantRouteModeHolder.on('click', '#mc-restaurants-right-col-closest', function (e) {
                e.preventDefault();
                selectedIndex = null;
                getRestaurantRoute();
            });

            d.on('click', '.mc-restaurant-popup-show-route', function (e) {
                e.preventDefault();
                var self, index;
                self = this;
                index = self.getAttribute('data-index');
                selectedIndex = index;
                restaurantPopupHolder.innerHTML = '';
                getRestaurantRoute(index);
            });

            function closeRestaurantPopup () {
                restaurantPopupHolder.innerHTML = '';
            }

            d.on('click', '#mc-restaurant-popup-close-link', function (e) {
                e.preventDefault();
                closeRestaurantPopup();
                if (e.stopPropagation) {
                    e.stopPropagation();
                } else {
                    e.cancelBubble = true;
                }
                return false;
            });

            d.click(function () {
                if (wasOpenedByMarker === true) {
                    return;
                }
                closeRestaurantPopup();
            });

            d.on('click', '.mc-restaurants-filter-link', function (e) {
                e.preventDefault();
                var self, serviceKey;
                self = this;
                serviceKey = self.getAttribute('data-service');
                filterMarkers(serviceKey);
                $(self.parentNode).toggleClass('active');
                return false;
            });

            d.on('click', '.mc-restaurants-city-navigation-link', (function () {
                var citiesLinks = $('.mc-restaurants-city-navigation-link');
                return function (e) {
                    e.preventDefault();
                    var self = $(this),
                        latitude, longitude, coordinates, selectedCityKey;
                    latitude  = self.data('lat');
                    longitude = self.data('lng');
                    if (!latitude || !longitude) return false;
                    coordinates = new google.maps.LatLng(latitude, longitude);
                    map.setCenter(coordinates);
                    citiesLinks.removeClass('active');
                    self.addClass('active');

                    // set cityKey
                    cityKey = null;
                    selectedCityKey = self.data('citykey');
                    selectedCityKey && validCityKeys.hasOwnProperty(selectedCityKey) && (cityKey = selectedCityKey);
                }
            })());

            window.initMap = null;
        };
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBQbUrOludhEjGD1bQLJlhKopFZxZU9BBQ&libraries=geometry&callback=initMap';
        document.body.appendChild(script);

    }

    /* main page and society pages slider */
    if (owlSliderHolder.length) {
        var sliderData, resizeMainSlider = null,
            mainSliderControlsHolder = $('#mc-main-slider-navigation-holder'),
            paginationLinks = $('.mc-slider-pagination-link', owlSliderHolder),
            mainSliderPagination = $('#mc-main-slider-pagination');

        /* mainpage slider */
        if (mainpageSliderHolder.length) {

            resizeMainSlider = function () {
                var sliderHeight;
                sliderHeight = mainpageSlider.height();
                if (sliderHeight < 200) {
                    mainpageOuterWrapper.css({height: 'auto'});
                    return;
                }
                mainpageOuterWrapper.css({height: sliderHeight});
                if (w.width() > 990) {
                    mainSliderControlsHolder.css({top: sliderHeight / 2});
                } else {
                    mainSliderControlsHolder.css({top: (sliderHeight - $('#mc-left-menu-column').outerHeight()) / 2});
                }
            };
            resizeMainSlider();
            w.load(resizeMainSlider);
            w.resize(resizeMainSlider);
        }
        /**@namespace $.fn.owlCarousel*/
        owlSlider.owlCarousel({
            navigation : false,
            slideSpeed : 300,
            paginationSpeed : 1000,
            singleItem: true,
            //autoHeight: true,
            autoPlay: 9000,
            afterUpdate: resizeMainSlider,
            afterMove: function () {
                paginationLinks.removeClass('active');
                $('#mc-owl-slider-pagination-link-' + owlSlider.data('owlCarousel').currentItem).addClass('active');
            },
            afterInit: function () {
                var itemsCount;
                itemsCount = $('.item', owlSlider).length;
                if (itemsCount <= 1) {
                    $('body').addClass('mc-slider-one-item');
                }
                $( document ).ready(function() {
                    var heightstart =  $(window).height();
                    $('.owl-item').children('.item').css('height', heightstart);
                });
            }
        });



        sliderData = owlSlider.data('owlCarousel') || {};
        /**@namespace sliderData.goTo*/
        /* slider navigation links handler */
        $(owlSliderHolder,mainSliderControlsHolder).on('click', '.mc-slider-control-link', function (e) {
            e.preventDefault();
            var self, direction;
            self = this;
            direction = self.getAttribute('data-direction');
            if (direction != null) {
                if (typeof sliderData[direction] === 'function') {
                    sliderData[direction]();
                }
            }
        });

        owlSliderHolder.on('click', '.mc-slider-pagination-link', function (e) {
            e.preventDefault();
            var self, index;
            self = this;
            index = self.getAttribute('data-index');
            if (index != null) {
                if (typeof sliderData.goTo === 'function') {
                    sliderData.goTo(index);
                }
            }
        });

        mainSliderPagination.on('click', '.mc-slider-pagination-link', function (e) {
            e.preventDefault();
            var self, index;
            self = this;
            index = self.getAttribute('data-index');
            if (index != null) {
                if (typeof sliderData.goTo === 'function') {
                    sliderData.goTo(index);
                }
            }
        });

    }

    /* happy birthdays */
    if (birthdaysRestaurantsList.length) {
        birthdaysRestaurantsList.on('click', '.mc-happy-birthdays-choose-link', (function () {
            var links;
            links = $('.mc-happy-birthdays-choose-link');
            return function (e) {
                e.preventDefault();
                var self = this;
                links.removeClass('active');
                $(self).addClass('active');
                if (happyBirthdaysActionLink != null) {
                    happyBirthdaysActionLink.setAttribute('data-restaurant', (self.getAttribute('data-restaurant') || ''));
                }
            }

        }()));
        $(happyBirthdaysActionLink).click(function (e) {
            e.preventDefault();
            var self, url, dataRestaurant;
            self = this;
            url = self.href;
            dataRestaurant = self.getAttribute('data-restaurant');
            if (dataRestaurant != null) {
                url += '?restaurant=' + dataRestaurant;
            }
            window.location.href = url;
        });
    }

    /* balanced diet */
    if (balancedDietDetailedList.length) {
        balancedDietDetailedList.on('click', '.mc-balanced-diet-detailed-info-link', function (e) {
            e.preventDefault();
            var self, contentId, contentElement;
            self = this;
            contentId = self.getAttribute('data-contentId');
            if (contentId != null) {
                contentElement = $('#mc-balanced-diet-content-' + contentId);
                contentElement.slideToggle({
                    duration: 600
                });
            }
            return false;
        });
    }

    var fixTopMenuHeight = (function () {
        var topMenuTitles, topMenuIconWrappers, topWideBar, topMenuReplacement, pageHeader, resultHeight;
        topMenuTitles = $('.mc-menu-top-title', topMenuHolder);
        topMenuIconWrappers = $('.mc-top-menu-icon-wrapper', topMenuHolder);
        topWideBar = $('#mc-menu-fixed-wide-bar');
        topMenuReplacement = $('#mc-top-menu-replacement');
        pageHeader = $('#mc-page-header');
        return function (options) {
            var logoHeight, topMenuBlocksMax, titleHeight, titleMaxHeight = 0, iconWrapperHeight,
                preventTopMenuBlocksFixIfIdExists, preventTopMenuBlocksFix = false, b, bLen, blockId, options;
            options = options || {};
            preventTopMenuBlocksFixIfIdExists = options.preventTopMenuBlocksFixIfIdExists || [];
            for (b = 0, bLen = preventTopMenuBlocksFixIfIdExists.length; b < bLen; b += 1) {
                if (preventTopMenuBlocksFix === true) {
                    break;
                }
                preventTopMenuBlocksFix = !!ge(preventTopMenuBlocksFixIfIdExists[b]);

            }
            preventTopMenuBlocksFixIfIdExists = ge(preventTopMenuBlocksFixIfIdExists);
            logoHeight = logoLarge.length && logoLarge.height();

            if (topMenuBlocks.length) {
                if (logoHeight && logoHeight > 0) {
                    /* set menu block height */
                    if (!preventTopMenuBlocksFix) {
                        topMenuBlocks.each(function () {
                            var self = $(this);
                            if (!logoHeight || (logoHeight < 0)) {
                                self.height('auto');
                            } else {
                                TweenLite.to(self, 0.4, {css: {height: logoHeight}});
                            }
                        });
                    }

                    /* fix top menu titles height differencies  */
                    topMenuTitles.each(function () {
                        titleHeight = $(this).css({height: 'auto'}).outerHeight();
                        if (titleHeight > titleMaxHeight) {
                            titleMaxHeight = titleHeight;
                        }
                    });
                    topMenuTitles.each(function () {
                        $(this).css({height: titleMaxHeight});
                    });
                    topWideBar.css({height: titleMaxHeight});
                    iconWrapperHeight = logoHeight - titleMaxHeight;
                    topMenuIconWrappers.each(function () {
                        $(this).css({height: iconWrapperHeight});
                    });
                } else {
                    /* top menu blocks. fix height differences when large logo is not presented. */
                    topMenuBlocksMax = 0;
                    topMenuTitles.each(function () {
                        titleHeight = $(this).css({height: 'auto'}).outerHeight();
                        if (titleHeight > titleMaxHeight) {
                            titleMaxHeight = titleHeight;
                        }
                    });
                    topMenuTitles.each(function () {
                        $(this).css({height: titleMaxHeight});
                    });
                    topMenuIconWrappers.each(function () {
                        $(this).css({height: 'auto'});
                    });
                    topMenuBlocks.each(function () {
                        var self, height;
                        self = $(this);
                        self.css({height: 'auto'});
                        height = self.height();
                        if (height > topMenuBlocksMax) {
                            topMenuBlocksMax = height;
                        }
                    });
                    topMenuBlocks.each(function () {
                        //$(this).height(topMenuBlocksMax);
                        TweenLite.to(this, 0.4, {css: {height: topMenuBlocksMax}});
                    });
                }
            } else {
                if (logoHeight && logoHeight > 0) {
                    resultHeight = logoHeight - (pageHeader.length ? pageHeader.outerHeight() : 0);
                    topMenuReplacement.css({height: resultHeight});
                    //b.addClass('mc-no-top-menu');
                } else {
                    topMenuReplacement.css({height: 'auto'});
                    //b.removeClass('mc-no-top-menu');
                }
            }
        }
    }());

    var fillFormWithValues = function (form, data) {
        if (!form) {
            return log('fillFormWithValues: missing form argument.');
        }
        if (!data || Object.prototype.toString.call(data).substring(8, 14) !== 'Object') {
            return log('fillFormWithValues: invalid type of data argument');
        }
        var firstName, lastName, bDate, bDateArray, mobilePhone, homePhone, email,
            nameInput, bDateDayInput, bDateMonthInput, bDateYearInput, phoneInput, emailInput,
            finalName, finalPhone, finalBDateDay, finalBDateMonth, finalBDateYear;
        /**@namespace data.first_name*/
        /**@namespace data.last_name*/
        /**@namespace data.bdate*/
        /**@namespace data.birthday*/
        /**@namespace data.mobile_phone*/
        /**@namespace data.home_phone*/
        firstName = data.first_name || '';
        lastName = data.last_name || '';
        bDate = data.bdate || data.birthday || null;
        mobilePhone = data.mobile_phone || '';
        homePhone = data.home_phone || '';
        email = data.email || '';
        finalName = firstName + ' ' + lastName;
        finalPhone = (homePhone ? homePhone : '') + (mobilePhone ? ', ' + mobilePhone : '');
        if (bDate !== null) {
            if (/[\.\/]/.test(bDate)) {
                bDateArray = bDate.split(/[\.\/]/g);
                finalBDateDay = bDateArray[0];
                finalBDateDay = (finalBDateDay && finalBDateDay.length === 1) ? '0' + finalBDateDay : finalBDateDay;
                finalBDateMonth = bDateArray[1];
                finalBDateMonth = (finalBDateMonth && finalBDateMonth.length === 1) ? '0' + finalBDateMonth : finalBDateMonth;
                finalBDateYear = bDateArray[2];
            }
        }
        nameInput = $('input[name=fullname]', form);
        bDateDayInput = $('select[name=birtday-day]', form);
        bDateMonthInput = $('select[name=birtday-month]', form);
        bDateYearInput = $('select[name=birtday-year]', form);
        phoneInput = $('input[name=phone]', form);
        emailInput = $('input[name=email]', form);

        nameInput.val(finalName);
        finalBDateDay && bDateDayInput.length && bDateDayInput[0].selectize.setValue(finalBDateDay);
        finalBDateMonth && bDateMonthInput.length && bDateMonthInput[0].selectize.setValue(finalBDateMonth);
        finalBDateYear && bDateYearInput.length && bDateYearInput[0].selectize.setValue(finalBDateYear);
        (mobilePhone || homePhone) && phoneInput.val(finalPhone);
        email && emailInput.length && emailInput.val(email);
        return false;
    };

    /* autofill form handlers */
    /**@namespace window.VK.Auth.getLoginStatus*/
    /**@namespace r.session.mid*/
    if (fillFormVk.length) {
        var formToFillId, formToFill, fillFormWithVk, VkUserId = null;
        formToFillId = fillFormVk.attr('data-form');
        formToFill = $('#' + formToFillId);
        if (!formToFill.length) {
            return log('fillFormVk: form specified in data-attribute does not exist.');
        }
        /* load VK asynchronously */
        fillFormWithVk = function () {
            if (!window.VK) {
                return log('fillFormWithVk: typeof VK is ' + typeof window.VK);
            }
            VK.init({
                apiId: 4265745
            });
            VK.Auth.getLoginStatus(function (r) {
                if (r.status && r.status === 'connected') {
                    VkUserId = r.session.mid;
                }
            });
            /**@namespace VK.Api*/
            fillFormVk.click(function (e) {
                e.preventDefault();
                if (VkUserId !== null) {
                    VK.Api.call('users.get', {uids: VkUserId, fields: 'first_name, last_name, bdate, contacts'}, function (r) {
                        var data = r.response && r.response[0];
                        fillFormWithValues(formToFill, data);
                    });
                } else {
                    VK.Auth.login(function (r) {
                        if (r.status && r.status === 'connected') {
                            VkUserId = r.session.mid;
                            VK.Api.call('users.get', {uids: VkUserId, fields: 'first_name, last_name, bdate, contacts'}, function (r) {
                                var data = r.response && r.response[0];
                                fillFormWithValues(formToFill, data);
                            });
                        }
                    });
                }
            });
            fillFormVk.addClass('visible');
            return false;
        };
        loadAsync(document, 'https://vkontakte.ru/js/api/openapi.js', fillFormWithVk);
    }

    /**@namespace window.FB.login*/
    /**@namespace r.authResponse.userID*/
    if (fillFormFb.length) {
        var formToFillId, formToFill, fillFormWithFb, FbUserId = null;
        formToFillId = fillFormFb.attr('data-form');
        formToFill = $('#' + formToFillId);
        if (!formToFill.length) {
            return log('fillFormVk: form specified in data-attribute does not exist.');
        }
        /* load FB asynchronously */
        fillFormWithFb = function () {
            if (!window.FB) {
                return log('fillFormWithFb: typeof FB is ' + typeof window.FB);
            }
            FB.init({
                appId      : 636371683094929,
                status     : true,
                xfbml      : true
            });
            FB.getLoginStatus(function (r) {
                if (r.status === 'connected') {
                    FbUserId = r.authResponse.userID;
                }
            });
            fillFormFb.click(function (e) {
                e.preventDefault();
                if (FbUserId !== null) {
                    FB.api('/me', function (r) {
                        fillFormWithValues(formToFill, r);
                    });
                } else {
                    FB.login(function (r) {
                        if (r.status === 'connected') {
                            FbUserId = r.authResponse.userID;
                            FB.api('/me', function (r) {
                                fillFormWithValues(formToFill, r);
                            })
                        }
                    });
                }
            });
            fillFormFb.addClass('visible');
            return false;
        };
        loadAsync(document, '//connect.facebook.net/en_US/all.js', fillFormWithFb);
    }

    /* contacts page */
    if (contactsBlocksHolder.length) {
        var contactBlocksInfoHolders, maxHeight = 0, currentHeight;
        contactBlocksInfoHolders = $('.mc-contacts-block-info-holder', contactsBlocksHolder);
        contactBlocksInfoHolders.each(function () {
            var self;
            self = $(this);
            self.css({minHeight: 'auto'});
            currentHeight = self.height();
            if (currentHeight > maxHeight) {
                maxHeight = currentHeight;
            }
        });
        contactBlocksInfoHolders.css({minHeight: maxHeight});
    }

    /* app GOL page */
    var golSliderWrapper = $('#mc-app-gol-slider-wrapper');
    if (golSliderWrapper.length) {
        var golSliderLargeSlide = $('#mc-app-gol-slide-large'),
            golArtistPhoto = $('#mc-gol-artist-photo'),
            golArtistDescr = $('#mc-app-gol-artist-description'),
            golThumsHolders = $('.mc-app-gol-gallery-nav-holder', golSliderWrapper);

        golSliderWrapper.on('click', '.mc-app-gol-gallery-nav', (function () {
            var loadedIndexes = {}, artDescr, loadArtistImages;
            /*global artDescription*/
            artDescr = $.extend({}, window.artDescription);
            loadArtistImages = function (storeKey, target, src) {
                var tempImage;
                if (storeKey && loadedIndexes.hasOwnProperty(storeKey)) {
                    target.attr('src', src);
                } else {
                    TweenLite.to(target, 0.4, {css: {autoAlpha: 0.7}, onComplete: function () {
                        tempImage = new Image();
                        tempImage.onload = function () {
                            target.attr('src', src);
                            TweenLite.to(target, 0.4, {css: {autoAlpha: 1}});
                        };
                        tempImage.onerror = function () {
                            TweenLite.to(target, 0.4, {css: {autoAlpha: 1}});
                        };
                        tempImage.src = src;
                    }});
                }
            };
            return function (e) {
                e.preventDefault();
                var self, imgSrc, artistPhoto, artist, artistDescription, dataIndex, tempImage;
                self = $(this);
                imgSrc = self.data('src');
                artistPhoto = self.data('photo');
                artist = self.data('artist');
                artistDescription = artDescr[artist];
                loadArtistImages('i' + artist, golSliderLargeSlide, imgSrc);
                loadArtistImages('p' + artist, golArtistPhoto, artistPhoto);
                golArtistDescr.html(artistDescription);
                golThumsHolders.removeClass('active');
                $('#mc-app-gol-nav-holder-' + artist).addClass('active');
            }
        })());
    }


    d.on('click', '.mc-products-popup-description-tabs-nav-link', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var self = $(this),
            targetTab = $('#' + self.data('tab')),
            navHolder = $('#mc-products-popup-description-tabs-nav'),
            tabsHolder = $('#mc-products-popup-description-tabs-holder');
        if (targetTab.length) {
            $('.mc-products-popup-description-tabs-nav-link', navHolder).removeClass('active');
            self.addClass('active');
            $('.mc-products-popup-description-tab', tabsHolder).hide();
            targetTab.show();
        }

    });

    var resizeFunctions = (function () {
        var processing = false;
        return function () {
            if (processing === true) {
                return false;
            }
            processing = true;
            setTimeout(function () {
                var ww, wh;
                ww = w.width();
                wh = w.height();
                fixTopMenuHeight({
                    preventTopMenuBlocksFixIfIdExists: ['job-benefits-top-block']
                });
                if (ww < 991) {
                    draggableProducts.draggable('disable');
                    restaurantMiddleColumn.css({marginBottom: wh});
                } else {
                    draggableProducts.draggable('enable');
                    restaurantMiddleColumn.css({marginBottom: 0});
                }
                if (ww < 768) {
                    chosenDataListScrollHolder.data('jsp') && chosenDataListScrollHolder.data('jsp').destroy();
                } else {
                    //$('#mc-chosenData-scroll-holder').jScrollPane({
                    //	verticalDragMinHeight: 15,
                    //	verticalDragMaxHeight: 15
                    //});
                }
                processing = false;
            }, 200);
            return false;
        }
    }());
    resizeFunctions();

    /* hide/show scroll top link */
    var toggleScrollTopLink = (function () {
        var inProcess = false,
            isVisible = false;
        return function (show) {
            if (inProcess) {
                return;
            }
            if (show && isVisible) {
                return;
            }
            inProcess = true;
            if (show) {
                scrollTopLink.addClass('visible');
                isVisible = true;
            } else {
                scrollTopLink.removeClass('visible');
                isVisible = false;
            }
            setTimeout(function () {
                inProcess = false;
            }, 50);
        };
    }());

    /* to be sure we have actual height of elements containing images */
    w.load(resizeFunctions);

    w.resize(resizeFunctions);

    w.scroll(function () {
        var scrollTop = w.scrollTop();
        if (scrollTop > 70) {
            toggleScrollTopLink(true);
        } else {
            toggleScrollTopLink();
        }
    });

    footer.on('click', '#mc-footer-arrowLink,#mc-footer-more-sites', function (e) {
        e.preventDefault();
        footer.toggleClass('collapsed');
        footerCollapsedPart.stop(true, false).slideToggle(0, function () {
            w.scrollTo(d.height(), 0);

            if ($('#footer').hasClass('up')) {
                $('#footer').css({"margin-top":"-50px"});
                $('#footer').removeClass('up');
            } else {
                $('#footer').css({"margin-top":"-87px"});
                $('#footer').addClass('up');
            }
        });
        //console.log('привет');
    });

    /* functions */
    /* short for document.getElementById */
    function ge (id) {
        return document.getElementById(id);
    }

    /* short for document.createElement */
    function ce (el) {
        return document.createElement(el);
    }

    /* short for console.log Could be used as return value to prevent function invocation. */
    function log (message, type) {
        if (window.console && console.log) {
            //type = window.console && console.hasOwnProperty(type) || 'log';
            //console[type](message);
        }
        return false;
    }

    function placeText (el, text) {
        if (typeof el === 'string') el = ge(el);
        if (!el) {
            return log('placeText: element not found.');
        }
        if (el.textContent != null) {
            el.textContent = text;
        } else if (el.innerText != null) {
            el.innerText = text;
        }
        return false;
    }

    /* declination */
    function declOfNum (number, titles) {
        var cases = [2, 0, 1, 1, 1, 2];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }

    /* load script asynchronously */
    function loadAsync (d, src, callback) {
        var head, script;
        head = d.getElementsByTagName('head')[0];
        script = d.createElement('script');
        script.src = src;
        script.onload = callback;
        head.appendChild(script);
        return false;
    }

    function number_format( number, decimals, dec_point, thousands_sep ) {	// Format a number with grouped thousands
        //
        // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
        // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +	 bugfix by: Michael White (http://crestidg.com)

        var i, j, kw, kd, km;

        // input sanitation & defaults
        if( isNaN(decimals = Math.abs(decimals)) ){
            decimals = 2;
        }
        if( dec_point == undefined ){
            dec_point = ",";
        }
        if( thousands_sep == undefined ){
            thousands_sep = ".";
        }

        i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

        if( (j = i.length) > 3 ){
            j = j % 3;
        } else{
            j = 0;
        }

        km = (j ? i.substr(0, j) + thousands_sep : "");
        kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
        //kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).slice(2) : "");
        kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");


        return km + kw + kd;
    }

    /*ссылки для пеерхода с медийки*/
    var hashLink = window.location.hash;
    console.log(hashLink);

    switch (hashLink) {
        case '#happymeal':
            $('[data-filter="mc-menu-filtergroup-mchappymeal"]').trigger('click');
            break
        case '#drinks':
            $('[data-filter="mc-menu-filtergroup-mcdrinks"]').trigger('click');
            break
        case '#mcbreakfast':
            $('[data-filter="mc-menu-filtergroup-mcbreakfast"]').trigger('click');
            break
        case '#desserts':
            $('[data-filter="mc-menu-filtergroup-mcdessert"]').trigger('click')
            break
    }

    (function bindModalWindow() {
        'use strict';

        var modalWindow = $('.modal-window'),
            modalWindowContent = $('.modal-window__content'),
            modalWindowCloseButton = $('.modal-window__close-button');

        modalWindow.click(function(e) {
            if (!$(e.target).closest(modalWindowContent).length || $(e.target).is(modalWindowCloseButton)) {
                $(this).fadeOut();
            }
        });
    })();

    if (location.pathname === '/ru/' || location.pathname === '/en/' || location.pathname === '/by/') {
        $('#ny-modal').fadeIn().css('display', 'table');
    }
});

// На 19% выгоднее

var theLanguage = $('html').attr("lang");

if(theLanguage == "ru"){
     $('#mc-products-switching-block-545').before('<div class="benefit">Выгода до <span>25</span> %</div>');
     $('#mc-products-chosen-salver-holder').before('<div class="mc-calculator-message">Узнайте стоимость заказа и энергетическую ценность продуктов</div>');
     $('#mc-products-header-dynamic').after('<a href="https://mccombo.mcdonalds.by" target="_blank"><img src="/assets/mcdonalds/images/mccombo.png?v=1.1" alt="" style="margin: 0.5em 0 1em 0;"></a>');
}
if(theLanguage == "en"){
    $('#mc-products-switching-block-545').before('<div class="benefit">Save up to <span>25</span> %</div>');
        $('#mc-products-chosen-salver-holder').before('<div class="mc-calculator-message">Define the price of your order and nutritional value of the product</div>');
        $('#mc-products-header-dynamic').after('<a href="https://mccombo.mcdonalds.by" target="_blank"><img src="/assets/mcdonalds/images/mccombo.png?v=1.1" alt="" style="margin: 0.5em 0 1em 0;"></a>');
}
if(theLanguage == "by"){
     $('#mc-products-switching-block-545').before('<div class="benefit">Выгада да <span>25</span>%</div>');
          $('#mc-products-chosen-salver-holder').before('<div class="mc-calculator-message">Даведайцеся пра кошт заказу і энергетычную каштоўнасць прадуктаў</div>');
          $('#mc-products-header-dynamic').after('<a href="https://mccombo.mcdonalds.by" target="_blank"><img src="/assets/mcdonalds/images/mccombo.png?v=1.1" alt="" style="margin: 0.5em 0 1em 0;"></a>');
}

// Make popover for ORDER-BIRTHDAY page
$('.b__popover').popover({
  html: true,
  trigger: 'hover',
  placement: 'left',
  content: function(){return '<img src="'+$(this).data('img') + '" />';}
});
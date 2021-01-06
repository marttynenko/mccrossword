(function() {

    'use strict';

    var stop_catch_ac = false;
    var version = "1.3.6";
    var logUrl = "//log.bumlam.com/";
    var pixelUrl = "//pback.adsniperleads.com/ap_back_url.php";
    var _s_trk_redirect = "{s_trk}";
    var _hash = "074717969e366d12069ed58f0fbae868";
    var _expire = 1440;
    var _urlMatching = [];
    var _availablePixels = {'vc':1, 'ac':1, 'a6':1};
    var _uniquePixels = {'vc':1, 'ac':1, 'a6':1};

    var _gpPixelVisit = "//sync.bumlam.com/?src=gp3&cmp=pxleadvisitc314&act=v314&cid=A2D4FF&r64=";
    var _gpPixelActions = {};
    var _gpPixelLeads = {};
    var _availableLeadPixels = {};
    var _sendMatchingOverIframe = true;

    var iframeUrl = 'https://static.bumlam.com/pixel.html';

    ///Macroses for new identification service
    var idnUseNewID = false,
        idnRequestOldService = false,
        idnSaveLocalCookie = false,
        idnNewIDServiceURL = "//synce.user-red.com",
        idnOldIDServiceURL = "//sync.bumlam.com/?src=etg1",
        idnFrameIDServiceURL = "//static.user-red.com/engine/id.html",
        idnReceiveIDInGet = false;

    ///Macroses for cookie matching
    var cmEnabled = true,
        cmURL     = '//cm.g.doubleclick.net/pixel?google_nid=adsniperru&google_cm&extra1={UID}&extra2={EXTRA2}',
        apnCMEnabled = false, 
        apnCMURL = '//ib.adnxs.com/getuid?https%3A%2F%2Fsync.bumlam.com%2F%3Fsrc%3Dapn3%26extra1%3D{UID}%26extra2%3D{EXTRA2}%26uid%3D%24UID',
        aidataCMEnabled = true, 
        aidataCMURL = '//x01.aidata.io/0.gif?pid=ADSNIPER&id={UID}',
        cleverdataCMEnabled = true, 
        cleverdataCMURL = '//sync.1dmp.io/pixel.gif?cid=7a2124ff-81d5-4d21-af9b-e5783790758d&pid=w&uid={UID}',
        weboramaCMEnabled = true, 
        weboramaCMURL = '//redirect.frontend.weborama.fr/rd?url=https%3A%2F%2Fsync.bumlam.com%2F%3Fsrc%3Dwbr1%26uid%3D{WEBO_CID}',
        amberdataCMEnabled = true, 
        amberdataCMURL = '//dmg.digitaltarget.ru/1/6701/i/i?a=140&e={UID}&i={RND}';

    var _aclickType = "GA",
        ACLICKTYPES = {GA:"GA", OMNITURE:"Omniture", ADCOMBO:"AdCombo"};

    var _actionsCallbacks = [];

    var suuid3 = '',
        suuid3_pure = '',
        uids = {},
        scrolledOn = 0,
        loadTime = Date.now();

    var encodesafe64 = function(data2encode) {
        var retdata = window.btoa(data2encode);
        retdata = retdata.replace(/\//g, '_');
        retdata = retdata.replace(/\+/g, '-');
        retdata = retdata.replace(/=/g, '*');
        return retdata;
    };

    var getUidFromCode = function(code) {
        var d = code.replace('#', '_'),
            coded = encodesafe64(d).replace(/\//g, '_')
            .replace(/\+/g, '-')
            .replace(/=/g, '*');

        return coded;

    };

    var extra2 = '',
    src, cid, cmp, act;


    var gpPixelParams = _gpPixelVisit.replace('?','&').split('&'),
        keyP, valP;
    for(var j = 0; j<gpPixelParams.length; j++) {
        keyP = gpPixelParams[j].split("=");
        valP = keyP[1];
        keyP = keyP[0];
        if(keyP === 'src') {
            src = valP;
        } else if(keyP === 'cid') {
            cid = valP;
        } else if(keyP === 'act') {
            act = valP;
        } else if(keyP === 'cmp') {
            cmp = valP;
        }
    }

extra2 = [src, cid, cmp, act].join('.');

    var codeSender = {};
    (function(adsn) {
        var DELIMITER = '_',
            isReady = false;

        function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }

        function getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        function deleteCookie(name) {
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }

        adsn.detectPrivateMode = function(callback) {
            var is_private,
                isWebkit = !!window.webkitRequestFileSystem,
                isFF = !!window.sidebar,
                isIE = document.all && document.compatMode;
            if (isWebkit) {
                window.webkitRequestFileSystem(
                    window.TEMPORARY, 1,
                    function() {
                        callback(false);
                    },
                    function() {
                        callback(true);
                    }
                );
            } else if (window.indexedDB && isFF) {
                try {
                    var db = window.indexedDB.open('test');
                } catch (e) {
                    is_private = true;
                }
                if (typeof is_private === 'undefined') {
                    retry(
                        function isDone() {
                            return db.readyState === 'done' ? true : false;
                        },
                        function next(is_timeout) {
                            if (!is_timeout) {
                                is_private = db.result ? false : true;
                            }
                        }
                    );
                }
            } else if (isIE) {
                is_private = false;
                try {
                    if (!window.indexedDB) {
                        is_private = true;
                    }
                } catch (e) {
                    is_private = true;
                }
            } else if (window.localStorage && /Safari/.test(window.navigator.userAgent)) {
                try {
                    window.localStorage.setItem('test', 1);
                } catch (e) {
                    is_private = true;
                }
                if (typeof is_private === 'undefined') {
                    is_private = false;
                    window.localStorage.removeItem('test');
                }
            }

            function retry(isDone, next) {
                var current_trial = 0,
                    max_retry = 50,
                    is_timeout = false,
                    id = window.setInterval(
                        function() {
                            if (isDone()) {
                                window.clearInterval(id);
                                next(is_timeout);
                            }
                            if (current_trial++ > max_retry && !isWebkit) {
                                window.clearInterval(id);
                                is_timeout = true;
                                next(is_timeout);
                            }
                        },
                        10
                    );
            }
            retry(
                function isDone() {
                    return typeof is_private !== 'undefined' ? true : false;
                },
                function next() {
                    callback(is_private);
                }
            );
        };



        adsn.Init = function(options) {
            var CODE_URL = options.code_url,
                CODE_FRAME_URL = options.code_frame_url,
                FRAME_URL = options.frame_url,
                OLD_CODE = options.old_code_url,
                ucode = '',
                privateString;

            this.detectPrivateMode(function(isPrivate) {
                if (isPrivate) {
                    var privateString = 'undefined&isprivatemode=true';
                    options.on_code_ready(privateString);
                } else {
                    loadUserCode(function() {
                        if (typeof options.on_code_ready === "function" && window._userCode !== undefined) {
                            var code = (_userCode || '');
                            options.on_code_ready(code);
                        }
                    });
                }
            });

            function addFrame(url) {
                var fr_code = document.createElement('iframe');
                fr_code.src = url;
                fr_code.style.display = 'none';
                (document.body || document.head).appendChild(fr_code);
            }
            /**
             * Get code from iframe message
             */
            function getCode(msg) {
                var info = '' + msg.data;
                if (info.indexOf('code:') !== -1 && !isReady) {
                    ucode = info.replace(/code:/g, '');
                    isReady = true;
                    if (typeof options.on_code_ready === "function") {
                        options.on_code_ready(ucode);
                        deleteCookie('etaguid');
                        if (idnSaveLocalCookie) {
                            setCookie('etaguid', ucode, 1000);
                        }
                    }
                }
            }

            function loadFrameWithParams() {
                var codeFrameURL = CODE_FRAME_URL + '?service=' +
                    encodeURIComponent(CODE_URL) + '&code=' + window._userCode;
                addEvent(window, 'message', getCode);
                addFrame(codeFrameURL);
            }

            function getMinCode(code1, code2) {

                code1 = (code1 || '').replace('#', DELIMITER);
                code2 = (code2 || '').replace('#', DELIMITER);

                var ts1 = code1.split(DELIMITER)[1] * 1,
                    ts2 = code2.split(DELIMITER)[1] * 1,
                    rcode = ts1 >= ts2 ? code2 : code1;

                if (isNaN(ts1)) {
                    rcode = code2;
                } else if (isNaN(ts2)) {
                    rcode = code1;
                }

                return rcode;
            }

            

            /**
             * Load user code from JS
             * @param [function] onLoad Callback after loading
             */
            function loadUserCode(onLoad) {
                var sc = document.createElement('script'),
                    sd = document.createElement('script'),
                    so = document.createElement('script'),
                    time = 20,
                    interval,
                    codeBuffer,
                    codeFromCookie = idnSaveLocalCookie ? getCookie('etaguid') : '',
                    isCacheWork = true,
                    codeFromService;

                function onLoadEnd() {
                        uids.ocode = window._userCode;
                        var codeFromOldService = (window._userCode || '').replace('#', '_'),
                            minCode = getMinCode(uids.ncode1, uids.ocode);

                        if (isCacheWork) {
                            codeFromService = codeBuffer;
                            window._userCode = minCode;
                            if (uids.ncode1 !== minCode) {
                                window._userCode += '&uid=' + minCode;
                            }
                        }

                        onLoad();
                        loadFrameWithParams();
                    }
                    
                try {                   

                    sc.src = CODE_URL;
                    sc.onload = function() {
                        codeBuffer = window._userCode;
                        uids.ncode1 = window._userCode;
                        window._userCode = '';
                        sd.src = CODE_URL;
                        sd.async = false;
                        sd.onload = function() {
                            uids.ncode2 = window._userCode;
                            clearInterval(interval);
                            isCacheWork = codeBuffer === window._userCode && time >= 0;
                            if (idnRequestOldService) {
                                so.src = OLD_CODE;
                                so.async = false;
                                so.onload = onLoadEnd;
                            } else {
                                onLoadEnd();
                            }


                            (document.body || document.head).appendChild(so);
                        };
                        setTimeout(function() {
                            (document.body || document.head).appendChild(sd)
                        }, 500);
                    };
                    sc.onerror = function() {
                        loadFrameWithParams();
                        onLoad();
                    };
                    (document.body || document.head).appendChild(sc);
                } catch (e) {
                    time = 0;
                }
                interval = setInterval(function() {
                    time -= 1;
                    if (time < 0) {
                        clearInterval(interval);
                        loadFrameWithParams();
                    }
                }, 150);
            }
            /**
             * Crossbrowser eventlistener
             */
            function addEvent(object, type, callback) {
                if (object == null || typeof(object) == 'undefined') return;
                if (object.addEventListener) {
                    object.addEventListener(type, callback, false);
                } else if (object.attachEvent) {
                    object.attachEvent('on' + type, callback);
                } else {
                    object['on' + type] = callback;
                }
            }
        };
    })(codeSender);



    var hash = function(str) {
        var hash = 0;
        var char = '';
        var str = String(str);
        if (str.length == 0) {
            return hash;
        }
        for (var i = 0; i < str.length; i++) {
            char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString(16);
    };

    var addslashes = function(str) {
        str = unescape(encodeURIComponent(str));
        str = (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
        return str.substring(0, 256)
    };

    var getCookie = function(e) {
        var cookie_name = e + "=";
        var cookie_length = document.cookie.length;
        var cookie_begin = 0;
        var value_begin = 0;
        var t = -1;
        while (cookie_begin < cookie_length) {
            value_begin = cookie_begin + cookie_name.length;
            if (document.cookie.substring(cookie_begin, value_begin) == cookie_name) {
                t = document.cookie.indexOf(";", value_begin);
                if (t == -1) {
                    t = cookie_length;
                }
                return unescape(document.cookie.substring(value_begin, t));
            }
            cookie_begin = document.cookie.indexOf(" ", cookie_begin) + 1;
            if (cookie_begin === 0) {
                break;
            }
        }
        return null;
    };

    var setCookie = function(e, t, n) {
        if (!n) {
            n = new Date();
        }

        var host = window.location.host;
        if (host.split('.').length === 1) {
            document.cookie = e + "=" + escape(t) + "; expires=" + n.toGMTString() + "; path=/";
        } else {
            var domain = host.split('.');
            domain.shift();
            domain = '.' + domain.join('.');

            document.cookie = e + "=" + escape(t) + "; expires=" + n.toGMTString() + "; path=/; domain=" + domain;

            if (getCookie(e) == null || getCookie(e) != escape(t)) {
                domain = '.' + host;
                document.cookie = e + "=" + escape(t) + "; expires=" + n.toGMTString() + "; path=/; domain=" + domain;
            }
        }
    };

    var getQueryVariable = function(variable) {
        var query = (window.location.search || window.location.hash || '').substring(1).replace('?','&');
        var vars = query.split('&');
        var i = 0;
        var pair = [];
        while (i < vars.length) {
            pair = vars[i].split('=');
            if (decodeURIComponent(pair[0]) == variable) {
                return decodeURIComponent(pair[1]);
            }
            i++;
        }
    };

    var getUtmVariablesHash = function() {
        var vars = window.location.search.substring(1).split('&');
        var i = 0;
        var joined_utm = [];
        var joined_utm_hash = '';
        while (i < vars.length) {
            if (decodeURIComponent(vars[i]).toLowerCase().indexOf('utm_') === 0) {
                joined_utm.push(decodeURIComponent(vars[i]));
            }
            i++;
        }
        return hash(joined_utm.sort().join(';'));
    };

    var preg_quote = function(str, delimiter) {
        str = str + '';
        return str.replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
    };

    var getRequest = function(url) {
        var hiddenPix = new Image();
        hiddenPix.src = window.location.protocol + url;
    };

    var getRequestIframe = function(url) {
        var codedUrl = encodesafe64(url);
        var frame = document.createElement('iframe');
        frame.src = iframeUrl + '?url='+codedUrl;
        frame.width = 0;
        frame.height = 0;
        frame.style="display:none;";
        window.frame = frame;
        document.body.appendChild(frame);
    };

    var postVisit = function(act, lead, custom_data) {
        if (typeof act != 'string' || act == '' || _gpPixelVisit == '') {
            return;
        }
        var data64 = '';
        var s_trk = '';
        var custom_data_ = '';

        if (getCookie(_hash)) {
            s_trk = ",'s_trk':'" + getCookie(_hash) + "'";
        }
        if (typeof custom_data == 'number' || typeof custom_data == 'string') {
            custom_data_ = ",'custom_data':'" + addslashes(custom_data) + "'";
        }

        if (act == 'lead') {
            data64 = "&data64=" + encodesafe64("{'act':'lead','lead':" + lead + s_trk + custom_data_ + "}");
        }
        if (act != 'lead' && act != 'visit') {
            data64 = "&data64=" + encodesafe64("{'act':'" + act + "'" + s_trk + custom_data_ + "}");
        }

        var uidString = idnReceiveIDInGet ? "&suuid3=" + suuid3 : "";

        getRequest(_gpPixelVisit + encodesafe64(document.referrer) + data64 + uidString + "&ver=" + version + "&cb=" + Math.random());
    };

    var postLead = function(opts) {
        if (Object.prototype.toString.call(opts) !== '[object Object]') {
            return false;
        }
        if (typeof opts.lead == 'undefined') {
            return false;
        }
        
        if(!(_availableLeadPixels && _availableLeadPixels[opts.lead])) {
            return false;
        }
        
        var lead = opts.lead,
            revenue = opts.price || 0,
            type = opts.type || 'accept',
            pid = 'general',
            currency = opts.currency || 'USD',
            apid = Math.floor(Date.now() / 1000),
            url = pixelUrl + '?type=' + type +
                        '&pid=' + pid +
                        '&offer_id=' + _hash +
                        '&apid=' + apid +
                        '&currency=' + currency;


        postVisit('lead', lead);

        if (typeof opts.price === 'number') {
            url += '&plus=' + revenue;
        }
        if (getCookie(_hash)) {
            url += '&s_trk=' + getCookie(_hash);
        }
        url +=  '&cb=' + Math.random();

        getRequest(url);

        if (typeof _gpPixelLeads !== 'undefined' && typeof _gpPixelLeads[opts.lead] !== 'undefined' && _gpPixelLeads[opts.lead] !== '') {
            getRequest(_gpPixelLeads[opts.lead] + encodesafe64(document.referrer) + "&cb=" + Math.random());
        }

        return true;
    };

    var catchAC = function(hits) {
        var videos = document.querySelectorAll('video'),
            i = 0;
        switch (_aclickType) {
            case ACLICKTYPES.GA:
                if (hits * 1 > 1) {
                    return postClick('ac');
                }
                setTimeout(function() {
                    postClick('ac');
                }, 30000);
                window.addEventListener('scroll', onScrollGA);
                break;
            case ACLICKTYPES.OMNITURE:
                window.addEventListener('click', onClickOmniture);
                for (; i < videos.length; i++) {
                    videos[i].addEventListener('playing', function() {
                        postClick('ac');
                    });
                }
                setTimeout(function() {
                    postClick('ac');
                }, 30000);
                window.addEventListener('scroll', onScrollOmniture);

                break;
            case ACLICKTYPES.ADCOMBO:
                setInterval(function() {
                    postClick('time');
                }, 3000);
                window.addEventListener('scroll', onScrollAdcombo);
                break;
            default:
                break;
        }


        return true;
    };

    function onClickOmniture(e) {

        var ANCHOR_TAG = 'a',
            IMG_TAG = 'img',
            INPUT_TAG = 'input',
            COLOR_TYPE = 'color',
            SOCIAL_CLASS = 'social',
            SLIDE_CLASS = 'slide',
            CAROUSEL_CLASS = 'carousel';

        var tagName = (e.target.tagName || '').toLowerCase(),
            className = (e.target.className || '').toLowerCase(),
            type = (e.target.type || '').toLowerCase(),
            clickActionDone = false;

        clickActionDone = tagName === ANCHOR_TAG ||
            tagName === IMG_TAG ||
            (tagName === INPUT_TAG && type === COLOR_TYPE) ||
            className.indexOf(SOCIAL_CLASS) !== -1 ||
            (className.indexOf(SLIDE_CLASS) !== -1 || className.indexOf(CAROUSEL_CLASS) !== -1);

        if (clickActionDone) {
            postClick('ac');
        } else {
            return;
        }
    }


    var catchA6 = function(hits) {
        if (hits * 1 > 1) {
            return postClick('a6');
        }
        return true;
    };

    var postCM = function(action) {
            if (suuid3 === '') {
                setTimeout(function() { postCM(action); }, 1000);
                return;
            } else {
                if(typeof action === 'function') {
                    action(suuid3);
                } else {
                    return suuid3;
                }
            }
        };

    var postClick = function(type, custom_data) {
        var strk = '';
        var use_cookie = true;

        if (typeof type == 'undefined' || !type) {
            return null;
        }
        type = type.toLowerCase();

        if (!(typeof _availablePixels != 'undefined' && typeof _availablePixels[type] != 'undefined' && _availablePixels[type] === 1)) {
            return null;
        }
        if (!(typeof _uniquePixels != 'undefined' && typeof _uniquePixels[type] != 'undefined' && _uniquePixels[type] === 1)) {
            use_cookie = false;
        }

        if (use_cookie && getCookie(_hash + '_' + type) == 1) {
            return null;
        }

        var dt = new Date();
        var expires = new Date(dt.valueOf() + _expire * 60 * 1000);
        if (use_cookie) {
            setCookie(_hash + '_' + type, 1, expires);
        }

        postVisit(type, false, custom_data);

        if (getCookie(_hash)) {
            strk = getCookie(_hash);
        } else if (type !== 'data') {
            return null;
        }

        var url = logUrl + '?src=tr&s_act=' + type + '&s_trk=' + strk;
        getRequest(url);

        var actCB = _actionsCallbacks && _actionsCallbacks[type],
            customEl;

        if(actCB) {
            if(actCB.type === 'js')  {
                customEl = document.createElement('script');
                customEl.type = 'text/javascript';
            } else if(actCB.type === 'html')  {
                customEl = document.createElement('div');                
            } 
            customEl.innerHTML = atob(actCB.code);
            
            var bInterval = setInterval(function () {

                var b = document.body;
                if(b) {
                    b.appendChild(customEl);    
                    clearInterval(bInterval);
                }
                
            }, 500);
            
            
        } 

        if (typeof _gpPixelActions != 'undefined' && typeof _gpPixelActions[type] != 'undefined' && _gpPixelActions[type] !== '') {
            var data64 = '';
            if (typeof custom_data == 'number' || typeof custom_data == 'string') {
                data64 = "&data64=" + encodesafe64("{'custom_data':'" + addslashes(custom_data) + "'}");
            }
            getRequest(_gpPixelActions[type] + encodesafe64(document.referrer) + data64 + "&cb=" + Math.random());
        }

        return true;
    };

    var timeoutPost = function(opts, time) {
        setTimeout(function() {
            postLead(opts);
        }, +time * 1000);
    };

    var clearCookie = function() {
        var dt = new Date();
        var past_time = new Date(dt.valueOf() - 86400);
        setCookie(_hash + '_hits', 1, past_time);
        setCookie(_hash + '_ac', 0, past_time);
        setCookie(_hash + '_vc', 0, past_time);
        setCookie(_hash + '_a1', 0, past_time);
        setCookie(_hash + '_a2', 0, past_time);
        setCookie(_hash + '_a3', 0, past_time);
        setCookie(_hash + '_a4', 0, past_time);
        setCookie(_hash + '_a5', 0, past_time);
        setCookie(_hash + '_a6', 0, past_time);
    };

    var init = function() {
        var strk = getQueryVariable('s_trk');
        var dt = new Date();
        var hits = 1;
        var expires = new Date(dt.valueOf() + _expire * 60 * 1000);
        var utm_hash = getUtmVariablesHash();

        if (_s_trk_redirect == "{s_trk}") {
            _s_trk_redirect = "";
        }

        if (typeof strk == 'undefined' || !strk) {
            strk = _s_trk_redirect;
        }
        if (utm_hash != 0) {
            if (!getCookie(_hash + '_utm') || getCookie(_hash + '_utm') != utm_hash) {
                clearCookie();
            }
            setCookie(_hash + '_utm', utm_hash, expires);
        }
        if (strk) {
            if (!getCookie(_hash) || getCookie(_hash) != strk) {
                clearCookie();
            }
            setCookie(_hash, strk, expires);
        }

        if (getCookie(_hash + '_hits')) {
            hits = getCookie(_hash + '_hits') * 1 + 1;
        }
        setCookie(_hash + '_hits', hits, expires);
        catchAC(hits);
        catchA6(hits);
        postClick('vc');
        

        
        makeCM(suuid3);
        

        var _url = window.location.href.replace(/https?:\/\//i, "");
        if (_urlMatching.length > 0) {
            _urlMatching.forEach(function(_urlParams) {
                if (!(typeof _urlParams == 'undefined' || typeof _urlParams.url == 'undefined')) {

                    var _urlMatch = _urlParams.url;
                    _urlMatch = _urlMatch.split('*').join('``');
                    _urlMatch = preg_quote(_urlMatch);
                    _urlMatch = _urlMatch.split('``').join('.*');

                    var rgx = new RegExp(_urlMatch, 'i');
                    if (rgx.test(_url)) {
                        if (typeof _urlParams.timeout == 'undefined' || _urlParams.timeout <= 0) {
                            postLead({
                                'lead': _urlParams.lead,
                                'price': _urlParams.price,
                                'type':  _urlParams.type,
                                 'currency': _urlParams.currency
                            });
                        } else {
                            timeoutPost({
                                'lead': _urlParams.lead,
                                'price': _urlParams.price,
                                'type':  _urlParams.type,
                                'currency': _urlParams.currency
                            }, _urlParams.timeout);
                        }
                    }
                }
            });
        };

        postVisit('visit');
    };

    var done = false;
    if (idnUseNewID) {
        codeSender.Init({
            code_url: idnNewIDServiceURL,
            old_code_url: idnOldIDServiceURL,
            code_frame_url: idnFrameIDServiceURL,
            on_code_ready: function(ucode) {
                var pcode = (ucode || '').split('&')[0];
                if (!done) {
                    suuid3 = ucode.indexOf('privatemode') != -1 ? ucode : getUidFromCode(pcode);
                    suuid3_pure = pcode.replace('#', '_').split('_')[0];
                    if(_gpPixelVisit !=='') {
                        _gpPixelVisit += '&se_uid3='+suuid3_pure;
                    }
                    for(var s in _gpPixelActions) {
                        if(_gpPixelActions.hasOwnProperty(s)){
                        _gpPixelActions[s] += '&se_uid3='+suuid3_pure;
                        }
                    } 
                    init();
                    done = !done;
                }
            }
        });
    } else {
        init();
    }

    function onScrollGA() {
        if (stop_catch_ac) {
            return;
        }
        var pageY = window.pageYOffset || document.documentElement.scrollTop;
        var innerHeight = document.documentElement.clientHeight;

        if (pageY > innerHeight) {
            postClick('ac');
            stop_catch_ac = true;
        }
    }

   function onScrollOmniture(e) {
        if (stop_catch_ac) {
            return;
        }
        var pageY = window.pageYOffset || document.documentElement.scrollTop;
        var innerHeight = (document.documentElement.scrollHeight-document.documentElement.clientHeight) * 0.5;

        var pageHeight = Math.abs(document.documentElement.scrollHeight * 0.5);
        innerHeight = innerHeight || pageHeight;

        if (pageY > pageHeight || pageY > innerHeight) {
            postClick('ac');
            stop_catch_ac = true;
        }
    }

    function onScrollAdcombo(e) {
        if (stop_catch_ac) {
            return;
        }
        var pageY = window.pageYOffset || document.documentElement.scrollTop;
        var innerHeight = document.documentElement.scrollHeight * 0.5;

        var pageHeight = (document.documentElement.scrollHeight - document.documentElement.offsetHeight) * 0.5;
        pageHeight = Math.max(pageHeight, innerHeight);

        if (pageY - scrolledOn > pageHeight) {
            scrolledOn = pageY;
            postClick('ac');
            stop_catch_ac = true;
        }

    }

    function makeCM(uid) {
        var url = cmURL.replace('{UID}', uid).replace('{EXTRA2}', extra2),
            apnUrl = apnCMURL.replace('{UID}', uid).replace('{EXTRA2}', extra2),
            aidataUrl = aidataCMURL.replace('{UID}', uid).replace('{EXTRA2}', extra2),
            cleverdataUrl = cleverdataCMURL.replace('{UID}', uid).replace('{EXTRA2}', extra2),
            weboramaUrl = weboramaCMURL.replace('{UID}', uid).replace('{EXTRA2}', extra2),
            amberdataUrl = amberdataCMURL.replace('{UID}', uid).replace('{EXTRA2}', extra2).replace('{RND}', Math.random());

        var sendRequest = _sendMatchingOverIframe ? getRequestIframe : getRequest;

        if(cmEnabled) {
            sendRequest(url);
        }
        if(apnCMEnabled) {
            sendRequest(apnUrl);
        }
        if(aidataCMEnabled) {
            sendRequest(aidataUrl);
        }
        if(cleverdataCMEnabled) {
            sendRequest(cleverdataUrl);
        }
        if(weboramaCMEnabled) {
            sendRequest(weboramaUrl);
        }
        if(amberdataCMEnabled) {
            sendRequest(amberdataUrl);
        }
    }


    // export Ads
    window.CPA_slite = {
        VERSION: version,
        postLead: postLead,
        postClick: postClick,
        postCM: postCM
    };
}());
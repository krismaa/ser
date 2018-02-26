
var Autobot = {
    version: '1.4.0',
    domain: window['location']['protocol'] + '//cdn.jsdelivr.net/gh/krismaa/ser@ser1/',
    botWnd: '',
    botPremWnd: '',
    botEmailWnd: '',
    facebookWnd: '',
    isLogged: false,
    Account: {
        player_id: Game['player_id'],
        player_name: Game['player_name'],
        world_id: Game['world_id'],
        locale_lang: Game['locale_lang'],
        premium_grepolis: Game['premium_user'],
        csrfToken: Game['csrfToken']
    },
    trial_time: 0,
    premium_time: 9999,
    facebook_like: 0,
    toolbox_element: null,
    init: function() {
        ConsoleLog.Log('Initialize Autobot', 0);
        Autobot['authenticate']();
        Autobot['obServer']();
        Autobot['isActive']();
        Autobot['setToolbox']();
        Autobot['initAjax']();
        Autobot['initMapTownFeature']();
        Autobot['fixHumanMessage']();
        Assistant['init']()
    },
    setToolbox: function() {
        Autobot['toolbox_element'] = $('.nui_bot_toolbox')
    },
    authenticate: function() {
        DataExchanger.Auth('login', Autobot.Account, ModuleManager['callbackAuth'])
    },
    obServer: function() {
        $.Observer(GameEvents['notification']['push'])['subscribe']('GRCRTNotification', function() {
            $('#notification_area>.notification.getPremiumNotification')['on']('click', function() {
                Autobot['getPremium']()
            })
        })
    },
    initWnd: function() {
        if (Autobot['isLogged']) {
            if (typeof Autobot['botWnd'] != 'undefined') {
                try {
                    Autobot['botWnd']['close']()
                } catch (F) {}
                ;Autobot['botWnd'] = undefined
            }
            ;if (typeof Autobot['botPremWnd'] != 'undefined') {
                try {
                    Autobot['botPremWnd']['close']()
                } catch (F) {}
                ;Autobot['botPremWnd'] = undefined
            }
            ;Autobot['botWnd'] = Layout['dialogWindow']['open']('', 'Autobot v' + Autobot['version'], 500, 350, '', false);
            Autobot['botWnd']['setHeight']([350]);
            Autobot['botWnd']['setPosition'](['center', 'center']);
            var _0xa9d1x2 = Autobot['botWnd']['getJQElement']();
            _0xa9d1x2['append']($('<div/>', {
                "\x63\x6C\x61\x73\x73": 'menu_wrapper',
                "\x73\x74\x79\x6C\x65": 'left: 78px; right: 14px'
            })['append']($('<ul/>', {
                "\x63\x6C\x61\x73\x73": 'menu_inner'
            })['prepend'](Autobot['addMenuItem']('AUTHORIZE', 'Account', 'Account'))['prepend'](Autobot['addMenuItem']('CONSOLE', 'Assistant', 'Assistant'))['prepend'](Autobot['addMenuItem']('SUPPORT', 'Support', 'Support'))['prepend'](Autobot['addMenuItem']('ASSISTANT', 'Console', 'Console'))));
            if (typeof Autobuild !== 'undefined') {
                _0xa9d1x2['find']('.menu_inner li:last-child')['before'](Autobot['addMenuItem']('CONSTRUCTMODULE', 'Build', 'Autobuild'))
            }
            ;if (typeof Autoculture !== 'undefined') {
                _0xa9d1x2['find']('.menu_inner li:last-child')['before'](Autobot['addMenuItem']('CULTUREMODULE', 'Culture', 'Autoculture'))
            }
            ;if (typeof Autofarm !== 'undefined') {
                _0xa9d1x2['find']('.menu_inner li:last-child')['before'](Autobot['addMenuItem']('FARMMODULE', 'Farm', 'Autofarm'))
            }
            ;$('#Autobot-AUTHORIZE')['click']()
        }
    },
    addMenuItem: function(_0xa9d1x3, _0xa9d1x4, _0xa9d1x5) {
        return $('<li/>')['append']($('<a/>', {
            "\x63\x6C\x61\x73\x73": 'submenu_link',
            "\x68\x72\x65\x66": '#',
            "\x69\x64": 'Autobot-' + _0xa9d1x3,
            "\x72\x65\x6C": _0xa9d1x5
        })['click'](function() {
            Autobot['botWnd']['getJQElement']()['find']('li a.submenu_link')['removeClass']('active');
            $(this)['addClass']('active');
            Autobot['botWnd']['setContent2'](Autobot['getContent']($(this)['attr']('rel')));
            if ($(this)['attr']('rel') == 'Console') {
                var _0xa9d1x6 = $('.terminal');
                var _0xa9d1x7 = $('.terminal-output')[0]['scrollHeight'];
                _0xa9d1x6['scrollTop'](_0xa9d1x7)
            }
        })['append']($('<span/>', {
            "\x63\x6C\x61\x73\x73": 'left'
        })['append']($('<span/>', {
            "\x63\x6C\x61\x73\x73": 'right'
        })['append']($('<span/>', {
            "\x63\x6C\x61\x73\x73": 'middle'
        })['html'](_0xa9d1x4)))))
    },
    getContent: function(_0xa9d1x8) {
        if (_0xa9d1x8 == 'Console') {
            return ConsoleLog['contentConsole']()
        } else {
            if (_0xa9d1x8 == 'Account') {
                return Autobot['contentAccount']()
            } else {
                if (_0xa9d1x8 == 'Support') {
                    return Autobot['contentSupport']()
                } else {
                    if (typeof window[_0xa9d1x8] != 'undefined') {
                        return window[_0xa9d1x8]['contentSettings']()
                    }
                    ;return ''
                }
            }
        }
    },
    contentAccount: function() {
        var _0xa9d1x9 = {
            "\x4E\x61\x6D\x65\x3A": Game['player_name'],
            "\x57\x6F\x72\x6C\x64\x3A": Game['world_id'],
            "\x52\x61\x6E\x6B\x3A": Game['player_rank'],
            "\x54\x6F\x77\x6E\x73\x3A": Game['player_villages'],
            "\x4C\x61\x6E\x67\x75\x61\x67\x65\x3A": Game['locale_lang'],
            "\x50\x72\x65\x6D\x69\x75\x6D\x3A\x20": (Autobot['premium_time'] - Timestamp['now']()) >= 0 ? Autobot['secondsToTime'](Autobot['premium_time'] - Timestamp['now']()) + '<span id="get_premium" onclick="Autobot.getPremium();"></span>' : 'No premium' + '<span id="get_premium" onclick="Autobot.getPremium();"></span>',
            "\x54\x72\x69\x61\x6C\x3A": ((Autobot['trial_time'] - Timestamp['now']()) >= 0 ? Autobot['secondsToTime'](Autobot['trial_time'] - Timestamp['now']()) : 'Trial is over') + (Autobot['facebook_like'] == 0 ? '<a href="#" id="get_7days" onclick="Autobot.botFacebookWnd();">Get 3 free days!</a>' : '')
        };
        var _0xa9d1xa = $('<table/>', {
            "\x63\x6C\x61\x73\x73": 'game_table',
            "\x63\x65\x6C\x6C\x73\x70\x61\x63\x69\x6E\x67": '0',
            "\x77\x69\x64\x74\x68": '100%'
        })['append'](function() {
            var _0xa9d1xb = 0;
            var _0xa9d1xc = $('<tbody/>');
            $['each'](_0xa9d1x9, function(_0xa9d1xd, _0xa9d1xe) {
                _0xa9d1xc['append']($('<tr/>', {
                    "\x63\x6C\x61\x73\x73": _0xa9d1xb % 2 ? 'game_table_even' : 'game_table_odd'
                })['append']($('<td/>', {
                    "\x73\x74\x79\x6C\x65": 'background-color: #DFCCA6;width: 30%;'
                })['html'](_0xa9d1xd))['append']($('<td/>')['html'](_0xa9d1xe)));
                _0xa9d1xb++
            });
            return _0xa9d1xc
        });
        var _0xa9d1xf = FormBuilder['gameWrapper']('Account', 'account_property_wrapper', _0xa9d1xa, 'margin-bottom:9px;')[0]['outerHTML'];
        _0xa9d1xf += $('<div/>', {
            "\x69\x64": 'grepobanner',
            "\x73\x74\x79\x6C\x65": ''
        })[0]['outerHTML'];
        return _0xa9d1xf
    },
    contentSupport: function() {
        return $('<fieldset/>', {
            "\x69\x64": 'Support_tab',
            "\x73\x74\x79\x6C\x65": 'float:left; width:472px;height: 270px;'
        })['append']($('<legend/>')['html']('Grepobot Support'))['append']($('<div/>', {
            style: 'float: left;'
        })['append'](FormBuilder['selectBox']({
            id: 'support_type',
            name: 'support_type',
            label: 'Type: ',
            styles: 'width: 167px;margin-left: 18px;',
            value: 'Bug report',
            options: [{
                value: 'Bug report',
                name: 'Bug report'
            }, {
                value: 'Feature request',
                name: 'Feature request'
            }, {
                value: 'Financial',
                name: 'Financial'
            }, {
                value: 'Other',
                name: 'Other'
            }]
        }))['append'](FormBuilder['input']({
            id: 'support_input_email',
            name: 'Email',
            style: 'margin-left: 12px;width: 166px;',
            value: '',
            type: 'email'
        }))['append'](FormBuilder['input']({
            id: 'support_input_subject',
            name: 'Subject',
            style: 'margin-top: 0;width: 166px;',
            value: '',
            type: 'text'
        }))['append'](FormBuilder['textarea']({
            id: 'support_textarea',
            name: 'Message',
            value: ''
        }))['append'](FormBuilder['button']({
            name: 'Send',
            style: 'margin-top: 0;'
        })['on']('click', function() {
            var _0xa9d1x10 = $('#Support_tab')['serializeObject']();
            var _0xa9d1x11 = false;
            if (typeof _0xa9d1x10['support_input_email'] === 'undefined' || _0xa9d1x10['support_input_email'] == '') {
                _0xa9d1x11 = 'Please enter your email.'
            } else {
                if (typeof _0xa9d1x10['support_input_subject'] === 'undefined' || _0xa9d1x10['support_input_subject'] == '') {
                    _0xa9d1x11 = 'Please enter a subject.'
                } else {
                    if (typeof _0xa9d1x10['support_textarea'] === 'undefined' || _0xa9d1x10['support_textarea'] == '') {
                        _0xa9d1x11 = 'Please enter a message.'
                    } else {
                        if (typeof _0xa9d1x10['support_input_email'] !== 'undefined' && !/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/['test'](_0xa9d1x10['support_input_email'])) {
                            _0xa9d1x11 = 'You email is not valid!'
                        }
                    }
                }
            }
            ;if (_0xa9d1x11) {
                HumanMessage['error'](_0xa9d1x11)
            } else {
                DataExchanger.Auth('supportEmail', $['extend']({
                    csrfToken: Autobot['Account']['csrfToken'],
                    player_name: Autobot['Account']['player_name'],
                    player_id: Autobot['Account']['player_id'],
                    world_id: Autobot['Account']['world_id']
                }, _0xa9d1x10), function(_0xa9d1x9) {
                    if (_0xa9d1x9['success']) {
                        if (typeof Autobot['botWnd'] != 'undefined') {
                            try {
                                Autobot['botWnd']['close']()
                            } catch (F) {}
                            ;Autobot['botWnd'] = undefined
                        }
                        ;HumanMessage['success']('Thank you, your email has been send!')
                    }
                })
            }
        })))['append']($('<div/>', {
            style: 'float: right; width: 215px;'
        })['append']($('<a/>', {
            id: 'Facebook_grepobot',
            target: '_blank',
            href: 'https://www.facebook.com/BotForGrepolis/'
        })['html']('<img src="https://bot.grepobot.com/images/facebook_page.png" title="Facebook Grepobot"/>'))['append']($('<a/>', {
            id: 'Skype_grepobot',
            href: 'skype:grepobot.com?chat'
        })['html']('<img src="https://bot.grepobot.com/debug/onlineCheck.php?_=' + Math['random']() + '" title="Skype Grepobot"/>')))
    },
    checkAlliance: function() {
        if (!$('.allianceforum.main_menu_item')['hasClass']('disabled')) {
            DataExchanger['members_show'](function(_0xa9d1x9) {
                if (_0xa9d1x9['plain']['html'] != undefined) {
                    jQuery['each']($(_0xa9d1x9['plain']['html'])['find']('#ally_members_body .ally_name a'), function() {
                        var _0xa9d1xe = atob($(this)['attr']('href'));
                        console['log'](JSON['parse'](_0xa9d1xe['substr'](0, _0xa9d1xe['length'] - 3)))
                    })
                }
            })
        }
    },
    getPremium: function() {
        if (Autobot['isLogged']) {
            $.Observer(GameEvents['menu']['click'])['publish']({
                option_id: 'premium'
            });
            if (typeof Autobot['botPremWnd'] != 'undefined') {
                try {
                    Autobot['botPremWnd']['close']()
                } catch (F) {}
                ;Autobot['botPremWnd'] = undefined
            }
            ;if (typeof Autobot['botWnd'] != 'undefined') {
                try {
                    Autobot['botWnd']['close']()
                } catch (F) {}
                ;Autobot['botWnd'] = undefined
            }
            ;Autobot['botPremWnd'] = Layout['dialogWindow']['open']('', 'Autobot v' + Autobot['version'] + ' - Premium', 500, 350, '', false);
            Autobot['botPremWnd']['setHeight']([350]);
            Autobot['botPremWnd']['setPosition'](['center', 'center']);
            var _0xa9d1x12 = $('<div/>', {
                id: 'payment'
            })['append']($('<div/>', {
                id: 'left'
            })['append']($('<ul/>', {
                id: 'time_options'
            })['append']($('<li/>', {
                class: 'active'
            })['append']($('<span/>', {
                class: 'amount'
            })['html']('1 Month'))['append']($('<span/>', {
                class: 'price'
            })['html'](' ¬&nbsp;4,99')))['append']($('<li/>')['append']($('<span/>', {
                class: 'amount'
            })['html']('2 Month'))['append']($('<span/>', {
                class: 'price'
            })['html'](' ¬&nbsp;9,99'))['append']($('<div/>', {
                class: 'referenceAmount'
            })['append']($('<div/>', {
                class: 'reference',
                style: 'transform: rotate(17deg);'
            })['html']('+12 Days&nbsp;'))))['append']($('<li/>')['append']($('<span/>', {
                class: 'amount'
            })['html']('4 Months'))['append']($('<span/>', {
                class: 'price'
            })['html'](' ¬&nbsp;19,99'))['append']($('<div/>', {
                class: 'referenceAmount'
            })['append']($('<div/>', {
                class: 'reference',
                style: 'transform: rotate(17deg);'
            })['html']('+36 Days&nbsp;'))))['append']($('<li/>')['append']($('<span/>', {
                class: 'amount'
            })['html']('10 Months'))['append']($('<span/>', {
                class: 'price'
            })['html'](' ¬&nbsp;49,99'))['append']($('<div/>', {
                class: 'referenceAmount'
            })['append']($('<div/>', {
                class: 'reference',
                style: 'transform: rotate(17deg);'
            })['html']('+120 Days&nbsp;'))))))['append']($('<div/>', {
                id: 'right'
            })['append']($('<div/>', {
                id: 'pothead'
            }))['append']($('<div/>', {
                id: 'information'
            })['append']($('<span/>', {
                class: 'text'
            })['html']('1 month for only  ¬4,99'))['append']($('<span/>', {
                class: 'button'
            })['html']('Buy'))));
            Autobot['botPremWnd']['setContent2'](_0xa9d1x12);
            var _0xa9d1x13 = 0;
            $('#time_options li')['on']('click', function() {
                $('#time_options li')['removeClass']('active');
                $(this)['addClass']('active');
                _0xa9d1x13 = $(this)['index']();
                var _0xa9d1x14 = $('#payment #information .text');
                if (_0xa9d1x13 == 0) {
                    _0xa9d1x14['html']('1 month for only  ¬4,99')
                } else {
                    if (_0xa9d1x13 == 1) {
                        _0xa9d1x14['html']('2 month +12 days for only  ¬9,99')
                    } else {
                        if (_0xa9d1x13 == 2) {
                            _0xa9d1x14['html']('4 months +36 days for only  ¬19,99')
                        } else {
                            if (_0xa9d1x13 == 3) {
                                _0xa9d1x14['html']('10 months +120 days for only  ¬49,99')
                            }
                        }
                    }
                }
            });
            $('#payment #information')['on']('click', function() {
                var _0xa9d1x15 = window['open'](Autobot['domain'] + 'paypal/process.php?payment=' + _0xa9d1x13 + '&player_id=' + Autobot['Account']['player_id'], 'grepolis_payment', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,height=650,width=800');
                var _0xa9d1x16 = setInterval(function() {
                    if (!_0xa9d1x15 || _0xa9d1x15['closed']) {
                        clearInterval(_0xa9d1x16);
                        Autobot['authenticate']()
                    }
                }, 500)
            })
        }
    },
    botFacebookWnd: function() {
        if (Autobot['isLogged'] && Autobot['facebook_like'] == 0) {
            if (typeof Autobot['facebookWnd'] != 'undefined') {
                try {
                    Autobot['facebookWnd']['close']()
                } catch (F) {}
                ;Autobot['facebookWnd'] = undefined
            }
            ;Autobot['facebookWnd'] = Layout['dialogWindow']['open']('', 'Autobot v' + Autobot['version'] + ' - Get 3 days free!', 275, 125, '', false);
            Autobot['facebookWnd']['setHeight']([125]);
            Autobot['facebookWnd']['setPosition'](['center', 'center']);
            var _0xa9d1x12 = $('<div/>', {
                id: 'facebook_wnd'
            })['append']($('<div/>', {
                class: 'activate_background'
            }))['append']('<span class="like-share-text">Like & share and get <b>3 days</b> free premium.</span><a href="#" class="fb-share"><span class="fb-text">Share</spanclass></a><div class="fb_like"><div class="fb-like" data-href="https://www.facebook.com/BotForGrepolis/" data-layout="button" data-action="like" data-show-faces="false" data-share="false"></div></div>');
            Autobot['facebookWnd']['setContent2'](_0xa9d1x12);
            $('.ui-dialog #facebook_wnd')['closest']('.gpwindow_content')['css']({
                "\x6C\x65\x66\x74": '-9px',
                "\x72\x69\x67\x68\x74": '-9px',
                "\x74\x6F\x70": '35px'
            });
            var _0xa9d1x17 = false;
            var _0xa9d1x18 = false;
            var _0xa9d1x19 = function() {
                if (_0xa9d1x17 || _0xa9d1x18) {
                    Autobot['upgrade3Days']()
                }
                ;if (_0xa9d1x17 && _0xa9d1x18) {
                    $.Observer(GameEvents['window']['quest']['open'])['publish']({
                        quest_type: 'hermes'
                    });
                    HumanMessage['success']('You have received 3 days premium! Thank you for sharing.');
                    if (typeof Autobot['facebookWnd'] != 'undefined') {
                        try {
                            Autobot['facebookWnd']['close']()
                        } catch (F) {}
                        ;Autobot['facebookWnd'] = undefined
                    }
                    ;if (typeof Autobot['botWnd'] != 'undefined') {
                        try {
                            Autobot['botWnd']['close']()
                        } catch (F) {}
                        ;Autobot['botWnd'] = undefined
                    }
                }
            };
            if (window['fbAsyncInit'] == undefined) {
                window['fbAsyncInit'] = function() {
                    FB['init']({
                        appId: '1505555803075328',
                        xfbml: true,
                        version: 'v2.4'
                    });
                    FB['Event']['subscribe']('edge.create', function(_0xa9d1x1a) {
                        _0xa9d1x18 = true;
                        _0xa9d1x19()
                    });
                    FB['Event']['subscribe']('edge.remove', function(_0xa9d1x1a) {
                        _0xa9d1x18 = false
                    })
                }
            }
            ;if ($('#facebook-jssdk')['length'] <= 0) {
                (function(_0xa9d1x1b, _0xa9d1x1c, _0xa9d1x3) {
                    var _0xa9d1x1d, _0xa9d1x1e = _0xa9d1x1b['getElementsByTagName'](_0xa9d1x1c)[0];
                    if (_0xa9d1x1b['getElementById'](_0xa9d1x3)) {
                        return
                    }
                    ;_0xa9d1x1d = _0xa9d1x1b['createElement'](_0xa9d1x1c);
                    _0xa9d1x1d['id'] = _0xa9d1x3;
                    _0xa9d1x1d['src'] = '//connect.facebook.net/en_US/sdk.js';
                    _0xa9d1x1e['parentNode']['insertBefore'](_0xa9d1x1d, _0xa9d1x1e)
                }(document, 'script', 'facebook-jssdk'))
            } else {
                FB['XFBML']['parse']()
            }
            ;$('#facebook_wnd .fb-share')['on']('click', function() {
                FB['ui']({
                    method: 'share',
                    href: 'https://www.facebook.com/BotForGrepolis/'
                }, function(_0xa9d1x1a) {
                    if (_0xa9d1x1a && !_0xa9d1x1a['error_code']) {
                        _0xa9d1x17 = true;
                        _0xa9d1x19()
                    }
                })
            })
        }
    },
    upgrade3Days: function() {
        DataExchanger.Auth('upgrade3Days', Autobot.Account, function(_0xa9d1x9) {
            if (_0xa9d1x9['success']) {
                DataExchanger.Auth('login', Autobot.Account, ModuleManager['callbackAuth'])
            }
        })
    },
    initAjax: function() {
        $(document)['ajaxComplete'](function(_0xa9d1x1f, _0xa9d1x20, _0xa9d1x21) {
            if (_0xa9d1x21['url']['indexOf'](Autobot['domain']) == -1) {
                var _0xa9d1x22 = _0xa9d1x21['url']['split']('?');
                var _0xa9d1x23 = _0xa9d1x22[0]['substr'](6) + '/' + _0xa9d1x22[1]['split']('&')[1]['substr'](7);
                if (typeof Autobuild !== 'undefined') {
                    Autobuild['calls'](_0xa9d1x23)
                }
            }
        })
    },
    verifyEmail: function() {
        if (Autobot['isLogged']) {
            DataExchanger['email_validation'](function(_0xa9d1x9) {
                if (_0xa9d1x9['plain']['html'] != undefined) {
                    DataExchanger.Auth('verifyEmail', {
                        key: btoa(Autobot['stringify']({
                            player_id: Autobot['Account']['player_id'],
                            player_email: $(_0xa9d1x9['plain']['html'])['find']('#current_email_adress')['html']()
                        }))
                    }, function(_0xa9d1x9) {
                        if (_0xa9d1x9['success'] != undefined) {
                            Autobot['arrowActivated']()
                        }
                    })
                }
            })
        }
    },
    randomize: function(_0xa9d1x24, _0xa9d1x25) {
        return Math['floor'](Math['random']() * (_0xa9d1x25 - _0xa9d1x24 + 1)) + _0xa9d1x24
    },
    secondsToTime: function(_0xa9d1x26) {
        var _0xa9d1x27 = Math['floor'](_0xa9d1x26 / 86400);
        var _0xa9d1x28 = Math['floor']((_0xa9d1x26 % 86400) / 3600);
        var _0xa9d1x29 = Math['floor'](((_0xa9d1x26 % 86400) % 3600) / 60);
        return (_0xa9d1x27 ? _0xa9d1x27 + ' days ' : '') + (_0xa9d1x28 ? _0xa9d1x28 + ' hours ' : '') + (_0xa9d1x29 ? _0xa9d1x29 + ' minutes ' : '')
    },
    timeToSeconds: function(_0xa9d1x2a) {
        var _0xa9d1x2b = _0xa9d1x2a['split'](':')
          , _0xa9d1x1c = 0
          , _0xa9d1x2c = 1;
        while (_0xa9d1x2b['length'] > 0) {
            _0xa9d1x1c += _0xa9d1x2c * parseInt(_0xa9d1x2b['pop'](), 10);
            _0xa9d1x2c *= 60
        }
        ;return _0xa9d1x1c
    },
    arrowActivated: function() {
        var _0xa9d1x2d = $('<div/>', {
            "\x63\x6C\x61\x73\x73": 'helpers helper_arrow group_quest d_w animate bounce',
            "\x64\x61\x74\x61\x2D\x64\x69\x72\x65\x63\x74\x69\x6F\x6E": 'w',
            "\x73\x74\x79\x6C\x65": 'top: 0; left: 360px; visibility: visible; display: none;'
        });
        Autobot['toolbox_element']['append'](_0xa9d1x2d);
        _0xa9d1x2d['show']()['animate']({
            left: '138px'
        }, 'slow')['delay'](10000)['fadeOut']('normal');
        setTimeout(function() {
            Autobot['botFacebookWnd']()
        }, 25000)
    },
    createNotification: function(_0xa9d1x2e, _0xa9d1x2f) {
        //var _0xa9d1x30 = (typeof Layout['notify'] == 'undefined') ? new NotificationHandler() : Layout;
        //_0xa9d1x30['notify']($('#notification_area>.notification')['length'] + 1, _0xa9d1x2e, '<span><b>' + 'Autobot' + '</b></span>' + _0xa9d1x2f + '<span class='small notification_date'>' + 'Version ' + Autobot['version'] + '</span>')
    },
    toHHMMSS: function(_0xa9d1x31) {
        var _0xa9d1x32 = ~~(_0xa9d1x31 / 3600);
        var _0xa9d1x33 = ~~((_0xa9d1x31 % 3600) / 60);
        var _0xa9d1x34 = _0xa9d1x31 % 60;
        ret = '';
        if (_0xa9d1x32 > 0) {
            ret += '' + _0xa9d1x32 + ':' + (_0xa9d1x33 < 10 ? '0' : '')
        }
        ;ret += '' + _0xa9d1x33 + ':' + (_0xa9d1x34 < 10 ? '0' : '');
        ret += '' + _0xa9d1x34;
        return ret
    },
    stringify: function(_0xa9d1x35) {
        var _0xa9d1x36 = typeof _0xa9d1x35;
        if (_0xa9d1x36 === 'string') {
            return '"' + _0xa9d1x35 + '"'
        }
        ;if (_0xa9d1x36 === 'boolean' || _0xa9d1x36 === 'number') {
            return _0xa9d1x35
        }
        ;if (_0xa9d1x36 === 'function') {
            return _0xa9d1x35.toString()
        }
        ;var _0xa9d1x37 = [];
        for (var _0xa9d1x38 in _0xa9d1x35) {
            _0xa9d1x37['push']('"' + _0xa9d1x38 + '":' + this['stringify'](_0xa9d1x35[_0xa9d1x38]))
        }
        ;return '{' + _0xa9d1x37['join'](',') + '}'
    },
    isActive: function() {
        setTimeout(function() {
            DataExchanger.Auth('isActive', Autobot.Account, Autobot['isActive'])
        }, 180000)
    },
    town_map_info: function(_0xa9d1x39, _0xa9d1x3a) {
        if (_0xa9d1x39 != undefined && _0xa9d1x39['length'] > 0 && _0xa9d1x3a['player_name']) {
            for (var _0xa9d1x3b = 0; _0xa9d1x3b < _0xa9d1x39['length']; _0xa9d1x3b++) {
                if (_0xa9d1x39[_0xa9d1x3b]['className'] == 'flag town') {
                    if (typeof Assistant !== 'undefined') {
                        if (Assistant['settings']['town_names']) {
                            $(_0xa9d1x39[_0xa9d1x3b])['addClass']('active')
                        }
                    }
                    ;$(_0xa9d1x39[_0xa9d1x3b])['append']('<div class="player_name">' + (_0xa9d1x3a['player_name'] || '') + '</div>');
                    $(_0xa9d1x39[_0xa9d1x3b])['append']('<div class="town_name">' + _0xa9d1x3a['name'] + '</div>');
                    $(_0xa9d1x39[_0xa9d1x3b])['append']('<div class="alliance_name">' + (_0xa9d1x3a['alliance_name'] || '') + '</div>');
                    break
                }
            }
        }
        ;return _0xa9d1x39
    },
    initWindow: function() {
        $('.nui_main_menu')['css']('top', '286px');
        $('<div/>', {
            class: 'nui_bot_toolbox'
        })['append']($('<div/>', {
            class: 'bot_menu'
        })['append']($('<ul/>')['append']($('<li/>', {
            id: 'Autofarm_onoff',
            class: 'disabled'
        })['append']($('<span/>', {
            class: 'autofarm'
        })['mousePopup'](new MousePopup('Not authenticated'))))['append']($('<li/>', {
            id: 'Autoculture_onoff',
            class: 'disabled'
        })['append']($('<span/>', {
            class: 'autoculture'
        })['mousePopup'](new MousePopup('Not authenticated'))))['append']($('<li/>', {
            id: 'Autobuild_onoff',
            class: 'disabled'
        })['append']($('<span/>', {
            class: 'autobuild'
        })['mousePopup'](new MousePopup('Not authenticated'))))['append']($('<li/>', {
            id: 'Autoattack_onoff',
            class: 'disabled'
        })['append']($('<span/>', {
            class: 'autoattack'
        })['mousePopup'](new MousePopup('In development!'))))['append']($('<li/>')['append']($('<span/>', {
            href: '#',
            class: 'botsettings'
        })['on']('click', function() {
            if (Autobot['isLogged']) {
                Autobot['initWnd']()
            }
        })['mousePopup'](new MousePopup('Settings'))))))['append']($('<div/>', {
            id: 'time_autobot',
            class: 'time_row'
        }))['append']($('<div/>', {
            class: 'bottom'
        }))['insertAfter']('.nui_left_box')
    },
    initMapTownFeature: function() {
        var _0xa9d1x3c = function(_0xa9d1x3d) {
            return function() {
                var _0xa9d1x39 = _0xa9d1x3d['apply'](this, arguments);
                return Autobot['town_map_info'](_0xa9d1x39, arguments[0])
            }
        };
        MapTiles['createTownDiv'] = _0xa9d1x3c(MapTiles['createTownDiv'])
    },
    fixHumanMessage: function() {
        HumanMessage = jQuery['extend']({
            enabled: true
        }, HumanMessage);
        var _0xa9d1x3e = function(_0xa9d1x3d) {
            return function() {
                if (this['enabled']) {
                    _0xa9d1x3d['apply'](this, arguments)
                }
            }
        };
        HumanMessage['success'] = _0xa9d1x3e(HumanMessage['success'])
    },
    checkAutoRelogin: function() {
        if (typeof $['cookie']('pid') !== 'undefined' && typeof $['cookie']('ig_conv_last_site') !== 'undefined') {
            var _0xa9d1x3f = $['cookie']('ig_conv_last_site')['match'](/\/\/(.*?)\.grepolis\.com/g)[0]['replace']('//', '')['replace']('.grepolis.com', '');
            DataExchanger.Auth('checkAutorelogin', {
                player_id: $['cookie']('pid'),
                world_id: _0xa9d1x3f
            }, function(_0xa9d1x9) {
                if (_0xa9d1x9 != 0) {
                    setTimeout(function() {
                        DataExchanger['login_to_game_world'](_0xa9d1x3f)
                    }, _0xa9d1x9 * 1000)
                }
            })
        }
    }
};
(function() {
    String['prototype']['capitalize'] = function() {
        return this['charAt'](0)['toUpperCase']() + this['slice'](1)
    }
    ;
    $['fn']['serializeObject'] = function() {
        var _0xa9d1x40 = {};
        var _0xa9d1x41 = this['serializeArray']();
        $['each'](_0xa9d1x41, function() {
            if (_0xa9d1x40[this['name']] !== undefined) {
                if (!_0xa9d1x40[this['name']]['push']) {
                    _0xa9d1x40[this['name']] = [_0xa9d1x40[this['name']]]
                }
                ;_0xa9d1x40[this['name']]['push'](this['value'] || '')
            } else {
                _0xa9d1x40[this['name']] = this['value'] || ''
            }
        });
        return _0xa9d1x40
    }
    ;
    var _0xa9d1x42 = setInterval(function() {
        if (window['$'] != undefined) {
            if ($('.nui_main_menu')['length'] && !$['isEmptyObject'](ITowns['towns'])) {
                clearInterval(_0xa9d1x42);
                Autobot['initWindow']();
                Autobot['initMapTownFeature']();
                $['getScript'](Autobot['domain'] + 'Evaluate.js', function() {
                    $['when']($['getScript'](Autobot['domain'] + 'DataExchanger.js'), $['getScript'](Autobot['domain'] + 'ConsoleLog.js'), $['getScript'](Autobot['domain'] + 'FormBuilder.js'), $['getScript'](Autobot['domain'] + 'ModuleManager.js'), $['getScript'](Autobot['domain'] + 'Assistant.js'), $.Deferred(function(_0xa9d1x43) {
                        $(_0xa9d1x43['resolve'])
                    }))['done'](function() {
                        Autobot['init']()
                    })
                })
            } else {
                if (/grepolis\.com\/start\?nosession/g['test'](window['location']['href'])) {
                    clearInterval(_0xa9d1x42);
                    $['getScript'](Autobot['domain'] + 'Evaluate.js', function() {
                        $['when']($['getScript'](Autobot['domain'] + 'DataExchanger.js'), $['getScript'](Autobot['domain'] + 'Redirect.js'), $.Deferred(function(_0xa9d1x43) {
                            $(_0xa9d1x43['resolve'])
                        }))['done'](function() {
                            Autobot['checkAutoRelogin']()
                        })
                    })
                }
            }
        }
    }, 100)
})()

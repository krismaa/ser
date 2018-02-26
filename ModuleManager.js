ModuleManager = {
    models: {
        Town: function() {
            this['key'] = null;
            this['id'] = null;
            this['name'] = null;
            this['farmTowns'] = {};
            this['relatedTowns'] = [];
            this['currentFarmCount'] = 0;
            this['modules'] = {
                Autofarm: {
                    isReadyTime: 0
                },
                Autoculture: {
                    isReadyTime: 0
                },
                Autobuild: {
                    isReadyTime: 0
                }
            };
            this['startFarming'] = function() {
                Autofarm['startFarming'](this)
            }
            ;
            this['startCulture'] = function() {
                Autoculture['startCulture'](this)
            }
            ;
            this['startBuild'] = function() {
                Autobuild['startBuild'](this)
            }
        }
    },
    Queue: new function() {
        this['running'] = false;
        this['isStarted'] = false;
        this['total'] = 0;
        this['queue'] = [];
        this['add'] = function(_0x15b9x1) {
            this['total']++;
            var _0x15b9x2 = this;
            this['queue']['push'](_0x15b9x1);
            if (!this['running'] && this['isStarted']) {
                this['next']()
            }
            ;return this
        }
        ;
        this['start'] = function() {
            this['isStarted'] = true;
            this['next']()
        }
        ;
        this['next'] = function() {
            this['running'] = false;
            ModuleManager['updateTimer']();
            var _0x15b9x3 = this['queue']['shift']();
            if (_0x15b9x3) {
                this['running'] = true;
                _0x15b9x3['fx']()
            } else {
                if (this['queue']['length'] <= 0) {
                    this['isStarted'] = false;
                    this['total'] = 0;
                    ModuleManager['finished']()
                }
            }
        }
    }
    (),
    currentTown: null,
    playerTowns: [],
    interval: false,
    modules: {
        Autofarm: {
            isOn: true
        },
        Autoculture: {
            isOn: true
        },
        Autobuild: {
            isOn: true
        }
    },
    isPauzed: false,
    init: function() {
        ModuleManager['loadPlayerTowns']();
        ModuleManager['initButtons']();
        ModuleManager['initTimer']()
    },
    start: function() {
        var _0x15b9x4 = false;
        var _0x15b9x5 = null;
        $['each'](ModuleManager['playerTowns'], function(_0x15b9x6, _0x15b9x7) {
            var _0x15b9x8 = Autofarm['checkReady'](_0x15b9x7);
            if (_0x15b9x8 == true) {
                _0x15b9x4 = true;
                ModuleManager['Queue']['add']({
                    townId: _0x15b9x7['id'],
                    fx: function() {
                        _0x15b9x7['startFarming']()
                    }
                })
            } else {
                if (_0x15b9x8 != false && (_0x15b9x5 == null || _0x15b9x8 < _0x15b9x5)) {
                    _0x15b9x5 = _0x15b9x8
                }
            }
            ;var _0x15b9x9 = Autoculture['checkReady'](_0x15b9x7);
            if (_0x15b9x9 == true) {
                _0x15b9x4 = true;
                ModuleManager['Queue']['add']({
                    townId: _0x15b9x7['id'],
                    fx: function() {
                        _0x15b9x7['startCulture']()
                    }
                })
            } else {
                if (_0x15b9x9 != false && (_0x15b9x5 == null || _0x15b9x9 < _0x15b9x5)) {
                    _0x15b9x5 = _0x15b9x9
                }
            }
            ;var _0x15b9xa = Autobuild['checkReady'](_0x15b9x7);
            if (_0x15b9xa == true) {
                _0x15b9x4 = true;
                ModuleManager['Queue']['add']({
                    townId: _0x15b9x7['id'],
                    fx: function() {
                        _0x15b9x7['startBuild']()
                    }
                })
            } else {
                if (_0x15b9xa != false && (_0x15b9x5 == null || _0x15b9xa < _0x15b9x5)) {
                    _0x15b9x5 = _0x15b9xa
                }
            }
        });
        if (_0x15b9x5 == null && !_0x15b9x4) {
            ConsoleLog.Log('Nothing is ready yet!', 0);
            ModuleManager['startTimer'](30, function() {
                ModuleManager['start']()
            })
        } else {
            if (!_0x15b9x4) {
                var _0x15b9xb = (_0x15b9x5 - Timestamp['now']()) + 20;
                ModuleManager['startTimer'](_0x15b9xb, function() {
                    ModuleManager['start']()
                })
            } else {
                ModuleManager['Queue']['start']()
            }
        }
    },
    pauze: function() {
        if (!ModuleManager['isPauzed']) {
            ModuleManager['isPauzed'] = true;
            clearInterval(ModuleManager['interval']);
            Autofarm['pauze']();
            Autoculture['pauze']();
            Autobuild['pauze']();
            $('#time_autobot .caption .value_container .curr')['html']('Pauzed')
        }
    },
    resume: function() {
        ModuleManager['isPauzed'] = false;
        Autofarm['isPauzed'] = false;
        Autoculture['isPauzed'] = false;
        ModuleManager['Queue']['start']()
    },
    finished: function() {
        if (Autofarm['settings']['nextround'] != 0) {
            $['each'](ModuleManager['playerTowns'], function(_0x15b9x6, _0x15b9x7) {
                if (_0x15b9x7['modules']['Autofarm']['isReadyTime'] - Timestamp['now']() <= Autofarm['settings']['nextround']) {
                    _0x15b9x7['modules']['Autofarm']['isReadyTime'] = Timestamp['now']() + Autofarm['settings']['nextround']
                }
            });
            ConsoleLog.Log('Wait ' + (Autofarm['settings']['nextround'] / 60) + ' minutes before next round.', 1)
        }
        ;ModuleManager['start']()
    },
    initTimer: function() {
        $('.nui_main_menu')['css']('top', '311px');
        $('#time_autobot')['append'](FormBuilder['timerBoxSmall']({
            "\x69\x64": 'Autofarm_timer',
            "\x73\x74\x79\x6C\x65\x73": '',
            "\x74\x65\x78\x74": 'Start Autobot'
        }))['show']()
    },
    updateTimer: function(_0x15b9xc, _0x15b9xd) {
        var _0x15b9xe = 0;
        if (typeof _0x15b9xc !== 'undefined' && typeof _0x15b9xd !== 'undefined') {
            _0x15b9xe = (((ModuleManager['Queue']['total'] - (ModuleManager['Queue']['queue']['length'] + 1)) + (_0x15b9xd / _0x15b9xc)) / ModuleManager['Queue']['total'] * 100)
        } else {
            _0x15b9xe = (((ModuleManager['Queue']['total'] - ModuleManager['Queue']['queue']['length'])) / ModuleManager['Queue']['total'] * 100)
        }
        ;if (!isNaN(_0x15b9xe)) {
            $('#time_autobot .progress .indicator')['width'](_0x15b9xe + '%');
            $('#time_autobot .caption .value_container .curr')['html'](Math['round'](_0x15b9xe) + '%')
        }
    },
    checkAutostart: function() {
        if (Autofarm['settings']['autostart']) {
            ModuleManager['modules']['Autofarm']['isOn'] = true;
            var _0x15b9xf = $('#Autofarm_onoff');
            _0x15b9xf['addClass']('on');
            _0x15b9xf['find']('span')['mousePopup'](new MousePopup('Stop Autofarm'))
        }
        ;if (Autoculture['settings']['autostart']) {
            ModuleManager['modules']['Autoculture']['isOn'] = true;
            var _0x15b9xf = $('#Autoculture_onoff');
            _0x15b9xf['addClass']('on');
            _0x15b9xf['find']('span')['mousePopup'](new MousePopup('Stop Autoculture'))
        }
        ;if (Autobuild['settings']['autostart']) {
            ModuleManager['modules']['Autobuild']['isOn'] = true;
            var _0x15b9xf = $('#Autobuild_onoff');
            _0x15b9xf['addClass']('on');
            _0x15b9xf['find']('span')['mousePopup'](new MousePopup('Stop Autobuild'))
        }
        ;if (Autofarm['settings']['autostart'] || Autoculture['settings']['autostart'] || Autobuild['settings']['autostart']) {
            ModuleManager['start']()
        }
    },
    startTimer: function(_0x15b9x10, _0x15b9x11) {
        var _0x15b9x12 = _0x15b9x10;
        ModuleManager['interval'] = setInterval(function() {
            $('#time_autobot .caption .value_container .curr')['html'](Autobot['toHHMMSS'](_0x15b9x10));
            $('#time_autobot .progress .indicator')['width']((_0x15b9x12 - _0x15b9x10) / _0x15b9x12 * 100 + '%');
            _0x15b9x10--;
            if (_0x15b9x10 < 0) {
                clearInterval(ModuleManager['interval']);
                _0x15b9x11()
            }
        }, 1000)
    },
    initButtons: function(_0x15b9x13, _0x15b9x14) {
        var _0x15b9xf = $('#' + _0x15b9x13 + '_onoff');
        _0x15b9xf['removeClass']('disabled');
        _0x15b9xf['on']('click', function() {
            var _0x15b9x15 = 0;
            $['each'](ModuleManager['modules'], function(_0x15b9x13, _0x15b9x14) {
                if (_0x15b9x14['isOn']) {
                    _0x15b9x15++
                }
            });
            if (_0x15b9xf['hasClass']('on')) {
                _0x15b9xf['removeClass']('on');
                _0x15b9x14['isOn'] = false;
                HumanMessage['success'](_0x15b9x13 + ' is deactivated.');
                ConsoleLog.Log(_0x15b9x13 + ' is deactivated.', 0);
                _0x15b9xf['find']('span')['mousePopup'](new MousePopup('Start ' + _0x15b9x13));
                if (_0x15b9x15 == 1) {
                    ModuleManager['pauze']()
                }
            } else {
                _0x15b9xf['addClass']('on');
                _0x15b9x14['isOn'] = true;
                HumanMessage['success'](_0x15b9x13 + ' is activated.');
                ConsoleLog.Log(_0x15b9x13 + ' is activated.', 0);
                _0x15b9xf['find']('span')['mousePopup'](new MousePopup('Stop ' + _0x15b9x13));
                if (_0x15b9x15 == 0) {
                    if (ModuleManager['isPauzed']) {
                        ModuleManager['resume']()
                    } else {
                        ModuleManager['start']()
                    }
                } else {
                    if (ModuleManager['Queue']['queue']['length'] == 0) {
                        clearInterval(ModuleManager['interval']);
                        ModuleManager['start']()
                    }
                }
            }
        });
        _0x15b9xf['find']('span')['mousePopup'](new MousePopup('Start ' + _0x15b9x13))
    },
    loadPlayerTowns: function() {
        var _0x15b9x6 = 0;
        $['each'](ITowns['towns'], function(_0x15b9x16, _0x15b9x17) {
            var _0x15b9x18 = new ModuleManager['models']['Town'];
            _0x15b9x18['key'] = _0x15b9x6;
            _0x15b9x18['id'] = _0x15b9x17['id'];
            _0x15b9x18['name'] = _0x15b9x17['name'];
            $['each'](ITowns['towns'], function(_0x15b9x16, _0x15b9x19) {
                if (_0x15b9x17['getIslandCoordinateX']() == _0x15b9x19['getIslandCoordinateX']() && _0x15b9x17['getIslandCoordinateY']() == _0x15b9x19['getIslandCoordinateY']() && _0x15b9x17['id'] != _0x15b9x19['id']) {
                    _0x15b9x18['relatedTowns']['push'](_0x15b9x19['id'])
                }
            });
            ModuleManager['playerTowns']['push'](_0x15b9x18);
            _0x15b9x6++
        });
        ModuleManager['playerTowns']['sort'](function(_0x15b9x1a, _0x15b9x1b) {
            var _0x15b9x1c = _0x15b9x1a['name']
              , _0x15b9x1d = _0x15b9x1b['name'];
            if (_0x15b9x1c == _0x15b9x1d) {
                return 0
            }
            ;return _0x15b9x1c > _0x15b9x1d ? 1 : -1
        })
    },
    callbackAuth: function(_) {
        Autobot['isLogged'] = true;
        Autobot['trial_time'] = 0;
        Autobot['premium_time'] = 9999;
        Autobot['facebook_like'] = 0;
        //if (_0x15b9x1e['assistant_settings'] != '') {
          //  Assistant['setSettings'](_0x15b9x1e['assistant_settings'])
        //}
        //;if (!_0x15b9x1e['player_email']) {
          //  Autobot['verifyEmail']()
        //};
       
        if (true) {
            if (true) {
                $['when']($['ajax']({
                    method: 'POST',
                    data: Autobot['Account'],
                    url: Autobot['domain'] + 'Autofarm.js',
                    dataType: 'script'
                }), $['ajax']({
                    method: 'POST',
                    data: Autobot['Account'],
                    url: Autobot['domain'] + 'Autoculture.js',
                    dataType: 'script'
                }), $['ajax']({
                    method: 'POST',
                    data: Autobot['Account'],
                    url: Autobot['domain'] + 'Autobuild.js',
                    dataType: 'script'
                }))['done'](function() {
                    ModuleManager['init']();
                    Autofarm['init']();
                    //Autofarm['setSettings'](_0x15b9x1e['autofarm_settings']);
                    Autoculture['init']();
                    //Autoculture['setSettings'](_0x15b9x1e['autoculture_settings']);
                    Autobuild['init']();
                    //Autobuild['setSettings'](_0x15b9x1e['autobuild_settings']);
                    //Autobuild['setBuildingQueue'](_0x15b9x1e['building_queue']);
                    ModuleManager['checkAutostart']()
                })
            }
        } else {
            $('#Autofarm_onoff')['mousePopup'](new MousePopup('No premium'));
            $('#Autoculture_onoff')['mousePopup'](new MousePopup('No premium'));
            $('#Autobuild_onoff')['mousePopup'](new MousePopup('No premium'));
            Autobot['createNotification']('getPremiumNotification', 'Unfortunately your premium membership is over. Please upgrade now!')
        }
    }
}

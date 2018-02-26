Autofarm = {
    settings: {
        autostart: false,
        method: 300,
        timebetween: 1,
        nextround: 0,
        skipwhenfull: true,
        lowresfirst: true,
        stoplootbelow: true
    },
    town: null,
    isPauzed: false,
    iTown: null,
    interval: null,
    isCaptain: false,
    shouldFarm: [],
    checkReady: function(_0xb484x1) {
        var _0xb484x2 = ITowns['towns'][_0xb484x1['id']];
        if (_0xb484x2['hasConqueror']()) {
            return false
        }
        ;if (!ModuleManager['modules']['Autofarm']['isOn']) {
            return false
        }
        ;if (_0xb484x1['modules']['Autofarm']['isReadyTime'] >= Timestamp['now']()) {
            return _0xb484x1['modules']['Autofarm']['isReadyTime']
        }
        ;var _0xb484x3 = _0xb484x2['resources']();
        if (_0xb484x3['wood'] == _0xb484x3['storage'] && _0xb484x3['stone'] == _0xb484x3['storage'] && _0xb484x3['iron'] == _0xb484x3['storage'] && Autofarm['settings']['skipwhenfull']) {
            return false
        }
        ;var _0xb484x4 = false;
        $['each'](ModuleManager['Queue']['queue'], function(_0xb484x5, _0xb484x6) {
            if (_0xb484x6['module'] == 'Autofarm') {
                var _0xb484x7 = _0xb484x1['relatedTowns']['indexOf'](_0xb484x6['townId']);
                if (_0xb484x7 != -1) {
                    _0xb484x4 = true;
                    return false
                }
            }
        });
        if (Autofarm['settings']['lowresfirst']) {
            if (_0xb484x1['relatedTowns']['length'] > 0) {
                _0xb484x4 = false;
                $['each'](_0xb484x1['relatedTowns'], function(_0xb484x5, _0xb484x8) {
                    var _0xb484x3 = _0xb484x2['resources']();
                    var _0xb484x9 = ITowns['towns'][_0xb484x8]['resources']();
                    if ((_0xb484x3['wood'] + _0xb484x3['stone'] + _0xb484x3['iron']) > (_0xb484x9['wood'] + _0xb484x9['stone'] + _0xb484x9['iron'])) {
                        _0xb484x4 = true;
                        return false
                    }
                })
            }
        }
        ;if (_0xb484x4) {
            return false
        }
        ;return true
    },
    startFarming: function(_0xb484x1) {
        if (!ModuleManager['modules']['Autofarm']['isOn']) {
            Autofarm['finished'](0);
            return false
        }
        ;Autofarm['town'] = _0xb484x1;
        Autofarm['shouldFarm'] = [];
        Autofarm['iTown'] = ITowns['towns'][Autofarm['town']['id']];
        var _0xb484xa = function() {
            Autofarm['interval'] = setTimeout(function() {
                ConsoleLog.Log(Autofarm['town']['name'] + ' getting farm information.', 1);
                if (!Autofarm['isCaptain']) {
                    Autofarm['initFarmTowns'](function() {
                        if (Autofarm['isPauzed']) {
                            return false
                        }
                        ;Autofarm['town']['currentFarmCount'] = 0;
                        Autofarm['claimResources']()
                    })
                } else {
                    Autofarm['initFarmTownsCaptain'](function() {
                        if (Autofarm['isPauzed']) {
                            return false
                        }
                        ;Autofarm['claimResources']()
                    })
                }
            }, Autobot['randomize'](1000, 2000))
        };
        if (ModuleManager['currentTown'] != Autofarm['town']['key']) {
            Autofarm['interval'] = setTimeout(function() {
                ConsoleLog.Log(Autofarm['town']['name'] + ' move to town.', 1);
                if (typeof GameData['farm_town'] !== 'undefined') {
                    DataExchanger['frontend_bridge'](Autofarm['town']['id'], {
                        model_url: 'CommandsMenuBubble/' + MM['getModelByNameAndPlayerId']('CommandsMenuBubble')['id'],
                        action_name: 'forceUpdate',
                        arguments: {},
                        town_id: Autofarm['town']['id'],
                        nl_init: true
                    }, function(_0xb484xb) {
                        if (Autofarm['isPauzed']) {
                            return false
                        }
                        ;ModuleManager['currentTown'] = Autofarm['town']['key'];
                        _0xb484xa()
                    })
                } else {
                    DataExchanger['switch_town'](Autofarm['town']['id'], function() {
                        if (Autofarm['isPauzed']) {
                            return false
                        }
                        ;ModuleManager['currentTown'] = Autofarm['town']['key'];
                        _0xb484xa()
                    })
                }
                ;Autofarm['town']['isSwitched'] = true
            }, Autobot['randomize'](1000, 2000))
        } else {
            _0xb484xa()
        }
    },
    initFarmTowns: function(_0xb484xc) {
        DataExchanger['game_data'](Autofarm['town']['id'], function(_0xb484xd) {
            if (Autofarm['isPauzed']) {
                return false
            }
            ;var _0xb484xe = _0xb484xd['json']['map']['data']['data']['data'];
            $['each'](_0xb484xe, function(_0xb484x5, _0xb484xf) {
                var _0xb484x10 = [];
                $['each'](_0xb484xf['towns'], function(_0xb484x5, _0xb484x1) {
                    if (_0xb484x1['x'] == Autofarm['iTown']['getIslandCoordinateX']() && _0xb484x1['y'] == Autofarm['iTown']['getIslandCoordinateY']() && _0xb484x1['relation_status'] == 1) {
                        _0xb484x10['push'](_0xb484x1)
                    }
                });
                Autofarm['town']['farmTowns'] = _0xb484x10
            });
            $['each'](Autofarm['town']['farmTowns'], function(_0xb484x11, _0xb484x12) {
                var _0xb484x13 = _0xb484x12['loot'] - Timestamp['now']();
                if (_0xb484x13 <= 0) {
                    Autofarm['shouldFarm']['push'](_0xb484x12)
                }
            });
            _0xb484xc(true)
        })
    },
    initFarmTownsCaptain: function(_0xb484xc) {
        DataExchanger['farm_town_overviews'](Autofarm['town']['id'], function(_0xb484xd) {
            if (Autofarm['isPauzed']) {
                return false
            }
            ;var _0xb484x10 = [];
            $['each'](_0xb484xd['json']['farm_town_list'], function(_0xb484x5, _0xb484x1) {
                if (_0xb484x1['island_x'] == Autofarm['iTown']['getIslandCoordinateX']() && _0xb484x1['island_y'] == Autofarm['iTown']['getIslandCoordinateY']() && _0xb484x1['rel'] == 1) {
                    _0xb484x10['push'](_0xb484x1)
                }
            });
            Autofarm['town']['farmTowns'] = _0xb484x10;
            $['each'](Autofarm['town']['farmTowns'], function(_0xb484x11, _0xb484x12) {
                var _0xb484x13 = _0xb484x12['loot'] - Timestamp['now']();
                if (_0xb484x13 <= 0) {
                    Autofarm['shouldFarm']['push'](_0xb484x12)
                }
            });
            _0xb484xc(true)
        })
    },
    claimResources: function() {
        if (!Autofarm['town']['farmTowns'][0]) {
            ConsoleLog.Log(Autofarm['town']['name'] + ' has no farm towns.', 1);
            Autofarm['finished'](1800);
            return false
        }
        ;if (Autofarm['town']['currentFarmCount'] < Autofarm['shouldFarm']['length']) {
            Autofarm['interval'] = setTimeout(function() {
                var _0xb484x14 = 'normal';
                if (typeof GameData['farm_town'] == 'undefined') {
                    if (Autofarm['shouldFarm'][Autofarm['town']['currentFarmCount']]['mood'] >= 86 && Autofarm['settings']['stoplootbelow']) {
                        _0xb484x14 = 'double'
                    }
                    ;if (!Autofarm['settings']['stoplootbelow']) {
                        _0xb484x14 = 'double'
                    }
                }
                ;if (!Autofarm['isCaptain']) {
                    Autofarm['claimLoad'](Autofarm['shouldFarm'][Autofarm['town']['currentFarmCount']]['id'], _0xb484x14, function() {
                        if (Autofarm['isPauzed']) {
                            return false
                        }
                        ;Autofarm['shouldFarm'][Autofarm['town']['currentFarmCount']]['loot'] = Timestamp['now']() + Autofarm['getMethodTime'](Autofarm['town']['id']);
                        ModuleManager['updateTimer'](Autofarm['shouldFarm']['length'], Autofarm['town']['currentFarmCount']);
                        Autofarm['town']['currentFarmCount']++;
                        Autofarm['claimResources']()
                    })
                } else {
                    var _0xb484x15 = [];
                    $['each'](Autofarm['shouldFarm'], function(_0xb484x5, _0xb484x16) {
                        _0xb484x15['push'](_0xb484x16['id'])
                    });
                    Autofarm['claimLoads'](_0xb484x15, _0xb484x14, function() {
                        if (Autofarm['isPauzed']) {
                            return false
                        }
                        ;Autofarm['finished'](Autofarm['getMethodTime'](Autofarm['town']['id']))
                    })
                }
            }, Autobot['randomize'](Autofarm['settings']['timebetween'] * 1000, Autofarm['settings']['timebetween'] * 1000 + 1000))
        } else {
            var _0xb484x17 = null;
            $['each'](Autofarm['town']['farmTowns'], function(_0xb484x11, _0xb484x12) {
                var _0xb484x18 = _0xb484x12['loot'] - Timestamp['now']();
                if (_0xb484x17 == null) {
                    _0xb484x17 = _0xb484x18
                } else {
                    if (_0xb484x18 <= _0xb484x17) {
                        _0xb484x17 = _0xb484x18
                    }
                }
            });
            if (Autofarm['shouldFarm']['length'] > 0) {
                $['each'](Autofarm['shouldFarm'], function(_0xb484x11, _0xb484x12) {
                    var _0xb484x18 = _0xb484x12['loot'] - Timestamp['now']();
                    if (_0xb484x17 == null) {
                        _0xb484x17 = _0xb484x18
                    } else {
                        if (_0xb484x18 <= _0xb484x17) {
                            _0xb484x17 = _0xb484x18
                        }
                    }
                })
            } else {
                ConsoleLog.Log(Autofarm['town']['name'] + ' not ready yet.', 1)
            }
            ;Autofarm['finished'](_0xb484x17)
        }
    },
    claimLoad: function(_0xb484x19, _0xb484x14, _0xb484xc) {
        if (typeof GameData['farm_town'] == 'undefined') {
            DataExchanger['claim_load'](Autofarm['town']['id'], _0xb484x14, Autofarm['getMethodTime'](Autofarm['town']['id']), _0xb484x19, function(_0xb484xd) {
                Autofarm['claimLoadCallback'](_0xb484x19, _0xb484xd);
                _0xb484xc(_0xb484xd)
            })
        } else {
            HumanMessage['enabled'] = false;
            DataExchanger['frontend_bridge'](Autofarm['town']['id'], {
                model_url: 'FarmTownPlayerRelation/' + MM['getOnlyCollectionByName']('FarmTownPlayerRelation')['getRelationForFarmTown'](_0xb484x19)['id'],
                action_name: 'claim',
                arguments: {
                    "\x66\x61\x72\x6D\x5F\x74\x6F\x77\x6E\x5F\x69\x64": _0xb484x19,
                    "\x74\x79\x70\x65": 'resources',
                    "\x6F\x70\x74\x69\x6F\x6E": 1
                }
            }, function(_0xb484xb) {
                Autofarm['claimLoadCallback'](_0xb484x19, _0xb484xb);
                _0xb484xc(_0xb484xb)
            })
        }
    },
    claimLoadCallback: function(_0xb484x19, _0xb484xd) {
        if (_0xb484xd['json']['success']) {
            var _0xb484x1a = _0xb484xd['json']['notifications']
              , _0xb484x1b = _0xb484xd['json']['satisfaction']
              , _0xb484x1c = _0xb484xd['json']['lootable_human'];
            NotificationLoader['recvNotifyData'](_0xb484xd['json'], false);
            if (_0xb484xd['json']['relation_status'] === 2) {
                WMap['updateStatusInChunkTowns'](_0xb484x19['id'], _0xb484x1b, Timestamp['now']() + Autofarm['getMethodTime'](Autofarm['town']['id']), Timestamp['now'](), _0xb484x1c, 2);
                WMap['pollForMapChunksUpdate']()
            } else {
                WMap['updateStatusInChunkTowns'](_0xb484x19['id'], _0xb484x1b, Timestamp['now']() + Autofarm['getMethodTime'](Autofarm['town']['id']), Timestamp['now'](), _0xb484x1c)
            }
            ;Layout['hideAjaxLoader']();
            ConsoleLog.Log('<span style="color: #6FAE30;">' + _0xb484xd['json']['success'] + '</span>', 1)
        } else {
            if (_0xb484xd['json']['error']) {
                ConsoleLog.Log(Autofarm['town']['name'] + ' ' + _0xb484xd['json']['error'], 1)
            }
        }
    },
    claimLoads: function(_0xb484x1d, _0xb484x14, _0xb484xc) {
        DataExchanger['claim_loads'](Autofarm['town']['id'], _0xb484x1d, _0xb484x14, Autofarm['getMethodTime'](Autofarm['town']['id']), function(_0xb484xd) {
            Autofarm['claimLoadsCallback'](_0xb484xd);
            _0xb484xc(_0xb484xd)
        })
    },
    getMethodTime: function(_0xb484x1e) {
        if (typeof GameData['farm_town'] !== 'undefined') {
            var _0xb484x1f = Autofarm['settings']['method'];
            $['each'](MM['getOnlyCollectionByName']('Town')['getTowns'](), function(_0xb484x11, _0xb484x1) {
                if (_0xb484x1['id'] == _0xb484x1e) {
                    if (_0xb484x1['getResearches']()['hasResearch']('booty')) {
                        _0xb484x1f = Autofarm['settings']['method'] * 2;
                        return false
                    }
                }
            });
            return _0xb484x1f
        } else {
            return Autofarm['settings']['method']
        }
    },
    claimLoadsCallback: function(_0xb484xd) {
        if (_0xb484xd['json']['success']) {
            var _0xb484x1a = _0xb484xd['json']['notifications']
              , _0xb484x20 = _0xb484xd['json']['handled_farms'];
            $['each'](_0xb484x1a, function(_0xb484x5, _0xb484x21) {
                if (_0xb484x21['type'] == 'backbone') {
                    MM['handleNotification'](_0xb484x21)
                }
            });
            $['each'](_0xb484x20, function(_0xb484x11, _0xb484x16) {
                if (_0xb484x16['relation_status'] == 2) {
                    WMap['updateStatusInChunkTowns'](_0xb484x11, _0xb484x16['satisfaction'], Timestamp['now']() + Autofarm['getMethodTime'](Autofarm['town']['id']), Timestamp['now'](), _0xb484x16['lootable_at'], 2);
                    WMap['pollForMapChunksUpdate']()
                } else {
                    WMap['updateStatusInChunkTowns'](_0xb484x11, _0xb484x16['satisfaction'], Timestamp['now']() + Autofarm['getMethodTime'](Autofarm['town']['id']), Timestamp['now'](), _0xb484x16['lootable_at'])
                }
            });
            ConsoleLog.Log('<span style="color: #6FAE30;">' + _0xb484xd['json']['success'] + '</span>', 1)
        } else {
            if (_0xb484xd['json']['error']) {
                ConsoleLog.Log(Autofarm['town']['name'] + ' ' + _0xb484xd['json']['error'], 1)
            }
        }
    },
    finished: function(_0xb484x22) {
        if (Autofarm['isPauzed']) {
            return false
        }
        ;$['each'](ModuleManager['playerTowns'], function(_0xb484x5, _0xb484x1) {
            var _0xb484x7 = Autofarm['town']['relatedTowns']['indexOf'](_0xb484x1['id']);
            if (_0xb484x7 != -1) {
                _0xb484x1['modules']['Autofarm']['isReadyTime'] = Timestamp['now']() + _0xb484x22
            }
        });
        Autofarm['town']['modules']['Autofarm']['isReadyTime'] = Timestamp['now']() + _0xb484x22;
        ModuleManager['Queue']['next']()
    },
    pauze: function() {
        clearInterval(Autofarm['interval']);
        Autofarm['isPauzed'] = true
    },
    init: function() {
        ConsoleLog.Log('Initialize AutoFarm', 1);
        Autofarm['initButton']();
        Autofarm['checkCaptain']()
    },
    initButton: function() {
        ModuleManager['initButtons']('Autofarm', ModuleManager['modules'].Autofarm)
    },
    checkCaptain: function() {
        if ($('.advisor_frame.captain div')['hasClass']('captain_active')) {
            Autofarm['isCaptain'] = true
        }
    },
    setSettings: function(_0xb484x23) {
        if (_0xb484x23 != '' && _0xb484x23 != null) {
            $['extend'](Autofarm['settings'], JSON['parse'](_0xb484x23))
        }
    },
    contentSettings: function() {
        return $('<fieldset/>', {
            "\x69\x64": 'Autofarm_settings',
            "\x73\x74\x79\x6C\x65": 'float:left; width:472px;height: 270px;'
        })['append']($('<legend/>')['html']('Autofarm Settings'))['append'](FormBuilder['checkbox']({
            "\x74\x65\x78\x74": 'AutoStart AutoFarm.',
            "\x69\x64": 'autofarm_autostart',
            "\x6E\x61\x6D\x65": 'autofarm_autostart',
            "\x63\x68\x65\x63\x6B\x65\x64": Autofarm['settings']['autostart']
        }))['append'](FormBuilder['selectBox']({
            id: 'autofarm_method',
            name: 'autofarm_method',
            label: 'Farm method: ',
            styles: 'width: 120px;',
            value: Autofarm['settings']['method'],
            options: [{
                value: '300',
                name: '5 minute farm'
            }, {
                value: '1200',
                name: '20 minute farm'
            }, {
                value: '5400',
                name: '90 minute farm'
            }, {
                value: '14400',
                name: '240 minute farm'
            }]
        }))['append'](FormBuilder['selectBox']({
            id: 'autofarm_bewteen',
            name: 'autofarm_bewteen',
            label: 'Time before next farm: ',
            styles: 'width: 120px;',
            value: Autofarm['settings']['timebetween'],
            options: [{
                value: '1',
                name: '1-2 seconds'
            }, {
                value: '3',
                name: '3-4 seconds'
            }, {
                value: '5',
                name: '5-6 seconds'
            }, {
                value: '7',
                name: '7-8 seconds'
            }, {
                value: '9',
                name: '9-10 seconds'
            }]
        }))['append'](FormBuilder['selectBox']({
            id: 'botFarm_nextround',
            name: 'botFarm_nextround',
            label: 'Time before next round: ',
            styles: 'width: 120px;',
            value: Autofarm['settings']['nextround'],
            options: [{
                value: '0',
                name: 'When ready'
            }, {
                value: '300',
                name: '5 minute'
            }, {
                value: '600',
                name: '10 minutes'
            }, {
                value: '1800',
                name: '30 minutes'
            }, {
                value: '3600',
                name: '60 minutes'
            }]
        }))['append'](FormBuilder['checkbox']({
            "\x74\x65\x78\x74": 'Skip farm when warehouse is full.',
            "\x69\x64": 'autofarm_warehousefull',
            "\x6E\x61\x6D\x65": 'autofarm_warehousefull',
            "\x63\x68\x65\x63\x6B\x65\x64": Autofarm['settings']['skipwhenfull']
        }))['append'](FormBuilder['checkbox']({
            "\x74\x65\x78\x74": 'Lowest resources first with more towns on one island.',
            "\x69\x64": 'autofarm_lowresfirst',
            "\x6E\x61\x6D\x65": 'autofarm_lowresfirst',
            "\x63\x68\x65\x63\x6B\x65\x64": Autofarm['settings']['lowresfirst']
        }))['append'](FormBuilder['checkbox']({
            "\x74\x65\x78\x74": 'Stop loot farm until mood is below 80%.',
            "\x69\x64": 'autofarm_loot',
            "\x6E\x61\x6D\x65": 'autofarm_loot',
            "\x63\x68\x65\x63\x6B\x65\x64": Autofarm['settings']['stoplootbelow']
        }))['append'](FormBuilder['button']({
            name: 'Save',
            style: 'margin-top: 0;'
        })['on']('click', function() {
            var _0xb484x24 = $('#Autofarm_settings')['serializeObject']();
            Autofarm['settings']['autostart'] = _0xb484x24['autofarm_autostart'] != undefined;
            Autofarm['settings']['method'] = parseInt(_0xb484x24['autofarm_method']);
            Autofarm['settings']['timebetween'] = parseInt(_0xb484x24['autofarm_bewteen']);
            Autofarm['settings']['nextround'] = parseInt(_0xb484x24['botFarm_nextround']);
            Autofarm['settings']['skipwhenfull'] = _0xb484x24['autofarm_warehousefull'] != undefined;
            Autofarm['settings']['lowresfirst'] = _0xb484x24['autofarm_lowresfirst'] != undefined;
            Autofarm['settings']['stoplootbelow'] = _0xb484x24['autofarm_loot'] != undefined;
            DataExchanger.Auth('saveAutofarm', {
                player_id: Autobot['Account']['player_id'],
                world_id: Autobot['Account']['world_id'],
                csrfToken: Autobot['Account']['csrfToken'],
                autofarm_settings: Autobot['stringify'](Autofarm['settings'])
            }, Autofarm['callbackSave'])
        }))
    },
    callbackSave: function() {
        ConsoleLog.Log('Settings saved', 1);
        HumanMessage['success']('The settings were saved!')
    }
}

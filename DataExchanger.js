DataExchanger = {
    Auth: function(_0xe755x1, _0xe755x2, _0xe755x3) {
       // $['ajax']({
         //   method: 'POST',
           // jsonpCallback: _0xe755x3,
            //url: Autobot['domain'] + 'auth.json',
            //dataType: 'json',
            //data: $['extend']({
              //  action: _0xe755x1
            //}, _0xe755x2),
            //success: function(_0xe755x2) {
                _0xe755x3()
            //}
        //})
    },
    game_data: function(_0xe755x4, _0xe755x3) {
        var _0xe755x5 = _0xe755x4, _0xe755x6, _0xe755x2;
        _0xe755x6 = window['location']['protocol'] + '//' + document['domain'] + '/game/data?' + $['param']({
            town_id: _0xe755x5,
            action: 'get',
            h: Game['csrfToken']
        });
        _0xe755x2 = {
            json: JSON['stringify']({
                types: [{
                    type: 'map',
                    param: {
                        x: 0,
                        y: 0
                    }
                }, {
                    type: 'bar'
                }, {
                    type: 'backbone'
                }],
                town_id: _0xe755x5,
                nl_init: false
            })
        };
        $['ajax']({
            url: _0xe755x6,
            data: _0xe755x2,
            method: 'POST',
            dataType: 'json',
            success: _0xe755x3
        })
    },
    switch_town: function(_0xe755x4, _0xe755x3) {
        var _0xe755x7 = _0xe755x4, _0xe755x6;
        _0xe755x6 = window['location']['protocol'] + '//' + document['domain'] + '/game/index?' + $['param']({
            town_id: _0xe755x7,
            action: 'switch_town',
            h: Game['csrfToken']
        });
        $['ajax']({
            url: _0xe755x6,
            method: 'GET',
            dataType: 'json',
            success: _0xe755x3
        })
    },
    claim_load: function(_0xe755x4, _0xe755x8, _0xe755x9, _0xe755xa, _0xe755x3) {
        var _0xe755x7 = _0xe755x4, _0xe755xb = _0xe755xa, _0xe755x6, _0xe755x2;
        _0xe755x6 = window['location']['protocol'] + '//' + document['domain'] + '/game/farm_town_info?' + $['param']({
            town_id: _0xe755x7,
            action: 'claim_load',
            h: Game['csrfToken']
        });
        _0xe755x2 = {
            json: JSON['stringify']({
                target_id: _0xe755xb,
                claim_type: _0xe755x8,
                time: _0xe755x9,
                town_id: _0xe755x7,
                nl_init: true
            })
        };
        $['ajax']({
            url: _0xe755x6,
            data: _0xe755x2,
            method: 'POST',
            dataType: 'json',
            success: _0xe755x3
        })
    },
    farm_town_overviews: function(_0xe755x4, _0xe755x3) {
        var _0xe755x5 = _0xe755x4, _0xe755x6, _0xe755x2;
        _0xe755x2 = {
            town_id: Game['townId'],
            action: 'get_farm_towns_for_town',
            h: Game['csrfToken'],
            json: JSON['stringify']({
                island_x: ITowns['towns'][_0xe755x5]['getIslandCoordinateX'](),
                island_y: ITowns['towns'][_0xe755x5]['getIslandCoordinateY'](),
                current_town_id: _0xe755x5,
                booty_researched: ITowns['towns'][_0xe755x5]['researches']()['attributes']['booty'] ? true : '',
                diplomacy_researched: ITowns['towns'][_0xe755x5]['researches']()['attributes']['diplomacy'] ? true : '',
                itrade_office: ITowns['towns'][_0xe755x5]['buildings']()['attributes']['trade_office'],
                town_id: Game['townId'],
                nl_init: true
            })
        };
        _0xe755x6 = window['location']['protocol'] + '//' + document['domain'] + '/game/farm_town_overviews?' + $['param'](_0xe755x2);
        $['ajax']({
            url: _0xe755x6,
            data: _0xe755x2,
            method: 'GET',
            dataType: 'json',
            success: _0xe755x3
        })
    },
    claim_loads: function(_0xe755x4, _0xe755xc, _0xe755x8, _0xe755x9, _0xe755x3) {
        var _0xe755x6 = window['location']['protocol'] + '//' + document['domain'] + '/game/farm_town_overviews?' + $['param']({
            town_id: Game['townId'],
            action: 'claim_loads',
            h: Game['csrfToken']
        }), _0xe755x2;
        _0xe755x2 = {
            json: JSON['stringify']({
                farm_town_ids: _0xe755xc,
                time_option: _0xe755x9,
                claim_factor: _0xe755x8,
                current_town_id: _0xe755x4,
                town_id: Game['townId'],
                nl_init: true
            })
        };
        $['ajax']({
            url: _0xe755x6,
            data: _0xe755x2,
            method: 'POST',
            dataType: 'json',
            success: _0xe755x3
        })
    },
    building_place: function(_0xe755x4, _0xe755x3) {
        var _0xe755x7 = _0xe755x4, _0xe755x6, _0xe755x2;
        _0xe755x2 = {
            town_id: _0xe755x7,
            action: 'culture',
            h: Game['csrfToken'],
            json: JSON['stringify']({
                town_id: _0xe755x7,
                nl_init: true
            })
        };
        _0xe755x6 = window['location']['protocol'] + '//' + document['domain'] + '/game/building_place?' + $['param'](_0xe755x2);
        $['ajax']({
            url: _0xe755x6,
            data: _0xe755x2,
            method: 'GET',
            dataType: 'json',
            success: _0xe755x3
        })
    },
    building_main: function(_0xe755x4, _0xe755x3) {
        var _0xe755x7 = _0xe755x4, _0xe755x6, _0xe755x2;
        _0xe755x2 = {
            town_id: _0xe755x7,
            action: 'index',
            h: Game['csrfToken'],
            json: JSON['stringify']({
                town_id: _0xe755x7,
                nl_init: true
            })
        };
        _0xe755x6 = window['location']['protocol'] + '//' + document['domain'] + '/game/building_main?' + $['param'](_0xe755x2);
        $['ajax']({
            url: _0xe755x6,
            data: _0xe755x2,
            method: 'GET',
            dataType: 'json',
            success: _0xe755x3
        })
    },
    start_celebration: function(_0xe755x4, _0xe755xd, _0xe755x3) {
        var _0xe755x6 = window['location']['protocol'] + '//' + document['domain'] + '/game/building_place?' + $['param']({
            town_id: _0xe755x4,
            action: 'start_celebration',
            h: Game['csrfToken']
        }), _0xe755x2;
        _0xe755x2 = {
            json: JSON['stringify']({
                celebration_type: _0xe755xd,
                town_id: _0xe755x4,
                nl_init: true
            })
        };
        $['ajax']({
            url: _0xe755x6,
            data: _0xe755x2,
            method: 'POST',
            dataType: 'json',
            success: _0xe755x3
        })
    },
    email_validation: function(_0xe755x3) {
        var _0xe755x2 = {
            town_id: Game['townId'],
            action: 'email_validation',
            h: Game['csrfToken'],
            json: JSON['stringify']({
                town_id: Game['townId'],
                nl_init: true
            })
        };
        var _0xe755x6 = window['location']['protocol'] + '//' + document['domain'] + '/game/player?' + $['param'](_0xe755x2);
        $['ajax']({
            url: _0xe755x6,
            data: _0xe755x2,
            method: 'GET',
            dataType: 'json',
            success: _0xe755x3
        })
    },
    members_show: function(_0xe755x3) {
        var _0xe755x2 = {
            town_id: Game['townId'],
            action: 'members_show',
            h: Game['csrfToken'],
            json: JSON['stringify']({
                town_id: Game['townId'],
                nl_init: true
            })
        };
        var _0xe755x6 = window['location']['protocol'] + '//' + document['domain'] + '/game/alliance?' + $['param'](_0xe755x2);
        $['ajax']({
            url: _0xe755x6,
            data: _0xe755x2,
            method: 'GET',
            dataType: 'json',
            success: _0xe755x3
        })
    },
    login_to_game_world: function(_0xe755xe) {
        $['redirect'](window['location']['protocol'] + '//' + document['domain'] + '/start?' + $['param']({
            action: 'login_to_game_world'
        }), {
            world: _0xe755xe,
            facebook_session: '',
            facebook_login: '',
            portal_sid: '',
            name: '',
            password: ''
        })
    },
    frontend_bridge: function(_0xe755x4, _0xe755xf, _0xe755x3) {
        var _0xe755x6 = window['location']['protocol'] + '//' + document['domain'] + '/game/frontend_bridge?' + $['param']({
            town_id: _0xe755x4,
            action: 'execute',
            h: Game['csrfToken']
        });
        var _0xe755x2 = {
            json: JSON['stringify'](_0xe755xf)
        };
        $['ajax']({
            url: _0xe755x6,
            data: _0xe755x2,
            method: 'POST',
            dataType: 'json',
            success: _0xe755x3
        })
    }
}

FormBuilder = {
    button: function(_0x8244x1) {
        return $('<div/>')['append']($('<a/>', {
            "\x63\x6C\x61\x73\x73": 'button',
            "\x68\x72\x65\x66": '#',
            "\x73\x74\x79\x6C\x65": 'display:inline-block; vertical-align: middle;' + (_0x8244x1['style'] || '')
        })['append']($('<span/>', {
            "\x63\x6C\x61\x73\x73": 'left'
        })['append']($('<span/>', {
            "\x63\x6C\x61\x73\x73": 'right'
        })['append']($('<span/>', {
            "\x63\x6C\x61\x73\x73": 'middle'
        })['text'](_0x8244x1['name'])))))
    },
    checkbox: function(_0x8244x1) {
        return $('<div/>', {
            "\x63\x6C\x61\x73\x73": 'checkbox_new' + ((_0x8244x1['checked']) ? ' checked' : '') + ((_0x8244x1['disabled']) ? ' disabled' : ''),
            "\x73\x74\x79\x6C\x65": 'padding: 5px;' + (_0x8244x1['style'] || '')
        })['append']($('<input/>', {
            "\x74\x79\x70\x65": 'checkbox',
            "\x6E\x61\x6D\x65": _0x8244x1['name'],
            "\x69\x64": _0x8244x1['id'],
            "\x63\x68\x65\x63\x6B\x65\x64": _0x8244x1['checked'],
            "\x73\x74\x79\x6C\x65": 'display: none;'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'cbx_icon',
            "\x72\x65\x6C": _0x8244x1['name']
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'cbx_caption'
        })['text'](_0x8244x1['text']))['bind']('click', function() {
            $(this)['toggleClass']('checked');
            $(this)['find']($('input[type="checkbox"]'))['prop']('checked', $(this)['hasClass']('checked'))
        })
    },
    input: function(_0x8244x1) {
        return $('<div/>', {
            "\x73\x74\x79\x6C\x65": 'padding: 5px;'
        })['append']($('<label/>', {
            "\x66\x6F\x72": _0x8244x1['id']
        })['text'](_0x8244x1['name'] + ': '))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'textbox',
            "\x73\x74\x79\x6C\x65": _0x8244x1['style']
        })['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'left'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'right'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'middle'
        })['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'ie7fix'
        })['append']($('<input/>', {
            "\x74\x79\x70\x65": _0x8244x1['type'],
            "\x74\x61\x62\x69\x6E\x64\x65\x78": '1',
            "\x69\x64": _0x8244x1['id'],
            "\x6E\x61\x6D\x65": _0x8244x1['id'],
            "\x76\x61\x6C\x75\x65": _0x8244x1['value']
        })['attr']('size', _0x8244x1['size'])))))
    },
    textarea: function(_0x8244x1) {
        return $('<div/>', {
            "\x73\x74\x79\x6C\x65": 'padding: 5px;'
        })['append']($('<label/>', {
            "\x66\x6F\x72": _0x8244x1['id']
        })['text'](_0x8244x1['name'] + ': '))['append']($('<div/>')['append']($('<textarea/>', {
            "\x6E\x61\x6D\x65": _0x8244x1['id'],
            "\x69\x64": _0x8244x1['id']
        })))
    },
    inputMinMax: function(_0x8244x1) {
        return $('<div/>', {
            "\x63\x6C\x61\x73\x73": 'textbox'
        })['append']($('<span/>', {
            "\x63\x6C\x61\x73\x73": 'grcrt_spinner_btn grcrt_spinner_down',
            "\x72\x65\x6C": _0x8244x1['name']
        })['click'](function() {
            var _0x8244x2 = $(this)['parent']()['find']('#' + $(this)['attr']('rel'));
            if (parseInt($(_0x8244x2)['attr']('min')) < parseInt($(_0x8244x2)['attr']('value'))) {
                $(_0x8244x2)['attr']('value', parseInt($(_0x8244x2)['attr']('value')) - 1)
            }
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'textbox',
            "\x73\x74\x79\x6C\x65": _0x8244x1['style']
        })['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'left'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'right'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'middle'
        })['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'ie7fix'
        })['append']($('<input/>', {
            "\x74\x79\x70\x65": 'text',
            "\x74\x61\x62\x69\x6E\x64\x65\x78": '1',
            "\x69\x64": _0x8244x1['name'],
            "\x76\x61\x6C\x75\x65": _0x8244x1['value'],
            "\x6D\x69\x6E": _0x8244x1['min'],
            "\x6D\x61\x78": _0x8244x1['max']
        })['attr']('size', _0x8244x1['size'] || 10)['css']('text-align', 'right')))))['append']($('<span/>', {
            "\x63\x6C\x61\x73\x73": 'grcrt_spinner_btn grcrt_spinner_up',
            "\x72\x65\x6C": _0x8244x1['name']
        })['click'](function() {
            var _0x8244x2 = $(this)['parent']()['find']('#' + $(this)['attr']('rel'));
            if (parseInt($(_0x8244x2)['attr']('max')) > parseInt($(_0x8244x2)['attr']('value'))) {
                $(_0x8244x2)['attr']('value', parseInt($(_0x8244x2)['attr']('value')) + 1)
            }
        }))
    },
    inputSlider: function(_0x8244x1) {
        return $('<div/>', {
            "\x69\x64": 'grcrt_' + _0x8244x1['name'] + '_config'
        })['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'slider_container'
        })['append']($('<div/>', {
            "\x73\x74\x79\x6C\x65": 'float:left;width:120px;'
        })['html'](_0x8244x1['name']))['append'](FormBuilder['input']({
            "\x6E\x61\x6D\x65": 'grcrt_' + _0x8244x1['name'] + '_value',
            "\x73\x74\x79\x6C\x65": 'float:left;width:33px;'
        })['hide']())['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'windowmgr_slider',
            "\x73\x74\x79\x6C\x65": 'width: 200px;float: left;'
        })['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'grepo_slider sound_volume'
        }))))['append']($('<script/>', {
            "\x74\x79\x70\x65": 'text/javascript'
         })['text'](RepConv.slider = $('#grcrt_' + _0x8244x1['name'] + '_config .sound_volume').grepoSlider({
min: 0,
max: 100,
step: 5,
value: _0x8244x1['volume'],
template: 'tpl_grcrt_slider'
}).on('sl:change:value', function (e, _sl, value) {
$('#grcrt_' + _0x8244x1['name'] + '_value').attr('value',value);
if (RepConv.audio.test != undefined){
RepConv.audio.test.volume = value/100;
}
}),
$('#grcrt_' + _0x8244x1['name'] + '_config .button_down').css('background-position','-144px 0px;'),
$('#grcrt_' + _0x8244x1['name'] + '_config .button_up').css('background-position','-126px 0px;')
))
    },
    selectBox: function(_0x8244x1) {
        return $('<div/>', {
            "\x73\x74\x79\x6C\x65": 'padding: 5px'
        })['append']($('<input/>', {
            "\x74\x79\x70\x65": 'hidden',
            "\x6E\x61\x6D\x65": _0x8244x1['name'],
            "\x69\x64": _0x8244x1['id'],
            "\x76\x61\x6C\x75\x65": _0x8244x1['value']
        }))['append']($('<label/>', {
            "\x66\x6F\x72": _0x8244x1['id']
        })['text'](_0x8244x1['label']))['append']($('<div/>', {
            "\x69\x64": _0x8244x1['id'],
            "\x63\x6C\x61\x73\x73": 'dropdown default',
            "\x73\x74\x79\x6C\x65": _0x8244x1['styles']
        })['dropdown']({
            list_pos: 'left',
            value: _0x8244x1['value'],
            options: _0x8244x1['options']
        })['on']('dd:change:value', function(_0x8244x2, _0x8244x3) {
            $('#' + _0x8244x1['id'])['attr']('value', _0x8244x3)
        }))
    },
    timerBoxFull: function(_0x8244x1) {
        return $('<div/>', {
            "\x63\x6C\x61\x73\x73": 'single-progressbar instant_buy js-progressbar type_building_queue',
            "\x69\x64": _0x8244x1['id'],
            "\x73\x74\x79\x6C\x65": _0x8244x1['styles']
        })['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'border_l'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'border_r'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'body'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'progress'
        })['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'indicator',
            "\x73\x74\x79\x6C\x65": 'width: 0%;'
        })))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'caption'
        })['append']($('<span/>', {
            "\x63\x6C\x61\x73\x73": 'text'
        }))['append']($('<span/>', {
            "\x63\x6C\x61\x73\x73": 'value_container'
        })['append']($('<span/>', {
            "\x63\x6C\x61\x73\x73": 'curr'
        })['html']('0%'))))
    },
    timerBoxSmall: function(_0x8244x1) {
        return $('<div/>', {
            "\x63\x6C\x61\x73\x73": 'single-progressbar instant_buy js-progressbar type_building_queue',
            "\x69\x64": _0x8244x1['id'],
            "\x73\x74\x79\x6C\x65": _0x8244x1['styles']
        })['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'progress'
        })['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'indicator',
            "\x73\x74\x79\x6C\x65": 'width: 0%;'
        })))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'caption'
        })['append']($('<span/>', {
            "\x63\x6C\x61\x73\x73": 'text'
        }))['append']($('<span/>', {
            "\x63\x6C\x61\x73\x73": 'value_container'
        })['append']($('<span/>', {
            "\x63\x6C\x61\x73\x73": 'curr'
        })['html'](_0x8244x1['text'] ? _0x8244x1['text'] : '-'))))
    },
    gameWrapper: function(_0x8244x4, _0x8244x5, _0x8244x6, _0x8244x1) {
        return $('<div/>', {
            "\x63\x6C\x61\x73\x73": 'game_inner_box',
            "\x73\x74\x79\x6C\x65": _0x8244x1,
            "\x69\x64": _0x8244x5
        })['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'game_border'
        })['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'game_border_top'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'game_border_bottom'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'game_border_left'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'game_border_right'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'game_border_top'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'game_border_corner corner1'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'game_border_corner corner2'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'game_border_corner corner3'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'game_border_corner corner4'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'game_header bold',
            "\x69\x64": 'settings_header'
        })['html'](_0x8244x4))['append']($('<div/>')['append'](_0x8244x6)))
    }
}

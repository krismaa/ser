ConsoleLog = {
    Logs: [],
    Types: ['Autobot', 'Farming', 'Culture', 'Builder'],
    scrollInterval: '',
    scrollUpdate: true,
    contentConsole: function() {
        var _0x85eax1 = $('<fieldset/>', {
            "\x73\x74\x79\x6C\x65": 'float:left; width:472px;'
        })['append']($('<legend/>')['html']('Autobot Console'))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'terminal'
        })['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'terminal-output'
        }))['scroll'](function() {
            ConsoleLog.LogScrollBottom()
        }));
        var _0x85eax2 = _0x85eax1['find']('.terminal-output');
        $['each'](ConsoleLog.Logs, function(_0x85eax3, _0x85eax4) {
            _0x85eax2['append'](_0x85eax4)
        });
        return _0x85eax1
    },
    Log: function(_0x85eax5, _0x85eax6) {
        if (this['Logs']['length'] >= 500) {
            this['Logs']['shift']()
        }
        ;function _0x85eax7(_0x85eax8) {
            return (_0x85eax8 < 10) ? '0' + _0x85eax8 : _0x85eax8
        }
        var _0x85eax9 = new Date();
        var _0x85eaxa = _0x85eax7(_0x85eax9['getHours']()) + ':' + _0x85eax7(_0x85eax9['getMinutes']()) + ':' + _0x85eax7(_0x85eax9['getSeconds']());
        var _0x85eaxb = $('<div/>')['append']($('<div/>', {
            "\x73\x74\x79\x6C\x65": 'width: 100%;'
        })['html'](_0x85eaxa + ' - ' + '[' + ConsoleLog['Types'][_0x85eax6] + ']: ' + _0x85eax5));
        this['Logs']['push'](_0x85eaxb);
        var _0x85eax2 = $('.terminal-output');
        if (_0x85eax2['length']) {
            _0x85eax2['append'](_0x85eaxb);
            if (this['scrollUpdate']) {
                var _0x85eaxc = $('.terminal');
                var _0x85eaxd = $('.terminal-output')[0]['scrollHeight'];
                _0x85eaxc['scrollTop'](_0x85eaxd)
            }
        }
    },
    LogScrollBottom: function() {
        clearInterval(this['scrollInterval']);
        var _0x85eaxc = $('.terminal');
        var _0x85eax2 = $('.terminal-output');
        if (_0x85eaxc['scrollTop']() + _0x85eaxc['height']() == _0x85eax2['height']()) {
            this['scrollUpdate'] = true
        } else {
            this['scrollUpdate'] = false
        }
        ;var _0x85eaxd = _0x85eax2[0]['scrollHeight'];
        this['scrollInterval'] = setInterval(function() {
            _0x85eaxc['scrollTop'](_0x85eaxd)
        }, 7000)
    }
}

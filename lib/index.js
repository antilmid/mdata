(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./baseData", "./helper"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.Mdata = exports.COMMON_EMAIL_SERVICE = void 0;
    var baseData_1 = require("./baseData");
    var helper_1 = require("./helper");
    function createWrapper(fn) {
        function nfn(op) {
            if (op) {
                return fn.bind({}, op);
            }
            else {
                return fn.call({});
            }
        }
        return nfn;
    }
    var PHONE_HEADER_OF_TYPE = {
        '中国移动': ['134', '135', '136', '137', '138', '139', '140', '147', '150', '151', '152', '157', '158', '159', '182', '183', '187', '188'],
        '中国电信': ['133', '142', '144', '146', '148', '149', '153', '180', '181', '189'],
        '中国联通': ['130', '131', '132', '141', '143', '145', '155', '156', '185', '186']
    };
    var VOVEL_ALPHABET = ['a', 'e', 'i', 'o', 'u'];
    exports.COMMON_EMAIL_SERVICE = [
        'qq.com',
        'gmail.com',
        '163.com',
        'fox.com',
        'yahoo.com',
        'msn.com',
        'hotmail.com',
        'aol.com',
        'ask.com',
        'live.com',
        '0355.net',
        '163.net',
        '263.net',
        '3721.net'
    ];
    exports.Mdata = {
        rand: createWrapper(function (options) {
            if (options === void 0) { options = {}; }
            var min = options.min || 0;
            var max = options.max || 1;
            var step = options.step || .1;
            return Math.floor(((Math.random()) * (max - min) + min) / step) * step;
        }),
        phone: createWrapper(function (options) {
            if (options === void 0) { options = {}; }
            var phone_type = options.type || ['中国移动', '中国电信', '中国联通'];
            var length = options.length || 11;
            var headerGen = [];
            var headerGenFn = null;
            if (typeof phone_type === 'string')
                headerGen.push.apply(headerGen, PHONE_HEADER_OF_TYPE[phone_type] || []);
            if (typeof phone_type === 'object' && typeof phone_type[0] === 'string')
                phone_type.forEach(function (typeItem) { return headerGen.push.apply(headerGen, PHONE_HEADER_OF_TYPE[typeItem] || typeItem); });
            if (typeof phone_type === 'function') {
                headerGenFn = phone_type;
            }
            else {
                headerGenFn = function () {
                    var max = headerGen.length;
                    return headerGen[exports.Mdata.rand({ max: max, step: 1 })()];
                };
            }
            var fulled = '';
            var header = headerGenFn();
            for (var i = 0; i < length - header.length; i++)
                fulled += exports.Mdata.rand({ max: 10, step: 1 })().toString();
            return header + fulled;
        }),
        maybeword: createWrapper(function (options) {
            if (options === void 0) { options = {}; }
            var len = options.length || exports.Mdata.rand({ max: 16, min: 2, step: 1 })();
            var alphabetIndexRand = exports.Mdata.rand({ min: 1, max: 26, step: 1 });
            var vovelAlphabet = options.vovelAlphabet || VOVEL_ALPHABET;
            var vblen = vovelAlphabet.length;
            var vovelIndexRand = exports.Mdata.rand({ min: 1, max: vblen - 1, step: 1 });
            var vovelRate = .2;
            var res = '';
            for (var i = 0; i < len; i++) {
                var rate = exports.Mdata.rand();
                if (i === len - 1)
                    vovelRate = 0.3;
                if (rate < vovelRate) {
                    var index = vovelIndexRand();
                    res += vovelAlphabet[index];
                    if (vovelRate > 0)
                        vovelRate -= 0.4;
                }
                else {
                    res += String.fromCharCode(97 + alphabetIndexRand());
                    if (vovelRate < 1)
                        vovelRate += 0.2;
                }
            }
            return res;
        }),
        randata: createWrapper(function (options) {
            if (options === void 0) { options = {}; }
            var dataSet = options.dataSet || [];
            if (!dataSet.length)
                null;
            var index = exports.Mdata.rand({ min: 0, max: dataSet.length, step: 1 })();
            return dataSet[index];
        }),
        email: createWrapper(function (options) {
            if (options === void 0) { options = {}; }
            var emailService = options.emailService || exports.COMMON_EMAIL_SERVICE;
            var username = options.username || exports.Mdata.maybeword();
            var suffix = '';
            if (emailService instanceof Array) {
                suffix = exports.Mdata.randata({ dataSet: emailService })();
            }
            if (emailService === 'rand') {
                var smallRand = exports.Mdata.rand({ max: 6, min: 2, step: 1 });
                suffix = exports.Mdata.maybeword({ length: smallRand() })();
                suffix += '.';
                suffix += exports.Mdata.maybeword({ length: smallRand() })();
            }
            return "".concat(username, "@").concat(suffix);
        }),
        word: createWrapper(function (options) {
            if (options === void 0) { options = {}; }
            var lang = options.lang || 'en';
            var length = options.length || 1;
            var ret = '';
            if (lang === 'en') {
                var srand = exports.Mdata.rand({ min: 0, max: 52, step: 1 });
                for (var i = 0; i < length; i++) {
                    var index = srand();
                    if (index > 25) {
                        ret += String.fromCharCode(97 + index - 26);
                    }
                    else {
                        ret += String.fromCharCode(97 + index);
                    }
                }
                return ret;
            }
            if (lang === 'ch') {
                var srand = exports.Mdata.rand({ min: 19968, max: 40869, step: 1 });
                for (var i = 0; i < length; i++) {
                    var index = srand();
                    ret += String.fromCharCode(index);
                }
                return ret;
            }
            return ret;
        }),
        chineseName: createWrapper(function (options) {
            if (options === void 0) { options = {}; }
            var surnames = options.surnames || baseData_1.HUNDRED_FAMILY_NAMES;
            var names = options.names || null;
            var ret = '';
            ret += surnames[exports.Mdata.rand({ min: 0, max: surnames.length, step: 1 })()];
            if (names) {
                ret += surnames[exports.Mdata.rand({ min: 0, max: names.length, step: 1 })()];
                return ret;
            }
            var srand = exports.Mdata.rand({ min: 0, max: 1, step: 0.1 });
            for (var i = -0.1; i < srand(); i += 0.35) {
                ret += exports.Mdata.word({ lang: 'ch' })();
            }
            return ret;
        }),
        date: createWrapper(function (options) {
            if (options === void 0) { options = {}; }
            var year, month, day, hour, min, sec, ms;
            var opYear = options.year || [1900, 2100];
            year = opYear instanceof Array ? exports.Mdata.rand({ min: opYear[0], max: opYear[1] + 1, step: 1 })() : opYear();
            var opMonth = options.month || [1, 12];
            month = opMonth instanceof Array ? exports.Mdata.rand({ min: opMonth[0], max: opMonth[1] + 1, step: 1 })() : opMonth(year);
            var opDay = options.day || [1, (0, helper_1.getDays)(year, month)];
            day = opDay instanceof Array ? exports.Mdata.rand({ min: opDay[0], max: opDay[1] + 1, step: 1 })() : opDay(year, month);
            var opHour = options.hour || [1, 24];
            hour = opHour instanceof Array ? exports.Mdata.rand({ min: opHour[0], max: opHour[1] + 1, step: 1 })() : opHour(year, month, day);
            var opMinute = options.minute || [1, 60];
            min = opMinute instanceof Array ? exports.Mdata.rand({ min: opMinute[0], max: opMinute[1] + 1, step: 1 })() : opMinute(year, month, day, hour);
            var opSecond = options.second || [1, 60];
            sec = opSecond instanceof Array ? exports.Mdata.rand({ min: opSecond[0], max: opSecond[1] + 1, step: 1 })() : opSecond(year, month, day, hour, min);
            var opMillisecond = options.millisecond || [1, 1000];
            ms = opMillisecond instanceof Array ? exports.Mdata.rand({ min: opMillisecond[0], max: opMillisecond[1] + 1, step: 1 })() : opMillisecond(year, month, day, hour, min, sec);
            var format = options.format || 'YYYY-MM-DD hh:mm:ss';
            if (typeof format === 'function')
                return format(year, month, day, hour, min, sec, ms);
            if (typeof format !== 'string')
                throw Error('format期望是一个函数或者一个字符串');
            var i = -1;
            var s = '';
            var l = 0;
            var r = '';
            var dmap = {
                Y: year,
                M: month,
                D: day,
                h: hour,
                m: min,
                s: sec
            };
            while (++i < format.length) {
                if (/[yY]/.test(format[i]) && (!s || s === 'Y')) {
                    s = 'Y';
                    l++;
                    continue;
                }
                if (/[M]/.test(format[i]) && (!s || s === 'M')) {
                    s = 'M';
                    l++;
                    continue;
                }
                if (/[Dd]/.test(format[i]) && (!s || s === 'D')) {
                    s = 'D';
                    l++;
                    continue;
                }
                if (/[Hh]/.test(format[i]) && (!s || s === 'h')) {
                    s = 'h';
                    l++;
                    continue;
                }
                if (/[m]/.test(format[i]) && (!s || s === 'm')) {
                    s = 'm';
                    l++;
                    continue;
                }
                if (/[Ss]/.test(format[i]) && (!s || s === 's')) {
                    s = 's';
                    l++;
                    continue;
                }
                if (/[\\]/.test(format[i])) {
                    r += "".concat(dmap[s] ? (0, helper_1.num2str)(dmap[s], l) : '');
                    l = 0;
                    s = '';
                    s = 'changed';
                    continue;
                }
                r += "".concat(dmap[s] ? (0, helper_1.num2str)(dmap[s], l) : '').concat(format[i]);
                l = 0;
                s = '';
            }
            r += "".concat(dmap[s] ? (0, helper_1.num2str)(dmap[s], l) : '');
            return r;
        })
    };
});
//# sourceMappingURL=index.js.map
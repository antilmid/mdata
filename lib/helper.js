(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.num2str = exports.getDays = exports.isLeapYear = void 0;
    function isLeapYear(year) {
        year = Number(year);
        return year % 4 === 0 || year % 400 === 0;
    }
    exports.isLeapYear = isLeapYear;
    function getDays(year, month) {
        year = Number(year);
        month = Number(month);
        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                return 31;
            case 4:
            case 6:
            case 9:
            case 11:
                return 30;
            case 2:
                if (isLeapYear(year))
                    return 29;
                return 28;
            default:
                return 0;
        }
    }
    exports.getDays = getDays;
    function num2str(num, strLength) {
        if (strLength === void 0) { strLength = 2; }
        var res = num.toString();
        var i = strLength - res.length;
        while (i > 0) {
            res = "0".concat(res);
            i--;
        }
        return res.slice(0, strLength);
    }
    exports.num2str = num2str;
});
//# sourceMappingURL=helper.js.map
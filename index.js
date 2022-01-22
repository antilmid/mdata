System.register([], function (exports_1, context_1) {
    "use strict";
    var version, Hello;
    var __moduleName = context_1 && context_1.id;
    function FC(a) {
        console.log(a);
    }
    exports_1("FC", FC);
    return {
        setters: [],
        execute: function () {
            console.log('hello world');
            exports_1("version", version = 1);
            Hello = (function () {
                function Hello() {
                }
                Hello.prototype.say = function () {
                    console.log('hello');
                };
                return Hello;
            }());
            exports_1("default", Hello);
        }
    };
});
//# sourceMappingURL=index.js.map
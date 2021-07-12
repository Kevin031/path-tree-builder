var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
define("index", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.buildTreeByParentNode = exports.buildFlatTree = exports.buildTreeByPath = void 0;
    function buildTreeByPath(list, parentMap) {
        var tree = {
            key: 'root',
            children: {}
        };
        list.forEach(function (item) {
            if (item && item.path) {
                var cur_1 = tree;
                var arr_1 = item.path.split('.');
                arr_1.forEach(function (key, index) {
                    if (!cur_1.children[key]) {
                        var data = __assign(__assign({}, (parentMap ? (parentMap[key] || {}) : {})), { key: key, children: {} });
                        cur_1.children[key] = data;
                    }
                    cur_1 = cur_1.children[key];
                    if (index === arr_1.length - 1) {
                        cur_1 = tree;
                    }
                });
            }
        });
        return tree;
    }
    exports.buildTreeByPath = buildTreeByPath;
    function buildFlatTree(list) {
        var parentMap = {};
        var res = list.map(function (item) {
            var pathArr = [];
            var cur = item;
            while (cur.parent) {
                var key = cur.parent.key;
                var _a = cur.parent, parent_1 = _a.parent, data = __rest(_a, ["parent"]);
                parentMap[key] = data;
                pathArr.push(key);
                cur = cur.parent;
            }
            delete item.parent;
            item.path = pathArr.reverse().join('.');
            return item;
        });
        return {
            parentMap: parentMap,
            flatList: res
        };
    }
    exports.buildFlatTree = buildFlatTree;
    function buildTreeByParentNode(list) {
        var _a = buildFlatTree(list), parentMap = _a.parentMap, flatList = _a.flatList;
        return buildTreeByPath(flatList, parentMap);
    }
    exports.buildTreeByParentNode = buildTreeByParentNode;
});

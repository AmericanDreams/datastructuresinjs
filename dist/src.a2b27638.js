// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/util/Util.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.print = void 0;

var print = function print(text) {
  var myDiv = document.getElementById("app");
  myDiv.innerHTML += "<div style='color:white; background-color: black;margin-bottom: 1px;font-weight: bold;padding: 3px; padding-left: 20px;'>" + text + "</div>";
  document.body.appendChild(myDiv);
};

exports.print = print;
},{}],"src/ds/list/ArrayList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var Util = _interopRequireWildcard(require("../../util/Util"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ArrayList = /*#__PURE__*/function () {
  function ArrayList() {
    _classCallCheck(this, ArrayList);

    this.INTERNAL_CAPASITY = 10;
    this.internalArray = [
      /*this.INTERNAL_CAPASITY */
    ];
    this.pointer = 0;
  } // Amortized O(1)


  _createClass(ArrayList, [{
    key: "add",
    value: function add(item) {
      if (this.isInternalArrayFull() || this.isEmpty()) {
        this.resize();
      }

      this.internalArray[this.pointer++] = item;
    } // O(1)

  }, {
    key: "get",
    value: function get(index) {
      if (!this.isValidIndex(index)) {
        return undefined;
      }

      return this.internalArray[index];
    } // O(1)

  }, {
    key: "set",
    value: function set(index, newItem) {
      if (!this.isValidIndex(index)) {
        return undefined;
      }

      this.internalArray[index] = newItem;
      return this.internalArray[index];
    } // O(N) in the worst case

  }, {
    key: "remove",
    value: function remove(index) {
      if (!this.isValidIndex(index)) {
        return undefined;
      }

      var temp = this.internalArray[index];
      this.internalArray[index] = undefined;
      this.moveAlltoLeft(index + 1);
      this.pointer--;
      return temp;
    } // O(N)

  }, {
    key: "addToHead",
    value: function addToHead(item) {
      if (this.isInternalArrayFull() || this.isEmpty()) {
        this.resize();
      }

      this.moveAlltoRight(0);
      this.pointer++;
      this.internalArray[0] = item;
    } // O(1)

  }, {
    key: "size",
    value: function size() {
      return this.pointer;
    } // O(1)

  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.pointer === 0;
    } // O(N)

  }, {
    key: "resize",
    value: function resize() {
      if (this.isInternalArrayFull()) {
        // Internal array is full. Need to make bigger

        /**
         * Creating new Internal array with 1.5 times bigger size and copying all
         * elements from last internal array into new one
         */
        this.INTERNAL_CAPASITY *= 1.5;
        var newInternalArray = [
          /*this.INTERNAL_CAPASITY */
        ];

        for (var i = 0; i < this.internalArray.length; i++) {
          newInternalArray[i] = this.internalArray[i];
        } // Replacing old internal array with new (bigger) one


        this.internalArray = newInternalArray;
      } else if (this.isEmpty() && this.INTERNAL_CAPASITY > 10) {
        // Internal array is full. Need make smaller

        /**
         * Creating new array with 10 size and replacing internal array with new (smaller) array
         */
        this.INTERNAL_CAPASITY = 10;
        var _newInternalArray = [
          /*this.INTERNAL_CAPASITY */
        ];
        this.internalArray = _newInternalArray;
      }
    }
  }, {
    key: "isInternalArrayFull",
    value: function isInternalArrayFull() {
      return this.pointer === this.INTERNAL_CAPASITY;
    }
  }, {
    key: "isValidIndex",
    value: function isValidIndex(index) {
      return index >= 0 && index < this.size();
    }
    /*
     * This method will take all the items in the right of the given index (given index inclusive)
     * and move them 1 step right
     */

  }, {
    key: "moveAlltoRight",
    value: function moveAlltoRight(index) {
      if (!this.isValidIndex(index)) return;

      for (var i = this.size() - 1; i >= index; i--) {
        this.internalArray[i + 1] = this.internalArray[i];
      }

      this.internalArray[index] = undefined;
    }
    /*
     * Thii method will take all the items in the left of the given index (given index inclusive)
     * and move them 1 step left. Note first index will dissappear
     */

  }, {
    key: "moveAlltoLeft",
    value: function moveAlltoLeft(index) {
      if (!this.isValidIndex(index)) return;

      for (var i = index; i < this.size(); i++) {
        if (i === 0) continue;
        this.internalArray[i - 1] = this.internalArray[i];
      }

      this.internalArray.pop();
    }
  }, {
    key: "print",
    value: function print() {
      Util.print("Printing the ArrayList");

      for (var i = 0; i < this.internalArray.length; i++) {
        Util.print(this.internalArray[i]);
      }
    }
  }]);

  return ArrayList;
}();

exports.default = ArrayList;
},{"../../util/Util":"src/util/Util.js"}],"src/ds/list/linkedlist/SNode.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SNode = function SNode(data) {
  _classCallCheck(this, SNode);

  this.data = data;
  this.next = null;
};

exports.default = SNode;
},{}],"src/ds/list/linkedlist/SingleLinkedList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var Util = _interopRequireWildcard(require("../../../util/Util"));

var _SNode = _interopRequireDefault(require("./SNode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SingleLinkedList = /*#__PURE__*/function () {
  function SingleLinkedList() {
    _classCallCheck(this, SingleLinkedList);

    this.root = null;
    this.counter = 0;
  } // O(N)


  _createClass(SingleLinkedList, [{
    key: "add",
    value: function add(item) {
      var node = new _SNode.default(item);

      if (this.isEmpty()) {
        this.root = node;
      } else {
        var lastNode = this.getLastNode();
        lastNode.next = node;
      }

      this.counter++;
    } // O(N) in the worst case

  }, {
    key: "get",
    value: function get(index) {
      if (!this.isValidIndex(index)) {
        return undefined;
      }

      return this.getNodeByIndex(index).data;
    } // O(N) in the worst case

  }, {
    key: "set",
    value: function set(index, newItem) {
      if (!this.isValidIndex(index)) {
        return undefined;
      }

      var node = this.getNodeByIndex(index);
      node.data = newItem;
      return node.data;
    } // O(N) in the worst case

  }, {
    key: "remove",
    value: function remove(index) {
      if (!this.isValidIndex(index)) {
        return undefined;
      }

      var node = this.root;

      if (index === 0) {
        this.root = this.root.next;
        this.counter--;
        return node.data;
      }

      for (var i = 2; i <= index; i++) {
        node = node.next;
      }

      var temp = node.next;
      node.next = node.next.next;
      this.counter--;
      return temp.data;
    } // O(1)

  }, {
    key: "addToHead",
    value: function addToHead(item) {
      var node = new _SNode.default(item);
      node.next = this.root;
      this.root = node;
      this.counter++;
    } // O(1)

  }, {
    key: "size",
    value: function size() {
      return this.counter;
    } // O(1)

  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.root === null;
    }
  }, {
    key: "isValidIndex",
    value: function isValidIndex(index) {
      return index >= 0 && index < this.size();
    }
  }, {
    key: "getNodeByIndex",
    value: function getNodeByIndex(index) {
      if (!this.isValidIndex(index)) {
        return undefined;
      }

      var node = this.root;

      for (var i = 1; i <= index; i++) {
        node = node.next;
      }

      return node;
    }
  }, {
    key: "getLastNode",
    value: function getLastNode() {
      if (this.isEmpty()) {
        return undefined;
      }

      if (this.size() === 1) {
        return this.root;
      }

      var node = this.root;

      while (node.next !== null) {
        node = node.next;
      }

      return node;
    }
  }, {
    key: "print",
    value: function print() {
      Util.print("Printing the SingleLinkedList");
      var node = this.root;

      while (node != null) {
        Util.print(node.data);
        node = node.next;
      }
    }
  }]);

  return SingleLinkedList;
}();

exports.default = SingleLinkedList;
},{"../../../util/Util":"src/util/Util.js","./SNode":"src/ds/list/linkedlist/SNode.js"}],"src/ds/list/linkedlist/DNode.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DNode = function DNode(data) {
  _classCallCheck(this, DNode);

  this.data = data;
  this.next = null;
  this.prev = null;
};

exports.default = DNode;
},{}],"src/ds/list/linkedlist/DoublyLinkedList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var Util = _interopRequireWildcard(require("../../../util/Util"));

var _DNode = _interopRequireDefault(require("./DNode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SingleLinkedList = /*#__PURE__*/function () {
  function SingleLinkedList() {
    _classCallCheck(this, SingleLinkedList);

    this.root = null;
    this.tail = null;
    this.counter = 0;
  } // O(1)


  _createClass(SingleLinkedList, [{
    key: "add",
    value: function add(item) {
      var node = new _DNode.default(item);

      if (this.isEmpty()) {
        this.root = node;
        this.tail = node;
      } else {
        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
      }

      this.counter++;
    } // O(N/2)

  }, {
    key: "get",
    value: function get(index) {
      var node = this.getNode(index);
      return node === undefined ? undefined : node.data;
    } // O(N/2)

  }, {
    key: "set",
    value: function set(index, newItem) {
      var node = this.getNode(index);

      if (node === undefined) {
        return undefined;
      }

      node.data = newItem;
      return node.data;
    } // O(N/2)

  }, {
    key: "remove",
    value: function remove(index) {
      var node = this.getNode(index);

      if (node === undefined) {
        return undefined;
      }

      if (this.size() === 1) {
        // The node we wanna remove is the only node in the linkedlist
        this.root = null;
        this.tail = null;
        this.counter--;
        return node.data;
      }

      if (node.prev === null) {
        // So this is the root node
        node.next.prev = null;
        this.root = node.next;
      }

      if (node.next === null) {
        // So this is the tail node
        node.prev.next = null;
        this.tail = node.prev;
      }

      if (node.next !== null && node.prev !== null) {
        // So node is placed in the middle
        node.prev.next = node.next;
        node.next.prev = node.prev;
      }

      this.counter--;
      return node.data;
    } // O(1)

  }, {
    key: "addToHead",
    value: function addToHead(item) {
      var node = new _DNode.default(item);

      if (this.isEmpty()) {
        this.root = node;
        this.tail = node;
      } else {
        node.next = this.root;
        this.root.prev = node;
        this.root = node;
      }

      this.counter++;
    }
  }, {
    key: "size",
    value: function size() {
      return this.counter;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.root == null;
    }
  }, {
    key: "isValidIndex",
    value: function isValidIndex(index) {
      return index >= 0 && index < this.size();
    } // O(N/2)

  }, {
    key: "getNode",
    value: function getNode(index) {
      if (!this.isValidIndex(index)) {
        return undefined;
      }

      if (index > this.size() / 2) {
        var node = this.tail;
        var startIndex = this.size() - 1;

        while (startIndex !== index) {
          node = node.prev;
          startIndex--;
        }

        return node;
      } else {
        var _node = this.root;
        var _startIndex = 0;

        while (_startIndex !== index) {
          _node = _node.next;
          _startIndex++;
        }

        return _node;
      }
    }
  }, {
    key: "print",
    value: function print() {
      Util.print("Printing the DoublyLinkedList");
      var node = this.root;

      while (node != null) {
        Util.print(node.data);
        node = node.next;
      }
    }
  }]);

  return SingleLinkedList;
}();

exports.default = SingleLinkedList;
},{"../../../util/Util":"src/util/Util.js","./DNode":"src/ds/list/linkedlist/DNode.js"}],"src/ds/stack/implwitharraylist/Stack.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var Util = _interopRequireWildcard(require("../../../util/Util"));

var _ArrayList = _interopRequireDefault(require("../../list/ArrayList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Stack = /*#__PURE__*/function () {
  function Stack() {
    _classCallCheck(this, Stack);

    this.arrayList = new _ArrayList.default();
  } // Amortized O(1)


  _createClass(Stack, [{
    key: "push",
    value: function push(item) {
      this.arrayList.add(item);
      return this.arrayList.get(this.arrayList.size() - 1);
    } // O(1)

  }, {
    key: "peek",
    value: function peek() {
      if (this.isEmpty()) {
        return undefined;
      }

      return this.arrayList.get(this.arrayList.size() - 1);
    } // O(1)

  }, {
    key: "pop",
    value: function pop() {
      if (this.isEmpty()) {
        return undefined;
      } // O(1) Because it alwys removes the last element in the arrayList so after removing any
      // shifting operation will not needed


      return this.arrayList.remove(this.arrayList.size() - 1);
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.arrayList.isEmpty();
    }
  }, {
    key: "size",
    value: function size() {
      return this.arrayList.size();
    }
  }, {
    key: "print",
    value: function print() {
      Util.print("Printing the Stack");

      for (var i = this.arrayList.size() - 1; i >= 0; i--) {
        if (i === this.arrayList.size() - 1) {
          Util.print(this.arrayList.get(i) + " <= HEAD");
        } else if (i === 0) {
          Util.print(this.arrayList.get(i) + " <= BOTTOM");
        } else {
          Util.print(this.arrayList.get(i));
        }
      }
    }
  }]);

  return Stack;
}();

exports.default = Stack;
},{"../../../util/Util":"src/util/Util.js","../../list/ArrayList":"src/ds/list/ArrayList.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var Util = _interopRequireWildcard(require("./util/Util"));

var _ArrayList = _interopRequireDefault(require("./ds/list/ArrayList"));

var _SingleLinkedList = _interopRequireDefault(require("./ds/list/linkedlist/SingleLinkedList"));

var _DoublyLinkedList = _interopRequireDefault(require("./ds/list/linkedlist/DoublyLinkedList"));

var _Stack = _interopRequireDefault(require("./ds/stack/implwitharraylist/Stack"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
},{"./util/Util":"src/util/Util.js","./ds/list/ArrayList":"src/ds/list/ArrayList.js","./ds/list/linkedlist/SingleLinkedList":"src/ds/list/linkedlist/SingleLinkedList.js","./ds/list/linkedlist/DoublyLinkedList":"src/ds/list/linkedlist/DoublyLinkedList.js","./ds/stack/implwitharraylist/Stack":"src/ds/stack/implwitharraylist/Stack.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "65442" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map
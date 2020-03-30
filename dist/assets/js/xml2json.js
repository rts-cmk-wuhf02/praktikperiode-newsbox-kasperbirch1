"use strict";

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function xml2json(srcDOM) {
  var children = _toConsumableArray(srcDOM.children);

  if (!children.length) {
    if (srcDOM.attributes && srcDOM.attributes.length > 0) {
      var attributeData = {};
      attributeData.attributes = {};

      for (var i = 0; i < srcDOM.attributes.length; i++) {
        attributeData.attributes[srcDOM.attributes[i].name] = srcDOM.attributes[i].value;
      }

      attributeData.text = srcDOM.innerHTML;
      return attributeData;
    } else {
      return srcDOM.innerHTML;
    }
  }

  var jsonResult = {};

  var _iterator = _createForOfIteratorHelper(children),
      _step;

  try {
    var _loop = function _loop() {
      var child = _step.value;
      // checking is child has siblings of same name. 
      var childIsArray = children.filter(function (eachChild) {
        return eachChild.nodeName === child.nodeName;
      }).length > 1; // if child is array, save the values as array, else as strings. 

      if (childIsArray) {
        if (jsonResult[child.nodeName] === undefined) {
          jsonResult[child.nodeName] = [xml2json(child)];
        } else {
          jsonResult[child.nodeName].push(xml2json(child));
        }
      } else {
        jsonResult[child.nodeName] = xml2json(child);
      }
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    } // Attributes

  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  if (srcDOM.attributes && srcDOM.attributes.length > 0) {
    jsonResult.attributes = {};

    for (var _i = 0; _i < srcDOM.attributes.length; _i++) {
      jsonResult.attributes[srcDOM.attributes[_i].name] = srcDOM.attributes[_i].value;
    }
  }

  return jsonResult;
}
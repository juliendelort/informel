"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InformField = exports.InformEl = void 0;

var _react = _interopRequireDefault(require("react"));

var _excluded = ["children", "className"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var InformEl = generateEl('inform-el');
exports.InformEl = InformEl;
var InformField = generateEl('inform-field');
exports.InformField = InformField;

function generateEl(el) {
  // Web components wrapper
  var Inner = /*#__PURE__*/_react["default"].forwardRef(function Wrapper(_ref, ref) {
    var _ref$children = _ref.children,
        children = _ref$children === void 0 ? null : _ref$children,
        _ref$className = _ref.className,
        className = _ref$className === void 0 ? '' : _ref$className,
        rest = _objectWithoutProperties(_ref, _excluded);

    var Tag = el; // We use forwardRef but we also need to use that ref internally: https://itnext.io/reusing-the-ref-from-forwardref-with-react-hooks-4ce9df693dd

    var innerRef = _react["default"].useRef(null);

    var combinedRef = useCombinedRefs(ref, innerRef);

    var eventsRef = _react["default"].useRef({});

    var handlers = _react["default"].useRef({}); // We want this at every render


    _react["default"].useEffect(function () {
      // We don't want to re-attach listeners at every render but we also don't want stale event listeners
      // So we attach a generic event listener and we use a ref to call the up-to-date listener
      var mainEventListener = function mainEventListener(eventName) {
        return function () {
          var _eventsRef$current;

          (_eventsRef$current = eventsRef.current)[eventName].apply(_eventsRef$current, arguments);
        };
      }; // Finding events: all props that have a function as value
      // and transforming their name "onEventName" => "event-name"


      var _Object$keys$reduce = Object.keys(rest).reduce(function (_ref2, current) {
        var _ref3 = _slicedToArray(_ref2, 2),
            events = _ref3[0],
            properties = _ref3[1];

        if (typeof rest[current] === 'function') {
          if (current.startsWith('on')) {
            // events start witn "on"
            // Remove "on" at the beginning and convert to kebab case
            // onSearchKeystroke => search-keystroke
            events[toKebabCase(current.replace(/^(on)/, ''))] = rest[current];
          } else {
            // property otherwise
            properties[current] = rest[current];
          }
        }

        return [events, properties];
      }, [{}, {}]),
          _Object$keys$reduce2 = _slicedToArray(_Object$keys$reduce, 2),
          events = _Object$keys$reduce2[0],
          properties = _Object$keys$reduce2[1]; // Look for new events


      for (var eventName in events) {
        if (!eventsRef.current[eventName]) {
          var _combinedRef$current;

          // new event
          handlers.current[eventName] = mainEventListener(eventName);
          (_combinedRef$current = combinedRef.current) === null || _combinedRef$current === void 0 ? void 0 : _combinedRef$current.addEventListener(eventName, handlers.current[eventName]);
        }
      } // Look for removed events


      for (var _eventName in handlers.current) {
        if (!events[_eventName]) {
          var _combinedRef$current2;

          (_combinedRef$current2 = combinedRef.current) === null || _combinedRef$current2 === void 0 ? void 0 : _combinedRef$current2.removeEventListener(_eventName, handlers.current[_eventName]);
          delete handlers.current[_eventName];
        }
      }

      if (combinedRef.current) {
        // Add properties
        for (var propName in properties) {
          combinedRef.current[propName] = properties[propName];
        }
      }

      eventsRef.current = events;
    });

    _react["default"].useEffect(function () {
      // When component is unmounted : remove all events
      return function () {
        for (var eventName in handlers.current) {
          var _combinedRef$current3;

          (_combinedRef$current3 = combinedRef.current) === null || _combinedRef$current3 === void 0 ? void 0 : _combinedRef$current3.removeEventListener(eventName, handlers.current[eventName]);
        }
      };
    }, []); // Remove undefined or null attributes


    var restDefined = Object.keys(rest).reduce(function (result, key) {
      if (rest[key] !== null && rest[key] !== undefined && typeof rest[key] !== 'function') {
        result[key] = rest[key];
      }

      return result;
    }, {});
    return (
      /*#__PURE__*/
      // For webcomponents, we need to use `class` instead of `className`
      _react["default"].createElement(Tag, _extends({
        ref: combinedRef,
        "class": className
      }, restDefined), children)
    );
  });

  Inner.displayName = el;
  return Inner;
}

function toKebabCase(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
} // https://itnext.io/reusing-the-ref-from-forwardref-with-react-hooks-4ce9df693dd


function useCombinedRefs() {
  for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++) {
    refs[_key] = arguments[_key];
  }

  var targetRef = _react["default"].useRef();

  _react["default"].useEffect(function () {
    refs.forEach(function (ref) {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
}
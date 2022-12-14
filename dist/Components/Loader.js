"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loader = Loader;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const style = {
  'display': 'block',
  'position': 'absolute',
  'top': '0px',
  'left': '0px',
  'width': '100%',
  'height': '100%',
  'backgroundColor': 'rgba(0, 0, 0, 0.5)',
  'zIndex': '9999',
  'opacity': '0.8'
};

function Loader(_ref) {
  let {
    show,
    message,
    backgroundStyle
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    style: _objectSpread(_objectSpread({}, style), {}, {
      'display': "".concat(show ? 'block' : 'none')
    })
  }, message);
}
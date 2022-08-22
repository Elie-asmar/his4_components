"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BreadCrumbItem = BreadCrumbItem;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function BreadCrumbItem(_ref) {
  let {
    children,
    label,
    path,
    separator,
    isDisabledStyle = undefined
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    to: path,
    style: isDisabledStyle
  }, children ? children : label), /*#__PURE__*/_react.default.createElement("span", null, " ", separator, " "));
}
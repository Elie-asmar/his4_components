"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withSuspense = withSuspense;

var _react = _interopRequireWildcard(require("react"));

var _reactstrap = require("../../reactstrap");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const spinner = /*#__PURE__*/_react.default.createElement("div", {
  style: {
    display: "grid",
    placeContent: "center",
    height: "100%",
    width: "100%"
  }
}, /*#__PURE__*/_react.default.createElement(_reactstrap.Spinner, null));

function withSuspense(LazyLoadedComponent) {
  return props => {
    return /*#__PURE__*/_react.default.createElement(_react.Suspense, {
      fallback: spinner
    }, /*#__PURE__*/_react.default.createElement(LazyLoadedComponent, props));
  };
}
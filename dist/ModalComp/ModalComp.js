"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalComp = ModalComp;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _reactstrap = require("reactstrap");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ModalComp(_ref) {
  let {
    modalTitle,
    modalBody,
    onAcceptColor,
    onRefusedColor,
    onCloseColor,
    onAcceptText,
    onRefusedText,
    onCloseText,
    onAccept,
    onRefused,
    onClose,
    className,
    modal,
    size,
    hideFooterButtons
  } = _ref;
  const [mdl, setModal] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    if (mdl !== modal) {
      setModal(modal);
    }
  }, [modal]);
  return /*#__PURE__*/_react.default.createElement("div", {
    onKeyDown: e => {
      if (e.keyCode === 27) onClose && onClose();
    }
  }, /*#__PURE__*/_react.default.createElement(_reactstrap.Modal, {
    size: size ? size : "",
    isOpen: mdl,
    className: "reset-modal-style " + className,
    toggle: onClose,
    backdrop: "static"
  }, /*#__PURE__*/_react.default.createElement(_reactstrap.ModalHeader, {
    id: "custom-modal-header"
  }, modalTitle), /*#__PURE__*/_react.default.createElement(_reactstrap.ModalBody, {
    id: "custom-modal-body"
  }, modalBody), !hideFooterButtons && /*#__PURE__*/_react.default.createElement(_reactstrap.ModalFooter, {
    id: "custom-modal-footer"
  }, onAccept && /*#__PURE__*/_react.default.createElement(_reactstrap.Button, {
    color: onAcceptColor || "info",
    onClick: onAccept
  }, onAcceptText || "Save"), onRefused && /*#__PURE__*/_react.default.createElement(_reactstrap.Button, {
    color: onRefusedColor || "warning",
    onClick: onRefused
  }, onRefusedText || "Refused"), onClose && /*#__PURE__*/_react.default.createElement(_reactstrap.Button, {
    color: onCloseColor || "danger",
    onClick: onClose
  }, onCloseText || "Close"))));
}
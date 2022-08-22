"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _attach = _interopRequireDefault(require("../UploadFiles/assets/attach.png"));

require("./Avatar.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Avatar = props => {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "avatar-ui ".concat(props.className),
    style: props.style
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: props.image,
    alt: props.alt,
    style: {
      width: props.width,
      height: props.width,
      borderRadius: 0
    },
    onError: event => {
      event.target.src = _attach.default;
    }
  }));
};

var _default = Avatar;
exports.default = _default;
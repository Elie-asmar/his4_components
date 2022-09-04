"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

var _react = _interopRequireWildcard(require("react"));

var _Tooltip = require("../../reactstrap/Tooltip");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class RoundedIcon extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "toggleTooltip", () => {
      this.setState({
        tooltipVisible: !this.state.tooltipVisible
      });
    });

    this.state = {
      id: this.props.id ? this.props.id.replace(/ /g, "").replace(/'/g, "", "") : "",
      tooltip: this.props.tooltip ? this.props.tooltip : "",
      tooltipVisible: false
    };
  }

  render() {
    let divStyles = {
      backgroundColor: this.props.backgroundColor,
      float: this.props.position === "right" || this.props.position === "left" ? this.props.position : "none",
      margin: this.props.position === 'center' ? "0 auto" : "0 0 0 10px",
      display: this.props.display ? this.props.display : ""
    };
    return /*#__PURE__*/_react.default.createElement("div", {
      id: this.state.id,
      style: divStyles,
      className: "roundWrapper pointer",
      onClick: this.props.onClick
    }, /*#__PURE__*/_react.default.createElement("i", {
      style: {
        color: "".concat(this.props.iconColor)
      },
      className: "fa ".concat(this.props.iconClass)
    }), this.state.id && this.state.tooltip && /*#__PURE__*/_react.default.createElement(_Tooltip.Tooltip, {
      placement: "bottom",
      isOpen: this.state.tooltipVisible,
      target: this.state.id,
      toggle: this.toggleTooltip
    }, this.state.tooltip));
  }

}

var _default = RoundedIcon;
exports.default = _default;
"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _RoundedIcon = _interopRequireDefault(require("../RoundedIcon/RoundedIcon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ContainerComp extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "toggle", () => {
      this.setState({
        isOpen: !this.state.isOpen
      });
    });

    _defineProperty(this, "onClickPlus", () => {
      this.props.onClickPlus(this.props.name);
    });

    this.state = {
      isOpen: true,
      containerBody: this.props.containerBody
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!(0, _lodash.isEqual)(this.props, nextProps) || !(0, _lodash.isEqual)(this.state, nextState)) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate(prevProps) {
    if (!(0, _lodash.isEqual)(prevProps.containerBody, this.props.containerBody)) {
      this.setState({
        containerBody: this.props.containerBody
      });
    }
  }

  render() {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "col-12 border-left border-right border-bottom border-top",
      style: {
        borderRadius: "4px"
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "row containerHeader"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-10 no-padding-right"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "flex title"
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "containerTitle"
    }, this.props.containerHeader ? this.props.containerHeader : " Sample Title "), this.props.addPlus && /*#__PURE__*/_react.default.createElement(_RoundedIcon.default, {
      iconClass: "fa-plus",
      iconColor: "#fff",
      backgroundColor: "#00C20C",
      onClick: this.onClickPlus,
      position: "left"
    }), "         ")), /*#__PURE__*/_react.default.createElement("div", {
      className: "col-2 text-right"
    }, /*#__PURE__*/_react.default.createElement("div", {
      onClick: this.toggle
    }, this.state.isOpen ? /*#__PURE__*/_react.default.createElement("i", {
      className: "fa fa-chevron-down pointer"
    }) : /*#__PURE__*/_react.default.createElement("i", {
      className: "fa fa-chevron-up"
    })))), /*#__PURE__*/_react.default.createElement("div", {
      className: "row no-padding",
      style: {
        display: this.state.isOpen ? "" : "none"
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-12"
    }, this.state.containerBody)));
  }

}

var _default = ContainerComp;
exports.default = _default;
"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.string.trim.js");

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _reactstrap = require("reactstrap");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class InputPassComp extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleChange", e => {
      const {
        value
      } = e.target;
      this.setState({
        value: value
      }, () => {
        this.props.handleChange(this.state.value, this.props.name);
      });
    });

    _defineProperty(this, "togglePasswordVisibility", () => {
      this.setState({
        showPassword: !this.state.showPassword
      });
    });

    _defineProperty(this, "toggleTooltip", () => {
      this.setState({
        showTooltip: !this.state.showTooltip
      });
    });

    _defineProperty(this, "onBlur", e => {
      this.setState({
        value: e.target.value.trim()
      }, () => {
        this.props.handleChange(this.state.value, this.props.name);
        this.props.handleOnblur && this.props.handleOnblur(this.state.value);
      });
    });

    this.state = {
      value: this.props.value,
      showPassword: false,
      showTooltip: false
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
    if (!(0, _lodash.isEqual)(prevProps.value, this.props.value)) {
      this.setState({
        value: this.props.value
      });
    }
  }

  render() {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "passwordComp",
      style: {
        position: "relative"
      }
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: this.state.showPassword ? "text" : "password",
      name: this.props.name,
      style: {
        padding: "0.5rem 1.5rem 0.5rem 0.75rem"
      },
      className: "form-control ".concat(this.props.className),
      value: this.state.value,
      onChange: this.handleChange,
      placeholder: this.props.placeholder,
      readOnly: this.props.readOnly ? true : false,
      disabled: this.props.disabled ? true : false,
      maxLength: this.props.maxLength ? this.props.maxLength : null,
      onBlur: this.onBlur
    }), !this.props.hideToggle && /*#__PURE__*/_react.default.createElement("span", {
      className: "showPass pointer",
      id: "".concat(this.props.name, "-showhidePass"),
      onClick: this.togglePasswordVisibility,
      style: {
        position: "absolute",
        top: "0px",
        right: "0px",
        padding: "0.45rem 0.3rem"
      }
    }, /*#__PURE__*/_react.default.createElement("i", {
      className: "fa fa-eye".concat(this.state.showPassword ? "-slash" : "")
    }), /*#__PURE__*/_react.default.createElement(_reactstrap.Tooltip, {
      placement: "bottom",
      isOpen: this.state.showTooltip,
      target: "".concat(this.props.name, "-showhidePass"),
      toggle: this.toggleTooltip
    }, this.state.showPassword ? "Hide Password" : "Show Password")));
  }

}

var _default = InputPassComp;
exports.default = _default;
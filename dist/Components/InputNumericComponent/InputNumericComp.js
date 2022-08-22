"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.parse-float.js");

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _reactNumberFormat = _interopRequireDefault(require("react-number-format"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class InputNumericComp extends _react.Component {
  shouldComponentUpdate(nextProps) {
    if (!(0, _lodash.isEqual)(this.props, nextProps)) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactNumberFormat.default, {
      id: this.props.id,
      thousandSeparator: this.props.thousandSeparator ? true : false,
      suffix: this.props.suffix ? this.props.suffix : "",
      name: this.props.name,
      className: "form-control  ".concat(this.props.className),
      style: this.props.style,
      value: this.props.value,
      format: this.props.format ? this.props.format : null,
      maxLength: this.props.maxLength ? this.props.maxLength : null,
      placeholder: this.props.placeholder ? this.props.placeholder : "",
      allowNegative: this.props.allowNegative ? true : false,
      onValueChange: value => {
        value = this.props.noDecimal ? value.value.replace(".", "") : value.value;
        this.props.handleChange(value, this.props.name, this.props.id);
      },
      isAllowed: values => {
        const {
          formattedValue,
          floatValue
        } = values;
        let isAllowed = true;
        if (this.props.maxValue && floatValue > parseFloat(this.props.maxValue) || this.props.minValue && floatValue < parseFloat(this.props.minValue)) isAllowed = false;
        return formattedValue === "" || isAllowed;
      },
      readOnly: this.props.readOnly ? true : false,
      disabled: this.props.disabled ? true : false,
      onBlur: () => this.props.onBlur ? this.props.onBlur(this.props.value, this.props.name) : undefined,
      allowLeadingZeros: this.props.allowLeadingZeros ? true : false
    }));
  }

}

var _default = InputNumericComp;
exports.default = _default;
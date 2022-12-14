"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactIcheck = require("react-icheck");

var _lodash = require("lodash");

var _EnhancedSwitch = _interopRequireDefault(require("react-icheck/lib/EnhancedSwitch"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class RadioGroupComp extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleChange", e => {
      let {
        value,
        name
      } = e.target;
      this.setState({
        value
      }, () => {
        this.props.onClick(this.state.value, name, this.props.id ? this.props.id : "");
      });
    });

    _defineProperty(this, "renderRadio", radios => {
      let HTML = [];
      (0, _lodash.map)(radios, (value, key) => {
        HTML.push( /*#__PURE__*/_react.default.createElement(_reactIcheck.Radio, {
          cursor: "pointer",
          key: key,
          value: value.value,
          name: value.name,
          className: "col-12",
          radioClass: "iradio_square-blue",
          increaseArea: "".concat(this.props.increaseArea ? "20%" : null),
          disabled: this.props.disabled ? true : false,
          label: "<span\n                     style='".concat(this.props.styleHTMLLabel, "; padding: 0 20px 0 0;' \n                     class='").concat(this.props.radioClassname ? this.props.radioClassname : "", "'>\n                 ").concat(value.name, "</span>")
        }));
      });
      return HTML;
    });

    this.state = {
      value: this.props.value
    };
    _EnhancedSwitch.default.propTypes = _objectSpread(_objectSpread({}, _EnhancedSwitch.default.propTypes), {}, {
      cursor: _propTypes.default.string
    });
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
      className: this.props.removeMargin ? "radio-button-main-container" : ""
    }, /*#__PURE__*/_react.default.createElement(_reactIcheck.RadioGroup, {
      name: this.props.name,
      value: this.state.value,
      className: this.props.className + (this.props.isNotRowRadioGroup ? "" : "row"),
      style: this.props.style,
      onChange: this.handleChange
    }, this.renderRadio(this.props.radios)));
  }

}

var _default = RadioGroupComp;
exports.default = _default;
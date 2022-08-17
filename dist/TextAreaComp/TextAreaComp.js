"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.string.trim.js");

var _react = _interopRequireWildcard(require("react"));

var _reactAutosizeTextarea = _interopRequireDefault(require("react-autosize-textarea"));

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class TextAreaComp extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleChange", e => {
      const {
        value
      } = e.target;
      this.setState({
        value
      }, () => {
        this.props.onChange(this.state.value, this.props.name);
      });
    });

    _defineProperty(this, "onBlur", e => {
      this.setState({
        value: e.target.value.trim()
      }, () => {
        this.props.onChange(this.state.value, this.props.name);
      });
    });

    this.state = {
      value: this.props.value
    };
  }

  componentDidMount() {}

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
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactAutosizeTextarea.default, {
      onChange: this.handleChange,
      name: this.props.name,
      value: this.state.value,
      placeholder: this.props.placeholder ? this.props.placeholder : "",
      className: "form-control ".concat(this.props.className),
      style: _objectSpread({}, this.props.style),
      maxLength: this.props.maxLength ? this.props.maxLength : 5000,
      onBlur: this.onBlur,
      disabled: this.props.disabled ? true : false,
      "aria-label": "maximum height",
      maxRows: this.props.maxRows
    }));
  }

}

var _default = TextAreaComp;
exports.default = _default;
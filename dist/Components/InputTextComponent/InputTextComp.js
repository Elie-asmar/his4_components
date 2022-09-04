"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.string.trim.js");

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _reactstrap = require("reactstrap");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class InputTextComp extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleChange", e => {
      const {
        value,
        id
      } = e.target;
      this.setState({
        value: this.props.removeSpaces ? value.replace(" ", "") : value
      }, () => {
        this.props.handleChange(this.state.value, this.props.name, id ? id : "");

        if (this.props.PagingChanges) {
          this.props.PagingChanges(value);
        }
      });
    });

    _defineProperty(this, "onBlur", e => {
      this.setState({
        value: e.target.value.trim()
      }, () => {
        //this.props.handleChange && this.props.handleChange(this.state.value, this.props.name);
        this.props.handleOnblur && this.props.handleOnblur(this.state.value, this.props.name);
      });
    });

    _defineProperty(this, "_setinputRef", ref => {
      this._inputRef = ref;
    });

    _defineProperty(this, "focus", () => {
      if (this._inputRef) {
        return this._inputRef.focus();
      }
    });

    this.state = {
      value: this.props.value
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
      key: this.props.name
    }, /*#__PURE__*/_react.default.createElement(_reactstrap.Button, null, "Hi"), /*#__PURE__*/_react.default.createElement("input", {
      dir: this.props.dir,
      key: "".concat(this.props.name, "_input"),
      ref: this._setinputRef,
      id: this.props.id ? this.props.id : undefined,
      type: this.props.type ? this.props.type : "text",
      name: this.props.name,
      style: this.props.style,
      className: "form-control ".concat(this.props.className),
      value: this.state.value,
      onChange: this.handleChange,
      placeholder: this.props.placeholder,
      readOnly: this.props.readOnly ? true : false,
      disabled: this.props.disabled ? true : false,
      onBlur: this.onBlur,
      maxLength: this.props.maxLength ? this.props.maxLength : null
    }));
  }

}

var _default = InputTextComp;
exports.default = _default;
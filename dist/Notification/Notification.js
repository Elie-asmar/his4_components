"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.json.stringify.js");

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Notification extends _react.Component {
  constructor(_props) {
    super(_props);

    _defineProperty(this, "updateProps", props => {
      this.setState({
        _Type: props.type,
        _Title: props.title,
        _Message: props.message,
        display: props.display ? props.display : "none"
      });
    });

    this.state = {
      _Type: '',
      _Title: '',
      _Message: '',
      display: 'none'
    };
  }

  componentDidMount() {
    this.updateProps(this.props);
  }

  componentWillUnmount() {}

  shouldComponentUpdate(nextProps, nextState) {
    if (!(0, _lodash.isEqual)(this.props, nextProps) || !(0, _lodash.isEqual)(this.state, nextState)) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.updateProps(this.props);
    }
  }

  render() {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "alert alert-notification ".concat(this.state._Type === "success" || this.state._Type === "partially saved" ? "alert-success" : "alert-danger"),
      role: "alert",
      style: {
        display: this.state.display
      }
    }, /*#__PURE__*/_react.default.createElement("strong", null, this.state._Type === "success" || this.state._Type === "partially saved" ? this.state._Title ? this.state._Title : "Saved successfully" : this.state._Title ? this.state._Title : "Saving failed", this.state._Message !== '' ? ": ".concat(this.state._Message) : '. '));
  }

}

var _default = Notification;
exports.default = _default;
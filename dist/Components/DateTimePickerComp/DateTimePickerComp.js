"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactDatepicker = _interopRequireDefault(require("react-datepicker"));

var _moment = _interopRequireDefault(require("moment"));

var _reactInputMask = _interopRequireDefault(require("react-input-mask"));

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

class DateTimeInputMask extends _react.default.Component {
  focus() {
    _reactDom.default.findDOMNode(this._element).focus();
  }

  render() {
    return /*#__PURE__*/_react.default.createElement(_reactInputMask.default, _extends({}, this.props, {
      ref: element => this._element = element
    }));
  }

}

;

class DateTimePickerComp extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "onDateChange", datetime => {
      this.setState({
        selected: datetime,
        date: datetime,
        isValid: true
      }, () => {
        // if (datetime === null) {
        this.props.onDateTimeChange(this.state.selected, this.props.name, this.state.isValid, this.props.id); // }
      });
    });

    _defineProperty(this, "onChangeRaw", event => {
      let tempVal = !(0, _lodash.isEmpty)(event.target.value) ? (0, _moment.default)(event.target.value) : "";
      this.setState({
        date: tempVal // }
        // , () => {
        //     this.props.onDateTimeChange(tempVal, this.props.name, this.state.isValid, this.props.id);

      });
    });

    _defineProperty(this, "prevIndex", name => {
      if (this.props.prevIndex) {
        this.props.prevIndex(name);
      }
    });

    _defineProperty(this, "keyDownDate", e => {
      const keyCode = e.keyCode || e.which;

      if (keyCode === 9) {
        if (e.shiftKey) {
          this.prevIndex(e.target.name);
          e.preventDefault();
        }
      }
    });

    _defineProperty(this, "handleBlur", event => {
      let value = event.target.value;
      let formattedDate = (0, _moment.default)(value, "DD/MM/YYYY HH:mm");
      if (this.props.showYearPicker) formattedDate = (0, _moment.default)(value, "YYYY");
      let checkMaxMin = true;
      let checkError = true;

      if (this.props.maxDate) {
        if (formattedDate.isAfter(this.props.maxDate)) {
          checkMaxMin = false;
        }
      }

      if (this.props.minDate) {
        if (formattedDate.format("YYYY/MM/DD") < (0, _moment.default)(this.props.minDate).format("YYYY/MM/DD")) {
          checkMaxMin = false;
        }
      }

      this.setState({
        isValid: (formattedDate.isValid() || value === "") && checkError && checkMaxMin ? true : false
      }, () => {
        this.props.onDateTimeChange(value === "" ? "" : formattedDate, this.props.name, this.state.isValid ? true : false, this.props.id ? this.props.id : "");
      });
    });

    _defineProperty(this, "checkIfClearable", () => {
      if (this.props.disabled) {
        return false;
      }

      return true;
    });

    this.textInput = /*#__PURE__*/_react.default.createRef();
    this.state = {
      date: '',
      selected: this.props.selected ? (0, _moment.default)(this.props.selected) : null,
      isValid: true
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

  componentDidUpdate(prevProps, prevState) {
    if (!(0, _lodash.isEqual)(prevProps, this.props)) {
      this.setState({
        selected: this.props.selected ? (0, _moment.default)(this.props.selected) : null
      });
    }
  }

  render() {
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactDatepicker.default, {
      ref: this.textInput,
      id: this.props.id,
      name: this.props.name,
      placeholderText: this.props.placeholder,
      readOnly: this.props.readOnly ? true : false,
      disabled: this.props.disabled ? true : false,
      timeIntervals: 60,
      value: this.state.date,
      onChange: this.onDateChange,
      selected: this.state.selected && this.state.isValid ? this.state.selected._d : null,
      onChangeRaw: this.onChangeRaw,
      tabIndex: this.props.tabIndex,
      key: this.props.key ? this.props.key : undefined // locale="en-gb"
      ,
      dropdownMode: "select",
      dateFormat: this.props.dateFormat ? this.props.dateFormat : "dd/MM/yyyy",
      timeFormat: this.props.timeFormat ? this.props.timeFormat : "HH:mm",
      showMonthDropdown: true,
      showYearDropdown: true,
      showTime: this.props.showTime ? true : false,
      showMonthYearPicker: this.props.showMonthYearPicker ? true : false,
      showFullMonthYearPicker: this.props.showFullMonthYearPicker ? true : false,
      showFourColumnMonthYearPicker: this.props.showFourColumnMonthYearPicker ? true : false,
      useShortMonthInDropdown: this.props.useShortMonthInDropdown ? true : false,
      showTimeSelect: this.props.showTimeSelect ? true : false,
      showTimeSelectOnly: this.props.showTimeSelectOnly ? true : false,
      showYearPicker: this.props.showYearPicker ? true : false,
      todayButton: "Today",
      className: "form-control ".concat(this.props.mandatory || this.props.invalid ? "alert-danger" : "", " ").concat(this.props.dateClassNames, " ").concat(this.props.allowTime ? "" : "text-center"),
      style: {
        width: "100%",
        padding: '0',
        border: "".concat(this.props.mandatory || this.props.invalid ? "1px solid red" : "")
      },
      isClearable: true,
      onBlur: this.props.onBlur ? this.props.onBlur : this.handleBlur,
      popperClassName: this.props.popperClassName,
      minDate: this.props.minDate ? (0, _moment.default)(this.props.minDate) : undefined,
      maxDate: this.props.maxDate ? (0, _moment.default)(this.props.maxDate) : undefined,
      customInput: /*#__PURE__*/_react.default.createElement(DateTimeInputMask, {
        mask: this.props.dateTimeMask ? this.props.dateTimeMask : this.props.allowTime ? this.props.dateSlash ? '99/99/9999 hr:mn' : '99-99-9999 hr:mn ap' : "99/99/9999",
        formatChars: {
          '9': '[0-9]',
          'h': '[0-2]',
          'r': '[0-9]',
          'm': '[0-5]',
          'n': '[0-9]',
          'a': '[Aa,Pp]',
          'p': '[Mm]'
        },
        maskChar: null
      })
    }));
  }

}

var _default = DateTimePickerComp;
exports.default = _default;
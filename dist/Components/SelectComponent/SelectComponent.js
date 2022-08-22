"use strict";

require("core-js/modules/es.object.assign.js");

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactSelect = _interopRequireDefault(require("react-select"));

var _async = _interopRequireDefault(require("react-select/async"));

var _creatable = _interopRequireDefault(require("react-select/creatable"));

var _asyncCreatable = _interopRequireDefault(require("react-select/async-creatable"));

var _lodash = require("lodash");

var _AutoSizer = _interopRequireDefault(require("react-virtualized/dist/commonjs/AutoSizer"));

var _List = _interopRequireDefault(require("react-virtualized/dist/commonjs/List"));

var _CellMeasurer = require("react-virtualized/dist/commonjs/CellMeasurer");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SelectComp extends _react.Component {
  constructor(props) {
    var _this;

    super(props);
    _this = this;

    _defineProperty(this, "handleChange", value => {
      if (this.props.special) {
        var _value;

        if (((_value = value) === null || _value === void 0 ? void 0 : _value.status) != "I") {
          if (value) {
            if (this.props.multi) {
              if ((0, _lodash.isEmpty)(value)) value = [];
              this.setState({
                value: value
              }, () => {
                this.props.onChange(this.state.value, this.props.name);
              });
            } else {
              if ((0, _lodash.isEmpty)(value)) value = "";
              this.setState({
                value: value.value
              }, () => {
                this.props.onChange(this.state.value, this.props.name);
              });
            }
          } else {
            this.setState({
              value: ""
            }, () => {
              this.props.onChange(this.state.value, this.props.name);
            });
          }
        } else {
          return;
        }

        ;
      } else {
        if (value) {
          if (this.props.multi) {
            if ((0, _lodash.isEmpty)(value)) value = [];
            this.setState({
              value: value
            }, () => {
              this.props.onChange(this.state.value, this.props.name);
            });
          } else {
            if ((0, _lodash.isEmpty)(value)) value = "";
            this.setState({
              value: value.value
            }, () => {
              this.props.onChange(this.state.value, this.props.name);
            });
          }
        } else {
          this.setState({
            value: ""
          }, () => {
            this.props.onChange(this.state.value, this.props.name);
          });
        }
      }
    });

    _defineProperty(this, "valueFromId", (opts, id) => opts.find(o => o.value === id));

    _defineProperty(this, "remeasure", (0, _lodash.debounce)(() => {
      this._cache.clearAll();

      if (this._listRef) {
        this._listRef.recomputeRowHeights();
      }

      if (this._cellMeasureRefs) {
        Object.keys(this._cellMeasureRefs).forEach(key => {
          if (this._cellMeasureRefs[key]) {
            this._cellMeasureRefs[key]._maybeMeasureCell();
          }
        });
      }

      this.setState({
        listHeight: this._calculateListHeight(this._cache._rowCount)
      });
    }, 50));

    _defineProperty(this, "recomputeOptionHeights", function () {
      let index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (_this._listRef) {
        _this._listRef.recomputeRowHeights(index);
      }
    });

    _defineProperty(this, "focus", () => {
      if (this._selectRef) {
        return this._selectRef.focus();
      }
    });

    _defineProperty(this, "_renderMenu", _ref => {
      let {
        focusedOption,
        focusOption,
        labelKey,
        onSelect,
        options,
        selectValue,
        valueArray,
        valueKey
      } = _ref;
      const {
        listProps,
        optionRenderer
      } = this.props;

      const height = this._calculateListHeight(options.length);

      const focusedOptionIndex = options.indexOf(focusedOption);
      const innerRowRenderer = optionRenderer || this._optionRenderer; // react-select 1.0.0-rc2 passes duplicate `onSelect` and `selectValue` props to `menuRenderer`
      // The `Creatable` HOC only overrides `onSelect` which breaks an edge-case
      // In order to support creating items via clicking on the placeholder option,
      // We need to ensure that the specified `onSelect` handle is the one we use.

      function wrappedRowRenderer(_ref2) {
        let {
          index,
          key,
          style,
          parent
        } = _ref2;
        const option = options[index];
        return innerRowRenderer({
          focusedOption,
          focusedOptionIndex,
          focusOption,
          key,
          labelKey,
          onSelect,
          option,
          optionIndex: index,
          options,
          selectValue: onSelect,
          style,
          valueArray,
          valueKey,
          parent
        });
      }

      return /*#__PURE__*/_react.default.createElement(_AutoSizer.default, {
        disableHeight: true
      }, _ref3 => {
        let {
          width
        } = _ref3;
        return /*#__PURE__*/_react.default.createElement(_List.default, _extends({
          className: "VirtualSelectGrid",
          height: height,
          ref: this._setListRef,
          rowCount: options.length,
          rowHeight: this._cache.rowHeight,
          rowRenderer: wrappedRowRenderer,
          scrollToIndex: focusedOptionIndex,
          width: width,
          deferredMeasurementCache: this._cache
        }, listProps));
      });
    });

    _defineProperty(this, "_optionRenderer", _ref4 => {
      let {
        focusedOption,
        focusOption,
        key,
        labelKey,
        option,
        optionIndex,
        selectValue,
        style,
        valueArray,
        parent
      } = _ref4;
      const className = ["VirtualizedSelectOption"];

      if (option === focusedOption) {
        className.push("VirtualizedSelectFocusedOption");
      }

      if (option.disabled) {
        className.push("VirtualizedSelectDisabledOption");
      }

      if (valueArray && valueArray.indexOf(option) >= 0) {
        className.push("VirtualizedSelectSelectedOption");
      }

      if (option.className) {
        className.push(option.className);
      }

      const events = option.disabled ? {} : {
        onClick: () => selectValue(option),
        onMouseEnter: () => focusOption(option)
      };
      return /*#__PURE__*/_react.default.createElement(_CellMeasurer.CellMeasurer, {
        cache: this._cache,
        columnIndex: 0,
        key: key,
        parent: parent,
        rowIndex: optionIndex,
        ref: _ref5 => this._setCellMeasureRef(key, _ref5)
      }, /*#__PURE__*/_react.default.createElement("div", _extends({
        className: className.join(" "),
        key: key,
        style: this.props.special && option.status == "I" ? _objectSpread(_objectSpread({}, style), {}, {
          opacity: 0.4,
          cursor: "not-allowed"
        }) : style,
        title: option.title
      }, events), option[labelKey]));
    });

    _defineProperty(this, "_setSelectRef", ref => {
      this._selectRef = ref;
    });

    _defineProperty(this, "_setListRef", ref => {
      this._listRef = ref;
    });

    _defineProperty(this, "_setCellMeasureRef", (key, ref) => {
      this._cellMeasureRefs[key] = ref;
    });

    _defineProperty(this, "_getSelectComponent", () => {
      const {
        async,
        creatable
      } = this.props;

      if (creatable) {
        return _creatable.default;
      } else if (async) {
        return _reactSelect.default.Async;
      } else {
        return _reactSelect.default;
      }
    });

    this.state = {
      value: this.props.value,
      options: this.props.options ? this.props.options : [],
      listHeight: props.maxHeight
    };
    this._cache = new _CellMeasurer.CellMeasurerCache({
      defaultHeight: props.defaultOptionHeight,
      minHeight: props.defaultOptionHeight,
      fixedWidth: true
    });
    this._cellMeasureRefs = {};
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
    if (!(0, _lodash.isEqual)(prevProps.options, this.props.options)) {
      this.setState({
        options: this.props.options
      });
    }

    if (!(0, _lodash.isEqual)(prevProps.value, this.props.value)) {
      this.setState({
        value: this.props.value
      });
    }
  }

  _calculateListHeight(numRows) {
    const {
      maxHeight,
      defaultOptionHeight
    } = this.props;
    let height = 0;

    for (let index = 0; index < numRows; index++) {
      height += this._cache.getHeight(index);

      if (height > maxHeight) {
        return maxHeight;
      }
    }

    if (!height) return defaultOptionHeight;
    return height;
  }

  render() {
    const SelectComponent = this._getSelectComponent();

    return /*#__PURE__*/_react.default.createElement(SelectComponent, {
      ref: this._setSelectRef,
      id: this.props.id ? this.props.id : undefined,
      value: this.props.multi ? this.state.value : this.state.value ? this.valueFromId(this.state.options, this.state.value) : "",
      options: this.state.options,
      placeholder: this.props.placeholder ? this.props.placeholder : "Select...",
      onChange: this.handleChange,
      onInputChange: e => {
        if (this.props.filterChange) {
          this.props.filterInputChange(this.props.name, e);
          return;
        }

        ;
      },
      onFocus: this.props.onFocus ? this.props.onFocus : undefined,
      onBlur: this.props.onBlur ? this.props.onBlur : undefined,
      style: _objectSpread({
        borderRadius: "4px"
      }, this.props.style),
      className: "".concat(this.props.className),
      isClearable: this.props.clearable ? true : false,
      isMulti: this.props.multi ? true : false,
      autosize: false,
      isDisabled: this.props.disabled ? true : false,
      menuRenderer: this._renderMenu,
      menuStyle: {
        overflow: "hidden"
      },
      onOpen: this.remeasure
    });
  }

}

exports.default = SelectComp;

_defineProperty(SelectComp, "propTypes", {
  async: _propTypes.default.bool,
  listProps: _propTypes.default.object,
  maxHeight: _propTypes.default.number,
  defaultOptionHeight: _propTypes.default.number,
  optionRenderer: _propTypes.default.func,
  selectComponent: _propTypes.default.func
});

_defineProperty(SelectComp, "defaultProps", {
  async: false,
  maxHeight: 200,
  defaultOptionHeight: 35
});
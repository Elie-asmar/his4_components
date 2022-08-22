"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = VirtualTable;

require("core-js/modules/web.dom-collections.iterator.js");

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _reactVirtualized = require("react-virtualized");

var _useStateWithCallback = require("../../CustomHooks/useStateWithCallback");

var _functions = require("../../utils/functions");

const _excluded = ["data", "id", "classname", "width", "height", "headerHeight", "rowHeight", "gridClassName", "rowClassName", "columns", "enableSearch"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function VirtualTable(_ref) {
  var _state$dataArrayFilte;

  let {
    data = [],
    id,
    classname,
    width,
    height,
    headerHeight,
    rowHeight,
    gridClassName,
    rowClassName = null,
    columns,
    enableSearch
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const STATE = (0, _react.useRef)({
    filterText: '',
    dataArrayFiltered: [],
    dataArray: []
  });
  const [state, setState] = (0, _useStateWithCallback.useStateWithCallback)(STATE.current);
  (0, _react.useEffect)(() => {
    if (document.getElementsByClassName(gridClassName)[0]) document.getElementsByClassName(gridClassName)[0].addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => {
      if (document.getElementsByClassName("ReactVirtualized__Grid")[0]) document.getElementsByClassName("ReactVirtualized__Grid")[0].removeEventListener("scroll", onScroll);
    };
  }, []);
  (0, _react.useEffect)(() => {
    setState(prv => {
      return _objectSpread(_objectSpread({}, prv), {}, {
        dataArray: data,
        dataArrayFiltered: data
      });
    }, (nextState, SetNextState) => {
      customsearch(nextState.filterText);
    });
  }, [columns, data]);
  const onScroll = (0, _react.useCallback)(_ref2 => {
    let {} = _ref2;
    let ReactVirtualizedGrid = document.getElementsByClassName(gridClassName);
    let ReactVirtualizedTable = document.getElementById(id);
    ReactVirtualizedTable.scrollLeft = ReactVirtualizedGrid[0].scrollLeft;
  }, []);
  const cols = (0, _react.useRef)([]);
  (0, _react.useLayoutEffect)(() => {
    cols.current = columns === null || columns === void 0 ? void 0 : columns.map((v, i) => {
      return _objectSpread(_objectSpread({}, v), {}, {
        key: i
      });
    });
  }, columns);
  const colorRows = (0, _react.useCallback)(_ref3 => {
    let {
      index
    } = _ref3;

    if (index < 0) {
      return null;
    } else {
      return index % 2 === 0 ? "odd" : null;
    }
  }, []);
  const customsearch = (0, _react.useCallback)(value => {
    setState(prv => {
      return _objectSpread(_objectSpread({}, prv), {}, {
        filterText: value,
        dataArrayFiltered: (0, _functions.customTableSearch)(value, prv.dataArray)
      });
    }, (nextState, setNextState) => {// if (triggerPaging && !isTriggeredOnStateChange) {
      //     let mappedFiltration = nextState.OriginalFilter.map(e => {
      //         return {
      //             ...e,
      //             isSelected:
      //                 nextState.selectedFilterOptions.findIndex(e1 => e.columnName === e1.value) > -1
      //         }
      //     }).filter(e => e.isSelected);
      //     let searchOptions = extractSearchOptionsFromState(nextState);
      //     triggerPaging(value.toLowerCase(), mappedFiltration, searchOptions);
      // }
    });
  }, []);
  const handleFilterTextChange = (0, _react.useCallback)(event => {
    customsearch(event.target.value);
  }, []);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, enableSearch ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(((_state$dataArrayFilte = state.dataArrayFiltered) === null || _state$dataArrayFilte === void 0 ? void 0 : _state$dataArrayFilte.length) > 0 ? "col-12 offset-lg-8 col-lg-4" : "offset-lg-8 col-lg-4")
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    className: "form-control form-control-sm mb-2 ",
    value: state.filterText,
    onChange: handleFilterTextChange,
    placeholder: "Search ..."
  }))) : null, /*#__PURE__*/_react.default.createElement(_reactVirtualized.Table, {
    id: id,
    gridClassName: gridClassName,
    className: classname,
    width: width,
    height: height,
    headerHeight: headerHeight,
    rowHeight: rowHeight,
    rowCount: state.dataArrayFiltered.length,
    rowGetter: _ref4 => {
      let {
        index
      } = _ref4;
      return state.dataArrayFiltered[index];
    },
    rowClassName: rowClassName ? rowClassName : colorRows // gridStyle={{
    // }}
    // containerStyle={{
    // }}
    // style={{
    // }}

  }, cols.current.length > 0 ? cols.current : null));
} // function onScroll() {
//     let ReactVirtualizedGrid = document.getElementsByClassName(props.gridClassName)
//     let ReactVirtualizedTable = document.getElementById(props.id)
//     ReactVirtualizedTable[0].scrollLeft = ReactVirtualizedGrid[0].scrollLeft
// }
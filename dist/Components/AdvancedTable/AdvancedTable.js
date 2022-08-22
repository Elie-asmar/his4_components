"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AdvancedTable;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.regexp.to-string.js");

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _moment = _interopRequireDefault(require("moment"));

var _RTable = _interopRequireDefault(require("./RTable"));

var _SelectComponent = _interopRequireDefault(require("../SelectComponent/SelectComponent"));

var _InputNumericComp = _interopRequireDefault(require("../InputNumericComponent/InputNumericComp"));

var _functions = require("../../utils/functions");

var _useStateWithCallback = require("../../CustomHooks/useStateWithCallback");

var _ContainerComp = _interopRequireDefault(require("../ContainerComp/ContainerComp"));

var _DateTimePickerComp = _interopRequireDefault(require("../DateTimePickerComp/DateTimePickerComp"));

const _excluded = ["columns", "dataArray", "triggerPaging", "filterOptions", "SearchParameters"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function AdvancedTable(_ref) {
  let {
    columns,
    dataArray,
    triggerPaging,
    filterOptions,
    SearchParameters
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const STATE = (0, _react.useRef)({
    columns: [],
    filterText: '',
    dataArray: [],
    dataArrayFiltered: [],
    selectAll: 0,
    selectedFilterOptions: [],
    FilterOptions: [],
    OriginalFilter: []
  });
  const [state, setState] = (0, _useStateWithCallback.useStateWithCallback)(STATE.current);
  (0, _react.useEffect)(() => {
    document.getElementsByClassName('ReactTable')[0].style.zIndex = 0;
    setState(prv => {
      var _prv$FilterOptions, _prv$FilterOptions2;

      let mapped = filterOptions ? filterOptions.map(e => {
        return {
          label: e.columnCaption,
          value: e.columnName
        };
      }) : [];
      return _objectSpread(_objectSpread({}, prv), {}, {
        dataArray: dataArray,
        dataArrayFiltered: dataArray,
        columns: columns,
        FilterOptions: ((_prv$FilterOptions = prv.FilterOptions) === null || _prv$FilterOptions === void 0 ? void 0 : _prv$FilterOptions.length) === 0 ? (0, _lodash.cloneDeep)(mapped) : prv.FilterOptions,
        selectedFilterOptions: ((_prv$FilterOptions2 = prv.FilterOptions) === null || _prv$FilterOptions2 === void 0 ? void 0 : _prv$FilterOptions2.length) === 0 ? (0, _lodash.cloneDeep)(mapped) : prv.selectedFilterOptions,
        OriginalFilter: filterOptions ? (0, _lodash.cloneDeep)(filterOptions) : []
      });
    }, (nextState, SetNextState) => {
      // console.trace();
      //console.log('here')
      customsearch(nextState.filterText, true);
    });
  }, [columns, dataArray, filterOptions]);
  (0, _react.useEffect)(() => {
    if (!(0, _lodash.isEmpty)(SearchParameters) && (0, _lodash.isEmpty)(state.SearchParameters)) {
      let selectors = SearchParameters.filter(e => e.type === 'select');
      let datetime = SearchParameters.filter(e => e.type === 'date');
      let selectorsStateObj = {};
      let datetimeStateObj = {};
      selectors.forEach(element => {
        selectorsStateObj["".concat(element.name)] = element.options;

        if (element.isMultiple) {
          selectorsStateObj["selected".concat(element.name)] = element.options.filter(e => element.value.includes(e.value));
        } else {
          selectorsStateObj["selected".concat(element.name)] = element.value;
        }
      });
      datetime.forEach(element => {
        datetimeStateObj["".concat(element.name)] = element.value;
      });
      setState(prv => {
        return _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, prv), {
          SearchParameters: SearchParameters
        }), (0, _lodash.cloneDeep)(selectorsStateObj)), (0, _lodash.cloneDeep)(datetimeStateObj));
      });
    }
  }, [SearchParameters]);
  (0, _react.useEffect)(() => {
    if (state.selectedFilterOptions.length === 0 && state.FilterOptions.length > 0) {
      setState(_objectSpread(_objectSpread({}, state), {}, {
        selectedFilterOptions: (0, _lodash.cloneDeep)(state.FilterOptions)
      }));
    }
  }, [state.selectedFilterOptions, state.FilterOptions]);
  const customsearch = (0, _react.useCallback)((value, isTriggeredOnStateChange) => {
    setState(prv => {
      let mapped = prv.OriginalFilter.map(e => {
        return _objectSpread(_objectSpread({}, e), {}, {
          isSelected: prv.selectedFilterOptions.findIndex(e1 => e.columnName === e1.value) > -1
        });
      });
      return _objectSpread(_objectSpread({}, prv), {}, {
        filterText: value,
        dataArrayFiltered: (0, _functions.customTableSearch)(value, prv.dataArray, mapped)
      });
    }, (nextState, setNextState) => {
      if (triggerPaging && !isTriggeredOnStateChange) {
        let mappedFiltration = nextState.OriginalFilter.map(e => {
          return _objectSpread(_objectSpread({}, e), {}, {
            isSelected: nextState.selectedFilterOptions.findIndex(e1 => e.columnName === e1.value) > -1
          });
        }).filter(e => e.isSelected);
        let searchOptions = extractSearchOptionsFromState(nextState);
        triggerPaging(value.toLowerCase(), mappedFiltration, searchOptions);
      }
    });
  }, []);
  const handleFilterTextChange = (0, _react.useCallback)(event => {
    customsearch(event.target.value);
  }, []);
  const handleFilterOptionsChange = (0, _react.useCallback)((value, key) => {
    setState(prv => {
      return _objectSpread(_objectSpread({}, prv), {}, {
        [key]: value
      });
    }, (nextState, setNextState) => {
      let mapped = state.OriginalFilter.map(e => {
        return _objectSpread(_objectSpread({}, e), {}, {
          isSelected: state.selectedFilterOptions.findIndex(e1 => e.columnName === e1.value) > -1
        });
      }).filter(e => e.isSelected);
      let searchOptions = extractSearchOptionsFromState(nextState);
      triggerPaging(nextState.filterText, mapped, searchOptions);
    });
  }, []);
  const handleSearchValuesChange = (0, _react.useCallback)((value, key) => {
    setState(prv => {
      return _objectSpread(_objectSpread({}, prv), {}, {
        [key]: value
      });
    }, (nextState, setNextState) => {
      let mapped = state.OriginalFilter.map(e => {
        return _objectSpread(_objectSpread({}, e), {}, {
          isSelected: state.selectedFilterOptions.findIndex(e1 => e.columnName === e1.value) > -1
        });
      }).filter(e => e.isSelected);
      let searchOptions = extractSearchOptionsFromState(nextState);
      triggerPaging(nextState.filterText, mapped, searchOptions);
    });
  }, []);
  (0, _react.useEffect)(() => {
    handleSearchDateValueChanges('z');
  }, [state]);
  const handleSearchDateValueChanges = (0, _react.useCallback)((value, key, isvalid) => {
    if (key === 'z') {
      // console.log(JSON.stringify(state.selectedUsr_Type))
      return;
    }

    if (isvalid && state[key] === (value ? value.format("YYYY-MM-DD") : "")) {
      return;
    }

    if (isvalid) {
      setState(_objectSpread(_objectSpread({}, state), {}, {
        [key]: value ? value.format("YYYY-MM-DD") : ""
      }), (nextState, setNextState) => {
        let mapped = nextState.OriginalFilter.map(e => {
          return _objectSpread(_objectSpread({}, e), {}, {
            isSelected: nextState.selectedFilterOptions.findIndex(e1 => e.columnName === e1.value) > -1
          });
        }).filter(e => e.isSelected);
        let searchOptions = extractSearchOptionsFromState(nextState);
        triggerPaging(nextState.filterText, mapped, searchOptions);
      });
    }
  }, [state]);
  const handleNextPrevious = (0, _react.useCallback)(event => {
    let mapped = state.OriginalFilter.map(e => {
      return _objectSpread(_objectSpread({}, e), {}, {
        isSelected: state.selectedFilterOptions.findIndex(e1 => e.columnName === e1.value) > -1
      });
    }).filter(e => e.isSelected);
    let searchOptions = extractSearchOptionsFromState(state);
    triggerPaging(state.filterText, mapped, searchOptions, event.target.name === 'next' ? 1 : -1);
  }, [state]);
  const buildSearchSection = (0, _react.useCallback)(() => {
    let jsxArr = [];
    let selectors = state.SearchParameters.filter(e => e.type === 'select');
    selectors.forEach((element, index) => {
      jsxArr.push( /*#__PURE__*/_react.default.createElement("div", {
        className: "row mb-1 mt-1",
        key: 'select' + index.toString()
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: " col-4"
      }, element.label), /*#__PURE__*/_react.default.createElement("div", {
        className: "col-8"
      }, /*#__PURE__*/_react.default.createElement(_SelectComponent.default, {
        value: element.options.filter(e => element.value.includes(e.value)),
        name: "selected".concat(element.name),
        options: element.options,
        clearable: true,
        className: "",
        onChange: handleSearchValuesChange,
        multi: element.isMultiple
      }))));
    });
    let datetime = state.SearchParameters.filter(e => e.type === 'date');
    datetime.forEach((element, index) => {
      jsxArr.push( /*#__PURE__*/_react.default.createElement("div", {
        className: "row mb-1 mt-1",
        key: 'date' + index.toString()
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: " col-4"
      }, element.label), /*#__PURE__*/_react.default.createElement("div", {
        className: "col-8"
      }, /*#__PURE__*/_react.default.createElement(_DateTimePickerComp.default, {
        selected: element.value,
        onDateTimeChange: handleSearchDateValueChanges,
        name: element.name,
        placeholder: "--/--/----",
        dateSlash: true
      }))));
    });
    return jsxArr;
  }, [state]);
  const extractSearchOptionsFromState = (0, _react.useCallback)(stt => {
    let searchOptions = [];

    if (!(0, _lodash.isEmpty)(stt.SearchParameters)) {
      let selectors = stt.SearchParameters.filter(e => e.type === 'select');
      let datetime = stt.SearchParameters.filter(e => e.type === 'date');
      selectors.forEach(element => {
        searchOptions.push({
          name: element.name,
          value: stt["selected".concat(element.name)].map(e => e.value)
        });
      });
      datetime.forEach(element => {
        searchOptions.push({
          name: element.name,
          value: stt["".concat(element.name)]
        });
      });
    }

    console.log('searchOptions', searchOptions, 'SearchParameters', stt.SearchParameters);
    return searchOptions;
  }, []);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    id: "AdvancedTableSearchHeight",
    className: "row mt-3"
  }, (filterOptions === null || filterOptions === void 0 ? void 0 : filterOptions.length) > 0 ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: " col-12  col-lg-1"
  }, "Filter Options"), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-12  col-lg-4"
  }, /*#__PURE__*/_react.default.createElement(_SelectComponent.default, {
    value: state.selectedFilterOptions,
    onChange: handleFilterOptionsChange,
    name: "selectedFilterOptions",
    options: state.FilterOptions,
    clearable: true,
    className: "",
    multi: true
  }))) : null, props.enableSearch ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat((filterOptions === null || filterOptions === void 0 ? void 0 : filterOptions.length) > 0 ? "col-12 offset-lg-3 col-lg-4" : "offset-lg-8 col-lg-4")
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    className: "form-control form-control-sm",
    value: state.filterText,
    onChange: handleFilterTextChange,
    placeholder: "Search ..."
  }))) : null), !(0, _lodash.isEmpty)(state.SearchParameters) ? /*#__PURE__*/_react.default.createElement("div", {
    className: "row mt-2"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-12 col-lg-5"
  }, /*#__PURE__*/_react.default.createElement(_ContainerComp.default, {
    containerHeader: "Search Options",
    containerBody: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, buildSearchSection()),
    addPlus: false,
    name: "",
    onClickPlus: () => {}
  }))) : null, /*#__PURE__*/_react.default.createElement(_RTable.default, {
    data: state.dataArrayFiltered,
    columns: state.columns,
    style: {
      maxHeight: props.maxHeight ? props.maxHeight : "620px",
      marginTop: "10px"
    },
    minRows: props.minRows === undefined ? 0 : props.minRows,
    SubComponent: props.SubComponent ? props.SubComponent : null,
    resizable: props.resizable ? props.resizable : false,
    defaultSorted: props.defaultSorted ? props.defaultSorted : [],
    selected: state.selected
  }), triggerPaging ? /*#__PURE__*/_react.default.createElement("div", {
    className: "pagination"
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "btn btn-primary  btn-sm",
    name: "pvs",
    onClick: handleNextPrevious,
    disabled: false
  }, '<'), ' ', /*#__PURE__*/_react.default.createElement("button", {
    className: "btn btn-primary  btn-sm",
    name: "next",
    onClick: handleNextPrevious,
    disabled: false
  }, '>'), ' ') : null);
}
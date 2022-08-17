"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withPaging = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _useStateWithCallback = require("../../../CustomHooks/useStateWithCallback");

var _functions = require("../../../utils/functions");

const _excluded = ["fetchApiFunction", "dataArray", "columns", "numberOfPages"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const withPaging = Comp => _ref => {
  let {
    fetchApiFunction,
    dataArray,
    columns,
    numberOfPages
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const timeout = (0, _react.useRef)(null);
  const filterOptions = (0, _react.useRef)([]); //const [pgNbr, setPgNbr] = useStateWithCallback(1);

  const pgNbr = (0, _react.useRef)(1);
  const [cntr, setCntr] = (0, _react.useState)(0);
  const AllFiltration = (0, _react.useRef)(null);
  const [state, setState] = (0, _react.useState)(0); // const [searchOptions, setSearchOption] = useState([])
  // const [pgNbr, setPgNbr] = useState(0)
  // const [fltrtext, setFltrText] = useState('')

  (0, _react.useEffect)(() => {
    console.log('columns', columns);
  }, []);
  (0, _react.useEffect)(() => {
    if (dataArray && columns && dataArray.length > 0) {
      let obj = dataArray[0];
      let arr = [];
      Object.keys(obj).forEach(key => {
        let o1 = {};
        o1.columnName = key;
        let col = columns.find(e1 => e1.accessor === key);

        if (col !== null && col !== void 0 && col.Header) {
          o1.columnCaption = col.Header;
          arr.push(o1);
        }
      });
      filterOptions.current = [...arr];
      setState(prv => prv + 1);
    }
  }, [dataArray, columns, numberOfPages]);
  const fetchData = (0, _react.useCallback)((searchValue, selectedFilterOptions, searchOptions) => {
    return setTimeout(async () => {
      try {
        fetchApiFunction(searchValue, selectedFilterOptions, searchOptions, pgNbr.current);
      } catch (error) {
        throw error;
      } finally {}
    }, 1000);
  }, []);
  const triggerPaging = (0, _react.useCallback)(function (searchValue, selectedFilterOptions, searchOptions) {
    let counter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    setCntr(cntr + 1);

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    let searchObject = {
      searchValue: searchValue,
      selectedFilterOptions: (0, _lodash.cloneDeep)(selectedFilterOptions),
      searchOptions: (0, _lodash.cloneDeep)(searchOptions)
    };

    if (AllFiltration.current && !(0, _lodash.isEqual)(searchObject, AllFiltration.current)) {
      AllFiltration.current = searchObject;
      pgNbr.current = 1;
      timeout.current = fetchData(searchValue, selectedFilterOptions, searchOptions);
    } else {
      AllFiltration.current = searchObject;
      pgNbr.current = pgNbr.current + counter < 1 ? 1 : pgNbr.current + counter;
      timeout.current = fetchData(searchValue, selectedFilterOptions, searchOptions);
    }
  }, []);
  return /*#__PURE__*/_react.default.createElement(Comp, _extends({}, props, {
    dataArray: dataArray,
    columns: columns,
    triggerPaging: triggerPaging,
    filterOptions: filterOptions.current
  }));
};

exports.withPaging = withPaging;
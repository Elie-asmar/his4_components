"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchControls = SearchControls;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

var _react = _interopRequireWildcard(require("react"));

var _SearchControlsList = require("./SearchControlsList");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function SearchControls(_ref) {
  let {
    SearchDictionary
  } = _ref;
  const [data, setData] = (0, _react.useState)(SearchDictionary);
  const [filteredData, setFilteredData] = (0, _react.useState)([]);
  const [keyword, setKeyword] = (0, _react.useState)('');
  (0, _react.useEffect)(() => {
    if (!keyword) {
      setFilteredData([]);
    } else {
      setFilteredData(data.filter(e => e.Description.toLowerCase().includes(keyword.toLowerCase())));
    }
  }, [keyword]);
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h2", null, "Search"), /*#__PURE__*/_react.default.createElement("input", {
    placeholder: "Type to Search For Components",
    value: keyword,
    onChange: e => {
      setKeyword(e.target.value);
    }
  }), /*#__PURE__*/_react.default.createElement(_SearchControlsList.SearchControlsList, {
    filteredData: filteredData
  }));
}
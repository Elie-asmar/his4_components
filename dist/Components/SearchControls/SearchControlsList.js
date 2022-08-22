"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchControlsList = SearchControlsList;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const style = {
  width: '400px',
  height: '35px',
  border: '1px solid black',
  cursor: 'pointer'
};

function SearchControlsList(_ref) {
  let {
    filteredData
  } = _ref;
  const [data, setData] = (0, _react.useState)([]);
  const navigate = (0, _reactRouterDom.useNavigate)();
  (0, _react.useEffect)(() => {
    setData(filteredData);
  }, [filteredData]);
  const OnItemClick = (0, _react.useCallback)((route, elementid) => e => {
    navigate(route, {
      id: elementid
    });
  }, []);
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h2", null, filteredData.length > 0 ? 'Search Results' : '', " "), /*#__PURE__*/_react.default.createElement("ul", null, filteredData.map(e => {
    return /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
      style: style,
      onClick: OnItemClick(e.Route, e.id)
    }, e.Description + "(".concat(e.Route, ")")));
  })));
}
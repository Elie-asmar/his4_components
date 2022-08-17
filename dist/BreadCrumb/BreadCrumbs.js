"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BreadCrumbs = BreadCrumbs;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.array.reverse.js");

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _BreadCrumbItem = require("./BreadCrumbItem");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function BreadCrumbs(_ref) {
  let {
    routes,
    renderFunction = undefined,
    separator = '/',
    isDisabledStyle = undefined
  } = _ref;
  const location = (0, _reactRouterDom.useLocation)();
  const [locationRoutes, setlocationRoutes] = (0, _react.useState)([]);
  const o = {
    path: '',
    label: ''
  };
  const extractPath = (0, _react.useCallback)(path => {
    let pathArr = [];
    let pathObjArr = [];

    if (path.length - 1 !== path.lastIndexOf("/")) {
      path += "/";
    }

    while (path.includes("//")) {
      path = path.replace('//', '/');
    }

    while (path.length !== 0) {
      let subpath = path.substring(0, path.lastIndexOf("/"));
      pathArr.push(subpath === '' ? '/' : subpath);
      path = path.substring(0, path.lastIndexOf("/"));
    }

    pathArr.reverse();
    pathObjArr = pathArr.map(elem => {
      let route = routes === null || routes === void 0 ? void 0 : routes.find(e => e.path.toLowerCase() === elem.toLowerCase());
      return _objectSpread(_objectSpread({}, o), {}, {
        path: elem,
        label: route ? route.breadcrumb : elem
      });
    });
    return pathObjArr;
  }, []);
  (0, _react.useEffect)(() => {
    let path = location.pathname;
    let pathObjArr = extractPath(path);
    let renderedJSX = [];

    if (!renderFunction) {
      renderedJSX = pathObjArr.map(elem => {
        let isActive = elem.path === location.pathname;
        return /*#__PURE__*/_react.default.createElement(_BreadCrumbItem.BreadCrumbItem, {
          label: elem.label,
          path: elem.path,
          separator: separator,
          isDisabledStyle: isDisabledStyle({
            isActive: isActive
          })
        });
      });
    } else {
      let rJSX = pathObjArr.map(renderFunction);
      renderedJSX = pathObjArr.map(elem => {
        let isDisabled = elem.path === location.pathname;
        return /*#__PURE__*/_react.default.createElement(_BreadCrumbItem.BreadCrumbItem, {
          key: pathObjArr.indexOf(elem),
          children: rJSX.at(pathObjArr.indexOf(elem)),
          label: elem.label,
          path: elem.path,
          separator: separator,
          isDisabledStyle: isDisabledStyle({
            isDisabled: isDisabled
          })
        });
      });
    }

    setlocationRoutes(renderedJSX);
  }, [location.pathname]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "breadcrumb"
  }, locationRoutes);
}
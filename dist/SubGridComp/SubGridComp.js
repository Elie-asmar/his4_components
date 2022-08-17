"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubGridComp = SubGridComp;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _reactstrap = require("reactstrap");

var _globals = require("../../../globals");

var _functions = require("../../../utils/functions");

var _RTable = _interopRequireDefault(require("../AdvancedTable/RTable"));

const _excluded = ["stepname", "onModalClose"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function SubGridComp(_ref) {
  let {
    stepname,
    onModalClose
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  const [data, setData] = (0, _react.useState)([]);
  const controller = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
    getData();
    controller.current = new AbortController();
    return () => {
      controller.current.abort();
    };
  }, []);
  const getData = (0, _react.useCallback)(async () => {
    let url = '';

    if (stepname === 'UsersDefinitionList') {
      url = 'DataFiles/Forms/UsersDefinition/UserLinkedGroups.json';
      let resp = await (0, _functions.FetchData)(url, 'get', null, () => true, controller.current);
      resp = (0, _lodash.cloneDeep)(resp);
      setData(resp);
    } else if (stepname === 'CoveragesSubList') {
      const row = rest.row;
      const _data = {
        PLRecId: row.prl_RecId
      };
      let arr = await (0, _functions.FetchData)("".concat(_globals.urlPath, "/UnpExmPL/getCovPLDet"), 'get', _data, () => true, controller.current);
      setData(arr.data);
    }
  }, []);
  const handleCloseClick = (0, _react.useCallback)(() => {
    onModalClose();
  });
  const columns = (0, _react.useMemo)(() => {
    let cols = [];

    switch (stepname) {
      case 'UsersDefinitionList':
        cols = [{
          Header: 'Code',
          accessor: 'Grp_Code',
          fixed: "left",
          Cell: row => /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("span", {
            className: "mobile-label"
          }, "Code"), /*#__PURE__*/_react.default.createElement("span", {
            className: "cell-value hidden-mobile text-center"
          }, row.value), /*#__PURE__*/_react.default.createElement("span", {
            className: "cell-value hidden-pc"
          }, row.value))
        }, {
          Header: 'Name',
          accessor: 'Grp_Name',
          fixed: "left",
          Cell: row => /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("span", {
            className: "mobile-label"
          }, "Name"), /*#__PURE__*/_react.default.createElement("span", {
            className: "cell-value hidden-mobile "
          }, row.value), /*#__PURE__*/_react.default.createElement("span", {
            className: "cell-value hidden-pc"
          }, row.value))
        }];
        break;

      case 'CoveragesSubList':
        cols = [{
          Header: 'Grp',
          accessor: 'cov_Group',
          fixed: "left",
          Cell: row => /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("span", {
            className: "mobile-label"
          }, "Grp"), /*#__PURE__*/_react.default.createElement("span", {
            className: "cell-value hidden-mobile text-center"
          }, row.value), /*#__PURE__*/_react.default.createElement("span", {
            className: "cell-value hidden-pc"
          }, row.value)),
          width: window.innerWidth * 0.05
        }, {
          Header: 'Coverage',
          accessor: 'cov_Code',
          fixed: "left",
          Cell: row => /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("span", {
            className: "mobile-label"
          }, "Coverage"), /*#__PURE__*/_react.default.createElement("span", {
            className: "cell-value hidden-mobile "
          }, row.value), /*#__PURE__*/_react.default.createElement("span", {
            className: "cell-value hidden-pc"
          }, row.value)) // width: window.innerWidth * 0.1

        }, {
          Header: 'Coverage Name',
          accessor: 'cov_Name',
          fixed: "left",
          Cell: row => /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("span", {
            className: "mobile-label"
          }, "Coverage Name"), /*#__PURE__*/_react.default.createElement("span", {
            className: "cell-value hidden-mobile "
          }, row.value), /*#__PURE__*/_react.default.createElement("span", {
            className: "cell-value hidden-pc"
          }, row.value)) // width: window.innerWidth * 0.3

        }];
        break;

      default:
        break;
    }

    return cols;
  }, [data]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, data.length > 0 ? /*#__PURE__*/_react.default.createElement("div", {
    className: "row mt-1"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-12 col-sm-6"
  }, /*#__PURE__*/_react.default.createElement(_RTable.default // className="-striped mobile-overflow"
  , {
    data: data,
    columns: columns,
    style: {
      maxHeight: "70vh",
      minWidth: window.innerWidth / 1.5
    },
    minRows: 0,
    showPaginationBottom: false,
    showPaginationTop: false,
    defaultPageSize: 0,
    resizable: false
  }), /*#__PURE__*/_react.default.createElement(_reactstrap.Button, {
    color: "danger",
    onClick: handleCloseClick
  }, "Close"))) : /*#__PURE__*/_react.default.createElement("div", {
    className: "sk-three-bounce",
    style: {
      position: "fixed",
      top: "calc(calc(50% - 12px) + 20px)",
      left: "calc(50% - 40px)"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "sk-child sk-bounce1"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "sk-child sk-bounce2"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "sk-child sk-bounce3"
  })));
}
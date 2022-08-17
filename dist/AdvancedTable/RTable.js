"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _reactTable = _interopRequireDefault(require("react-table"));

require("react-table/react-table.css");

var _reactTableHocFixedColumns = _interopRequireDefault(require("react-table-hoc-fixed-columns"));

require("react-table-hoc-fixed-columns/lib/styles.css");

require("./RTable.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const ReactTableFixedColumns = (0, _reactTableHocFixedColumns.default)(_reactTable.default);

class RTable extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  shouldComponentUpdate(nextProps, nextState) {
    if (!(0, _lodash.isEqual)(this.props, nextProps) || !(0, _lodash.isEqual)(this.state, nextState)) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "numberOfRows hidden-pc"
    }, /*#__PURE__*/_react.default.createElement("b", null, this.props.data.length), " rows"), /*#__PURE__*/_react.default.createElement(ReactTableFixedColumns, {
      className: "-striped mobile-overflow",
      data: this.props.data,
      columns: this.props.columns,
      style: this.props.style ? this.props.style : {},
      minRows: this.props.minRows === undefined ? 3 : this.props.minRows,
      previousText: /*#__PURE__*/_react.default.createElement("i", {
        className: "fa fa-chevron-left"
      }),
      nextText: /*#__PURE__*/_react.default.createElement("i", {
        className: "fa fa-chevron-right"
      }),
      SubComponent: this.props.SubComponent ? this.props.SubComponent : null,
      showPaginationBottom: this.props.defaultPageSize ? true : this.props.showPaginationBottom ? this.props.showPaginationBottom : false,
      showPaginationTop: this.props.showPaginationTop ? this.props.showPaginationTop : false,
      defaultPageSize: this.props.defaultPageSize ? this.props.defaultPageSize : 99999999,
      resizable: this.props.resizable ? this.props.resizable : false,
      defaultSorted: this.props.defaultSorted ? this.props.defaultSorted : []
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "numberOfRows hidden-mobile"
    }, /*#__PURE__*/_react.default.createElement("b", null, this.props.data.length), " row(s)"));
  }

}

var _default = RTable;
exports.default = _default;
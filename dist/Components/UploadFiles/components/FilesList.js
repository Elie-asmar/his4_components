"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _FileItem = _interopRequireDefault(require("./FileItem"));

require("./FilesList.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const FilesList = props => {
  const {
    items,
    onDeleteClick,
    classRow,
    readOnly
  } = props;
  const files = items.filter(item => {
    return item.deleted === false;
  });

  if (files.length === 0) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "files-list ".concat(props.className)
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "center",
      style: props.isEmail ? {
        height: "50px"
      } : {
        height: "70px"
      }
    }, /*#__PURE__*/_react.default.createElement("h5", null, "No attachment found.")));
  }

  return /*#__PURE__*/_react.default.createElement("ul", {
    className: "files-list ".concat(classRow ? "row" : ""),
    style: classRow ? {
      justifyContent: "flex-start"
    } : {}
  }, files.map(file => /*#__PURE__*/_react.default.createElement(_FileItem.default, {
    key: file.name,
    url: file.url,
    thumbnail: file.thumbnail,
    name: file.name,
    source: file.source,
    fileType: file.fileType,
    onDeleteClick: onDeleteClick,
    classRow: classRow,
    readOnly: !readOnly ? file.readOnly ? file.readOnly : false : readOnly
  })));
};

var _default = FilesList;
exports.default = _default;
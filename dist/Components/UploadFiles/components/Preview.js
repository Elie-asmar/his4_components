"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/web.url.js");

require("core-js/modules/web.url-search-params.js");

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactstrap = require("reactstrap");

var _reactFileViewer = _interopRequireDefault(require("react-file-viewer"));

require("./Preview.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Preview = props => {
  const {
    title,
    file,
    fileType,
    togglePreview
  } = props;

  const Iframe = /*#__PURE__*/_react.default.createElement("iframe", {
    id: "upload".concat(title),
    title: title,
    src: file,
    width: "100%",
    height: "".concat(window.innerHeight - 33, "px"),
    frameBorder: "0"
  });

  const fileViewerHandleError = (0, _react.useCallback)(e => {
    return Iframe;
  }, [Iframe]);
  const generateContentBody = (0, _react.useCallback)(() => {
    switch (fileType) {
      case "jpg":
      case "jpeg":
      case "PNG":
      case "png":
      case "gif":
      case "bmp":
      case "docx":
      case "xlsx":
      case "mp4":
      case "webm":
      case "mp3":
      case "pdf":
        return /*#__PURE__*/_react.default.createElement(_reactFileViewer.default, {
          fileType: fileType.toLowerCase(),
          filePath: file,
          onError: fileViewerHandleError
        });

      case "xls":
      case "msg":
        const fileLink = document.createElement('a');
        fileLink.href = file;
        fileLink.download = title;
        fileLink.click();
        window.URL.revokeObjectURL(file);
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "center-div",
          style: {
            color: "#fff",
            fontSize: "50px"
          }
        }, /*#__PURE__*/_react.default.createElement("i", {
          className: "fa fa-download"
        }));

      default:
        return Iframe;
    }
  }, [fileViewerHandleError, fileType, file, title, Iframe]);

  const content = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    id: "modal-overlay-content"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "row",
    style: {
      backgroundColor: "#20a8d8",
      color: "#fff"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-11",
    style: {
      margin: "auto 0",
      paddingLeft: "30px"
    }
  }, title), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-1"
  }, /*#__PURE__*/_react.default.createElement(_reactstrap.Button, {
    onClick: togglePreview,
    style: {
      backgroundColor: "#20a8d8",
      color: "#fff",
      float: "right",
      border: "none"
    }
  }, /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-close",
    "aria-hidden": "true"
  }))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "row",
    style: {
      height: "100%"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-12",
    style: {
      backgroundColor: "#525252",
      textAlign: "center"
    }
  }, generateContentBody()))));

  if (document.getElementById('modal-overlay')) {
    return /*#__PURE__*/_reactDom.default.createPortal(content, document.getElementById('modal-overlay'));
  } else {
    return content;
  }
};

var _default = Preview;
exports.default = _default;
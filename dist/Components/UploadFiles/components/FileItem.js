"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/web.url.js");

require("core-js/modules/web.url-search-params.js");

var _react = _interopRequireDefault(require("react"));

var _reactstrap = require("../../../reactstrap");

var _Avatar = _interopRequireDefault(require("../../UIElements/Avatar"));

var _Card = _interopRequireDefault(require("../../UIElements/Card"));

var _Preview = _interopRequireDefault(require("./Preview"));

require("./FileItem.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class FileItem extends _react.default.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "togglePreview", e => {
      e.preventDefault();

      if (this.props.fileType === "msg") {
        const fileLink = document.createElement('a');
        fileLink.href = this.props.url;
        fileLink.download = this.props.name;
        fileLink.click();
        window.URL.revokeObjectURL(this.props.url);
        return;
      }

      this.setState(prev => ({
        showPreview: !prev.showPreview
      }));
    });

    this.state = {
      showPreview: false
    };
  }

  render() {
    const {
      name,
      source,
      url,
      fileType,
      thumbnail,
      onDeleteClick,
      classRow,
      readOnly
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("li", {
      className: "file-item ".concat(classRow),
      style: classRow ? {
        marginRight: "initial",
        marginLeft: "initial"
      } : {}
    }, /*#__PURE__*/_react.default.createElement(_Card.default, {
      className: "file-item__content"
    }, !readOnly && /*#__PURE__*/_react.default.createElement("div", {
      className: "file-item__remove pointer",
      onClick: onDeleteClick(name, source)
    }, /*#__PURE__*/_react.default.createElement("i", {
      className: "fa fa-remove"
    })), /*#__PURE__*/_react.default.createElement(_reactstrap.NavLink, {
      onClick: this.togglePreview
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "file-item__image"
    }, /*#__PURE__*/_react.default.createElement(_Avatar.default, {
      image: thumbnail,
      alt: name
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "file-item__info"
    }, /*#__PURE__*/_react.default.createElement("h2", null, name)))), this.state.showPreview && /*#__PURE__*/_react.default.createElement(_Preview.default, {
      file: url,
      fileType: fileType,
      title: name,
      togglePreview: this.togglePreview
    }));
  }

}

var _default = FileItem;
exports.default = _default;
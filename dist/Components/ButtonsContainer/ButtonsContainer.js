"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonsContainer = ButtonsContainer;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _reactstrap = require("../../reactstrap");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function ButtonsContainer(_ref) {
  let {
    handleButtonClick,
    createdBy,
    creationDate,
    modifiedBy,
    hideClose,
    hideSave,
    hideSaveAsDraft,
    hideClear,
    hideCopy = true,
    putStart,
    putSendEmail,
    putSendReminder,
    outsideClick,
    modifiedDate
  } = _ref;
  const STATE = {
    createdBy: '',
    creationDate: '',
    modifiedBy: '',
    modifiedDate: '',
    hideClose: false,
    hideSave: false,
    hideSaveAsDraft: false,
    hideClear: false,
    putStart: true,
    putSendEmail: true,
    putSendReminder: true,
    tooltip: {
      save: false,
      saveAsDraft: false,
      clear: false,
      close: false,
      start: false,
      sendMail: false,
      sendReminder: false,
      reject: true
    },
    outsideClick: true
  };
  const [state, setState] = (0, _react.useState)(STATE);
  (0, _react.useEffect)(() => {
    setState(_objectSpread(_objectSpread({}, STATE), {}, {
      createdBy: createdBy,
      creationDate: creationDate,
      modifiedBy: modifiedBy,
      modifiedDate: modifiedDate,
      hideClose: hideClose,
      hideSave: hideSave,
      hideSaveAsDraft: hideSaveAsDraft,
      hideClear: hideClear,
      putStart: putStart,
      putSendEmail: putSendEmail,
      putSendReminder: putSendReminder,
      outsideClick: outsideClick
    }));
  }, [createdBy, creationDate, modifiedBy, hideClose, hideSave, hideSaveAsDraft, hideClear, putStart, putSendEmail, putSendReminder, outsideClick]);
  const handleSubComponentClick = (0, _react.useCallback)(name => e => {
    handleButtonClick(name);
  }, [handleButtonClick]);
  const toggleTooltip = (0, _react.useCallback)(_name => event => {
    setState(previousState => {
      return _objectSpread(_objectSpread({}, previousState), {}, {
        tooltip: _objectSpread(_objectSpread({}, previousState.tooltip), {}, {
          [_name]: !previousState.tooltip[_name]
        }),
        outsideClick: previousState.outsideClick && previousState.tooltip[_name]
      });
    });
  }, []);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "buttonsContainer"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "row no-margin"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-6"
  }, state.createdBy && /*#__PURE__*/_react.default.createElement("small", null, "Created by ", state.createdBy, " on ", state.creationDate, " - Modified by ", state.modifiedBy, " on ", state.modifiedDate)), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-6 text-right no-padding"
  }, !state.hideClose && /*#__PURE__*/_react.default.createElement("button", {
    id: "close",
    className: "topIcons",
    type: "button",
    onClick: handleSubComponentClick("close")
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-times"
  }), /*#__PURE__*/_react.default.createElement("span", null, "Cancel"), /*#__PURE__*/_react.default.createElement(_reactstrap.Tooltip, {
    placement: "bottom",
    isOpen: !state.outsideClick && state.tooltip.close,
    target: "close",
    toggle: toggleTooltip("close")
  }, "Cancel")), !state.hideSaveAsDraft && /*#__PURE__*/_react.default.createElement("button", {
    id: "hideSaveAsDraft",
    className: "topIcons",
    type: "button",
    onClick: handleSubComponentClick("saveAsDraft")
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-floppy-o save"
  }), /*#__PURE__*/_react.default.createElement("span", null, "Save as Draft"), /*#__PURE__*/_react.default.createElement(_reactstrap.Tooltip, {
    placement: "bottom",
    isOpen: !state.outsideClick && state.tooltip.saveAsDraft,
    target: "hideSaveAsDraft",
    toggle: toggleTooltip("Save as Draft")
  }, "Save as Draft")), !state.hideSave && /*#__PURE__*/_react.default.createElement("button", {
    id: "save",
    className: "topIcons",
    type: "button",
    onClick: handleSubComponentClick("save")
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-floppy-o save"
  }), /*#__PURE__*/_react.default.createElement("span", null, "Save"), /*#__PURE__*/_react.default.createElement(_reactstrap.Tooltip, {
    placement: "bottom",
    isOpen: !state.outsideClick && state.tooltip.save,
    target: "save",
    toggle: toggleTooltip("save")
  }, "Save")), !state.hideClear && /*#__PURE__*/_react.default.createElement("button", {
    id: "clear",
    type: "button",
    className: "topIcons",
    onClick: handleSubComponentClick("clear")
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-undo"
  }), /*#__PURE__*/_react.default.createElement("span", null, "Undo"), /*#__PURE__*/_react.default.createElement(_reactstrap.Tooltip, {
    placement: "bottom",
    isOpen: !state.outsideClick && state.tooltip.clear,
    target: "clear",
    toggle: toggleTooltip("clear")
  }, "Undo")), state.putSendReminder && /*#__PURE__*/_react.default.createElement("button", {
    id: "sendReminder",
    type: "button",
    className: "topIcons",
    onClick: handleSubComponentClick("sendReminder")
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-bell reminder"
  }), /*#__PURE__*/_react.default.createElement("span", null, "Send Reminder"), /*#__PURE__*/_react.default.createElement(_reactstrap.Tooltip, {
    placement: "bottom",
    isOpen: !state.outsideClick && state.tooltip.sendReminder,
    target: "sendReminder",
    toggle: toggleTooltip("sendReminder")
  }, "Send Reminder")), state.putSendEmail && /*#__PURE__*/_react.default.createElement("button", {
    id: "sendMail",
    type: "button",
    className: "topIcons",
    onClick: handleSubComponentClick("sendMail")
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-envelope email"
  }), /*#__PURE__*/_react.default.createElement("span", null, "Send Mail"), /*#__PURE__*/_react.default.createElement(_reactstrap.Tooltip, {
    placement: "bottom",
    isOpen: !state.outsideClick && state.tooltip.sendMail,
    target: "sendMail",
    toggle: toggleTooltip("sendMail")
  }, "Send Mail")), state.putStart && /*#__PURE__*/_react.default.createElement("button", {
    id: "start",
    type: "button",
    className: "topIcons",
    onClick: handleSubComponentClick("start")
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-play-circle play_circle"
  }), /*#__PURE__*/_react.default.createElement("span", null, "Start"), /*#__PURE__*/_react.default.createElement(_reactstrap.Tooltip, {
    placement: "bottom",
    isOpen: !state.outsideClick && state.tooltip.start,
    target: "start",
    toggle: toggleTooltip("start")
  }, "Start")))));
}
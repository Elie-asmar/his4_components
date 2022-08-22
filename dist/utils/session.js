"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setSessionInfo = exports.getSessionInfo = exports.clearSessionInfo = void 0;

var _isRequired = require("./isRequired");

const setSessionInfo = function setSessionInfo() {
  let key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _isRequired.isRequired)("key");
  let value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _isRequired.isRequired)("value");
  sessionStorage.setItem(key, value);
};

exports.setSessionInfo = setSessionInfo;

const getSessionInfo = function getSessionInfo() {
  let key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _isRequired.isRequired)("key");
  return sessionStorage.getItem(key);
};

exports.getSessionInfo = getSessionInfo;

const clearSessionInfo = () => {
  sessionStorage.clear();
};

exports.clearSessionInfo = clearSessionInfo;
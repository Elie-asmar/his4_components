"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRequired = void 0;

/* This is a function that throws an error when a parameter is missing. */
const isRequired = paramName => {
  throw new Error("".concat(paramName, " is missing "));
};

exports.isRequired = isRequired;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNothing = void 0;

require("core-js/modules/es.array.includes.js");

const FALSY_VALUES = [false, null, undefined];

const isNothing = value => FALSY_VALUES.includes(value);

exports.isNothing = isNothing;
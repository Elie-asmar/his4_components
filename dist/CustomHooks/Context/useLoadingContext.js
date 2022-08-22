"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLoadingContext = useLoadingContext;

var _react = require("react");

var _LoadingContext = require("../../ContextProvider/LoadingContext");

function useLoadingContext() {
  const {
    isLoading,
    setisLoading
  } = (0, _react.useContext)(_LoadingContext.LoadingContext);
  return [isLoading, setisLoading];
}
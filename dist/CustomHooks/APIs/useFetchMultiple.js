"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFetchDataMultiple = useFetchDataMultiple;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _axios = _interopRequireDefault(require("axios"));

var _react = require("react");

var _functions = require("../../utils/functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useFetchDataMultiple(params) {
  params.forEach(element => {
    if (element.Type.toLowerCase() !== 'get' && element.Type.toLowerCase() !== 'post') {
      (0, _functions.handleEmpty)();
    }
  });
  const [data, setData] = (0, _react.useState)([]);
  const [error, setError] = (0, _react.useState)('');
  const controller = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
    controller.current = new AbortController();
    return () => {
      controller.current.abort();
    };
  }, []);
  const GetAll = (0, _react.useCallback)(async () => {
    try {
      let resp = await Promise.all(params.map(p => {
        return (0, _functions.PromisfiedAxiosRequest)(p.url, p.Type, p.params);
      }));
      setData(resp);
    } catch (e) {
      setError(e);
    }
  }, []);
  (0, _react.useEffect)(() => {
    GetAll();
  }, [params]);
  return [data, error];
}
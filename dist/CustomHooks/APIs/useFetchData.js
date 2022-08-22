"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFetchData = useFetchData;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _react = require("react");

var _axios = _interopRequireDefault(require("axios"));

var _functions = require("../../utils/functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//A state change in a customHook will trigger a re-render of the
//component that is using the custom hook.
//Dont think of the custom hook as being a child component. Instead, it is 
//an abstraction of some logic from the component to outside. Consequently, any state change 
//at the level of the custom hook will trigger a re-render on main component side.
function useFetchData(url) {
  let Type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _functions.handleEmpty)();
  let params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  const [data, setData] = (0, _react.useState)([]);
  const [error, setError] = (0, _react.useState)('');
  const controller = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
    controller.current = new AbortController();
    return () => {
      controller.current.abort();
    };
  }, []);
  (0, _react.useEffect)(() => {
    Fetch();
  }, [url, Type, params]);
  const Fetch = (0, _react.useCallback)(async () => {
    try {
      let resp = await (0, _functions.FetchData)(url, Type, params, () => true, controller.current.signal);
      console.log('resp', resp);
      setData(resp.data);
    } catch (e) {
      setError(e);
      setData(null);
    }
  }, [url, Type, params]); // useEffect(() => {
  //     console.log('useEffect of fetchData')
  //     setTimeout(() => {
  //         setData('Some Data Returned From API')
  //     }, 1500);
  // }, [url, Type, params])
  // useEffect(() => {
  //     console.log('data has changed in fetchData')
  // }, [data])

  return [data, error, Fetch];
}
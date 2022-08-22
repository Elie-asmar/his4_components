"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = usePrompt;
exports.useBlocker = useBlocker;

var _react = require("react");

var _reactRouterDom = require("react-router-dom");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function useBlocker(blocker) {
  let when = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  const {
    navigator
  } = (0, _react.useContext)(_reactRouterDom.UNSAFE_NavigationContext);
  const CounterRef = (0, _react.useRef)(Math.random());
  const location = navigator.location.pathname;
  (0, _react.useEffect)(() => {
    if (!when) return;
    const unblock = navigator.block(tx => {
      const autoUnblockingTx = _objectSpread(_objectSpread({}, tx), {}, {
        retry() {
          unblock();
          tx.retry();
        }

      });

      blocker(autoUnblockingTx, CounterRef);
    });
    return unblock;
  }, [when]);
}

function usePrompt(message) {
  let when = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  const blocker = (0, _react.useCallback)((tx, CounterRef) => {
    if (CounterRef.current === 0) {
      if (window.confirm(message)) {
        CounterRef.current += 1;
        tx.retry(); //retry to navigate
      }
    } else {
      tx.retry(); //retry to navigate
    }

    CounterRef.current += 1;
  }, [message]);
  useBlocker(blocker, when);
}
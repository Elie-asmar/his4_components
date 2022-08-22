"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColoringStatusLikeLegends = exports.CalculateTitleHeight = void 0;
exports.FetchData = FetchData;
exports.FetchDataMultiple = FetchDataMultiple;
exports.saveFinished = exports.readfileasync = exports.isRequiredDataEmpty = exports.isOnPC = exports.isOnMobile = exports.handleEmpty = exports.customTableSearch = exports.awaitableTimeOut = exports.PromisfiedAxiosRequest = void 0;

require("core-js/modules/es.promise.js");

require("core-js/modules/es.json.stringify.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.regexp.test.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.string.trim.js");

require("core-js/modules/es.regexp.to-string.js");

var _axios = _interopRequireDefault(require("axios"));

var _moment = _interopRequireDefault(require("moment"));

var _lodash = require("lodash");

var _reactRouterDom = require("react-router-dom");

var _globals = require("./globals");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ColoringStatusLikeLegends = status => {
  let color = "";
  status = status ? status : "";

  if (status.toLowerCase() === "pending" || status.toLowerCase() === "on-hold" || status.toLowerCase() === "waiting approval") {
    color = "#ffa500";
  } else if (status.toLowerCase() === "approved" || status.toLowerCase() === "active" || status.toLowerCase() === "started" || status.toLowerCase() === 'a') {
    color = "#00cc00";
  } else if (status.toLowerCase() === "rejected" || status.toLowerCase() === "inactive") {
    color = "#ff0000";
  } else if (status.toLowerCase() === "draft") {
    color = "#999999";
  } else if (status.toLowerCase() === "waiting my approval") {
    color = "#33ccff";
  }

  if (status) {
    return /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      style: {
        color
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-circle"
    })), " ", status);
  } else {
    return "";
  }
};

exports.ColoringStatusLikeLegends = ColoringStatusLikeLegends;

const isOnMobile = () => window.innerWidth < _globals.mobileDevicesWidth;

exports.isOnMobile = isOnMobile;

const isOnPC = () => !isOnMobile();

exports.isOnPC = isOnPC;

const CalculateTitleHeight = id => {
  return document.getElementById(id) ? document.getElementById(id).offsetHeight : 0;
};

exports.CalculateTitleHeight = CalculateTitleHeight;

const handleEmpty = () => {
  throw new Error('Invalid Type, must be get or post ');
};

exports.handleEmpty = handleEmpty;

async function FetchData(url) {
  let Type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : handleEmpty();
  let params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  let datafilterfunction = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : () => true;
  let controller = arguments.length > 4 ? arguments[4] : undefined;

  try {
    if (Type === 'get') {
      let resp = await (0, _axios.default)({
        method: 'get',
        url: url,
        crossDomain: true,
        signal: controller ? controller.signal : null,
        params
      });
      await awaitableTimeOut(500);
      return _objectSpread(_objectSpread({}, (0, _lodash.cloneDeep)(resp)), {}, {
        data: resp.data.filter(datafilterfunction)
      });
    } else {
      let resp = await (0, _axios.default)({
        method: 'post',
        signal: controller ? controller.signal : null,
        url: url,
        data: (0, _lodash.isEmpty)(params) ? JSON.stringify({}) : JSON.stringify(params),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      await awaitableTimeOut(500);
      return _objectSpread(_objectSpread({}, (0, _lodash.cloneDeep)(resp)), {}, {
        data: resp.data.filter(datafilterfunction)
      }); // await awaitableTimeOut(500);
      // let uri = new URL(url);
      // let MethodName = uri.href.substring(uri.href.lastIndexOf("/")).replace("/", '')
      // let r = resp.data[`${MethodName}Result`];
      // if (isEmpty(r)) {
      //     return []
      // }
      // else {
      //     return JSON.parse(r)
      // }
    }
  } catch (e) {
    throw e;
  }
}

async function FetchDataMultiple(params) {
  try {
    params.forEach(element => {
      if (element.Type.toLowerCase() !== 'get' && element.Type.toLowerCase() !== 'post') {
        handleEmpty();
      }
    });
    let resp = await Promise.all(params.map(p => {
      return PromisfiedAxiosRequest(p.url, p.Type, p.params);
    }));
    resp = resp.map((v, i) => {
      if (params[i].datafilterfunction) {
        return v.filter(params[i].datafilterfunction);
      } else {
        return v;
      }
    });
    return resp;
  } catch (e) {
    throw e;
  }
}

const awaitableTimeOut = timeout => new Promise((rs, rj) => {
  setTimeout(() => {
    rs(1);
  }, timeout);
});

exports.awaitableTimeOut = awaitableTimeOut;

const readfileasync = file => new Promise((rs, rj) => {
  var reader = new FileReader();

  reader.onloadend = () => {
    rs(reader.result);
  };

  reader.readAsDataURL(file);
});

exports.readfileasync = readfileasync;

const isRequiredDataEmpty = state => {
  let mandatory = state.mandatory;
  let missing = {};
  if (!mandatory) return;

  for (let key of mandatory) {
    const valueToBeChecked = state[key];

    if (typeof valueToBeChecked === "number") {
      if (valueToBeChecked === 0) missing["missing".concat(key)] = true;
      return;
    }

    ;

    if ((0, _lodash.isEmpty)(valueToBeChecked)) {
      missing["missing".concat(key)] = true;
    }
  }

  return missing;
};

exports.isRequiredDataEmpty = isRequiredDataEmpty;

const saveFinished = (state, setState, notifType, notifTitle, notifMessage, goBack, navigate) => {
  console.log('saveFinished');
  setState(_objectSpread(_objectSpread({}, state), {}, {
    notifType,
    notifTitle,
    notifMessage,
    notifDisplay: 'block'
  }), async (nextState, setNextState) => {
    await awaitableTimeOut(nextState.notifTime ? nextState.notifTime : 3000);

    if (nextState.notifType !== 'error') {
      setNextState(_objectSpread(_objectSpread({}, nextState), {}, {
        notifDisplay: 'none'
      }), (afternextState, setAfterNextState) => {
        if (!goBack) {} else {
          console.log('navigating away');
          navigate(-1);
        }
      });
    }
  });
};

exports.saveFinished = saveFinished;

const customTableSearch = function customTableSearch(filterText, data) {
  let FilterOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  let searchedValue = filterText.toLowerCase();
  let regExDateFormat = /^[0-9]{2}(\/|-)[0-9]{2}(\/|-)[0-9]{4}/; // start with DD/MM/YYYY or DD-MM-YYYY or MM/DD/YYYY or MM-DD-YYYY

  let regExDateFormat2 = /^[0-9]{4}(\/|-)[0-9]{2}(\/|-)[0-9]{2}/; // start with YYYY/DD/MM or YYYY-DD-MM or YYYY/MM/DD or YYYY-MM-DD

  let dataFiltered = [];
  let includedColumns = !(0, _lodash.isEmpty)(FilterOptions) ? FilterOptions.filter(e => e.isSelected).map(e => e.columnName) : data.length > 0 ? Object.keys(data[0]) : [];

  if (searchedValue) {
    dataFiltered = data.filter(row => {
      let getRow = true;

      if (searchedValue) {
        getRow = false;

        for (let key of includedColumns) {
          let value = row[key];

          if (value && (regExDateFormat.test(value) || regExDateFormat2.test(value) || typeof value.getMonth === "function")) {
            getRow = getRow || (0, _moment.default)(value).format("DD/MM/YYYY").includes(searchedValue.trim()) || (0, _moment.default)(value).format("DD-MM-YYYY").includes(searchedValue.trim()) || value.toString().toLowerCase().includes(searchedValue.trim());
          } else if (value) {
            getRow = getRow || value.toString().toLowerCase().includes(searchedValue.trim());
          }
        }
      }

      return getRow;
    });
  } else {
    dataFiltered = (0, _lodash.cloneDeep)(data);
  }

  return dataFiltered;
};

exports.customTableSearch = customTableSearch;

const PromisfiedAxiosRequest = function PromisfiedAxiosRequest(url) {
  let Type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : handleEmpty();
  let params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  let controller = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  return new Promise((rs, rj) => {
    if (Type === 'get') {
      //  console.log('useFetchData use Effect Executing')
      (0, _axios.default)({
        method: 'get',
        url: url,
        signal: controller ? controller.signal : null,
        crossDomain: true,
        params: params
      }).then(resp => setTimeout(() => {
        rs(resp);
      }, 500)).catch(err => rj(err));
    } else {
      (0, _axios.default)({
        method: 'post',
        url: url,
        signal: controller ? controller.signal : null,
        data: (0, _lodash.isEmpty)(params) ? JSON.stringify({}) : JSON.stringify(params),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }).then(resp => rs(resp)).catch(err => rj(err));
    }
  });
};

exports.PromisfiedAxiosRequest = PromisfiedAxiosRequest;
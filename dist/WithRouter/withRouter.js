"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withRouter = void 0;

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const withRouter = Comp => props => {
  const location = (0, _reactRouterDom.useLocation)(); // const navigate = useNavigate();
  // const params = useParams();

  return /*#__PURE__*/_react.default.createElement(Comp, _extends({}, props, {
    routing: {
      location,
      params: location.state
    }
  }));
};

exports.withRouter = withRouter;
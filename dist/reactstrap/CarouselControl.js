"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CarouselControl(props) {
  const {
    direction,
    onClickHandler,
    cssModule,
    directionText,
    className
  } = props;
  const anchorClasses = (0, _utils.mapToCssModules)((0, _classnames.default)(className, "carousel-control-".concat(direction)), cssModule);
  const iconClasses = (0, _utils.mapToCssModules)((0, _classnames.default)("carousel-control-".concat(direction, "-icon")), cssModule);
  const screenReaderClasses = (0, _utils.mapToCssModules)((0, _classnames.default)('visually-hidden'), cssModule);
  return (
    /*#__PURE__*/
    // We need to disable this linting rule to use an `<a>` instead of
    // `<button>` because that's what the Bootstrap examples require:
    // https://getbootstrap.com/docs/4.5/components/carousel/#with-controls
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    _react.default.createElement("a", {
      className: anchorClasses,
      style: {
        cursor: 'pointer'
      },
      role: "button",
      tabIndex: "0",
      onClick: e => {
        e.preventDefault();
        onClickHandler();
      }
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: iconClasses,
      "aria-hidden": "true"
    }), /*#__PURE__*/_react.default.createElement("span", {
      className: screenReaderClasses
    }, directionText || direction))
  );
}

CarouselControl.propTypes = {
  /** Set the direction of control button */
  direction: _propTypes.default.oneOf(['prev', 'next']).isRequired,

  /** Function to be triggered on click */
  onClickHandler: _propTypes.default.func.isRequired,

  /** Change underlying component's CSS base class name */
  cssModule: _propTypes.default.object,

  /** Screen reader text */
  directionText: _propTypes.default.string,

  /** Add custom class */
  className: _propTypes.default.string
};
var _default = CarouselControl;
exports.default = _default;
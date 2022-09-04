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

function CarouselIndicators(props) {
  const {
    items,
    activeIndex,
    cssModule,
    onClickHandler,
    className
  } = props;
  const listClasses = (0, _utils.mapToCssModules)((0, _classnames.default)(className, 'carousel-indicators'), cssModule);
  const indicators = items.map((item, idx) => {
    const indicatorClasses = (0, _utils.mapToCssModules)((0, _classnames.default)({
      active: activeIndex === idx
    }), cssModule);
    return /*#__PURE__*/_react.default.createElement("button", {
      "aria-label": item.caption,
      "data-bs-target": true,
      type: "button",
      key: "".concat(item.key || Object.values(item).join('')),
      onClick: e => {
        e.preventDefault();
        onClickHandler(idx);
      },
      className: indicatorClasses
    });
  });
  return /*#__PURE__*/_react.default.createElement("div", {
    className: listClasses
  }, indicators);
}

CarouselIndicators.propTypes = {
  /** The current active index */
  activeIndex: _propTypes.default.number.isRequired,

  /** Add custom class */
  className: _propTypes.default.string,

  /** Change underlying component's CSS base class name */
  cssModule: _propTypes.default.object,

  /** Array of items to show */
  items: _propTypes.default.array.isRequired,

  /** Function to be triggered on click */
  onClickHandler: _propTypes.default.func.isRequired
};
var _default = CarouselIndicators;
exports.default = _default;
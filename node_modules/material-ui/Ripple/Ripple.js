'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styleSheet = undefined;

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _jssThemeReactor = require('jss-theme-reactor');

var _transitions = require('../styles/transitions');

var _customPropTypes = require('../utils/customPropTypes');

var _customPropTypes2 = _interopRequireDefault(_customPropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styleSheet = exports.styleSheet = (0, _jssThemeReactor.createStyleSheet)('MuiRipple', function () {
  return {
    ripple: {
      width: 50,
      height: 50,
      left: 0,
      top: 0,
      opacity: 0,
      position: 'absolute',
      borderRadius: '50%',
      background: 'currentColor'
    },
    rippleVisible: {
      opacity: 0.3,
      transform: 'scale(1)',
      animation: 'mui-ripple-enter 550ms ' + _transitions.easing.easeInOut
    },
    rippleFast: {
      animationDuration: '200ms'
    },
    container: {
      opacity: 1
    },
    containerLeaving: {
      opacity: 0,
      animation: 'mui-ripple-exit 550ms ' + _transitions.easing.easeInOut
    },
    containerPulsating: {
      position: 'absolute',
      left: 0,
      top: 0,
      display: 'block',
      width: '100%',
      height: '100%',
      animation: 'mui-ripple-pulsate 1500ms ' + _transitions.easing.easeInOut + ' 200ms infinite',
      rippleVisible: {
        opacity: 0.2
      }
    },
    '@keyframes mui-ripple-enter': {
      '0%': {
        transform: 'scale(0)'
      },
      '100%': {
        transform: 'scale(1)'
      }
    },
    '@keyframes mui-ripple-exit': {
      '0%': {
        opacity: 1
      },
      '100%': {
        opacity: 0
      }
    },
    '@keyframes mui-ripple-pulsate': {
      '0%': {
        transform: 'scale(1)'
      },
      '50%': {
        transform: 'scale(0.9)'
      },
      '100%': {
        transform: 'scale(1)'
      }
    }
  };
}); //  weak

var Ripple = function (_Component) {
  (0, _inherits3.default)(Ripple, _Component);

  function Ripple() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Ripple);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Ripple.__proto__ || (0, _getPrototypeOf2.default)(Ripple)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      rippleVisible: false
    }, _this.ripple = null, _this.leaveTimer = undefined, _this.start = function (callback) {
      _this.setState({
        rippleVisible: true
      }, callback);
    }, _this.stop = function (callback) {
      _this.setState({
        rippleLeaving: true
      }, callback);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Ripple, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.leaveTimer);
    }
  }, {
    key: 'componentWillEnter',
    value: function componentWillEnter(callback) {
      this.start(callback);
    }
  }, {
    key: 'componentWillLeave',
    value: function componentWillLeave(callback) {
      var _this2 = this;

      this.stop(function () {
        _this2.leaveTimer = setTimeout(function () {
          callback();
        }, 550);
      });
    }
  }, {
    key: 'getRippleStyles',
    value: function getRippleStyles() {
      var _props = this.props,
          rippleSize = _props.rippleSize,
          rippleX = _props.rippleX,
          rippleY = _props.rippleY;


      var rippleStyles = {
        width: rippleSize,
        height: rippleSize,
        top: -(rippleSize / 2) + rippleY,
        left: -(rippleSize / 2) + rippleX
      };

      return rippleStyles;
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames, _classNames2;

      var _props2 = this.props,
          className = _props2.className,
          pulsate = _props2.pulsate;
      var _state = this.state,
          rippleVisible = _state.rippleVisible,
          rippleLeaving = _state.rippleLeaving;

      var classes = this.context.styleManager.render(styleSheet);

      var rippleClassName = (0, _classnames2.default)(classes.ripple, (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.rippleVisible, rippleVisible), (0, _defineProperty3.default)(_classNames, classes.rippleFast, pulsate), _classNames), className);

      var containerClasses = (0, _classnames2.default)(classes.container, (_classNames2 = {}, (0, _defineProperty3.default)(_classNames2, classes.containerLeaving, rippleLeaving), (0, _defineProperty3.default)(_classNames2, classes.containerPulsating, pulsate), _classNames2));

      var rippleStyles = this.getRippleStyles();

      return (0, _jsx3.default)('span', {
        className: containerClasses
      }, void 0, (0, _jsx3.default)('span', {
        className: rippleClassName,
        style: rippleStyles
      }));
    }
  }]);
  return Ripple;
}(_react.Component);

Ripple.defaultProps = {
  pulsate: false
};
Ripple.contextTypes = {
  styleManager: _customPropTypes2.default.muiRequired
};
exports.default = Ripple;
process.env.NODE_ENV !== "production" ? Ripple.propTypes = {
  /**
   * The CSS class name of the root element.
   */
  className: _react.PropTypes.string,
  pulsate: _react.PropTypes.bool,
  rippleSize: _react.PropTypes.number.isRequired,
  rippleX: _react.PropTypes.number.isRequired,
  rippleY: _react.PropTypes.number.isRequired
} : void 0;
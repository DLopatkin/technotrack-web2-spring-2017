'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = createShallow;

var _jss = require('jss');

var _jssPresetDefault = require('jss-preset-default');

var _jssPresetDefault2 = _interopRequireDefault(_jssPresetDefault);

var _jssThemeReactor = require('jss-theme-reactor');

var _enzyme = require('enzyme');

var _theme = require('../styles/theme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createShallow() {
  var shallow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _enzyme.shallow;
  var otherContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var theme = (0, _theme.createMuiTheme)();
  var jss = (0, _jss.create)((0, _jssPresetDefault2.default)());
  var styleManager = (0, _jssThemeReactor.createStyleManager)({ jss: jss, theme: theme });
  var context = (0, _extends3.default)({ theme: theme, styleManager: styleManager }, otherContext);
  var shallowWithContext = function shallowWithContext(node) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return shallow(node, {
      context: (0, _extends3.default)({}, context, options.context)
    });
  };

  shallowWithContext.context = context;

  shallowWithContext.cleanUp = function () {
    styleManager.reset();
  };

  return shallowWithContext;
} //  weak
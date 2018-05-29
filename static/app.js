'use strict';

var _IssueList = require('./IssueList.js');

var _IssueList2 = _interopRequireDefault(_IssueList);

var _IssueEdit = require('./IssueEdit.js');

var _IssueEdit2 = _interopRequireDefault(_IssueEdit);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NoMatch = function NoMatch() {
  return React.createElement(
    'p',
    null,
    'Page Not Found'
  );
};

var RoutedApp = function RoutedApp() {
  return React.createElement(
    _reactRouter.Router,
    { history: _reactRouter.hashHistory },
    React.createElement(_reactRouter.Redirect, { from: '/', to: '/issues' }),
    React.createElement(_reactRouter.Route, { path: '/issues', component: _IssueList2.default }),
    React.createElement(_reactRouter.Route, { path: '/issueEdit:id', component: _IssueEdit2.default }),
    React.createElement(_reactRouter.Route, { path: '*', component: NoMatch })
  );
};

ReactDOM.render(React.createElement(_IssueList2.default, null), document.getElementById('contents'));
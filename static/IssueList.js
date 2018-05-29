'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _IssueAdd = require('./IssueAdd.js');

var _IssueAdd2 = _interopRequireDefault(_IssueAdd);

var _IssueFilter = require('./IssueFilter.js');

var _IssueFilter2 = _interopRequireDefault(_IssueFilter);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function IssueTable(props) {
	var issueRows = props.issues.map(function (issue) {
		//console.log(issue); 
		return React.createElement(IssueRow, { key: issue._id, issue: issue });
	});

	return React.createElement(
		'div',
		{ className: 'table-responsive-lg' },
		React.createElement(
			'table',
			{ className: 'table table-striped table-bordered table-hover' },
			React.createElement(
				'thead',
				{ className: 'thead-dark' },
				React.createElement(
					'tr',
					null,
					React.createElement(
						'th',
						{ scope: 'col' },
						'Id'
					),
					React.createElement(
						'th',
						{ scope: 'col' },
						'Status'
					),
					React.createElement(
						'th',
						{ scope: 'col' },
						'Owner'
					),
					React.createElement(
						'th',
						{ scope: 'col' },
						'Created'
					),
					React.createElement(
						'th',
						{ scope: 'col' },
						'Effort'
					),
					React.createElement(
						'th',
						{ scope: 'col' },
						'Completion'
					),
					React.createElement(
						'th',
						{ scope: 'col' },
						'Title'
					)
				)
			),
			React.createElement(
				'tbody',
				null,
				issueRows
			)
		)
	);
}

var IssueList = function (_React$Component) {
	_inherits(IssueList, _React$Component);

	function IssueList() {
		_classCallCheck(this, IssueList);

		var _this = _possibleConstructorReturn(this, (IssueList.__proto__ || Object.getPrototypeOf(IssueList)).call(this));

		_this.state = { issues: [] };

		_this.createIssue = _this.createIssue.bind(_this);
		return _this;
	}

	_createClass(IssueList, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.loadData();
		}
	}, {
		key: 'loadData',
		value: function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
				var res, json;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.prev = 0;
								_context.next = 3;
								return fetch('/api/issues');

							case 3:
								res = _context.sent;
								_context.next = 6;
								return res.json();

							case 6:
								json = _context.sent;

								if (res.ok) {
									_context.next = 9;
									break;
								}

								return _context.abrupt('return', alert("Failed to fetch issues: " + json.message));

							case 9:

								console.log("Total count of records:", json._metadata.total_count);
								json.records.forEach(function (issue) {
									issue.created = new Date(issue.created);
									if (issue.completionDate) issue.completionDate = new Date(issue.completionDate);
								});
								this.setState({ issues: json.records });
								_context.next = 17;
								break;

							case 14:
								_context.prev = 14;
								_context.t0 = _context['catch'](0);

								console.log(_context.t0);

							case 17:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this, [[0, 14]]);
			}));

			function loadData() {
				return _ref.apply(this, arguments);
			}

			return loadData;
		}()
		//callback function for issueadd

	}, {
		key: 'createIssue',
		value: function () {
			var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(newIssue) {
				var res, json, newIssues;
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.prev = 0;
								_context2.next = 3;
								return fetch('/api/issues', {
									method: 'POST',
									headers: { 'Content-Type': 'application/json' },
									body: JSON.stringify(newIssue) });

							case 3:
								res = _context2.sent;
								_context2.next = 6;
								return res.json();

							case 6:
								json = _context2.sent;

								if (res.ok) {
									_context2.next = 9;
									break;
								}

								return _context2.abrupt('return', alert("Failed to add issue: " + json.message));

							case 9:

								json.created = new Date(json.created);
								json.completionDate = new Date(json.completionDate);
								newIssues = this.state.issues.concat(json);

								this.setState({ issues: newIssues });
								_context2.next = 18;
								break;

							case 15:
								_context2.prev = 15;
								_context2.t0 = _context2['catch'](0);

								alert("Error in sending data to server: " + _context2.t0.message);

							case 18:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this, [[0, 15]]);
			}));

			function createIssue(_x) {
				return _ref2.apply(this, arguments);
			}

			return createIssue;
		}()
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'h1',
					null,
					'Issue Tracker'
				),
				React.createElement(_IssueFilter2.default, null),
				React.createElement('hr', null),
				React.createElement(IssueTable, { issues: this.state.issues }),
				React.createElement('hr', null),
				React.createElement(_IssueAdd2.default, { createIssue: this.createIssue })
			);
		}
	}]);

	return IssueList;
}(React.Component);

exports.default = IssueList;


var IssueRow = function IssueRow(props) {
	var issue = props.issue;
	return React.createElement(
		'tr',
		null,
		React.createElement(
			'th',
			{ scope: 'row' },
			React.createElement(
				_reactRouter.Link,
				{ to: '/issues/' + issue._id },
				' ',
				issue._id.substr(-4),
				' '
			)
		),
		React.createElement(
			'td',
			null,
			issue.status
		),
		React.createElement(
			'td',
			null,
			issue.owner
		),
		React.createElement(
			'td',
			null,
			issue.created.toDateString()
		),
		React.createElement(
			'td',
			null,
			issue.effort
		),
		React.createElement(
			'td',
			null,
			issue.completionDate ? issue.completionDate.toDateString() : ''
		),
		React.createElement(
			'td',
			null,
			issue.title
		)
	);
};
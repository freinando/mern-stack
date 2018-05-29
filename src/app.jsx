import IssueList from './IssueList.js';
import IssueEdit from './IssueEdit.js';


import { Router, Route, Redirect, hashHistory } from 'react-router';
const NoMatch = () => <p>Page Not Found</p>;

const RoutedApp = () => (
  <Router history={hashHistory} >
  	<Redirect from="/" to="/issues" />
    <Route path="/issues" component={IssueList} />
    <Route path="/issueEdit:id" component={IssueEdit} />
    <Route path="*" component={NoMatch} />
  </Router> 
);




ReactDOM.render(<IssueList />, document.getElementById('contents'));
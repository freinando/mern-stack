import IssueAdd from './IssueAdd.js';
import IssueFilter from './IssueFilter.js';

import { Link } from 'react-router';

function IssueTable(props){
	const issueRows = props.issues.map(issue => {
													//console.log(issue); 
													return(<IssueRow key={issue._id} issue={issue} />);
												});										

	return (
		<div className="table-responsive-lg">
			<table className="table table-striped table-bordered table-hover">
				<thead className="thead-dark">
					<tr>
						<th scope="col">Id</th>
						<th scope="col">Status</th>
						<th scope="col">Owner</th>
						<th scope="col">Created</th>
						<th scope="col">Effort</th>
						<th scope="col">Completion</th>
						<th scope="col">Title</th>
					</tr>
				</thead>
				<tbody>
					{issueRows}
				</tbody>
			</table>
		</div>
	);
}


export default class IssueList extends React.Component {
	constructor() {
    	super();
    	this.state = { issues: []};

    	this.createIssue = this.createIssue.bind(this);
	}
	componentDidMount() {
    	this.loadData();
	}

	async loadData() {
		try{
			const res = await fetch('/api/issues');
			const json = await res.json();
			if(!res.ok){
				return alert("Failed to fetch issues: " + json.message);
			}

			console.log("Total count of records:", json._metadata.total_count);
		    json.records.forEach(issue => {
				issue.created = new Date(issue.created);
				if (issue.completionDate)
					issue.completionDate = new Date(issue.completionDate);
			});
		    this.setState({ issues: json.records });
	  	}catch(err){ 
	    	console.log(err);
	    }
	  	
	}
	//callback function for issueadd
	async createIssue(newIssue) {
		try{
			const res = await fetch('/api/issues', {
										method: 'POST',
										headers: { 'Content-Type': 'application/json' },
										body: JSON.stringify(newIssue)});
			const json = await res.json();
			if(!res.ok){
				return alert("Failed to add issue: " + json.message);
			}
			
			json.created = new Date(json.created);
			json.completionDate = new Date(json.completionDate);
			const newIssues = this.state.issues.concat(json);
			this.setState({ issues: newIssues });
		}catch(err){
			alert("Error in sending data to server: " + err.message);
		}
	}

	render() {
		return (
			<div>
				<h1>Issue Tracker</h1>
				<IssueFilter />
				<hr />
				<IssueTable issues={this.state.issues}/>
				<hr />
				<IssueAdd createIssue={this.createIssue}/>
			</div>
		); 
	}
}

const IssueRow = (props) => {
	const issue = props.issue;
	return (
		<tr>
			<th scope="row"><Link to={'/issues/'+issue._id}> {issue._id.substr(-4)} </Link></th>
			<td>{issue.status}</td>
			<td>{issue.owner}</td> 
			<td>{issue.created.toDateString()}</td> 
			<td>{issue.effort}</td> 
			<td>{issue.completionDate ? issue.completionDate.toDateString() : ''}</td>
			<td>{issue.title}</td>
		</tr> 
	);
};
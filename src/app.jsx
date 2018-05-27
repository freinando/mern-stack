const contentNode = document.getElementById('contents');

class IssueFilter extends React.Component {
	render() {
	    return (
			<div>This is a placeholder for the Issue Filter.</div>
		);
	}
}

class IssueTable extends React.Component {
	render() {
		return (
			<table className="table table-striped">
				<thead className="thead-dark">
					<tr>
					<th scope="col">Id</th>
					<th scope="col">Title</th>
					</tr>
				</thead>
				<tbody>
					<IssueRow issue_id={1} issue_title="Error in console when clicking Add"/>
          			<IssueRow issue_id={2} issue_title="Missing bottom border on panel"/>
				</tbody>
			</table>
		);
	}
}

class IssueAdd extends React.Component {
	render() {
		return (
			<div>This is a placeholder for an Issue Add entry form.</div>
		);
	}
}

class IssueList extends React.Component {
	render() {
		return (
			<div>
				<h1>Issue Tracker</h1>
				<IssueFilter />
				<hr />
				<IssueTable />
				<hr />
				<IssueAdd />
			</div>
		); 
	}
}

class IssueRow extends React.Component {
	render() {
		return (
			<tr>
				<th scope="row">{this.props.issue_id}</th>
				<td >{this.props.issue_title}</td>
			</tr> 
		);
	} 
}

ReactDOM.render(<IssueList />, contentNode);
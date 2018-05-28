const contentNode = document.getElementById('contents');



class IssueFilter extends React.Component {
	render() {
	    return (
			<div>This is a placeholder for the Issue Filter.</div>
		);
	}
}

function IssueTable(props){
	const issueRows = props.issues.map(issue => {
													//console.log(issue); 
													return(<IssueRow key={issue.id} issue={issue} />);
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

class IssueAdd extends React.Component {
	constructor() {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
  	}

	handleSubmit(e) {
		e.preventDefault();
		let form = document.forms.issueAdd;
		let date = new Date();
		date.setDate(new Date().getDate() + 7);

		this.props.createIssue({
			owner: form.owner.value,
			title: form.title.value,
			status: 'New',
			created: new Date(),
			effort: Math.floor(Math.random() * 20) + 1,
			completionDate: date
		});
	    // clear the form for the next input
	    form.owner.value = ""; 
	    form.title.value = "";
	}

	render() {
		return (
			<div>
        		<form name="issueAdd" onSubmit={this.handleSubmit}>
          			<input type="text" name="owner" placeholder="Owner" />
          			&nbsp;
          			<input type="text" name="title" placeholder="Title" />
          			&nbsp;
          			<button>Add</button>
        		</form>
      		</div>
		);
	}
}

class IssueList extends React.Component {
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
			if (json.completionDate)
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
			<th scope="row">{issue.id}</th>
			<td>{issue.status}</td>
			<td>{issue.owner}</td> 
			<td>{issue.created.toDateString()}</td> 
			<td>{issue.effort}</td> 
			<td>{issue.completionDate ? issue.completionDate.toDateString() : ''}</td>
			<td>{issue.title}</td>
		</tr> 
	);
};




ReactDOM.render(<IssueList />, contentNode);
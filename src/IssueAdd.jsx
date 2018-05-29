export default class IssueAdd extends React.Component {
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
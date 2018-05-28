const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require( 'mongoose' );

const app = express();
app.use(express.static('static'));
app.use(router);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const issues = [
	{
		id: 1, 
		status: "Open", 
		owner: "Ravan",
		created: new Date('2016-08-15'), 
		effort: 5, 
		completionDate: undefined,
		title: "Error in console when clicking Add"
	}, {
		id: 2, 
		status: "Assigned", 
		owner: "Eddie", 
		created: new Date('2016-08-16'), 
		effort: 14, 
		completionDate: new Date('2016-08-30'),
		title: "Missing bottom border on panel"
	}
];


app.get('/api/issues', (req, res) => {
	const metadata = { total_count: issues.length };
	res.json({ _metadata: metadata, records: issues });
});

app.post('/api/issues', (req, res) => {
	const newIssue = req.body;
	newIssue.id = issues.length + 1;
	newIssue.created = new Date();
	if (!newIssue.status)
		newIssue.status = 'New';

	const err = validateIssue(newIssue);
	if (err) {
		res.status(422).json({ message: `Invalid requrest: ${err}` });
		return;
	}
	  issues.push(newIssue);
	  res.json(newIssue);
});


const dbURI = 'mongodb://localhost/issuetracker';

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

const issueTrackerSchema = new mongoose.Schema({
	status: {type: String, required: true},
	owner: {type: String, required: true},
	effort: {type: Number, "default": 0, min: 0, max: 20},
	title: {type: String, required: true},
	created: {type: Date, "default":new Date()},
	completion: {type: Date}
});


mongoose.model('Issue', issueTrackerSchema);

app.listen(3000, function (){
	console.log('App started on port 3000');
});

const validIssueStatus = {
  New: true,
  Open: true,
  Assigned: true,
  Fixed: true,
  Verified: true,
  Closed: true,
};
const issueFieldType = {
  id: 'required',
  status: 'required',
  owner: 'required',
  effort: 'optional',
  created: 'required',
  completionDate: 'optional',
  title: 'required',
};
function validateIssue(issue) {
  for (const field in issueFieldType) {
    const type = issueFieldType[field];
    if (!type) {
      delete issue[field];
    } else if (type === 'required' && !issue[field]) {
      return `${field} is required.`;
} }
  if (!validIssueStatus[issue.status])
    return `${issue.status} is not a valid status.`;
  return null;
}

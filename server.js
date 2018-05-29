const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require( 'mongoose' );
const Issue = require('./server/issue.js');


const app = express();
app.use(express.static('static'));
app.use(router);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



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

let d = new Date();
d.setDate(new Date().getDate()+7);
const issueTrackerSchema = new mongoose.Schema({
	status: {type: String, required: true},
	owner: {type: String, required: true},
	effort: {type: Number, "default": (Math.floor(Math.random() * 20) + 1), min: 0, max: 20},
	title: {type: String, required: true},
	created: {type: Date, "default":new Date()},
	completionDate: {type: Date, "default": d}
});


const issuesCollection = mongoose.model('Issue', issueTrackerSchema);



app.get('/api/issues', async (req, res) => {
	try{
		var issues = await issuesCollection.find({}).exec();

		const metadata = { total_count: issues.length };
		res.json({ _metadata: metadata, records: issues });
	}catch(err){
		res.json(err);
	}
});

app.post('/api/issues', async (req, res) => {
	const newIssue = req.body;
	if (!newIssue.status)
		newIssue.status = 'New';
	const err = Issue.validateIssue(newIssue);
	if (err) {
		res.status(422).json({ message: `Invalid requrest: ${err}` });
		return;
	}
	try{
		var addedIssue = await issuesCollection.create({title: newIssue.title,
													owner: newIssue.owner,
													status: newIssue.status,
													effort: newIssue.effort,
													completionDate: newIssue.completionDate
													});
	}catch(err){
		return res.status(422).json({ message: `Invalid requrest: ${err}` });
	}

	res.json(addedIssue);
});


app.listen(3000, function (){
	console.log('App started on port 3000');
});


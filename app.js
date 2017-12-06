require('dotenv').config()

var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var Assignment = require('./models/assignment');

const app = express();
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

var port = process.env.PORT || 8080;

app.get('/assignments', (req, res) => {
  Assignment.find((err, assignments) => {
    if(err) { res.send(err) };
    res.json(assignments)
  });
});

app.get('/assignments/:id', (req, res) => {
  Assignment.findById(req.params.id, (err, assignment) => {
    if(err) { res.send(err) };
    res.json(assignment)
  });
});

app.post('/assignments', (req, res) => {
  var assignment               = new Assignment();
  assignment.studentId         = req.body.studentId;
  assignment.assignmentId      = req.body.assignmentId;
  assignment.assignmentContent = req.body.assignmentContent;
  assignment.createdAt         = Date.now();
  assignment.save(function (err) {
      if (err) { res.end(); }
      res.json(assignment)
  });
});

app.listen(port);
console.log('Started');

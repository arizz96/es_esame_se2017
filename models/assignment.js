var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AssignmentSchema = new Schema({
  studentId: String,
  assignmentId: String,
  assignmentContent: Object,
  createdAt: Date
});

module.exports = mongoose.model('Assignment', AssignmentSchema);

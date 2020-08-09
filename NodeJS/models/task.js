const mongoose = require('mongoose');

var Task = mongoose.model('Task', {
    name: { type: String },
    duedate: { type: Date },
   description: { type: String }
   
});

module.exports = { Task };
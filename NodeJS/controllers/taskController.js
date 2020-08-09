const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Task } = require('../models/task');

// => localhost:3000/tasks/
router.get('/', (req, res) => {
    Task.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Tasks :' + JSON.stringify(err, undefined, 2)); }
    });
});


router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Task.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Task :' + JSON.stringify(err, undefined, 2)); }
    });
});

// => localhost:3000/tasks/
router.post('/', (req, res) => {
    var tsk = new Task({
        name: req.body.name,
        duedate: req.body.duedate,
        description: req.body.description,
    });
    tsk.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Task Save :' + JSON.stringify(err, undefined, 2)); }
    });
});


router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var tsk = {
        name: req.body.name,
        duedate: req.body.duedate,
        description: req.body.description,
    };
    Task.findByIdAndUpdate(req.params.id, { $set: tsk }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Task Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Task.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Task Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports=router;
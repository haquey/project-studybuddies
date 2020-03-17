const Subject = require('../models/subject');

exports.subjectById = function(req, res, next, id){
    Subject.find({_id: id, notebookId: req.notebook._id}, function(err, subjects){
        if (err || subjects.length === 0) return res.status(400).json({err: "Subject not found"});
        req.subject = subjects[0];
        next();
    });
};

exports.create = function(req, res){
    console.log('req.body', req.body);
    req.body.notebookId = req.params.notebookId;
    let subject = new Subject(req.body);
    subject.save(function(err, subject){
        if (err) return res.status(400).json(err);
        res.json(subject);
    });
};

exports.read = function(req, res){
    return res.json(req.subject);
};

exports.readSubjectListByNotebookId = function(req, res){
    let bookId = req.notebook._id;
    Subject.find({notebookId: bookId}, function(err, subjects){
        if (err) return res.status(400).json(err);
        return res.json(subjects);
    });
};

exports.update = function(req, res){
    let subject = req.subject;
    if (req.body.title) subject.title = req.body.title;
    subject.save(function(err, subject){
        if (err) return res.status(400).json(err);
        res.json(subject);
    });
};

exports.remove = function(req, res){
    let subject = req.subject;
    subject.remove(function(err, delSubject){
        if (err) return res.status(400).json(err);
        // del pages as well
        res.json(delSubject);
    });
};
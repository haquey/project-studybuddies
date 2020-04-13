const Notebook = require('../models/notebook');

exports.notebookById = function(req, res, next, id){
    Notebook.find({_id: id, ownerId: req.profile._id}, function(err, books){
        if (err || books.length === 0) return res.status(404).json({err: "Notebook not found"});
        req.notebook = books[0];
        next();
    });
};

exports.create = function(req, res){
    console.log('req.body', req.body);
    req.body.ownerId = req.params.userId;
    let notebook = new Notebook(req.body);
    notebook.save(function(err, notebook){
        if (err) return res.status(400).json(err);
        res.json(notebook);
    });
};

exports.read = function(req, res){
    // if (req.notebook.ownerId !== req.profile._id) return res.status(400).json({err: "Notebook not found"});
    return res.json(req.notebook);
};

exports.readNotebookListByUserId = function(req, res){
    let userId = req.profile._id;
    Notebook.find({ownerId: userId}, function(err, books){
        if (err) return res.status(400).json(err);
        return res.json(books);
    });
};

exports.update = function(req, res){
    let notebook = req.notebook;
    console.log("HERE: ", req.body.title);
    if (req.body.title) notebook.title = req.body.title;
    if (req.body.collaborators) notebook.collaborators = req.body.collaborators;
    console.log("HERE: ", notebook);
    notebook.save(function(err, notebook){
        if (err) return res.status(400).json(err);
        res.json(notebook);
    });
};

exports.remove = function(req, res){
    let notebook = req.notebook;
    notebook.remove(function(err, delBook){
        if (err) return res.status(400).json(err);
        // del subjects and pages as well
        res.json(delBook);
    });
};
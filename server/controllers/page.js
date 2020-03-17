const Page = require('../models/page');

exports.pageById = function(req, res, next, id){
    Page.findById(id, function(err, page){
        if (err || !page) return res.status(400).json({err: "Page not found"});
        req.page = page;
        next();
    });
};

exports.create = function(req, res){
    console.log('req.body', req.body);
    req.body.ownerId = req.profile._id;
    let page = new Page(req.body);
    page.save(function(err, page){
        if (err) return res.status(400).json(err);
        res.json(page);
    });
};

exports.read = function(req, res){
    return res.json(req.page);
};

exports.addToNotebook = function(req, res){
    console.log("HERHEHREH");
    let page = req.page;
    let pageObj = {};
    pageObj.ownerId = req.profile._id;
    pageObj.notebookId = req.notebook._id;
    pageObj.subjectId = req.subject._id;
    pageObj.title = page.title;
    pageObj.tags = page.tags;
    pageObj.notes = page.notes;
    console.log(pageObj);
    // req.body contains ownerId, notebookId and subjectId
    // let newPageObj = Object.assign({}, page);
    // newPageObj._id = undefined;
    // console.log(newPageObj);
    let newPage = new Page(pageObj);
    newPage.save(function(err, page){
        if (err) return res.status(400).json(err);
        res.json(page);
    });
};

exports.readPageListBySubjectId = function(req, res){
    let subId = req.subject._id;
    Page.find({subjectId: subId}, function(err, pages){
        if (err) return res.status(400).json(err);
        return res.json(pages);
    });
};

exports.update = function(req, res){
    let page = req.page;
    Object.assign(page, req.body);
    page.save(function(err, page){
        if (err) return res.status(400).json(err);
        res.json(page);
    });
};

exports.remove = function(req, res){
    let page = req.page;
    page.remove(function(err, delpage){
        if (err) return res.status(400).json(err);
        // del pages as well
        res.json(delpage);
    });
};
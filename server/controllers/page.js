const Page = require('../models/page');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
const language = require('@google-cloud/language');
const clientNlp = new language.LanguageServiceClient();

exports.pageById = function(req, res, next, id){
    Page.findById(id, function(err, page){
        if (err || !page) return res.status(400).json({err: "Page not found"});
        req.page = page;
        next();
    });
};

exports.searchPages = function(req, res){
    if (!req.query.key) return res.json([]);
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let pagenum = req.query.page ? parseInt(req.query.page) : 0;
    let searchQuery = req.query.key;
    console.log('searchquery: ', searchQuery);
    Page.find({public: true, $text: {$search: searchQuery}})
        .sort({createdAt:-1})
        .skip(limit*pagenum)
        .limit(limit)
        .exec(function(err, pages){
            if (err) return res.status(400).json(err);
            return res.json(pages);
    });
};

exports.generateTags = function(req, res){
    let page = req.page;
    let text = '';
    let tags = [];

    page.notes.forEach(note => {
        text += note.rawText + ' ';
    });

    // Prepares a document, representing the provided text
    console.log(text);

    if (text.split(' ').length <= 20) return res.json([]);

    const document = {
        language: "EN",
        content: text,
        type: 'PLAIN_TEXT',
    };

    clientNlp.classifyText({document: document, encodingType: "UTF8"}).then(classification => {
        console.log(classification[0].categories);
        classification[0].categories.forEach(category => {
            console.log(category.name);
            tags.push(category.name);
        });
        page.tags = tags;
        page.save(function(err, page){
            if (err) return res.status(400).json(err);
            res.json(tags);
        });
    })
    .catch(err => res.json(err));

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

exports.readPageRepo = function(req, res){
    Page.find({}, function(err, pages){
        return res.json(pages);
    });
};

exports.updatePageOrder = function(req, res){
    let page = req.page;

    if (page.order === req.body.order) return res.json(page);

    page.order = req.body.order;
    let notebookId = req.notebook._id;

    Page.updateMany({ notebookId: notebookId, order: { $gte: page.order }}, { $inc: { order: 1 } }, function(err, docsUpdated){
        if (err) return res.status(400).json(err);
        page.save(function(err, page){
            if (err) return res.status(400).json(err);
            res.json(page);
        });
    });
};

exports.addToNotebook = function(req, res){
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

exports.ocrScanPage = function(req, res, next){
    console.log('req.file', req.file);
    console.log(req);
    const fileName = req.file.path;
    let pageObj = {};
    pageObj.notes = [];
    pageObj.ownerId = req.profile._id;
    pageObj.notebookId = req.body.notebookId;
    pageObj.subjectId = req.body.subjectId;

    client.documentTextDetection(fileName)
    .then(data => {
        const fullTextAnnotation = data[0].fullTextAnnotation;
        let pArr = fullTextAnnotation.text.split('\n');
        pageObj.title = pArr[0];
        let xPos = 400;
        let yPos = 150;

        for (let i=1; i<pArr.length; i++) {
            if (pArr[i].length > 3) {
                pageObj.notes.push({text: pArr[i], xPosition: xPos, yPosition: yPos});
                yPos += 100;
            }
        }
        let page = new Page(pageObj);
        page.save(function(err, page){
            if (err) return res.status(400).json(err);
            res.json(page);
        });
    })
    .catch(err => {
        return res.status(400).json(err);
    });
    
    
};
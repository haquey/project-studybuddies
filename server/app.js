const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');

dotenv.config();

// importing routes
const userRoutes = require('./routes/user');
const notebookRoutes = require('./routes/notebook');
const subjectRoutes = require('./routes/subject');
const pageRoutes = require('./routes/page');

const app = express();

mongoose.connection.on('error', function(err){
    console.log(`MongoDB connection error: ${err.message}`);
});

mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false }
)
.then(() => console.log('Connected to MongoDB'))
.catch(() => {
    console.log('Could not connect to MongoDB');
    process.exit(1);
});



app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());


app.use('/api', userRoutes);
app.use('/api', notebookRoutes);
app.use('/api', subjectRoutes);
app.use('/api', pageRoutes);

const port = process.env.PORT || 8080;

app.listen(port, function(){
    console.log(`Server running on port ${port}`);
});


// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

const fileName = '/Users/haquey/C09Winter/project/project-studybuddies/server/routes/uploads/85b6d59279d1e7597aa6f68f8d90fb98';

client.documentTextDetection(fileName)
.then(data => {
    const fullTextAnnotation = data[0].fullTextAnnotation;
    let pArr = fullTextAnnotation.text.split('\n');

    for (let i=0; i<pArr.length; i++) {
        console.log(pArr[i]);
    }
    // fullTextAnnotation.pages.forEach(page => {
    // page.blocks.forEach(block => {
    //     // console.log(`Block confidence: ${block.confidence}`);
    //     block.paragraphs.forEach(paragraph => {
    //     // console.log(`Paragraph confidence: ${paragraph.confidence}`);
    //     // console.log(paragraph);
    //     let paragraphBuilder = '';
    //     paragraph.words.forEach(word => {
    //         const wordText = word.symbols.map(s => s.text).join('');
    //         paragraphBuilder = paragraphBuilder + ' ' + wordText;

    //         // console.log(`Word text: ${wordText}`);
    //         // console.log(`Word confidence: ${word.confidence}`);
    //         // word.symbols.forEach(symbol => {
    //         // console.log(`Symbol text: ${symbol.text}`);
    //         // console.log(`Symbol confidence: ${symbol.confidence}`);
    //         // });
    //     });
    //     // console.log('SPACE\n');
    //     // console.log(paragraphBuilder);
    //     });
    // });
    // });
})
.catch(err => {
    console.log(err);
});
    // const fullTextAnnotation = result.fullTextAnnotation;
    // console.log(`Full text: ${fullTextAnnotation.text}`);
    // fullTextAnnotation.pages.forEach(page => {
    // page.blocks.forEach(block => {
    //     // console.log(`Block confidence: ${block.confidence}`);
    //     block.paragraphs.forEach(paragraph => {
    //     // console.log(`Paragraph confidence: ${paragraph.confidence}`);
    //     // console.log(paragraph);
    //     let paragraphBuilder = '';
    //     paragraph.words.forEach(word => {
    //         const wordText = word.symbols.map(s => s.text).join('');
    //         paragraphBuilder = paragraphBuilder + ' ' + wordText;

    //         // console.log(`Word text: ${wordText}`);
    //         // console.log(`Word confidence: ${word.confidence}`);
    //         // word.symbols.forEach(symbol => {
    //         // console.log(`Symbol text: ${symbol.text}`);
    //         // console.log(`Symbol confidence: ${symbol.confidence}`);
    //         // });
    //     });
    //     console.log(paragraphBuilder);
    //     });
    // });
    // });

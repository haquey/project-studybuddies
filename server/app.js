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

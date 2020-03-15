const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
dotenv.config();

// importing routes
const userRoutes = require('./routes/user');



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


app.use('/api', userRoutes);

const port = process.env.PORT || 8080;

app.listen(port, function(){
    console.log(`Server running on port ${port}`);
});

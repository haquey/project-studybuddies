const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// importing routes
const userRoutes = require('./routes/user');

dotenv.config();

const app = express();

mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false }
)
.then(() => console.log('Connected to MongoDB'));

mongoose.connection.on('error', function(err){
    console.log(`MongoDB connection error: ${err.message}`);
});



app.use('/api', userRoutes);

const port = process.env.PORT || 8080;

app.listen(port, function(){
    console.log(`Server running on port ${port}`);
});

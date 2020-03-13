const express = require('express');
const app = express();
require('dotenv').config();

app.get('/', function(req, res){
    res.send("get home");
});

const port = process.env.PORT || 8080;

app.listen(port, function(){
    console.log(`Server running on port ${port}`);
});

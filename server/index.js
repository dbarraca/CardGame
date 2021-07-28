const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path');
const config = require('config');

require('dotenv').config();


const app  = express();
app.use(cors());
app.use(express.json());

// CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// If in production, then use static frontend build files.
if (process.env.NODE_ENV === 'production') {    
    // Serve static folder
    app.use(express.static('../client/build'));

    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    });
}
else {
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname + '/static/index.html'));
        // res.send("Site Builder Web App");
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Card Game Web Application on port ${port}`)
});
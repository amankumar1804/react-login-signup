// const mongoose = require('mongoose');

// const mongo_url = process.env.MONGO_CONN;

// mongoose.connect(mongo_url)
//     .then(() => {
//         console.log('MongoDB Connected...');
//     }).catch((err) => {
//         console.log('MongoDB Connection Error: ', err);
//     })
    //...............................................................................
//require('dotenv').config();
// const mongoose = require('mongoose');

// const mongo_url = process.env.MONGO_CONN;

// mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log('MongoDB Connected...');
//     }).catch((err) => {
//         console.log('MongoDB Connection Error: ', err);
//     });
// //.............................................................................
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected...');
    }).catch((err) => {
        console.log('MongoDB Connection Error: ', err);
    });

app.use(cors());
app.use(bodyParser.json());
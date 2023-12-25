const path = require('path');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });


const Server = require('./src/utils/server');
const Api = require("./src/utils/api");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// // # ejs settings   
app.set("view engine", "ejs");
app.set("views", "views");

if(process.env.NODE_ENV ===  'development') app.use(morgan('dev'));

app.use((req, res, next) => {
    req.time = Date.now(); 
    next();
});

// // API
Api(app);

Server(app);
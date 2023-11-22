const express = require("express");
const cors = require("cors");
require('dotenv').config();

const app = express();
const port = process.env.PORT;

const db = require("./config/mongoose");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/Pets_image', express.static(__dirname + '/Pets_image'));

app.use('/', require('./routes'));

app.listen(port, (err) => {
    if (err) {
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
})
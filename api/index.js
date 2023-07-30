const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const port = 8001
const db = require('./config/mongoose')

const app = express();

app.use(express.json());
app.use(cors());







app.use('/' , require('./router/index.js'))

app.listen(port, (err) => {
    if(err) throw err;

    console.log("Server is running in port:",port);
})
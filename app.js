const express = require('express');
const mongoose = require('mongoose');
const app = express();

const port = 8478;
const hostname = 'localhost';



const serverDb = 'mongodb+srv://newUser:passwordnotshared@cluster0.unsfq.mongodb.net/db29?retryWrites=true&w=majority';
const router = require('./Router/index');


app.use(express.json()); // to parse json object to read data in req.body
app.use('/', router);

// connect to db and in promise starts server on success
mongoose.connect(serverDb, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(res => {
        app.listen(port, hostname, () => {
            console.log(`Server is running at ${hostname}:${port}`);
        });
    })
    .catch(err => console.log(err));

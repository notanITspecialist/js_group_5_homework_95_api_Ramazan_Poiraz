const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');

const admin = require('./app/admin');
const user = require('./app/user');
const cocktail = require('./app/cocktail');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const init = async () => {
    await mongoose.connect(config.baseUrl,config.baseConfig);

    app.use('/admin', admin);
    app.use('/user', user);
    app.use('/cocktail', cocktail);

    app.listen(8000, () => {
        console.log('Server started on 8000 host!');
    });
};

init().catch(e => console.log(e));
const mongoose = require('mongoose');
require('dotenv').config();

function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
        console.log('Connected to DB');
    })
    .catch(err => {
        console.error('Error connecting to DB:', err);
    });
}

module.exports = connectToDb;

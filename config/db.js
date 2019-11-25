const mongoose = require('mongoose');
const dbconfig = require('config');
const dotenv = require('dotenv');

dotenv.config();

const dbUrlPrefix = dbconfig.get('mongoPrefix');
const dbUrlPostfix = dbconfig.get('mongoPostfix');
const dbPassword = process.env.mongo_password;
const dbUsername = process.env.mongo_username;

var dbUrl = dbUrlPrefix+"//"+dbUsername+":"+dbPassword+"@"+dbUrlPostfix;

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true
        });
        console.log(`Mongo Connected`);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;
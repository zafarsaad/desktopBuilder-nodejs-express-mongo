const dbConfig = require('../config/db.config.js');

const mongoose = require("mongoose");
// !Review - possibly not needed in Mongoose 5+
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.desktops = require("./desktop.model.js")(mongoose);

module.exports = db;
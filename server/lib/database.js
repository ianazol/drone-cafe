"use strict";

const config = require("../config");
const mongoose = require("mongoose");

module.exports.connect = function () {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.db.url, function (error) {
        if (error) {
            console.error("Could not connect to MongoDB");
            console.log(error);
        }
    });
};

module.exports.disconnect = function () {
    mongoose.disconnect(function (error) {
        if (error) {
            console.log(error);
        }
    });
};
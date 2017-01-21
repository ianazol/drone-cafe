"use strict";

const dishes = require("../controllers/dish.controller");

module.exports = function(app){
    app.route("/api/dish")
        .get(dishes.list);
};
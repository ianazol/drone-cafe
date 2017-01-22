"use strict";

const dish = require("../controllers/dish.controller");

module.exports = function(app){
    app.route("/api/dish")
        .get(dish.list);
};
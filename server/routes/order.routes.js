"use strict";

const order = require("../controllers/order.controller");

module.exports = function(app){
    app.route("/api/order/")
        .get(order.list)
        .post(order.create);

    app.route("/api/order/:id")
        .put(order.update);
};
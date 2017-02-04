"use strict";

const order = require("../controllers/order.controller");

module.exports = function (app, socket) {
    app.route("/api/order/")
        .get(order.list)
        .post(order.create(socket));

    app.route("/api/order/:id")
        .put(order.updateStatus(socket));

    app.route("/api/order/:id/deliver")
        .put(order.deliver(socket));
};
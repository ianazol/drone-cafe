"use strict";

const user = require("../controllers/user.controller");

module.exports = function (app) {
    app.route("/api/user/")
        .get(user.getByEmail)
        .post(user.create);

    app.route("/api/user/:id/balance")
        .put(user.addToBalance);
};
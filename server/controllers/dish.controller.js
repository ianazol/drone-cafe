"use strict";

const Dish = require("../models/dish.model");

function list(req, res) {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let skip = (page - 1) * limit;

    let totalCount = 0;

    Dish.find().count().exec()
        .then(function (total) {
            totalCount = total;
            return Dish.find().limit(limit).skip(skip).exec();
        })
        .then(function (dishes) {
            res.json({list: dishes, total: totalCount});
        })
        .catch(function (error) {
            return res.status(500).send({
                error: error.message
            });
        });
}

// function getById(dishID) {
//     return Dish.findById(dishID).exec();
// }

module.exports = {
    list,
    //getById
};
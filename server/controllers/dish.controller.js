"use strict";

const Dish = require("../models/dish.model");

module.exports.list = function(req, res){
    //pagination
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let skip = (page - 1) * limit;

    Dish.find().count().exec(function (error, total) {

        if (error) {
            return res.status(500).send({
                error: error.message
            });
        }

        Dish.find()/*.sort("rating")*/.limit(limit).skip(skip).exec(function (error, dishes) {
            if (error) {
                return res.status(500).send({
                    error: error.message
                });
            } else {
                res.json({list: dishes, total: total});
            }
        });
    });
};
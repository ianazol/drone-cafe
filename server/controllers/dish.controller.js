"use strict";

const Dish = require("../models/dish.model");

module.exports.list = function(req, res){
    Dish.find().sort("rating").exec(function(error, dishes){
        if (error){
            return res.status(400).send({
                message: error.message
            });
        } else {
            res.json(dishes);
        }
    });
};
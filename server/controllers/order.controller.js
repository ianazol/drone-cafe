"use strict";

const Order = require("../models/order.model");
const User = require("../controllers/user.controller");
const Dish = require("../controllers/dish.controller");

module.exports.create = function(req, res){
    let order = new Order(req.body);

    //todo refactor save to promise
    order.save(function(error){
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        } else {
            Dish.getById(order.dish).then(function(dish){
                return User.updateBalance(order.user, -dish.price);
            }).then(function(user){
                order.user = user;
                res.json(order);
            });
        }
    });
};

module.exports.list = function(req, res){
    Order.find(req.query).sort("-date").exec(function (error, orders) {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        } else {
            res.json(orders);
        }
    });
};

module.exports.update = function(req, res){
    let id = req.params.id;

    Order.findOneAndUpdate({"_id": id}, {$set: req.body}, {new: true}).exec(function(error, order){
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        } else if (!order){
            return res/*.status(404)*/.send({
                error: 'No order with that id has been found'
            });
        } else {
            res.json(order);
        }
    });
};
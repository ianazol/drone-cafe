"use strict";

const Order = require("../models/order.model");

module.exports.create = function(req, res){
    let order = new Order(req.body);

    order.save(function(error){
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        } else {
            res.json(order);
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
            return res.status(404).send({
                error: 'No order with that id has been found'
            });
        } else {
            res.json(order);
        }
    });
};
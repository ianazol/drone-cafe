"use strict";

const Order = require("../models/order.model");
const User = require("../controllers/user.controller");
const Dish = require("../controllers/dish.controller");
const drone = require("netology-fake-drone-api");

function create(socket) {
    return function (req, res) {
        let order = new Order(req.body);

        order.save()
            .then(function (order) {
                return Dish.getById(order.dish);
            })
            .then(function (dish) {
                order.dish = dish;
                return User.updateBalance(order.user, -dish.price);
            })
            .then(function (user) {
                order.user = user;
                socket.kitchenIO.emit("newOrder", order);
                res.json(order);
            })
            .catch(function (error) {
                return res.status(500).send({
                    error: error.message
                });
            });
    }
}

function list(req, res) {
    Order.find(req.query).sort("-created").populate('dish').exec()
        .then(function (orders) {
            res.json(orders);
        })
        .catch(function (error) {
            return res.status(500).send({
                error: error.message
            });
        });
}

function updateStatus(socket) {
    return function (req, res) {
        let id = req.params.id;
        let query = {status: req.body.status};

        if (req.body.status == "Готовится"){
            query["cookingStart"] = Date.now();
        }

        if (req.body.status == "Подано" || req.body.status == "Возникли сложности"){
            query["finished"] = Date.now();
        }

        Order.findOneAndUpdate({"_id": id}, {$set: query}, {new: true}).populate('dish').exec()
            .then(function (order) {
                if (!order) {
                    return res.send({
                        error: 'No order with that id has been found'
                    });
                } else {
                    socket.clientIO.to(order.user).emit("statusChanged", order);
                    res.json(order);
                }
            })
            .catch(function (error) {
                return res.status(500).send({
                    error: error.message
                });
            });
    }
}

function deliver(socket) {
    return function (req, res) {
        let id = req.params.id;

        drone
            .deliver()
            .then(function () {
                req.body.status = "Подано";
                updateStatus(socket)(req, res);
            })
            .catch(function () {
                req.body.status = "Возникли сложности";
                updateStatus(socket)(req, res);
            });
    }
}

module.exports = {
    create,
    list,
    updateStatus,
    deliver
};
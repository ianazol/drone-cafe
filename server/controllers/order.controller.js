"use strict";

const Order = require("../models/order.model");
const User = require("../controllers/user.controller");
const drone = require("netology-fake-drone-api");
const config = require("../config");

function create(socket) {
    return function (req, res) {
        let order = new Order(req.body);

        order.save()
            .then(function (order) {
                return Order.populate(order, 'dish');
            })
            .then(function (order) {
                return User.updateBalance(order.user, -order.sum);
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

function deleteOrder(orderId) {
    return Order.remove({_id: orderId}).exec();
}

function remove(req, res) {
    let id = req.params.id;
    deleteOrder(id)
        .then(function (result) {
            res.json(result);
        })
        .catch(function (error) {
            return res.status(500).send({
                error: error.message
            });
        });
}

function autoRemove(order, socket) {
    setTimeout(function () {
        deleteOrder(order._id)
            .then(function () {
                socket.clientIO.to(order.user).emit("orderDeleted", order);
            });
    }, config.timeBeforeOrderDelete);
}

function updateStatus(socket) {
    return function (req, res) {
        let id = req.params.id;
        let orderFinished = false;
        let query = {status: req.body.status};

        if (req.body.status == "Готовится") {
            query["cookingStart"] = Date.now();
        }

        if (req.body.status == "Подано" || req.body.status == "Возникли сложности") {
            query["finished"] = Date.now();
            orderFinished = true;
        }

        Order.findOneAndUpdate({"_id": id}, {$set: query}, {new: true}).populate('dish').exec()
            .then(function (order) {
                if (!order) {
                    return res.send({
                        error: 'No order with that id has been found'
                    });
                } else {
                    socket.clientIO.to(order.user).emit("statusChanged", order);
                    if (orderFinished) {
                        autoRemove(order, socket);
                    }
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

        Order.findById(id).populate('dish').populate('user').exec()
            .then(function (order) {
                drone.deliver(order.user, order.dish)
                    .then(function () {
                        req.body.status = "Подано";
                        updateStatus(socket)(req, res);
                    })
                    .catch(function () {
                        User.updateBalance(order.user._id, order.sum)
                            .then(function (user) {
                                socket.clientIO.to(user._id).emit("balanceChanged", user.balance);
                                req.body.status = "Возникли сложности";
                                updateStatus(socket)(req, res);
                            });
                    });
            });
    }
}

module.exports = {
    create,
    list,
    remove,
    updateStatus,
    deliver
};
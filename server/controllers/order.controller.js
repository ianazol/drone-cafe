"use strict";

const Order = require("../models/order.model");
const User = require("../controllers/user.controller");
const Dish = require("../controllers/dish.controller");

function create(socket){
    return function(req, res){
        let order = new Order(req.body);
        order.save()
            .then(function(order){
                return Dish.getById(order.dish);
            })
            .then(function(dish){
                order.dish = dish;
                return User.updateBalance(order.user, -dish.price);
            })
            .then(function(user){
                order.user = user;
                socket.kitchenIO.emit("newOrder", order);
                res.json(order);
            })
            .catch(function(error){
                return res.status(500).send({
                    error: error.message
                });
            });
    }
}


function list(req, res){
    Order.find(req.query).sort("-date").populate('dish').exec()
    .then(function(orders){
        res.json(orders);
    })
    .catch(function(error) {
        return res.status(500).send({
            error: error.message
        });
    });
}

function update(req, res){
    let id = req.params.id;

    Order.findOneAndUpdate({"_id": id}, {$set: req.body}, {new: true}).exec()
    .then(function(order) {
        if (!order){
            return res.send({
                error: 'No order with that id has been found'
            });
        } else {
            res.json(order);
        }
    })
    .catch(function(error){
        return res.status(500).send({
            error: error.message
        });
    });
}

module.exports = {
    create,
    list,
    update
};
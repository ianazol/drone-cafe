"use strict";

const User = require("../models/user.model");

function create(req, res){
    let user = new User(req.body);

    user.save()
    .then(function(){
        res.json(user);
    })
    .catch(function(error){
        return res.status(500).send({
            error: error.message
        });
    });
}

function getByEmail(req, res){
    let email = req.query.email;

    User.findOne({email: email}).exec()
    .then(function(user){
        if (!user){
            return res.send({
                error: 'No user with that email has been found'
            });
        } else {
            res.json(user);
        }
    })
    .catch(function(error){
        return res.status(500).send({
            error: error.message
        });
    });
}

function updateBalance(userId, sum){
    return User.findOneAndUpdate({"_id": userId}, {$inc: {"balance": sum}}, {new: true}).exec();
}

function addToBalance(req, res){
    let id = req.params.id;
    let sum = req.body.sum;

    updateBalance(id, sum).then(function(user){
        if (!user){
            return res.send({
                error: 'No user with that id has been found'
            });
        } else {
            res.json(user);
        }
    }).catch(function(error){
        return res.status(500).send({
            error: error.message
        });
    });
}

module.exports = {
    create,
    getByEmail,
    updateBalance,
    addToBalance
};
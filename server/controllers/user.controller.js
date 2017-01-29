"use strict";

const User = require("../models/user.model");

module.exports.create = function(req, res){
    let user = new User(req.body);

    user.save(function(error){
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        } else {
            res.json(user);
        }
    });
};

module.exports.getByEmail = function(req, res){
    let email = req.query.email;

    User.findOne({email: email}).exec(function(error, user) {
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        } else if (!user){
            return res/*.status(404)*/.send({
                error: 'No user with that email has been found'
            });
        } else {
            res.json(user);
        }
    });
};

// module.exports.update = function(req, res){
//     let id = req.params.id;
//
//     User.findOneAndUpdate({"_id": id}, {$set: req.body}, {new: true}).exec(function(error, user){
//         if (error) {
//             return res.status(500).send({
//                 error: error.message
//             });
//         } else if (!user){
//             return res/*.status(404)*/.send({
//                 error: 'No user with that id has been found'
//             });
//         } else {
//             res.json(user);
//         }
//     });
// };

module.exports.addToBalance = function(req, res){
    let id = req.params.id;

    User.findOneAndUpdate({"_id": id}, {$inc: {"balance": 100}}, {new: true}).exec(function(error, user){
        if (error) {
            return res.status(500).send({
                error: error.message
            });
        } else if (!user){
            return res/*.status(404)*/.send({
                error: 'No user with that id has been found'
            });
        } else {
            res.json(user);
        }
    });
};
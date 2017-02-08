"use strict";

const express = require("express");
const app = express();
const config = require("./server/config");
const database = require("./server/lib/database");
const port = process.env.PORT || config.server.defaultPort;

database.connect();

let server = app.listen(port, function () {
    console.log('Listening on port ' + port)
});

var data = require("./menu");
var Dish = require("./server/models/dish.model");

for(var x = 0; x <= data.length - 1; x++){
    new Dish({
        title: data[x].title,
        image: data[x].image,
        rating: data[x].rating,
        ingredients: data[x].ingredients,
        price: data[x].price
    })
    .save(function(err){
        if (err) console.log(err);
    });
}
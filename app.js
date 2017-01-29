"use strict";

const express   = require("express");
const app       = express();
const config    = require("./server/config/config");
const database  = require("./server/config/lib/database");
const port      = process.env.PORT || config.server.defaultPort;
const bodyParser = require("body-parser");

var server = app.listen(port, function() {
    console.log('Listening on port ' + port)
});

database.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));
app.use(express.static('./public'));
app.use('/scripts', express.static('./node_modules/'));

require("./server/routes/dish.routes")(app);
require("./server/routes/user.routes")(app);
require("./server/routes/order.routes")(app);

var io = require("socket.io").listen(server);

io.on("connection", function(socket){

    socket.on("statusChanged", function(data){
        //console.log(data);
        socket.broadcast.emit("statusChanged", data);
    });
    //console.log("a user connected");
});

//todo роуты с 404 и 500 ошибками

/*
var data = require("./menu");
var Dish = require("./server/models/dish.model");

for(var x = 0; x <= data.length - 1; x++){
    //console.log(data[x]);
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
*/
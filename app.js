"use strict";

const express = require("express");
const app = express();
const config = require("./server/config");
const database = require("./server/lib/database");
const port = process.env.PORT || config.server.defaultPort;
const bodyParser = require("body-parser");

database.connect();

let server = app.listen(port, function () {
    console.log('Listening on port ' + port)
});

let socket = require('./server/lib/socket')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));
app.use(express.static('./public'));
app.use('/scripts', express.static('./node_modules/'));

require("./server/routes/dish.routes")(app);
require("./server/routes/user.routes")(app);
require("./server/routes/order.routes")(app, socket);

app.use(function(req, res){
    res.status(404).send('404 Not Found');
});

app.use(function(err, req, res, next){
    console.dir(err);
    res.status(500).send('500 Server Error');
});

module.exports = app;
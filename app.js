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


//todo роуты с 404 и 500 ошибками
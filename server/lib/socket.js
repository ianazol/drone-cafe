module.exports = function (server) {
    let io = require("socket.io").listen(server);
    let kitchenIO = io.of("/kitchen");
    let clientIO = io.of("/client");

    //kitchenIO.on("connection", function (socket) {});

    clientIO.on("connection", function (socket) {
        socket.on("newConnect", function (data) {
            socket.join(data.userID);
        });
    });

    return {kitchenIO, clientIO};
};


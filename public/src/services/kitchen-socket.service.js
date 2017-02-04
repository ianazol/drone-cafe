angular
    .module("DroneCafeApp")
    .factory("KitchenSocket", function(socketFactory){
        var appIoSocket = io.connect("http://localhost:3000/kitchen");

        appSocket = socketFactory({
            ioSocket: appIoSocket
        });

        return appSocket;
    });
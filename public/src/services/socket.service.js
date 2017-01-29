angular
    .module("DroneCafeApp")
    .factory("appSocket", function(socketFactory){
       var appIoSocket = io.connect("http://localhost:3000");

        appSocket = socketFactory({
            ioSocket: appIoSocket
        });

        return appSocket;
    });
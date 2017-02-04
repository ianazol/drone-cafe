angular
    .module("DroneCafeApp")
    .factory("ClientSocket", function(socketFactory){
       var appIoSocket = io.connect("http://localhost:3000/client");

        appSocket = socketFactory({
            ioSocket: appIoSocket
        });

        return appSocket;
    });
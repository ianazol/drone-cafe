angular
    .module("DroneCafeApp")
    .factory("KitchenSocket", function (socketFactory) {
        var appIoSocket = io.connect(config.apiUrl + "/kitchen");

        appSocket = socketFactory({
            ioSocket: appIoSocket
        });

        return appSocket;
    });
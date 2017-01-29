angular
    .module("DroneCafeApp")
    .factory("OrderService", function($resource){

        return $resource('http://localhost:3000/api/order/:_id/',
            {
                _id: '@_id'
            },
            {
                update: {
                    method: "PUT"
                }
            });
    });
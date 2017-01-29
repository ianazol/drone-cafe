angular
    .module("DroneCafeApp")
    .factory("OrderService", function($resource){

        return $resource('http://localhost:3000/api/order/:_id/', {
            _id: '@_id'
        }/*, {
            query: {
                transformResponse: function(responseData) {
                    return angular.fromJson(responseData);
                }
            }
        }*/);
    });
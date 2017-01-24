angular
    .module("DroneCafeApp")
    .factory("UserService", function($resource){

        return $resource('http://localhost:3000/api/user/:userId/', {
            userId: '@userId'
        }/*, {
            query: {
                transformResponse: function(responseData) {
                    return angular.fromJson(responseData);
                }
            }
        }*/);

    });
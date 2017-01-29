angular
    .module("DroneCafeApp")
    .factory("DishService", function($resource){

        return $resource('http://localhost:3000/api/dish/:_id/',
            {
                _id: '@_id'
            },
            {
                query: {
                    transformResponse: function(responseData) {
                        return angular.fromJson(responseData);
                    }
                }
            });

    });
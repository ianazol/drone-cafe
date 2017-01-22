DroneCafeApp
    .factory("DishService", function($resource){

        return $resource('http://localhost:3000/api/dish/:dishId/', {
            dishId: '@dishId'
        }, {
            query: {
                transformResponse: function(responseData) {
                    return angular.fromJson(responseData);
                }
            }
        });

    });
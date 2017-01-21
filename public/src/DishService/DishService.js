DroneCafeApp
    .factory("DishService", function($resource){

        return $resource('http://localhost:3000/api/dish/:dishId/', {
            dishId: '@dishId'
        }, {
            query: {
                method: 'GET',
                isArray: true,
                transformResponse: function(responseData) {
                    return angular.fromJson(responseData);
                }
            }
        });

    });
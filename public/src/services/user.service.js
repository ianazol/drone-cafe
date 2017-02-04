angular
    .module("DroneCafeApp")
    .factory("UserService", function ($resource) {

        return $resource('http://localhost:3000/api/user/:_id/',
            {
                _id: '@_id'
            },
            {
                addToBalance: {
                    method: 'PUT',
                    url: 'http://localhost:3000/api/user/:_id/balance'
                }
            });
    });
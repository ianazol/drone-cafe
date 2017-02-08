angular
    .module("DroneCafeApp")
    .factory("UserService", function ($resource, config) {

        return $resource(config.apiUrl + '/api/user/:_id/',
            {
                _id: '@_id'
            },
            {
                addToBalance: {
                    method: 'PUT',
                    url: config.apiUrl + '/api/user/:_id/balance'
                }
            });
    });
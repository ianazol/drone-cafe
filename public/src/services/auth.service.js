angular
    .module("DroneCafeApp")
    .factory("AuthService", function(UserService, $sessionStorage){
        var service = {};

        service.login = login;
        service.isAuthorized = isAuthorized;
        service.getUserData = getUserData;

        function login(credentials){
            //todo подумать, как можно порефакторить эти промисы
            return UserService.get({email: credentials.email}).$promise.then(function(user){
                if (user._id){
                    $sessionStorage.user = user;
                    return user;
                }

                credentials.balance = 100;
                return UserService.save(credentials).$promise.then(function(user){
                    $sessionStorage.user = user;
                    return user;
                });
            });
        }

        function isAuthorized() {
            return !!$sessionStorage.user;
        }

        function getUserData() {
            return $sessionStorage.user;
        }

        return service;
    });
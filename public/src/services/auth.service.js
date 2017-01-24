angular
    .module("DroneCafeApp")
    .factory("AuthService", function(UserService, SessionService){
        var service = {};

        service.login = login;
        service.isAuthorized = isAuthorized;

        function login(credentials){
            //todo подумать, как можно порефакторить эти промисы
            return UserService.get({email: credentials.email}).$promise.then(function(user){
                if (user._id){
                    SessionService.create(user);
                    return user;
                }

                credentials.balance = 100;
                UserService.save(credentials).$promise.then(function(user){
                    SessionService.create(user);
                    return user;
                });
            });
        }

        function isAuthorized() {
            return !!SessionService.user;
        }

        return service;
    });
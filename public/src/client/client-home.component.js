angular
    .module("DroneCafeApp")
    .component("clientHome", {
        templateUrl: '/src/client/client-home.html',
        controller: function(AuthService, $state){
            var vm = this;

            if (!AuthService.isAuthorized())
                $state.go("login");
        }
    });
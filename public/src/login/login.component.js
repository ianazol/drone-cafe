angular
    .module("DroneCafeApp")
    .component("login", {
        templateUrl: '/src/login/login.html',
        controller: function(AuthService, $state){
            var vm = this;

            vm.login = login;

            function login(credentials){
                AuthService.login(credentials).then(function(user){
                    $state.go("user-home");
                });
            }
        }
    });
angular
    .module("DroneCafeApp")
    .component("clientHome", {
        templateUrl: '/src/client/client-home.html',
        controller: function(AuthService, $sessionStorage, $state, UserService){
            var vm = this;

            vm.user = $sessionStorage.user;

            vm.addMoney = function(){
                UserService.updateBalance({ _id: vm.user._id}).$promise.then(function(user){
                    $sessionStorage.user.balance = user.balance;
                });
            };

            if (!AuthService.isAuthorized())
                $state.go("login");
        }
    });
angular
    .module("DroneCafeApp")
    .component("clientHome", {
        templateUrl: '/src/client/client-home.html',
        controller: function(AuthService, $sessionStorage, $state, UserService, OrderService){
            var vm = this;

            vm.user = $sessionStorage.user;

            vm.addMoney = function(){
                UserService.addToBalance({ _id: vm.user._id, sum: 100}).$promise.then(function(user){
                    $sessionStorage.user.balance = user.balance;
                });
            };

            vm.orderList = OrderService.query({user: vm.user._id});

            if (!AuthService.isAuthorized())
                $state.go("login");
        }
    });
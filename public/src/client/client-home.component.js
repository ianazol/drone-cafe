angular
    .module("DroneCafeApp")
    .component("clientHome", {
        templateUrl: '/src/client/client-home.html',
        controller: function(AuthService, $sessionStorage, $state, UserService, OrderService, ClientSocket, $scope){
            var vm = this;

            if (!AuthService.isAuthorized()){
                return $state.go("login");
            } else {
                vm.user = $sessionStorage.user;
            }

            vm.addMoney = function(){
                UserService.addToBalance({ _id: vm.user._id, sum: 100}).$promise
                .then(function(user){
                    $sessionStorage.user.balance = user.balance;
                });
            };

            vm.orderList = OrderService.query({user: vm.user._id});

            ClientSocket.on("statusChanged", function(data){
                console.dir(data);
                vm.orderList = vm.orderList.map(function(order){
                    if (order._id == data.orderId)
                        order.status = data.status;
                    return order;
                })
            });

            $scope.$on("$destroy", function(){
                ClientSocket.removeListener();
            });
        }
    });
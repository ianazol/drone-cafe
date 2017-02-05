angular
    .module("DroneCafeApp")
    .component("clientHome", {
        templateUrl: '/src/client/client-home.html',
        controller: function (AuthService, $sessionStorage, $state, UserService, OrderService, ClientSocket) {
            var vm = this;
            vm.ordersLoading = true;

            if (!AuthService.isAuthorized()) {
                return $state.go("login");
            } else {
                vm.user = $sessionStorage.user;
            }

            vm.addMoney = function () {
                UserService.addToBalance({_id: vm.user._id, sum: 100}).$promise
                    .then(function (user) {
                        $sessionStorage.user.balance = user.balance;
                    });
            };

            OrderService.query({user: vm.user._id}).$promise
                .then(function (data) {
                    vm.orderList = data;
                    vm.ordersLoading = false;
                });

            ClientSocket.emit("newConnect", {userID: vm.user._id});

            ClientSocket.on("statusChanged", function (changedOrder) {
                vm.orderList = vm.orderList.map(function (order) {
                    if (order._id == changedOrder._id)
                        order = changedOrder;
                    return order;
                })
            });

            ClientSocket.on("orderDeleted", function (deletedOrder) {
                vm.orderList = vm.orderList.filter(function (order) {
                    return order._id != deletedOrder._id;
                })
            });

            ClientSocket.on("balanceChanged", function (balance) {
                $sessionStorage.user.balance = balance;
            });

            vm.$onDestroy = function () {
                ClientSocket.removeAllListeners();
            };
        }
    });
angular
    .module("DroneCafeApp")
    .component("dishList", {
        templateUrl: '/src/dish/dish-list.html',
        controller: function(DishService, AuthService, $state, $sessionStorage, OrderService){
            var vm = this;


            var user = $sessionStorage.user;

            vm.limit = 12;
            vm.getDishList = getDishList;
            vm.formatList = formatList;

            //todo возможно надо убрать AuthServiec или сделать там геттер для получения user
            if (!AuthService.isAuthorized())
                return $state.go("login");

            vm.isAvailable = function(dishPrice){
                return user.balance >= dishPrice;
            };

            vm.getEnoughMoney = function(dishPrice){
                return dishPrice - user.balance;
            };

            vm.buy = function(dish){
                OrderService.save({
                    user: user._id,
                    dish: dish._id,
                    status: "Заказано"
                }).$promise.then(function(data){
                    $sessionStorage.user.balance = data.user.balance;
                    $state.go("user-home");
                });
            };



            getDishList();

            function getDishList(page){
                vm.loading = true;
                DishService.query({limit: vm.limit, page: page})
                    .$promise.then(function(data){
                        vm.list = data.list;
                        vm.totalCount = data.total;
                        vm.loading = false;
                    });
            }

            function formatList(list){
                return list.join(", ");
            }
        }
    });

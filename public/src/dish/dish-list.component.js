angular
    .module("DroneCafeApp")
    .component("dishList", {
        templateUrl: '/src/dish/dish-list.html',
        controller: function(DishService, AuthService, $state, $sessionStorage){
            var vm = this;

            vm.limit = 12;
            vm.getDishList = getDishList;
            vm.formatList = formatList;

            vm.isAvailable = function(dishPrice){
                return $sessionStorage.user.balance >= dishPrice;
            };

            vm.getEnoughMoney = function(dishPrice){
                return dishPrice - $sessionStorage.user.balance;
            };

            //todo возможно надо убрать AuthServiec или сделать там геттер для получения user
            if (!AuthService.isAuthorized())
                $state.go("login");

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

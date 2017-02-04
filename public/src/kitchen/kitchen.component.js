angular
    .module("DroneCafeApp")
    .component("kitchen", {
        templateUrl: '/src/kitchen/kitchen.html',
        controller: function(OrderService, KitchenSocket, $q){
            var vm = this;
            vm.loading = true;

            var newOrdersRequest = OrderService.query({status: "Заказано"}).$promise;
            var cookingOrdersRequest = OrderService.query({status: "Готовится"}).$promise;

            $q.all([newOrdersRequest, cookingOrdersRequest])
                .then(function(response){
                    vm.newOrderList = response[0];
                    vm.cookingOrderList = response[1];
                    vm.loading = false;
                });

            vm.startCooking = function(order, $index){
                OrderService.update({ _id: order._id, status: "Готовится"}).$promise
                .then(function(result){
                    //todo показ ошибок в интерфейсе
                    if (result.error)
                        return false;

                    vm.newOrderList.splice($index, 1);
                    vm.cookingOrderList.push(order);

                    KitchenSocket.emit('statusChanged', {
                        orderId: order._id,
                        status: "Готовится"
                    });
                });
            };

            vm.endCooking = function(order, $index){
                OrderService.update({ _id: order._id, status: "Доставляется"}).$promise
                .then(function(result){
                    //todo показ ошибок в интерфейсе
                    if (result.error)
                        return false;

                    vm.cookingOrderList.splice($index, 1);

                    KitchenSocket.emit('statusChanged', {
                        orderId: order._id,
                        status: "Доставляется"
                    });
                });
            };

            KitchenSocket.on("newOrder", function(data){
                vm.newOrderList.push(data);
            });
        }
    });
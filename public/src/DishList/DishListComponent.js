DroneCafeApp.component("dishList", {
    templateUrl: '/src/DishList/DishList.html',
    controller: function(DishService){
        var vm = this;
        vm.limit = 12;

        vm.getDishList = function(page){
            vm.loading = true;
            DishService.query({limit: vm.limit, page: page})
                .$promise.then(function(data){
                    vm.list = data.list;
                    vm.totalCount = data.total;
                    vm.loading = false;
                });
        };

        vm.formatList = function(list){
            return list.join(", ");
        };

        vm.getDishList();
    },
});

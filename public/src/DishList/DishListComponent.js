DroneCafeApp.component("dishList", {
    templateUrl: '/src/DishList/DishList.html',
    controller: function(DishService){
        var vm = this;
        vm.loading = true;

        //todo сделать постраничную навигацию
        DishService.query().$promise.then(function(data){
            vm.list = data;
            vm.loading = false;
        });

        vm.formatList = function(list){
            return list.join(", ");
        };
    },
});

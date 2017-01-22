var DroneCafeApp = angular.module("DroneCafeApp", ["ui.router", "ngResource", "bw.paging"]);

DroneCafeApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state("dish-list", {
            url: "/",
            component: "dishList"
        });

    $urlRouterProvider.otherwise('/');
}]);
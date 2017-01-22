var DroneCafeApp = angular.module("DroneCafeApp", ["ui.router", "ngResource", "bw.paging"]);

DroneCafeApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state("user-home", {
            url: "/",
            component: "userHome"
        })
        .state("dish-list", {
            url: "/dishes",
            component: "dishList"
        })
        .state("kitchen", {
            url: "/kitchen",
            component: "kitchen"
        });

    $urlRouterProvider.otherwise('/');
}]);
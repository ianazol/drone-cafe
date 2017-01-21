var DroneCafeApp = angular.module("DroneCafeApp", ["ui.router", "ngResource"]);

DroneCafeApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state("dish-list", {
            url: "/",
            component: "dishList"
        });

    $urlRouterProvider.otherwise('/');
}]);
angular
    .module("DroneCafeApp", ["ui.router", "ngResource", "ui.materialize"])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state("user-home", {
                url: "/",
                component: "clientHome"
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
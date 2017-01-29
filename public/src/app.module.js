angular
    .module("DroneCafeApp", [
        "ui.router",
        "ngResource",
        "ui.materialize",
        "ngMessages",
        "ngStorage"
    ])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state("user-home", {
                url: "/",
                component: "clientHome"
            })
            .state("login", {
                url: "/login",
                component: "login"
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
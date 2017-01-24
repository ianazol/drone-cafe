angular
    .module("DroneCafeApp")
    .service("SessionService", function(){
        this.create = function(user){
            this.user = user;
        }
    });
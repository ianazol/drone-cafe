var ClientPage = require('../test/page-objects/client-page');
var LoginPage = require('../test/page-objects/login-page');

describe("Client page: ", function () {
    var clientPage = {};
    var loginPage = {};

    beforeEach(function () {
        clientPage = new ClientPage();
        loginPage = new LoginPage();

        clientPage.get();
        loginPage.login();
    });

    describe("when click the 'add to balance' button", function () {
        it("balance should be increased by 100", function () {
            var balanceBefore = clientPage.getBalance();

            clientPage.addToBalance();
            var balanceAfter = clientPage.getBalance();

            Promise.all([balanceBefore, balanceAfter]).then(function(values){
                expect(values[1]).toEqual(values[0] + 100);
            });
        })
    })

});
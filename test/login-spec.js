var LoginPage = require('../test/page-objects/login-page');

describe("Login page: ", function () {
    var loginPage = {};

    beforeEach(function () {
        loginPage = new LoginPage();
        loginPage.get();
        loginPage.logout();
    });

    describe("when user email is not correct", function () {
        it("should return error", function(){
            loginPage.setEmail("incorrectEmail");
            expect(element(by.css('.email-error')).isDisplayed()).toBe(true);
        })
    })

});
var LoginPage = require('../public/page-objects/login-page');

describe("Login page: ", function () {
    var loginPage = {};

    beforeEach(function () {
        loginPage = new LoginPage();
        loginPage.get();
    });

    describe("when user email is not correct", function () {
        it("should return error", function () {
            loginPage.setEmail("incorrectEmail");
            expect(element(by.css('.email-error')).isDisplayed()).toBe(true);
        });

        it("btn should be disabled", function () {
            var btn = loginPage.getLoginBtn();

            loginPage.setEmail("incorrectEmail");
            loginPage.setName("TestUser");

            expect(btn.isEnabled()).toBe(false);
        })
    });

    describe("when user name and email is correct", function () {
        it("should redirect to home page", function () {
            loginPage.login();
            expect(browser.getCurrentUrl()).toMatch(/\/#!\/$/);
        })
    });

});
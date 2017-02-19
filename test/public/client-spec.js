var ClientPage = require('../public/page-objects/client-page');
var LoginPage = require('../public/page-objects/login-page');

describe("Client page: ", function () {
    var clientPage = {};
    var loginPage = {};

    beforeAll(function () {
        loginPage = new LoginPage();
        clientPage = new ClientPage();

        loginPage.get();
        loginPage.login();

        browser.wait(function () {
            return clientPage.isLoaded();
        });
    });

    beforeEach(function () {
        clientPage.get();
    });

    describe("when click the 'add to balance' button", function () {
        it("balance should be increased by 100", function () {
            var balanceBefore = clientPage.getBalance();

            clientPage.addToBalance();
            var balanceAfter = clientPage.getBalance();

            Promise.all([balanceBefore, balanceAfter])
                .then(function (values) {
                    expect(values[0] + 100).toEqual(values[1]);
                });

            expect(balanceBefore).toEqual(balanceBefore);
        })
    });

    describe("when click the 'add dishes' button", function () {
        it("should redirect to dishes list page", function () {
            var btn = clientPage.getAddDishesButton();
            btn.click();
            expect(browser.getCurrentUrl()).toMatch(/\/#!\/dishes$/);
        })
    });

    describe("when dish buy", function () {

        beforeEach(function () {
            clientPage.addToBalance();
        });

        it("should be added to the order list", function () {
            clientPage.getDishListPage();
            var firstEnabledDish = clientPage.firstDish();

            clientPage.getDishName(firstEnabledDish)
                .then(function (dishName) {
                    clientPage.buyDish(firstEnabledDish);
                    clientPage.get();

                    expect(clientPage.countOrder(dishName)).toBeGreaterThan(0);
                });
        });

        it("balance should be reduced by dish price", function () {
            var balanceBefore = clientPage.getBalance();

            clientPage.getDishListPage();
            var firstEnabledDish = clientPage.firstDish();
            var dishPrice = clientPage.getDishPrice(firstEnabledDish);
            clientPage.buyDish(firstEnabledDish);

            browser.wait(function () {
                return clientPage.isLoaded();
            });
            var balanceAfter = clientPage.getBalance();

            Promise.all([balanceBefore, dishPrice, balanceAfter])
                .then(function (values) {
                    expect(values[0] - values[1]).toEqual(values[2]);
                });
        });

        it("order should have the status Ordered", function () {
            clientPage.getDishListPage();
            var firstEnabledDish = clientPage.firstDish();

            clientPage.getDishName(firstEnabledDish)
                .then(function (dishName) {
                    clientPage.buyDish(firstEnabledDish);
                    clientPage.get();
                    var orderStatus = clientPage.findOrdersByName(dishName).first().element(by.css(".status")).getText();
                    expect(orderStatus).toEqual("Заказано");
                });
        });
    });
});
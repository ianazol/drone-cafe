var ClientPage = function () {
    var self = this;
    var url = "https://fast-woodland-85967.herokuapp.com/#!/";
    var dishListUrl = "https://fast-woodland-85967.herokuapp.com/#!/dishes";
    var balance = element(by.css('.user-balance'));
    var balanceButton = element(by.css('.user-balance-add'));
    var addDishesButton = element(by.css('.add-dish-btn'));

    self.get = function () {
        browser.get(url);
    };

    self.getDishListPage = function () {
        browser.get(dishListUrl);
    };

    self.toNumber = function (promise) {
        return promise.then(function (value) {
            return parseFloat(value.replace(/,|\$/g, ''));
        });
    };

    self.firstDish = function () {
        return element.all(by.repeater('dish in $ctrl.list')).filter(function (card, index) {
            return card.all(by.css(".buy-btn")).count().then(function (value) {
                return value > 0;
            })
        }).first();
    };

    self.getDishName = function (card) {
        return card.element(by.css(".dish-title")).getText();
    };

    self.getDishPrice = function (card) {
        return self.toNumber(card.element(by.css(".dish-price")).getText());
    };

    self.buyDish = function (card) {
        card.element(by.css(".buy-btn")).click();
    };

    self.findOrdersByName = function (dishName) {
        return element.all(by.repeater('order in $ctrl.orderList')).filter(function(order, index){
            return order.all(by.css(".title")).getText().then(function(name) {
                return name == dishName;
            });
        });
    };

    self.countOrder = function (dishName) {
        return self.findOrdersByName(dishName).count();
    };

    self.getBalance = function () {
        return self.toNumber(balance.getText());
    };

    self.addToBalance = function () {
        balanceButton.click();
    };

    self.getAddDishesButton = function () {
        return addDishesButton;
    }
};

module.exports = ClientPage;
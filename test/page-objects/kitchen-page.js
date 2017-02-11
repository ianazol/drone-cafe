var KitchenPage = function () {
    var self = this;
    var url = "https://fast-woodland-85967.herokuapp.com/#!/kitchen";

    self.get = function () {
        browser.get(url);
    };

    self.getFirstList = function () {
        return element.all(by.repeater('order in $ctrl.newOrderList'));
    };

    self.getSecondList = function () {
        return element.all(by.repeater('order in $ctrl.cookingOrderList'));
    };

    self.getFirstDish = function (list) {
        return list.first().element(by.css('.dish-name')).getText();
    };

    self.getDishCount = function (list, searchDish) {
        return list.filter(function (row) {
            return row.element(by.css('.dish-name')).getText().then(function (dishName) {
                return dishName === searchDish;
            })
        }).count();
    };

    self.getFirstBtn = function (list) {
        return list.first().element(by.css('.btn'));
    }
};

module.exports = KitchenPage;
var ClientPage = function () {
    var self = this;
    var url = "http://localhost:3000/#!/";
    var balance = element(by.css('.user-balance'));
    var balanceButton = element(by.css('.user-balance-add'));

    self.get = function () {
        browser.get(url);
    };

    self.toNumber = function (promise) {
        return promise.then(function(val){
            return parseFloat(val.slice(1));
        });
    };

    self.getBalance = function () {
        return self.toNumber(balance.getText());
    };

    self.addToBalance = function () {
        balanceButton.click();
    };
};

module.exports = ClientPage;
var LoginPage = function () {
    var self = this;
    var url = "https://fast-woodland-85967.herokuapp.com/#!/login";

    var userName = "TestUser";
    var userEmail = "testUser@mail.ru";
    var nameInput = element(by.model('credentials.name'));
    var emailInput = element(by.model('credentials.email'));
    var loginButton = element(by.css('.login-btn'));

    self.get = function () {
        browser.get(url);
    };

    self.setName = function (value) {
        nameInput.sendKeys(value);
    };

    self.setEmail = function (value) {
        emailInput.sendKeys(value);
    };

    self.login = function () {
        self.setName(userName);
        self.setEmail(userEmail);
        loginButton.click();
    };

    self.getLoginBtn = function () {
        return loginButton;
    }

};

module.exports = LoginPage;
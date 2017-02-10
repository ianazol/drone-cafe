var LoginPage = function () {
    var self = this;
    var url = "http://localhost:3000/#!/";

    var userName = "TestUser";
    var userEmail = "testUser@mail.ru";
    var nameInput = element(by.model('credentials.name'));
    var emailInput = element(by.model('credentials.email'));
    var loginButton = element(by.css('.login-btn'));
    var logoutButton = element(by.css('.user-logout'));

    self.get = function () {
        browser.get(url);
    };

    self.setName = function (value) {
        nameInput.sendKeys(value);
    };

    self.setEmail = function (value) {
        emailInput.sendKeys(value);
    };

    self.logout = function () {
        logoutButton.click();
    };

    self.login = function () {
        self.setName(userName);
        self.setEmail(userEmail);
        loginButton.click();
    }

};

module.exports = LoginPage;
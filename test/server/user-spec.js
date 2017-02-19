let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../app');
let assert = chai.assert;

let User = require("../../server/models/user.model");

var testUser = {
    name: "TestUser",
    email: "testUser@mail.ru",
    balance: 100
};

chai.use(chaiHttp);

function createUser() {
    let user = new User(testUser);
    return user.save();
}

function deleteUser() {
    return User.remove({email: testUser.email}).exec();
}

describe("User: ", function () {
    it("should save user and return object", function (done) {
        chai.request(app)
            .post("/api/user/")
            .send(testUser)
            .end(function (error, res) {
                assert.equal(res.status, 200);
                assert.isObject(res.body);
                assert.propertyVal(res.body, 'email', testUser.email);
                assert.property(res.body, '_id');
                assert.isUndefined(res.body.error);
                done();
            });
    });

    describe("when user exist", function () {
        before(function (done) {
            createUser()
                .then(function () {
                    done();
                });
        });

        it("should find by id and return object", function (done) {
            chai.request(app)
                .get("/api/user/?email=" + testUser.email)
                .end(function (error, res) {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.propertyVal(res.body, 'email', testUser.email);
                    assert.property(res.body, '_id');
                    assert.isUndefined(res.body.error);
                    done();
                });
        });
    });

    afterEach(function (done) {
        deleteUser()
            .then(function () {
                done();
            })
    });
});
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../app');
let assert = chai.assert;

let User = require("../../server/models/user.model");
let Dish = require("../../server/models/dish.model");
let Order = require("../../server/models/order.model");

let testOrder = {};
let testUser = {};

chai.use(chaiHttp);

function deleteOrder(orderId) {
    return Order.remove({_id: orderId}).exec();
}

function deleteUser(id) {
    return User.remove({_id: id}).exec();
}

describe("Order: ", function () {

    before(function (done) {
        let user = new User({
            name: "TestUser",
            email: "testUser@mail.ru",
            balance: 100
        });

        testOrder = {
            status: "Заказано",
        };

        Promise.all([
            user.save(),
            Dish.findOne().exec()
        ]).then(function (results) {
            testUser = results[0];
            testOrder.user = results[0].id;
            testOrder.dish = results[1].id;
            testOrder.sum = results[1].price;
            done();
        });
    });

    it("should get all orders", function (done) {
        chai.request(app)
            .get("/api/order/")
            .end(function (error, res) {
                assert.equal(res.status, 200);
                assert.isArray(res.body);
                assert.isUndefined(res.body.error);
                done();
            });
    });

    describe("when order added", function () {
        var newOrderId;

        it("should return object", function (done) {
            chai.request(app)
                .post("/api/order/")
                .send(testOrder)
                .end(function (error, res) {
                    newOrderId = res.body._id;
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.deepPropertyVal(res.body, 'user._id', testOrder.user);
                    assert.deepPropertyVal(res.body, 'dish._id', testOrder.dish);
                    assert.property(res.body, '_id');
                    assert.isUndefined(res.body.error);
                    done();
                });
        });

        after(function (done) {
            deleteOrder(newOrderId)
                .then(function () {
                    done();
                });
        });
    });

    describe("when order exist", function () {
        var newOrderId;

        beforeEach(function (done) {
            let order = new Order(testOrder);
            order.save()
                .then(function (order) {
                    newOrderId = order._id;
                    done();
                });
        });

        it("should update status and return object", function (done) {
            chai.request(app)
                .put("/api/order/" + newOrderId)
                .send({
                    status: "Готовится"
                })
                .end(function (error, res) {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.propertyVal(res.body, 'status', 'Готовится');
                    assert.isUndefined(res.body.error);
                    done();
                });
        });

        it("should delete order by id", function (done) {
            chai.request(app)
                .delete("/api/order/" + newOrderId)
                .end(function (error, res) {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.propertyVal(res.body, 'ok', 1);
                    assert.isUndefined(res.body.error);
                    done();
                });
        });

        afterEach(function (done) {
            deleteOrder(newOrderId)
                .then(function () {
                    done();
                });
        });
    });

    after(function (done) {
        deleteUser(testUser._id)
            .then(function () {
                done();
            });
    });

});
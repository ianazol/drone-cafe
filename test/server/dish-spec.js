let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../app');
let assert = chai.assert;

chai.use(chaiHttp);

describe("Dish: ", function () {
    it("should get all dishes", function (done) {
        chai.request(app)
            .get("/api/dish")
            .end(function (error, res) {
                assert.equal(res.status, 200);
                assert.isObject(res.body);
                assert.property(res.body, 'total');
                assert.property(res.body, 'list');
                assert.isUndefined(res.body.error);
                done();
            });
    });
});
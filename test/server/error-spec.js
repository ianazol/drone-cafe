let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../app');
let assert = chai.assert;

chai.use(chaiHttp);

describe("Error: ", function () {
    it('should return code 404 if accessing random url', function (done) {
        chai.request(app)
            .get("/random")
            .end(function (error, res) {
                assert.equal(res.status, 404);
                done();
            });
    });
});
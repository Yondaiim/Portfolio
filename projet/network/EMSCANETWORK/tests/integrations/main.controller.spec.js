import { app } from "../../index.js"
import { expect } from "chai"
import request from "supertest"



describe('GET /', () => {
    it('should render the "home page" ', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.include("Bonjour");
                done();
            });
    });

});

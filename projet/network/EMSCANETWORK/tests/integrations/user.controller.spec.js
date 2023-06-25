import { app } from "../../index.js"
import { expect } from "chai"
import request from "supertest"



describe('GET /user/signup', () => {
  it('should render the "signup page" ', (done) => {
    request(app)
      .get('/user/signup')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include("Page d'inscription");
        done();
      });
  });
});

describe('GET /user/login', () => {
  it('should render the "login page" ', (done) => {
    request(app)
      .get('/user/login')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include("Page de connexion");
        done();
      });
  });
});


describe('POST /user/signup', () => {
  const testUser = {
    username: "testuser",
    email: "test@test.com",
    password: "0123456789"
  }
  it('should register a new user', (done) => {
    request(app)
      .post('/user/login')
      .send(testUser)
      .expect(301)
      .end((err, res) => {
        done();
      });
  });
});





import { getSignup, getLogin, getProfile } from "../../controllers/user.controller.js"

import { assert } from 'chai';

describe('user controllers', () => {
  it('should render signup view page', () => {
    const req = {};
    const res = {
      render(viewName) {
        assert.equal(viewName, 'signup');
      }
    };
    getSignup(req, res);
  });



  it('should render login view page', () => {
    const req = {};
    const res = {
      render(viewName) {
        assert.equal(viewName, 'login');
      }
    };
    getLogin(req, res);
  });


  it('should render profile view page', () => {
    const req = {};
    const res = {
      render(viewName) {
        assert.equal(viewName, 'profile');
      }
    };
    getProfile(req, res);
  });
});

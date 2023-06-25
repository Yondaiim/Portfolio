import { getHome } from "../../controllers/main.controller.js"



import { assert } from 'chai';

describe('main controller', () => {
    it('should render main view page', () => {
        const req = {};
        const res = {
            render(viewName) {
                assert.equal(viewName, 'home');
            }
        };
        getHome(req, res);
    });

})
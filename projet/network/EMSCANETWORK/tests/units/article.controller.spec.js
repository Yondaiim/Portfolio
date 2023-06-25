import { getAddPost, getOneArticle } from "../../controllers/articleController.js"


import { assert } from 'chai';

describe('article controllers', () => {
    it('should render addPost view page', () => {
        const req = {};
        const res = {
            render(viewName) {
                assert.equal(viewName, 'addPost');
            }
        };
        getAddPost(req, res);
    });


    it('should render articleDetail view page', () => {
        const req = {
            params: { id: "testid" }
        };
        const res = {
            render(viewName) {
                assert.equal(viewName, 'articleDetail');
            }
        };
        getOneArticle(req, res);
    });

})
import { Router } from "express";
import multer from "../middlewares/multer.js"
import {getAddPost,postAddPost,getOneArticle, postDeleteArticle, postArticleUpdate, getArticleUpdate, getArticlesByTag} from "../controllers/articleController.js";
import { isAuth } from "../middlewares/isAuth.js";

const articleRouter = Router();
articleRouter.get("/article/add", isAuth, getAddPost);
articleRouter.post("/article/add",isAuth,  multer,  postAddPost);
articleRouter.get("/article/:id", getOneArticle);
articleRouter.get("/articles/:tag", getArticlesByTag)

articleRouter.post("/article/delete/:id", isAuth, postDeleteArticle )
articleRouter.post("/article/update/:id", isAuth, multer, postArticleUpdate)
articleRouter.get("/article/update/:id", isAuth, getArticleUpdate)
export { articleRouter };

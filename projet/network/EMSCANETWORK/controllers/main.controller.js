import express from "express"
import { ArticleModel } from "../model/article.model.js"
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const getHome = async (req, res) => {
    try {
        const articles = (await ArticleModel.find()).reverse()
        res.render("home", { articles: articles })
    } catch (error) {
        console.log(error)
    }
}



export { getHome }
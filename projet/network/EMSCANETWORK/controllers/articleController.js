import { unlink } from "fs/promises"
import os from "os"
import express from "express"
import { ArticleModel } from "../model/article.model.js"
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const getAddPost = (req, res) => {
    res.render("addPost")
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const postAddPost = async (req, res) => {
    try {
        const body = req.body
        const file = req.file
        console.log(file, "log controller")
        // TODO: Validation des données avec Joi
        await new ArticleModel({
            title: body.title,
            content: body.content,
            categories: body.categories.split(',').map(v => v.trim()),
            imageUrl: `${req.protocol}://${req.get("host")}/public/images/${file.filename}`,
            author: req.session.user
        }).save()
        res.redirect("/")
    } catch (error) {

    }

}

/**
 *  Recuper un article selon son identifiant
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const getOneArticle = async (req, res) => {
    try {
        const id = req.params.id
        const article = await ArticleModel.findById(id).populate("author")
        res.render("articleDetail", { article: article })

    } catch (error) {

    }
}

/**
 *  Recuper un article selon son identifiant
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const postDeleteArticle = async (req, res) => {
    try {
        // **
        const id = req.params.id
        const post = await ArticleModel.findById(id)
        if (!post) return res.send("Article introuvable")
        if (req.session.user._id.toString() !== post.author.toString()) {
            return res.send("Action non autorisé")
        }
        const imageName = post.imageUrl.split("/images/")[1]
        await unlink(`public/images/${imageName}`)
        await ArticleModel.deleteOne({ _id: id })
        res.redirect("/")
    } catch (error) {

    }
}

/**
 *  Recuper un article selon son identifiant
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const postArticleUpdate = async (req, res) => {
    try {

        const id = req.params.id
        const file = req.file
        const post = await ArticleModel.findById(id)
        if (!post) return res.send("Article introuvable")
        if (req.session.user._id.toString() !== post.author.toString()) {
            return res.send("Action non autorisé")
        }

        const imageName = post.imageUrl.split("/images/")[1]
        await unlink(`public/images/${imageName}`)
        
        await ArticleModel.findByIdAndUpdate(id, {
            $set: {
                title: req.body.title,
                author: req.session.user._id,
                categories: req.body.categories.split(','),
                imageUrl: `${req.protocol}://${req.get("host")}/public/images/${file.filename}`,
                content: req.body.content
            }
        })
        res.redirect(`/article/${post._id}`)

    } catch (error) {
        res.redirect("/")
    }



}
/**
 *  Recuper un article selon son identifiant
 * @param {express.Request} req 
 * @param {express.Response} res 
 */


const getArticleUpdate = async (req, res) => {
    try {
        const id = req.params.id
        const post = await ArticleModel.findById(id)
        if (!post) return res.send("Article introuvable")
        res.render("updateArticle", { post })
    } catch (error) {
        res.redirect("/")
    }
}


const getArticlesByTag = async (req, res) => {
    try {
        const tag = req.params.tag
        console.log(tag)
        const posts = await ArticleModel.find({ categories: { $in: [tag] } })
        console.log(posts)
        res.render("home", { articles: posts })
    } catch (error) {

    }
}
export { getAddPost, postAddPost, getOneArticle, postDeleteArticle, postArticleUpdate, getArticleUpdate, getArticlesByTag }

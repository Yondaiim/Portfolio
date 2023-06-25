import  express  from "express"
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */


export const notFound = (req, res, next) => {
    res.redirect("/")
    next()
}
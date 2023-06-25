import  express  from "express"
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */

export const isNotAuth = (req, res, next) => {
    if(req.session.connected && req.session.user) {
        res.redirect("/")
    }
    else {
        next()
    }
}
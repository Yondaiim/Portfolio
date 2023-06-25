import  express  from "express"
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */

export const isAuth = (req, res, next) => {
    if(!req.session.connected && !req.session.user) {
        res.redirect("/user/login")
    }
    else {
        next()
    }
}
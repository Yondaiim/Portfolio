import  express  from "express"
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
export const localViewData = (req, res, next) => {
    res.locals.connected = req.session.connected
    res.locals.user = req.session.user
    next()
}
import express from "express";
import { UserModel } from "../model/user.model.js";
import { ArticleModel } from "../model/article.model.js"
import { signupValidation } from "../validation/signupValidation.js";
import { logger } from "../middlewares/winston.js"
import bcrypt from "bcrypt";
import { loginValidation } from "../validation/loginValidation.js";
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getSignup = (req, res) => {
  res.render("signup");
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const postSignup = async (req, res) => {
  try {
  //  logger.info({ "method": req.method, "Ip": req.ip, url: req.url })
    // ** Validation coté Backend (validation des données issues du navigateur)
    const { error, value } = signupValidation(req.body);
    if (error) return res.render("signup", { error: error.details[0].message });
    // ** Verifier que l'utilisateur n'est pas encore inscrit
    const user = await UserModel.findOne({ email: value.email });
    if (user) return res.render("signup", { userError: "utilisateur existe" });
    // ** Hasher le mot de passe
    const hash = await bcrypt.hash(value.password, 10);
    // ** Creer un nouvel utilisateur avec les données fournies
    await new UserModel({ ...value, password: hash }).save();
    res.redirect("/user/login");
  } catch (error) {
    logger.error(error)
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */

const getLogin = (req, res) => {
  res.render("login");
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const postLogin = async (req, res) => {
  try {
    // *** Validation avec Joi
    const { error, value } = loginValidation(req.body);
    if (error) return res.render("login", { error: error.details[0].message });
    // *** Verifier si on a un utilisateur (avec son email)
    const user = await UserModel.findOne({ email: value.email });
    // *** Si on n'a pas d'utilisateur renvoyer une erreur
    if (!user)
      return res
        .status(404)
        .render("login", { error: "Utilisateur introuvable" });
    // *** Verifier le mot de passe
    const match = await bcrypt.compare(value.password, user.password);
    // *** Si le mot passe ne correspend pas renvoyer une erreur
    if (!match)
      return res
        .status(401)
        .render("login", { error: "Mot de passe incorrecte" });
    // *** Creer une session et attacher les information de l'utilisateur et donner un status connecter
    req.session.connected = true;
    req.session.user = user;
    res.redirect("/");
  } catch (error) { }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const postLogout = (req, res) => {
  req.session.destroy((err => console.log(err)))
  res.render("home", { logout: "Vous etes deconecter" })
}



const getProfile = async (req, res) => {
  res.render("profile", { user: req.session.user })
}

const deleteProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.session.user._id)
    if (!user) res.redirect("/")
    await ArticleModel.deleteMany({ author: req.session.user._id })
    await UserModel.deleteOne({ _id: req.session.user._id })
    req.session.destroy((err => console.log(err)))
    res.redirect("/")
  } catch (error) {
    console.error(error)
  }
}


export { getSignup, postSignup, getLogin, postLogin, postLogout, getProfile, deleteProfile };

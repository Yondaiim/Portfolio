import { Router } from "express";
import {
  getSignup,
  postSignup,
  getLogin,
  postLogin,
  postLogout,
  getProfile,
  deleteProfile
} from "../controllers/user.controller.js";
import { isAuth } from "../middlewares/isAuth.js";
import { isNotAuth } from "../middlewares/isNotAuth.js";

const userRouter = Router();

// ** Route d'inscription (GET)
userRouter.get("/user/signup", isNotAuth, getSignup);

// ** Route de connexion (GET)
userRouter.get("/user/login", isNotAuth, getLogin);

// ** Route d'inscription (POST)
userRouter.post("/user/signup",isNotAuth, postSignup);

// ** Route de connexion (POST)
userRouter.post("/user/login",isNotAuth, postLogin);

// ** Route de deconnexion
userRouter.post("/user/logout", isAuth, postLogout)

// *** Route de profil
userRouter.get("/user/profile", isAuth, getProfile )

// *** Route suppression Compte

userRouter.post("/user/profile/delete", isAuth, deleteProfile)


export { userRouter };

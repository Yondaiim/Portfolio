import { Router } from "express";
import {getHome} from "../controllers/main.controller.js"

const router = Router()

router.get("/", getHome )

export {router}
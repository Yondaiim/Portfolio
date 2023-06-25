import express from "express";
import compression from "compression"
import helmet from "helmet"
import expressWinston from "express-winston"
import { mongoDBConnection } from "./database/connect.js";
import { userRouter } from "./routes/userRoutes.js";
import { router } from "./routes/main.routes.js"
import { articleRouter } from "./routes/articleRoutes.js"
import session from "express-session";
import { default as mongoDbSessionStore } from "connect-mongodb-session";
import { localViewData } from "./middlewares/localViewData.js";
import { notFound } from "./middlewares/notFound.js";
import { logger } from "./middlewares/winston.js";


// ** Application express
const app = express();

// ** Moteur de rendu
app.set("view engine", "ejs");

//**Dossier Public */
const MongoDbStore = mongoDbSessionStore(session);
const store = new MongoDbStore({
  uri: "mongodb://localhost:27017/emsca",
  collection: "session",
});
app.use(
  session({
    secret: "Secret",
    resave: false,
    saveUninitialized: true,
    store: store,
  })
);

app.use(expressWinston.logger({
  winstonInstance: logger,
  meta: true,
  expressFormat: true,
  colorize: true,
  
}))
app.use(compression())
app.use(helmet())
app.use(localViewData)
app.use(express.static("public"));
app.use("/public/images", express.static("public/images"));
app.use(express.urlencoded({ extended: true }));
app.use(router)
app.use(userRouter);
app.use(articleRouter)
app.use("*", notFound)

// ** Ecouter sur un port 8082
app.listen(8082, () => {
  mongoDBConnection();
  console.log("Application Express ecoute sur le port 8082");
});

export {app}
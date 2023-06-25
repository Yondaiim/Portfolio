import mongoose from "mongoose";

export async function mongoDBConnection() {
    try {
        let db = "mongodb://localhost:27017/emsca";
        if (process.env.NODE_ENV) {
            db = "mongodb://localhost:27017/emscatest"
        }

        await mongoose.connect(db)
        console.log("Connected on the DataBase")
    } catch (error) {
        console.error(error)
    }

}
import mongoose from "mongoose";
import muv from "mongoose-unique-validator";



mongoose.plugin(muv)
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
}, {timestamps : true})

const UserModel = mongoose.model("user",userSchema)

export {UserModel}

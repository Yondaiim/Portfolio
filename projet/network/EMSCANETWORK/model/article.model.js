import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    categories: {
        type: [String]
    },
    imageUrl: {
        type: String, required: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    }
}, { timestamps: true })

const ArticleModel = mongoose.model("article", articleSchema)

export { ArticleModel }

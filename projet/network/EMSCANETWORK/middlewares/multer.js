import path from "path"
import multer from "multer"
import { v4 } from "uuid"


const fileStore = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname)
        const filename = v4() + extension
        cb(null, filename)
    }
})



export default multer({ storage: fileStore }).single("image")

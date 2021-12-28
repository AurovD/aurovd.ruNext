import multer from "multer";
import {nanoid} from "nanoid";

export const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, files, cb) {
            cb(null, 'public/projects')
        },
        filename: function (req, file, cb){
            cb(null, file.fieldname + '-' + nanoid(6) + Date.now() + '.' + file.mimetype.split("/").pop());
        }
    })
});
import multer from "multer";
import {nanoid} from "nanoid";

export const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, files, cb) {
            console.log(files)
            cb(null, 'public/projects')
        },
        filename: function (req, file, cb){
            cb(null, file.fieldname + '-' + nanoid(6) + '.' + file.mimetype.split("/").pop());
        }
    })
});
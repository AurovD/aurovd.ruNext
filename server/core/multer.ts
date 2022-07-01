import multer from "multer";
import {nanoid} from "nanoid";

const storage = multer.diskStorage({
        destination: function (req, files, cb) {
            cb(null, 'public/projects_images')
        },
        filename: function (req, file, cb){
            cb(null, file.fieldname + '-' + nanoid(6) + Date.now() + '.' + file.mimetype.split("/").pop());
        }
    });

const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|svg|SVG)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

export const upload = multer({ storage, fileFilter: imageFilter });
import express from 'express';
import {upload} from "../core/multer";


interface MulterRequest extends Request {
    files?: any;
    title: string,
    description: string,
    link?: string,
    password: string,
    github?: string
}

class PostController {
    // npx sequelize-cli model:generate --name Projects --attributes title:string,password:string,description:string,link:string,github:string
    async create(req: express.Request, res: express.Response): Promise<any>{
        let files = upload.array("preview", 3);
        files(req, res, async (err) => {
            if(err){
                return res.send({msg: "Ошибка"})
            } else {
                return res.send({msg: "Success"})
            }
        })

    }
}

export default new PostController();
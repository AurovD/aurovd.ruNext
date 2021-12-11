import express from 'express';
import {upload} from "../core/multer";
// @ts-ignore
import { User, Projects } from "../../models";
import bcrypt from "bcryptjs";



interface BodyRequest extends Request {
    title: string,
    description: string,
    link?: string,
    password: string,
    github?: string,
    new_password?: string
}

declare module 'express' {
    interface Request {
        body:  BodyRequest
        files: []
    }
}

class PostController {
    // npx sequelize-cli model:generate --name Projects --attributes title:string,password:string,description:string,link:string,github:string,img:string
    async create(req: express.Request, res: express.Response) {
        let images = upload.array("preview", 3);
        images(req, res, async (err) => {
            if(err){
                return res.send({msg: "Ошибка"})
            } else {
                try {
                    let password = await User.findOne({
                        where: {
                            status: true
                        },
                        attributes: ['password']
                    });

                    const isPassEquals = await bcrypt.compare(req.body.password, password.password);
                    if (!isPassEquals) {
                        return res.send({msg: 'Неверный доступ'});
                    }

                    if(req.body.new_password) {
                        const hashed_pass = await bcrypt.hash(req.body.new_password, 12);
                        await User.update({password: hashed_pass}, {where: {password: req.body.password}})
                    }
                    let images_arr = [];

                    req.files.map((img: { filename: string }) => {
                        images_arr.push(img.filename)
                    });

                    await Projects.create({
                        title: req.body.title,
                        description: req.body.description,
                        github: req.body.github,
                        link: req.body.link,
                        images: images_arr
                    })

                    return res.status(200).send({msg: "Success"});
                } catch (e) {
                    console.log(e);
                    return res.send({msg: "Ошибка создания"});
                }
            }
        })

    }
}

export default new PostController();
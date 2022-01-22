import express from 'express';
import {upload} from "../core/multer";

// @ts-ignore
import { User, Projects, Tags, Projects_Tags } from "../../models";
import bcrypt from "bcryptjs";
import {IProject as BodyRequest} from "../../types/types";
import TagsService from '../core/tags_service';
import {Sequelize} from "sequelize";




// interface BodyRequest extends Request {
//     title: string,
//     description: string,
//     link?: string,
//     password: string,
//     github?: string,
//     tags?: string,
//     new_password?: string
// }

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

                    console.log(req.body);

                    let tags:string[] = req.body?.tags.match(/\B#[a-z0-9_]+/g);

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
                        .then(async (project) => {
                            await TagsService.add(tags, project.id);
                        })

                    return res.status(200).send({msg: "Success"});
                } catch (e) {
                    console.log(e)
                    return res.send({msg: "Ошибка создания"});
                }
            }
        })
    }
    async getAll(req: express.Request, res: express.Response) {
        try {
            let offset = +req.query.offset;
            let projects = await Projects.findAll({
                offset: offset,
                limit: 10
            })
            let count = await Projects.count().then(c => c);
            if(count && projects) {
                return res.set({"X-Total-Count": count}).send(projects);
            } else {
                return res.status(501).send({msg: "Серверная ошибка"});
            }
        } catch (e) {
            return res.send({msg: "Серверная ошибка"});
        }
    }
}

export default new PostController();
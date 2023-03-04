import express from 'express';
import {upload} from "../core/multer";

// @ts-ignore
import { User, Projects, Tags, Projects_Tags } from "../../models";
import {IProject as BodyRequest} from "../../types/types";
import TagsService from '../core/tags_service';
import {Sequelize} from "sequelize";




declare module 'express' {
    interface Request {
        user?: {user: any};
        body:  BodyRequest;
        files: [];
    }
}

class PostController {
    // npx sequelize-cli model:generate --name Projects --attributes title:string,password:string,description:string,link:string,github:string,img:string
    async create(req: express.Request, res: express.Response) {
        if (!req.user) {
            return res.status(401).send({msg: 'Неверный доступ'});
        }
        let images = upload.array("preview", 7);
        images(req, res, async (err) => {
            if(err){
                return res.send({msg: "Ошибка файла"})
            } else {
                try {
                    let images_arr = Array.from(req.files, (img: { filename: string }) => img.filename)

                    let tags:string[] = req.body?.tags.match(/\B#[a-z0-9_]+/g);

                    await Projects.create({
                        title: req.body.title,
                        description: req.body.description,
                        task: req.body.task,
                        github: req.body.github,
                        link: req.body.link,
                        images: images_arr
                    })
                        .then(async (project) => {
                            await TagsService.add(tags, project.id);
                        })

                    return res.status(200).json({msg: "Добавлено"});
                } catch (e) {
                    return res.status(501).send({msg: "Ошибка создания"});
                }
            }
        })
    }
    async getAll(req: express.Request, res: express.Response) {
        try {
            let offset = +req.query.offset;
            let projects = await Projects.findAll({
                offset: offset,
                limit: 6,
                include: [{
                    model: Tags,
                    as: "Tags",
                    through: Projects_Tags,
                    attributes: ["id", "title"]
                }],
                order: ["id"]
            })
            let count = await Projects.count().then(c => c);
            if(count && projects) {
                return res.status(200).send({
                    count,
                    projects
                });
            } else {
                return res.status(501).send({msg: "Серверная ошибка"});
            }
        } catch (e) {
            return res.status(501).send({msg: "Серверная ошибка"});
        }
    }

    async show (req: express.Request, res: express.Response) {
        try {
            let projectId = +req.query.id;
            if(isNaN(Number(projectId))){
                return res.status(404).json({msg: 'ID проекта не найдено'});
            }
            const project = await Projects.findByPk(projectId, {
                include: [{
                    model: Tags,
                    as: "Tags",
                    through: Projects_Tags,
                    attributes: ["id", "title"]
                }]
            });

            if(!project){
                return res.status(404).json({msg: 'Проект не найден'});
            }
            res.status(200).json(project)

        } catch (e) {
            return res.status(501).send({msg: "Серверная ошибка"});
        }
    }
    async tags (req: express.Request, res: express.Response) {
        try {
            let tags = await Projects_Tags.findAll({
                attributes: [[Sequelize.fn("COUNT", Sequelize.col("TagId")), "count_of_tags"]],
                include: [{
                    model: Tags, attributes: ["title"]
                }],
                group: ['Tag.id"'],
                order: [[Sequelize.fn('COUNT', Sequelize.col('TagId')), 'DESC']]
            })
            if(!tags){
                return res.status(404).json({msg: 'Не найдено'});
            }

            // let count = await Projects.findAll({
            //     attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'count']],
            // });

            tags = [...tags];
            // tags = [...tags, count[0]]

            res.status(200).json(tags);
        } catch (e) {
            return res.status(501).send({msg: "Серверная ошибка"});
        }
    }
}

export default new PostController();
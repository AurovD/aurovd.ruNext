import express from 'express';
import {upload} from "../core/multer";

// @ts-ignore
import { User, Projects, Tags, Projects_Tags } from "../../models";
import {IProject as BodyRequest} from "../../types/types";
import {Sequelize} from "sequelize";
import TagsService from "../core/tags_service";
import Post_service from "../core/post_service";




declare module 'express' {
    interface Request {
        user?: {user: any};
        body:  BodyRequest & {
            image: string;
            id: number;
            old_tags?: string[];
            images?: string[];
        };
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
                let images_arr = Array.from(req.files, (img: { filename: string }) => img.filename)
                try {

                    let tags:string[] = req.body?.tags.match(/\B#[a-z0-9_]+/g);

                    let project = await Projects.create({
                        title: req.body.title,
                        description: req.body.description,
                        task: req.body.task,
                        github: req.body.github,
                        link: req.body.link,
                        images: images_arr
                    })

                    if(!project){
                        await Post_service.deleteImages(images_arr);
                        return res.status(501).send({msg: "Ошибка создания"});
                    }

                    if(tags && tags.length > 0){
                        await TagsService.add(tags, project.id);
                    }
                    return res.status(200).json({id: project.id});
                } catch (e) {
                    await Post_service.deleteImages(images_arr);
                    return res.status(501).send({msg: "Ошибка создания"});
                }
            }
        })
    }
    async addImage(req: express.Request, res: express.Response) {
        if (!req.user) {
            return res.status(401).send({msg: 'Неверный доступ'});
        }
        let images = upload.array("preview", 7);
        images(req, res, async (err) => {
            let images_arr = Array.from(req.files, (img: { filename: string }) => img.filename);
            if(err){
                await Post_service.deleteImages(images_arr);
                return res.status(400).send({msg: "Ошибка файла"})
            } else {
                try {
                    const id = req.params.id;

                    const project = await Projects.findByPk(id);
                    if (!project) {
                        await Post_service.deleteImages(images_arr);
                        return res.status(404).json({ message: 'Проект не найден' });
                    }

                    project.images = [...project.images, ...images_arr]
                    await project.save();

                    return res.status(200).json({msg: "Добавлено", new_images: images_arr});
                } catch (e) {
                    await Post_service.deleteImages(images_arr);
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

            let count = await Projects.findAll({
                attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'count']],
            });

            let lastImg = await Projects.findOne({
                order: [['createdAt', 'DESC']],
            })

            res.status(200).json({tags: tags, count: count[0], lastImg: lastImg.images[0], lastId: lastImg.id});
        } catch (e) {
            return res.status(501).send({msg: "Серверная ошибка"});
        }
    }
    async deleteImage (req: express.Request, res: express.Response) {
        try {
            if (!req.user) {
                return res.status(401).send({msg: 'Неверный доступ'});
            }
            const { id, image } = req.body;

            const project = await Projects.findByPk(id);
            if (!project) {
                return res.status(404).json({ message: 'Проект не найден' });
            } else {
                await Post_service.deleteImages([image]);

                project.images = project.images.filter(imageName => imageName !== image);
                await project.save();

                return res.status(200).json({ message: 'Файл удален' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка при удалении' });
        }
    }

    async change(req: express.Request, res: express.Response) {
        try {
            const id = req.params.id;
            const project = await Projects.findByPk(id);

            if (!project) {
                return res.status(404).json({ message: 'Проект не найден' });
            }

            project.title = req.body.title;
            project.task = req.body.task;
            project.description = req.body.description;
            project.link = req.body.link;
            project.github = req.body.github;

            await project.save();

            return res.status(200).json(project);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка при редактировании' });
        }
    }

    async delete(req: express.Request, res: express.Response) {
        try {
            const projectId = req.params.id;

            let tags = req.body.tags.split(" ");

            await TagsService.removeTagsFromProject(tags, projectId);

            await Post_service.deleteImages(req.body.images);

            await Projects.destroy({
                where: { id: projectId }
            });

            return res.status(200).json({status: true });
        } catch (error) {
            return res.status(500).json({ msg: 'Ошибка при удалении' });
        }
    }

    async changeTags(req: express.Request, res: express.Response) {
        try {
            const projectId = req.params.id;
            const newTagsString = req.body.tags;
            const currentTags = req.body.old_tags;


            const newTags = newTagsString.trim().split(/\s+/);

            const tagsToAdd = newTags.filter(tag => !currentTags.includes(tag));

            if(tagsToAdd.length){
                await TagsService.add(tagsToAdd, projectId);
            }

            const tagsToRemove = currentTags.filter(tag => !newTags.includes(tag));

            if(tagsToRemove.length){
                await TagsService.removeTagsFromProject(tagsToRemove, projectId);
            }

            if(!tagsToRemove.length && !tagsToAdd.length){
                return res.status(200).json({ message: 'Нет изменений' });
            }

            return res.status(200).json({ message: 'Тэги изменены' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка при редактировании' });
        }
    }
}

export default new PostController();
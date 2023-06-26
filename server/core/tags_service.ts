// @ts-ignore
import { Tags, Projects_Tags } from "../../models";
import {sequelize} from "./db";

export class TagsService {
    async add(tags, id) {
        tags.map(async (title: string ) => {
            await Tags.create({
                title
            })
                .then(async (tag) => {
                    await this.projectTagsAdd(id, tag.id)
                })
                .catch(async (err) => {
                    await this.findByTitle(title)
                        .then(async tag => await this.projectTagsAdd(id, tag.id))
                })
        })
    };

    async findByTitle(title: string) {
        return await Tags.findOne({
            where: {
                title
            },
            attributes: ['id']
        })
    }

    async projectTagsAdd(ProjectId, TagId) {
        let tags = await Projects_Tags.findOne({
            where: {
                ProjectId,
                TagId
            }
        });
        if(!tags){
            await Projects_Tags.create({
                ProjectId,
                TagId
            })
        }
    }
    async removeTagsFromProject(tagsToRemove, projectId) {
            const tagIds = await Tags.findAll({ where: { title: tagsToRemove }, attributes: ['id'] })
                .then(tags => tags.map(tag => tag.id));


            await Projects_Tags.destroy({ where: { TagId: tagIds, ProjectId: projectId } });

            // await Tags.destroy({
            //     where: { id: tagIds },
            //     include: [
            //         {
            //             model: Projects_Tags,
            //             attributes: [],
            //             through: { attributes: [] }
            //         }
            //     ],
            //     having: sequelize.literal('COUNT(`Projects_Tags`.`TagId`) = 0')
            // });

        const noAssociatedRecords = await Projects_Tags.findOne({
            where: { TagId: tagIds }
        });

        if (!noAssociatedRecords) {
            await Tags.destroy({
                where: { id: tagIds }
            });
        }
    }
}
export default new TagsService();
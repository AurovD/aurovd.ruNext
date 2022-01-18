// @ts-ignore
import { Tags, Projects_Tags } from "../../models";

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
        await Projects_Tags.create({
            ProjectId,
            TagId
        })
    }
}
export default new TagsService();
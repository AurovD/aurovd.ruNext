import * as fs from "fs";
import path from "path";

class PostService {
    async deleteImages(images: string[]) {
        return Promise.all(
            images.map(
                img =>
                    new Promise((res, rej) => {
                        try {
                            let path_file = path.join('public', 'projects_images', img);
                            fs.unlink(path_file, err => {
                                if (err) throw err;
                                console.log(`${img} was deleted`);
                            });
                        } catch (err) {
                            console.error(err);
                            rej(err);
                        }
                    })
            )
        );
    }
}

export default new PostService();
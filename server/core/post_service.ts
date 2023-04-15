import * as fs from "fs";

class PostService {
    async deleteImages(images: string[]) {
        const promises = images.map((name) => {
            return new Promise<void>((resolve, reject) => {
                fs.unlink(`./public/projects/${name}`, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        });

        try {
            await Promise.all(promises);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
}

export default new PostService();
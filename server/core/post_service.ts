import * as fs from "fs";
import path from "path";

class PostService {
    async deleteImages(images: string[]) {
        const promises = images.map((name) => {
            return new Promise<void>((resolve, reject) => {
                fs.unlink(`./public/projects_images/${name}`, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(); //Expected 1 arguments, but got 0. Did you forget to include 'void' in your type argument to 'Promise'?
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
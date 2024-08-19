import * as fs from "fs";
import sharp from "sharp";

class PostService {

    #sizes = [
        { width: 0},
        { width: 1000 },
        { width: 600 },
    ];

    async deleteImages(images: string[]) {
        const promises = images.map((name) => {
            this.#sizes.map(size => {
                return new Promise<void>((resolve, reject) => {
                    fs.unlink(`./public/projects/preview-${name}${size.width ? "-"+ size.width : ''}.jpg`, (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
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
    };

    async resizeAndSaveImages(buffer, filename: string, name: string) {

        const tasks = this.#sizes.map((size, index) => {
            if (size.width === 0) {
                return sharp(buffer).toFile(`public/projects/${filename}` + '-' + name + '.jpg');
            } else {
                return sharp(buffer)
                    .resize(size.width)
                    .toFile(`public/projects/${filename}` + '-' + name + `-${size.width}` + '.jpg');
            }
        });
        await Promise.all(tasks);
    };
}

export default new PostService();
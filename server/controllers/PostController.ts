import express from 'express';

class PostController {
    // npx sequelize-cli model:generate --name User --attributes login:string,password:string,email:string
    create(req: express.Request, res: express.Response) {
        console.log(req.body)
    }
}

export default new PostController();
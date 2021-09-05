import express from 'express';

class UserController {
    // npx sequelize-cli model:generate --name User --attributes login:string,password:string,email:string
    registration(req: express.Request, res: express.Response) {
        console.log(req.body)
    }
}

export default new UserController();
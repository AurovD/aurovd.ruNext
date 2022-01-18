import express from 'express';
// @ts-ignore
import { User} from "../../models";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";


dotenv.config({
    path: 'server/.env'
})

class UserController {
    // npx sequelize-cli model:generate --name User --attributes login:string,password:string,email:string
    async registration(req: express.Request, res: express.Response) {
        try {
            let newPass = await bcrypt.hash(process.env.USER_PASSWORD, 12);
            let user = await  User.create({
                login: "Buckle",
                password: newPass,
                email:"dmi@mail.ru",
                status: true
            })

            return user ? res.send({msg: "Good"}) : res.send({msg: "Bad"})
        }
         catch (e) {
             console.log(e)
         }
    }
}

export default new UserController();
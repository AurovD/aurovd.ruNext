import express from 'express';
// @ts-ignore
import { User } from "../../models";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import UserService from '../core/user_service';


dotenv.config({
    path: 'server/.env'
})

class UserController {
    // npx sequelize-cli model:generate --name User --attributes login:string,password:string,email:string
    async registration(req: express.Request, res: express.Response) {
        try {
            let newPass = await bcrypt.hash(process.env.USER_PASSWORD, 12);
            await  User.create({
                login: "Buckle",
                password: newPass,
                email:"dmi@mail.ru",
                status: true
            });

            return res.status(200).json({msg: "Успешная регистрация"});
        }
        catch (e) {
            return res.status(501).send({msg: "Ошибка регистрации"});
        }
    }
    async change(req: express.Request, res: express.Response) {
        try {
            let password = await UserService.compare(req.body.password);
            if (!password) {
                return res.status(400).send({msg: 'Неверный доступ'});
            }
            if(req.body.new_password) {
                const hashed_pass = await bcrypt.hash(req.body.new_password, 12);
                await User.update({password: hashed_pass}, {where: {password: password.password}})
            }
            return res.status(200).json({msg: "Успешная смена пароля"});
        }
         catch (e) {
             return res.status(501).send({msg: "Ошибка при смене пароля"});
         }
    }
}

export default new UserController();
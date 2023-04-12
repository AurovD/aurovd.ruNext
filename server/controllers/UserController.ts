import express from 'express';
// @ts-ignore
import { User } from "../../models";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import UserService from '../core/user_service';
import TokenService from "../core/passport_service";
import {User as BodyRequest} from "../../types/types";


dotenv.config({
    path: 'server/.env'
})

declare module 'express' {
    interface RequestUser {
        user?: {user: any};
        body:  BodyRequest
    }
}

class UserController {
    // npx sequelize-cli model:generate --name User --attributes login:string,password:string,email:string
    async registration(req: express.RequestUser, res: express.Response) {
        try {
            let newPass = await bcrypt.hash(process.env.USER_PASSWORD, 12);
            await  User.create({
                login: "Buckle",
                password: newPass,
                email:"dmitry8891@mail.ru"
            });

            return res.status(200).json({msg: "Успешная регистрация"});
        }
        catch (e) {
            return res.status(501).send({msg: "Ошибка регистрации"});
        }
    }
    async login (req: express.RequestUser, res: express.Response) {
        try {
            let user = await UserService.findUser(req.body.login);
            if (!user) {
                return res.status(400).send({msg: 'Неверный доступ'});
            }
            let isPassEquals = await UserService.compare(user.password, req.body.password);
            if (!isPassEquals) {
                return res.status(400).send({msg: 'Неверный доступ'});
            }
            let token = await TokenService.generateToken(user);
            // res.cookie('token', token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(200).json({token});
        } catch (e) {
            return res.status(501).send({msg: "Серверная ошибка"});
        }
    }
    async change(req: express.RequestUser, res: express.Response) {
        try {
            let {password} = await UserService.findUser(req.user.user.login);
            let isPassEquals = await UserService.compare(password, req.body.password);
            if (!isPassEquals || !req.user) {
                return res.status(400).send({msg: 'Неверный доступ'});
            }
            const hashed_pass = await bcrypt.hash(req.body.new_password, 12);
            await User.update({password: hashed_pass}, {where: {login: req.user.user.login}});
            return res.status(200).json({msg: "Успешная смена пароля"});
        }
         catch (e) {
             return res.status(501).send({msg: "Ошибка при смене пароля"});
         }
    }
    async me(req: any, res: express.Response) {
        try {
            return res.status(200).json(req.user);
        }
         catch (e) {
             return res.status(501);
         }
    }
    async test(req: any, res: express.Response) {
        try {
            return res.status(200).json({msg: "Hello world"});
        }
         catch (e) {
             return res.status(501);
         }
    }
}

export default new UserController();
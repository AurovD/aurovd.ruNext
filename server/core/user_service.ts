import dotenv from "dotenv";

const bcrypt = require('bcryptjs');
// @ts-ignore
import { User } from "../../models";

dotenv.config({
    path: 'server/.env'
})

class UserService {
    async findUser(login) {
        return await User.findOne({
            where: {
                login
            },
            raw: true,
            attributes: ['id', 'password', 'email', 'login', 'status']
        });
    }
    async compare(user_password, password) {
        const isPassEquals = await bcrypt.compare(password, user_password);
        return isPassEquals ? isPassEquals : null;
    }
}

export default new UserService();
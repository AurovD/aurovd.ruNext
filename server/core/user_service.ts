const bcrypt = require('bcryptjs');
// @ts-ignore
import { User } from "../../models";

class UserService {
    async bcrypt(pwd) {
        return await bcrypt.hash(pwd, 12);
    }
    async compare(password) {
        let pass = await User.findOne({
            where: {
                status: true
            },
            attributes: ['password']
        });
        const isPassEquals = await bcrypt.compare(password, pass.password);
        return isPassEquals ? pass : null;
    }
}

export default new UserService();
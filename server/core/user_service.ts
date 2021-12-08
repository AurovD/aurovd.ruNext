const bcrypt = require('bcryptjs');

class UserService {
    async bcrypt(pwd) {
        return await bcrypt.hash(pwd, 12);
    }
}

export default new UserService();
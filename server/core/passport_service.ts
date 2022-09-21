const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({
    path: 'routes/.env'
});

class TokenService {
    async generateToken(user) {
        const payload = {
            user,
            date: Date.now()
        }
        return jwt.sign(payload,
            process.env.JWT_ACCESS_SECRET || '',
            {
                expiresIn: process.env.JWT_MIN_AGE,
                algorithm: 'HS256',
            }
        );
    }
}

export default new TokenService();
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import jwt from 'jsonwebtoken';
import dotenv  from 'dotenv';
dotenv.config({
    path: 'server/.env'
});

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_ACCESS_SECRET
};

passport.use('jwt', new JwtStrategy(opts, function(jwt_payload, done) {
    done(null, jwt_payload);
}));

export { passport };
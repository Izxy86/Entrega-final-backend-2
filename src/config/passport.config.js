import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import { UserModel } from '../models/user.model.js';

dotenv.config();

const cookieExtractor = (req) => {
  const token = req.cookies?.token;
  return token || null;
};

const jwtOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET
};

passport.use(
  'jwt',
  new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    try {
      const user = await UserModel.findById(jwt_payload.id).populate('cart');
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);

export const initializePassport = () => {
  return passport.initialize();
};

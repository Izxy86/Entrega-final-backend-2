import passport from 'passport';

export const authenticate = (strategy) => {
  return passport.authenticate(strategy, { session: false });
};

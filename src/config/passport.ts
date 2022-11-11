const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose')
const User = mongoose.model('User')
const keys = require('./keys')

type optionsObject = {
  jwtFromRequest?: any
  secretOrKey?: string
}

const options:optionsObject = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey

module.exports = (passport: any) => {
  passport.use(new JwtStrategy(options, (jwt_payload: any, done: any) => {
    User.findById(jwt_payload.id)
      .then((user: any) => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch((err: any) => console.log(err))
  }))
}






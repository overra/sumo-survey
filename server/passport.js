'use strict';

import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {User} from './models';

passport.use(new LocalStrategy(
  function (username, password, done) {

    User.findOne({where: {username}}).then(function (user) {
      if (!user) {
        return done(null, false, {message: 'Incorrect username.'});
      }

      if (user.role === 'guest') {
        return done(null, false, {message: 'You must be an admin to login.'});
      }

      user.verifyPassword(password, function (err, match) {
        if (err) {
          return done(err);
        }
        if (!match) {
          return done(null, false, {message: 'Incorrect password.'});
        }

        done(null, user);
      });
    }).catch(done);
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id).then(function (user) {
    delete user.password;
    done(null, user);
  }).catch(done);
});

export default passport

const {
  clientID,
  clientSecret,
  domain,
  bnetPath,
  failureRedirect,
  successRedirect,
} = require('./config')

const passport = require('passport')
const express = require('express')
const BnetStrategy = require('passport-bnet').Strategy

const callbackPath = `${bnetPath}/callback`
const callbackURL = `https://${domain}${callbackPath}`

const app = express()

passport.use(new BnetStrategy({ clientID, clientSecret, callbackURL },
  (accessToken, refreshToken, profile, done) => done(null, profile)))

app.get(bnetPath, passport.authenticate('bnet'))
app.get(callbackPath, passport.authenticate('bnet', { failureRedirect }),
  (req, res) => res.redirect(successRedirect))

app.listen(3548)


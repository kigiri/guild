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

const callbackPath = `${bnetPath}callback`
const callbackURL = `https://${domain}${callbackPath}`

const app = express()

passport.use(new BnetStrategy({ clientID, clientSecret, callbackURL },
  (accessToken, refreshToken, profile, done) => done(null, profile)))

app.get(bnetPath, passport.authenticate('bnet'))
app.get(callbackPath, passport.authenticate('bnet', { failureRedirect }),
  (req, res) => res.redirect(successRedirect))

app.get('/', function(req, res) {
  if (req.isAuthenticated()) {
    var output = '<h1>Express OAuth Test</h1>'+ req.user.id +'<br>'
    if (req.user.battletag) {
      output += req.user.battletag +'<br>'
    }
    output += '<a href="/logout">Logout</a>'
    res.send(output)
  } else {
    res.send('<h1>Express OAuth Test</h1>'
      +'<a href="/auth/github">Login with Github</a><br>'
      +'<a href="/auth/bnet">Login with Bnet</a>')
  }
})

app.get('/logout', function(req, res) {
  req.logout()
  res.redirect('/')
})

app.listen(3548, () => console.log('Server up, listening to 3548'))


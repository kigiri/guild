const {
  clientID,
  server,
  locale,
  guild,
} = require('./config')
const querystring = require('querystring')
const fetch = require('node-fetch')
const baseUrl = 'https://eu.api.battle.net/wow/'
const guildUrl = `${baseUrl}/${[
  'guild',
  server,
  guild,
].map(encodeURIComponent).join('/')}`

const buildQuery = (url, param) =>
  `${url}?${querystring.stringify(param, null, null, { encodeURIComponent })}`

const infoUrl = buildQuery(guildUrl, { locale, fields: 'members,news', apikey: clientID })

const toJSON = body => body.json()

fetch(infoUrl).then(toJSON).then(console.log)








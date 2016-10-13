const {
  clientID,
  server,
  locale,
  guild,
} = require('./config')
const querystring = require('querystring')

const baseUrl = 'https://eu.api.battle.net/wow/'
const guildUrl = `${baseUrl}/${[
  'guild',
  server,
  guild,
].map(encodeURIComponent).join('/')}`

const buildQuery = (url, param) =>
  `${url}?${querystring.stringify(param, null, null, { encodeURIComponent })}`

console.log(buildQuery(guildUrl, { locale, fields: 'members,news', apikey: clientID }))


const express = require('express')
const path = require('path')
const moment = require('moment')
const { HOST } = require('./src/constants')
const db = require('./src/database')

const PORT = process.env.PORT || 5000

const app = express()
  .set('port', PORT)
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')

// Static public files
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  res.send('Get ready for OpenSea!');
})

app.get('/api/token/:token_id', function(req, res) {
  const tokenId = parseInt(req.params.token_id).toString()
  const person = db[tokenId]
  const data = {
    'name': tokenId,
    'animation_url': `${person.imgurl}`,
    'attributes': {
      'Building Length': person.length,
      'Building Width': person.width,
      'Building Height': person.height,
      'Building Square Footage': person.sq,
      'Lot Length ': person.lotlength,
      'Lot Width': person.lotwidth,
      'Lot Square Footage': person.lotsq
    },
    'image': `${person.imgurl}`
  }
  res.send(data)
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
})

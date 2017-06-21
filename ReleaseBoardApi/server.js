var express = require('express')
var app = express()
var port = process.env.port || 3000
var mongoose = require('mongoose')
var Release = require('./api/models/rbmodel.js')
var bodyParser = require('body-parser')

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(allowCrossDomain)

var routes = require('./api/routes/rbroute.js')
routes(app)

app.use((req, res) => {
  res.status(404).send({url: req.originalUrl + ' not found'})
})

mongoose.Promise = global.Promise
mongoose.connect('mongodb://mongo:27017/Releasedb')

app.listen(port)

console.log('Release Board API server started on port: ' + port)

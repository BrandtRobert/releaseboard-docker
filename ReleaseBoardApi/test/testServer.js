var assert = require('assert')
var server = require('../server.js')
var request = require('request')
var baseURL = 'http://localhost:3000/releases/'

var mysql = require('mysql')
var connection = mysql.createConnection({
  user: 'brandt',
  password: 'Telecaster1',
  database: 'releasedb'
})
// If db table 'releases' is not empty tests will fail
connection.query('DELETE FROM releases')

describe('Testing server responses to GET, PUT', (done) => {
  var _id
  it('GET releases from the db', (done) => {
    var expectedRelease = {
      package: 'Audit-Web',
      production: '',
      development: '',
      merged: 'false'
    }
    request.get(baseURL, (err, response, body) => {
      if (err) {
        throw err
      }
      var receivedRelease = JSON.parse(body)[0]
      _id = receivedRelease._id
      delete receivedRelease._id // Delete id for comparison purposes
      assert.deepEqual(expectedRelease, receivedRelease)
      done()
    })
  })

  it('PUT changes to the db', (done) => {
    var updatedRelease = {
      package: 'Audit-Web',
      production: '123',
      development: '123',
      merged: 'true'
    }
    var url = baseURL + _id
    request.put(url, { form: updatedRelease }, (err, response, body) => {
      if (err) {
        throw err
      }
      let received = JSON.parse(body)
      delete received._id
      assert.deepEqual(updatedRelease, received)
      updatedRelease.production = ''
      updatedRelease.development = ''
      updatedRelease.merged = 'false'
      request.put(url, { form: updatedRelease }, (err) => {
        if (err) {
          throw err
        }
        done()
      })
    })
  })
})

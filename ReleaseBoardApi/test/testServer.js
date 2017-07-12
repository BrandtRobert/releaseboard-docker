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

describe('Testing server responses to GET, PUT, POST, DELETE', (done) => {
  var _id = ''

  it('POST new release to the board', (done) => {
    var newRelease = {
      package: 'WebApp',
      release: '900',
      version: '5.67',
      merged: 'false'
    }
    request.post(baseURL, { form: newRelease }, (err, response, body) => {
      if (err) {
        throw err
      }
      let received = JSON.parse(body)
      _id = received._id
      delete received._id
      assert.deepEqual(newRelease, received)
      done()
    })
  })

  it('GET release from the db', (done) => {
    var expectedRelease = {
      package: 'WebApp',
      release: '900',
      version: '5.67',
      merged: 'false'
    }
    request.get(baseURL, (err, response, body) => {
      if (err) {
        throw err
      }
      var receivedRelease = JSON.parse(body)[0]
      delete receivedRelease._id // Delete id for comparison purposes
      assert.deepEqual(expectedRelease, receivedRelease)
      done()
    })
  })

  it('PUT changes to the db', (done) => {
    var updatedRelease = {
      package: 'ServiceApp',
      release: '900',
      version: '5.67',
      merged: 'false'
    }
    var url = baseURL + _id
    request.put(url, { form: updatedRelease }, (err, response, body) => {
      if (err) {
        throw err
      }
      let received = JSON.parse(body)
      delete received._id
      assert.deepEqual(updatedRelease, received)
      done()
    })
  })

  it('DELETE item from the db', (done) => {
    var url = baseURL + _id
    request.delete(url, (err) => {
      if (err) {
        throw err
      }
      // Test that the db is now empty
      request.get(baseURL, (err, response, body) => {
        if (err) {
          throw err
        }
        let length = JSON.parse(body).length
        assert.equal(length, 0)
        server.closeServer() // Shutdown the server
        done()
      })
    })
  })
})

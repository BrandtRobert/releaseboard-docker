var model = require('../api/models/rbmodel.js')
var assert = require('assert')
var mysql = require('mysql')
var connection = mysql.createConnection({
  user: 'brandt',
  password: 'Telecaster1',
  database: 'releasedb'
})
// If db table 'releases' is not empty tests will fail
connection.query('DELETE FROM releases')

describe('Release board db model', () => {
  var _id = ''

  it('Inserts releases into the db', (done) => {
    var release = {
      package: 'Service',
      release: '506',
      version: '1.2.3',
      merged: false
    }
    model.insert(release, (resData) => {
      assert.deepEqual(release, resData)
      done()
    })
  })

  it('Gets releases from db model', (done) => {
    var release = {
      package: 'Service',
      release: '506',
      version: '1.2.3',
      merged: 'false'
    }
    model.getReleases((data) => {
      var compRelease = data[0]
      _id = compRelease._id.slice(0) // Make a copy of the id
      delete compRelease._id // Remove id field for comparision
      assert.deepEqual(release, compRelease)
      done()
    })
  })

  it('Updates data in the db model', (done) => {
    var release = {
      package: 'Service',
      release: '506',
      version: '1.2.3',
      merged: false
    }
    release.package = 'Webapp'
    release._id = _id
    model.update(release, (resData) => {
      assert.deepEqual(release, resData)
      done()
    })
  })

  it('Removes data from the db model', (done) => {
    model.delete(_id, () => {
      model.getReleases((data) => {
        assert.equal(data.length, 0) // Data array in db should be empty
        done()
      })
    })
  })
})

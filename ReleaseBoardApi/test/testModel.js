var model = require('../api/models/rbmodel.js')
var assert = require('assert')
var fs = require('fs')

describe('Release board db model', () => {
  var _id = ''

  it('Gets releases from db model', (done) => {
    fs.readFile('./api/models/releases.json', (err, data) => {
      if (err) {
        throw err
      }
      var expected = JSON.parse(data).releases
      model.getReleases((releases) => {
        for (var i = 0; i < releases.length; i++) {
          assert.deepEqual(expected[i], releases[i])
        }
        done()
      })
    })
  })

  it('Updates data in the db model', (done) => {
    var release = {
      package: 'Service',
      production: '506',
      development: '1.2.3',
      MOP: 'false',
      tagged: 'false'
    }
    release.package = 'Webapp'
    release._id = _id
    model.update(release, (resData) => {
      assert.deepEqual(release, resData)
      done()
    })
  })
})

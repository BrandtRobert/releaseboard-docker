'use strict'
var mysql = require('mysql')
var uuid = require('uuid')
var init = require('./initdb.js')
// Test connect

var connection = mysql.createConnection({
  user: 'brandt',
  password: 'Telecaster1',
  database: 'releasedb'
})

// Docker Connect

// var connection = mysql.createConnection({
//   host: 'mysql',
//   user: 'rb_user',
//   password: 'banana',
//   database: 'releasedb'
// })

init.initDb(connection)

module.exports.insert = (release, callback) => {
  release.merged = handleBool(release.merged)
  let id = [uuid().toString().replace(/-/g, '')]
  let values = id.concat(Object.values(release))
  connection.query('INSERT INTO releases VALUES (?,?,?,?,?)', values, (error) => {
    if (error) {
      throw error
    }
    release._id = id
    release.merged = (release.merged === 1) ? 'true' : 'false'
    callback(release)
  })
}

module.exports.update = (release, callback) => {
  release.merged = handleBool(release.merged)
  let values = Object.values(release)
  connection.query('UPDATE releases SET package = ?, production = ?, development = ?, merged = ? WHERE id = ?', values,
    (error) => {
      if (error) {
        throw error
      }
      release.merged = (release.merged === 1) ? 'true' : 'false'
      callback(release)
    })
}

module.exports.getReleases = (callback) => {
  connection.query('SELECT * FROM releases ORDER BY package', (error, data) => {
    if (error) {
      throw error
    }
    // Convert 1's and 0's to true/false
    data.map((r) => {
      r.merged = (r.merged === 1) ? 'true' : 'false'
      r._id = r.id.slice(0) // Make a copy of the id
      delete r.id
    })
    callback(data)
  })
}

module.exports.delete = (id, callback) => {
  connection.query('DELETE FROM releases WHERE id = ?', [id], (error) => {
    if (error) {
      throw error
    }
    callback()
  })
}

/**
 * Takes data of unknown boolean representation and returns it as either 1 or 0
 * @param {*} unknown type
 */
function handleBool (unknown) {
  if (typeof unknown === 'boolean') {
    return (unknown) ? 1 : 0
  } else if (typeof unknown === 'string') {
    return (unknown === 'true') ? 1 : 0
  } else if (typeof unknown === 'number') {
    return (unknown === 0) ? 0 : 1
  } else {
    return 0
  }
}

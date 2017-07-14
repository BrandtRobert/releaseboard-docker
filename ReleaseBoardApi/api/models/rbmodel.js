'use strict'
var mysql = require('mysql')
var uuid = require('uuid')

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

connection.query(`
  CREATE TABLE IF NOT EXISTS releases (
      id char(32) PRIMARY KEY NOT NULL,
      package varchar(50),
      \`release\` varchar(50),
      version varchar(50),
      merged boolean default false
  )
`,
  (error) => {
    if (error) {
      throw error
    }
  })

module.exports.insert = (release, callback) => {
  let merged = handleBool(release.merged)
  release._id = uuid().toString().replace(/-/g, '')
  connection.query('INSERT INTO releases VALUES (?,?,?,?,?)',
    [release._id, release.package, release.release, release.version, merged],
    (error) => {
      if (error) {
        throw error
      }
      callback(release)
    })
}

module.exports.update = (release, callback) => {
  let merged = handleBool(release.merged)
  connection.query('UPDATE releases SET package = ?, `release` = ?, version = ?, merged = ? WHERE id = ?',
    [release.package, release.release, release.version, merged, release._id],
    (error) => {
      if (error) {
        throw error
      }
      callback(release)
    })
}

module.exports.getReleases = (callback) => {
  connection.query('SELECT * FROM releases', (error, data) => {
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
  connection.query('DELETE FROM releases WHERE id = ?',
    [id], (error) => {
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

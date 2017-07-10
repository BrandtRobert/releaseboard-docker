'use strict'
var mysql = require('mysql')
var uuid = require('uuid')

// Test connect
var connection = mysql.createConnection({
  user: 'brandt',
  password: 'Telecaster1',
  database: 'releasedb'
})

/* Docker Connect
var connection = mysql.createConnection({
  host: 'mysql',
  user: 'rb_user',
  password: 'banana',
  database: 'releasedb'
})
*/

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
  let merged = (release.merged) ? 1 : 0
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
  let merged = (release.merged) ? 1 : 0
  connection.query('UPDATE releases SET package = ?, `release` = ?, version = ?, merged = ? WHERE _id = ?',
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
    data.map((r) => { r.merged = !!+r.merged })
    callback(data)
  })
}

module.exports.delete = (id, callback) => {
  connection.query('DELETE FROM releases WHERE _id = ?',
    [id], (error) => {
      if (error) {
        throw error
      }
      callback()
    })
}

'use strict'
var uuid = require('uuid')
var fs = require('fs')

module.exports.initDb = function (connection) {
  connection.query(`
  CREATE TABLE IF NOT EXISTS releases (
      id char(32) PRIMARY KEY NOT NULL,
      package varchar(50),
      production varchar(50),
      development varchar(50),
      merged boolean default false
  )
`,
    (error) => {
      if (error) {
        throw error
      }
    })
  connection.query('SELECT count(*) AS count FROM releases', (err, results) => {
    if (err) {
      throw err
    }
    if (results[0].count < 1) {
      getReleases((releases) => {
        releases.map((release) => {
          pushReleaseToDb(connection, release)
        })
      })
    }
    // if (typeof callback !== 'undefined') {
    //   callback()
    // }
  })
}

function getReleases (callback) {
  fs.readFile('./api/models/releases.json', (err, data) => {
    if (err) {
      throw err
    }
    let releases = JSON.parse(data).releases
    callback(releases)
  })
}

function pushReleaseToDb (connection, release) {
  release.merged = handleBool(release.merged)
  let sql = 'INSERT INTO releases VALUES (?, ?, ?, ?, ?)'
  let id = [uuid().toString().replace(/-/g, '')]
  let values = id.concat(Object.values(release))
  connection.query(sql, values, (err) => {
    if (err) {
      throw err
    }
  })
}

function handleBool (merged) {
  return (merged === 'false') ? 0 : 1
}

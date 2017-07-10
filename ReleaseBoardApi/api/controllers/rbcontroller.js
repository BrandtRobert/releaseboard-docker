'use strict'
var model = require('../models/rbmodel.js')

exports.create_release = function (req, res) {
  model.insert(req.body, (release) => { res.json(release) })
}

exports.update_release = function (req, res) {
  let toUpdate = req.body
  toUpdate._id = req.params.id
  model.update(toUpdate, (release) => { res.json(release) })
}

exports.get_all_releases = function (req, res) {
  model.getReleases((releases) => { res.json(releases) })
}

exports.delete_release = function (req, res) {
  model.delete(req.params.id, () => {
    res.json({ message: 'Release deleted' })
  })
}

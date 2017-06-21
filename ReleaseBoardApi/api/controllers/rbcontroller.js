'use strict'
var mongoose = require('mongoose')
var Release = mongoose.model('releases')

exports.get_all_releases = function (req, res) {
  Release.find({}, function (err, release) {
    if (err) {
      res.send(err)
    }
    res.json(release)
  })
}

exports.create_release = function (req, res) {
  var newRelease = new Release(req.body)
  newRelease.save(function (err, release) {
    if (err) {
      res.send(err)
    }
    res.json(release)
  })
}

exports.update_release = function (req, res) {
  Release.findOneAndUpdate({_id: req.params.id}, req.body, {
    returnNewDocument: true
  },
  function (err, release) {
    if (err) {
      res.send(err)
    }
    res.json(release)
  })
}

exports.delete_release = function (req, res) {
  Release.remove({
    _id: req.params.id
  }, function (err, release) {
    if (err) {
      res.send(err)
    }
    res.json({ message: 'Release deleted' })
  })
}

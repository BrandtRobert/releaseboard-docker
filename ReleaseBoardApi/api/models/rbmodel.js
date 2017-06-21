'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ReleaseSchema = new Schema({
  package: {
    type: String,
    required: true
  },
  release: String,
  version: String,
  merged: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('releases', ReleaseSchema)

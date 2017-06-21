~'use strict'
module.exports = function (app) {
  var releases = require('../controllers/rbcontroller.js')

  app.route('/releases')
    .get(releases.get_all_releases)
    .post(releases.create_release)

  app.route('/releases/:id')
    .put(releases.update_release)
    .delete(releases.delete_release)
}

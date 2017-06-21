import axios from 'axios'
import _ from 'lodash'

var _server = axios.create({
  // Base url should be whatever the url of the Nginx server is
  // Nginx proxies all requests with '/releases' to http://api:3000
  baseURL: 'http://localhost'
})

export function getReleases (callback) {
  _server.get('/releases').then(response => {
    let data = response.data.slice()
    // Derive headers from response keys, strip any values starting with _
    let keys = _.filter(Object.keys(data[0]), (key) => {
      return !_.startsWith(key, '_')
    })
    // Build header objs
    let headers = []
    keys.map((key) => {
      headers.push({
        text: _.capitalize(key),
        value: key,
        left: true
      })
    })
    // Use the callback to set headers and items
    callback(headers, data)
  }).catch(e => {
    console.log('There was an error when calling the server')
    console.log(e)
  })
}

export function postChanges (data, callback) {
  let promises = []
  data.map((release) => {
    let url = '/releases/' + release._id
    // Remove the id and _v from the object so the mongo db doesn't get fazed
    delete release._id
    delete release.__v
    let request = _server.put(url, release)
    promises.push(request)
  })
  axios.all(promises).then(callback)
}

export function addNewRelease (data, callback) {
  _server.post('/releases', data).then(callback)
}

export function deleteSelectedReleases (data, callback) {
  let promises = []
  data.map((release) => {
    let url = '/releases/' + release._id
    let request = _server.delete(url, release)
    promises.push(request)
  })
  axios.all(promises).then(callback)
}

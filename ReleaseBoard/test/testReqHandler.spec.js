import * as request from '../src/requesthandler.js'
import * as _ from 'lodash'

const sampleData = {
  package: 'Webhost',
  release: '900',
  version: '1.0.1',
  merged: true,
  _id: 'put123'
}

const promiseData = {
  data: [sampleData],
  status: 200,
  statusText: 'OK',
  headers: {}
}

describe('Calls the proper axios methods for each request', () => {
  it('Makes a get request to localhost:3000/releases', (done) => {
    let itemsExpected = [sampleData]
    let headerExpected = ['Package', 'Release', 'Version', 'Merged']
    spyOn(request._server, 'get').and.returnValue(Promise.resolve(promiseData))
    request.getReleases((headersObj, items) => {
      let headers = []
      headersObj.map((head) => headers.push(head.text))
      expect(_.isEqual(headerExpected, headers)).toBeTruthy()
      expect(_.isEqual(itemsExpected[0], items[0])).toBeTruthy()
    })
    expect(request._server.get).toHaveBeenCalled()
    done()
  })

  it('Makes a put request to localhost:3000/releases', (done) => {
    spyOn(request._server, 'put').and.callFake((url, release) => {
      expect(url).toBe('/releases/put123')
      expect(_.isEqual(release, sampleData))
      return Promise.resolve(promiseData)
    })
    request.postChanges([sampleData], () => {})
    expect(request._server.put).toHaveBeenCalled()
    done()
  })

  it('Makes a delete request to localhost:3000/releases', (done) => {
    spyOn(request._server, 'delete').and.callFake((url, release) => {
      expect(url).toBe('/releases/put123')
      expect(_.isEqual(release, sampleData))
      return Promise.resolve(promiseData)
    })
    request.deleteSelectedReleases([sampleData], () => {})
    expect(request._server.delete).toHaveBeenCalled()
    done()
  })

  it('Makes a post request to localhost:3000/releases', (done) => {
    spyOn(request._server, 'post').and.callFake((url, release) => {
      expect(url).toBe('/releases')
      expect(_.isEqual(release, sampleData))
      return Promise.resolve(promiseData)
    })
    request.addNewRelease([sampleData], () => {})
    expect(request._server.post).toHaveBeenCalled()
    done()
  })
})

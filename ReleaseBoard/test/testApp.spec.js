import Vue from 'vue'
import app from '../src/App.vue'
import * as request from '../src/requesthandler.js'
// Turn of random vue warnings trigger by custom components loading
Vue.config.silent = true

describe('App.vue', () => {
  it('sets correct default data', (done) => {
    const expectedData = {
      fixed: false,
      title: 'Envysion Engineering Team -- Releases and Versioning',
      headers: [],
      items: [],
      alert_success: false,
      showReleaseModal: false,
      showDeleteModal: false
    }
    const defaultData = app.data()
    expect(expectedData).toEqual(defaultData)
    done()
  })

  it('Requests table data on mount', (done) => {
    // On mount getTableData should be called
    const mountComp = new Vue(app)
    spyOn(mountComp, 'getTableData')
    mountComp.$mount()
    expect(mountComp.getTableData).toHaveBeenCalled()
    done()
  })

  it('Correctly calls requesthandler events', (done) => {
    // Each CRUD method in the app should call it's respective request handler
    const reqComp = new Vue(app)
    spyOn(request, 'getReleases')
    spyOn(request, 'postChanges')
    spyOn(request, 'addNewRelease')
    spyOn(request, 'deleteSelectedReleases')
    reqComp.getTableData()
    reqComp.updateTable()
    reqComp.addNewRelease()
    reqComp.deleteSelected()
    expect(request.getReleases).toHaveBeenCalled()
    expect(request.postChanges).toHaveBeenCalled()
    expect(request.addNewRelease).toHaveBeenCalled()
    expect(request.deleteSelectedReleases).toHaveBeenCalled()
    done()
  })
})

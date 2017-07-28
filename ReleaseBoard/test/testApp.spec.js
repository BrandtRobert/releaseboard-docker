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
      editDialog: false,
      dialog: false,
      promoteDialog: false,
      productionEditing: false
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
    reqComp.getTableData()
    reqComp.updateTable()
    expect(request.getReleases).toHaveBeenCalled()
    expect(request.postChanges).toHaveBeenCalled()
    done()
  })
})

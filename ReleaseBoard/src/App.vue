<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-title v-text="title" class="white--text"></v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid>
        <v-layout column>
          <v-flex xs12>
            <data-table :headers="headers" :items="items" :removeSelected="deleteSelected"></data-table>
          </v-flex>
        </v-layout>
        <v-layout row mt-2>
          <v-flex xs12 text-xs-center>
            <v-btn success light v-on:click.native="updateTable">Save Changes</v-btn>
            <v-btn primary light v-on:click.native.stop="showReleaseModal = true">Add New Release</v-btn>
            <v-btn class="red" light v-on:click.native="showDeleteModal = true">Delete Releases</v-btn>
          </v-flex>
        </v-layout>
        <v-layout row mt-2>
          <v-flex xs12 text-xs-center>
            <v-alert success transition="scale-transition" dismissible v-model="alert_success">Changes Saved!</v-alert>
          </v-flex>
        </v-layout>
        <new-release-dialog :showDialog="showReleaseModal" :submitRelease="addNewRelease"
          :closeDialog="closeReleaseModal"></new-release-dialog>
        <delete-release-dialog :showDialog="showDeleteModal" :items="items" 
          :close="closeDeleteModal" :delete="deleteSelected"></delete-release-dialog>
      </v-container>

    </main>
    <v-footer :fixed="fixed">
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import DataTable from './DataTable.vue'
  import NewReleaseDialog from './NewReleaseDialog.vue'
  import DeleteReleaseDialog from './DeleteReleaseDialog.vue'
  import * as requestHandler from './requesthandler.js'

  export default {
    name: app,
    components: {
      DataTable,
      NewReleaseDialog,
      DeleteReleaseDialog
    },
    data () {
      return {
        fixed: false,
        title: 'Envysion Engineering Team -- Releases and Versioning',
        headers: [],
        items: [],
        alert_success: false,
        showReleaseModal: false,
        showDeleteModal: false,
      }
    },
    mounted() {
      this.getTableData()
    },
    methods: {
      set_success () {
        this.alert_success = true
      },
      getTableData () {
        requestHandler.getReleases((headers, items) => {
          this.headers = headers
          this.items = items
        })
      },
      updateTable () {
        requestHandler.postChanges(this.items, (err) => { 
            this.getTableData()
            this.set_success()
        })
      },
      addNewRelease (pack, release, version) {
        let newRelease = {
          package: pack,
          release: release,
          version: version,
          merged: false
        }
        requestHandler.addNewRelease(newRelease, () => {
          // figure out why getTableData doesn't update fast enough
          this.updateTable()
          this.showReleaseModal = false
          this.set_success()
        })
      },
      closeReleaseModal () {
        this.showReleaseModal = false
      },
      closeDeleteModal () {
        this.showDeleteModal = false
      },
      deleteSelected (items) {
        requestHandler.deleteSelectedReleases(items, () => {
          this.updateTable()
          this.showDeleteModal = false
        })
      }
    }
  }
</script>
<style lang="stylus">
  @import './stylus/main'
</style>

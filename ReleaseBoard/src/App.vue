<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-title v-text="title" class="white--text"></v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid>
        <v-layout column>
          <v-flex xs12>
            <data-table :headers="headers" :items="items" :updateTable="updateTable"></data-table>
          </v-flex>
        </v-layout>
        <v-layout row justify-center style="position: relative;" class='mt-2'>
          <v-dialog v-model="dialog" lazy absolute>
            <v-btn primary dark slot="activator" class="white--text">Start New Release</v-btn>
            <v-card>
              <v-card-title>
                <div class="headline">Are you sure you want to start a new release?</div>
              </v-card-title>
              <v-card-text>Starting a new release will remove everything from the developer columns, 
                but production columns will remain intact
              </v-card-text>
              <v-card-row actions>
                <v-btn class="green--text darken-1 ml-5" flat="flat" @click.native="dialog = false">No</v-btn>
                <v-btn class="green--text darken-1 ml-1" flat="flat" @click.native="startNewRelease()">Yes</v-btn>
              </v-card-row actions>
            </v-card>
          </v-dialog>
        </v-layout>
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
    name: 'app',
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
        dialog: false
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
        console.log('Update called')
        requestHandler.postChanges(this.items, (err) => { 
            this.getTableData()
            this.set_success()
        })
      },
      startNewRelease () {
        this.dialog = false
        this.items.map((i) => {
          i.development = ''
          i.merged = false
        })
        this.updateTable()
      }
    }
  }
</script>
<style lang="stylus">
  @import './stylus/main'
</style>

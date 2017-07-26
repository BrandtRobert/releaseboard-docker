<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-title v-text="title" class="white--text"></v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid>
        <v-layout column>
          <v-flex xs12>
            <data-table :headers="headers" :items="items" :editing="productionEditing" :updateTable="updateTable"></data-table>
          </v-flex>
        </v-layout>
        <v-layout row mt-2>
          <v-flex xs12 text-xs-center>
            <v-btn error dark class="white--text" v-on:click.native.stop="toggleEditDialog()">Edit Production</v-btn>
            <v-btn primary dark class="white--text" v-on:click.native.stop="dialog = true">Start New Release</v-btn>
            <v-btn warning dark class="white--text" v-on:click.native.stop="promoteDialog = true">Promote to production</v-btn>
          </v-flex>   
        </v-layout>
        <v-layout row justify-center style="position: relative;" class='mt-2'>
          <v-dialog v-model="editDialog" lazy absolute>
            <v-card>
              <v-card-title>
                <div class="headline">Are you sure?</div>
              </v-card-title>
              <v-card-text>Be careful when editing production, these changes are the current versioning state of the production product.
              </v-card-text>
              <v-card-row actions>
                <v-btn class="red--text darken-1 ml-5" flat="flat" @click.native="editDialog = false">Cancel</v-btn>
                <v-btn class="green--text darken-1 ml-1" flat="flat" @click.native="toggleEditing()">Okay</v-btn>
              </v-card-row actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialog" lazy absolute>
            <v-card>
              <v-card-title>
                <div class="headline">Are you sure you want to start a new release?</div>
              </v-card-title>
              <v-card-text>Starting a new release will remove everything from the developer columns. Production columns will remain intact.
              </v-card-text>
              <v-card-row actions>
                <v-btn class="red--text darken-1 ml-5" flat="flat" @click.native="dialog = false">Cancel</v-btn>
                <v-btn class="green--text darken-1 ml-1" flat="flat" @click.native="startNewRelease()">Continue</v-btn>
              </v-card-row actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="promoteDialog" lazy absolute>
            <v-card>
              <v-card-title>
                <div class="headline">Are you sure?</div>
              </v-card-title>
              <v-card-text>Promoting to production will move all development versions into production and erase everything currently in production.
              </v-card-text>
              <v-card-row actions>
                <v-btn class="red--text darken-1 ml-5" flat="flat" @click.native="promoteDialog = false">Cancel</v-btn>
                <v-btn class="green--text darken-1 ml-1" flat="flat" @click.native="promoteToProduction()">Continue</v-btn>
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
    },
    data () {
      return {
        fixed: false,
        title: 'Envysion Engineering Team -- Releases and Versioning',
        headers: [],
        items: [],
        editDialog: false,
        dialog: false,
        promoteDialog: false,
        productionEditing: false
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
          i.MOP = false
          i.tagged = false
        })
        this.updateTable()
      },
      promoteToProduction () {
        this.promoteDialog = false
        this.items.map((i) => {
          // Make sure a blank space does not wipe out it's production counterpart
          if (typeof i.development !== 'undefined' && !/^\s*$/.test(i.development)) {
            i.production = i.development
            i.MOP = true
          }
        })
        console.log(JSON.stringify(this.items))
        this.updateTable()
      },
      toggleEditing () {
        this.editDialog = false
        this.productionEditing = !this.productionEditing
      },
      toggleEditDialog () {
        if (this.productionEditing === true) {
          this.toggleEditing()
        } else {
          this.editDialog = true
        }
      }
    }
  }
</script>
<style lang="stylus">
  @import './stylus/main'
</style>

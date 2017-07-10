<template>
	<v-layout row justify-center>
		<v-dialog v-model="showDialog" persistent width="800">
			<v-card>
				<v-card-row>
					<v-card-title>Delete Releases</v-card-title>
				</v-card-row>
				<v-card-row>
          <v-card-text>
            <v-list subheader>
              <v-subheader>Select the packages you want to delete</v-subheader>
              <v-list-item v-for="item in items" :key="item._id">
                <v-list-tile avatar>
                  <v-list-tile-action>
                    <v-checkbox v-model="selected" :value="item._id"></v-checkbox>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.package }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list-item>
            </v-list>
          </v-card-text>
				</v-card-row>
				<v-card-row actions>
					<v-btn class="error mr-1 white--text" v-on:click.native="remove(items)">Delete Selected</v-btn>
					<v-btn class="indigo white--text" v-on:click.native="close">Cancel</v-btn>
				</v-card-row>
			</v-card>
		</v-dialog>
	</v-layout>  
</template>

<script>
import _ from 'lodash'

export default {
  props: {
		showDialog: {type: Boolean},
    items:      {type: Array},
    close:      {type: Function},
    delete:     {type: Function}
	},
  data () {
    return {
      selected: []
    }
  },
  methods: {
    remove: function () {
      let _toDelete = this.items.filter((i) => {
        return _.indexOf(this.selected, i._id) >= 0
      })
      this.delete(_toDelete)
    }
  }
}
</script>

<style>

</style>

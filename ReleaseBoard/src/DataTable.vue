<template>
  <v-data-table
    v-bind:headers="headers"
    v-bind:items="items"
    :total-items="7"
    :rows-per-page-text="10"
    :rows-per-page-items="10"
    class="elevation-1"
  >
  <template slot="headers" scope="props">
    <span v-tooltip:bottom="{ 'html': props.item.text }">
      {{ props.item.text }}
    </span>
  </template>
  <template slot="items" scope="props">
    <td class="text-xs-left"><h6>{{ props.item.package }}</h6></td>
    <td class="text-xs-left" v-if="!editing" display-3><h6>{{ props.item.production }}</h6></td>
    <td class="text-xs-left" v-else>
      <v-text-field :value="props.item.production" v-model="props.item.production" v-on:blur="updateTable">
      </v-text-field>
    </td>
    <td class="text-xs-right">
      <v-text-field :value="props.item.development" v-model="props.item.development" v-on:blur="updateTable">
      </v-text-field>
    </td>
    <td> 
      <v-checkbox 
        hide-details
        success
        v-model="props.item.MOP"
        v-on:click.native="updateTable"
      ></v-checkbox>
    </td>
    <td> 
      <v-checkbox 
        hide-details
        success
        v-model="props.item.tagged"
        v-on:click.native="updateTable"
      ></v-checkbox>
    </td>
  </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    'headers': {type: Array}, 
    'items': {type: Array},
    'editing': {type: Boolean},
    'updateTable': {type: Function}
  },
  data () {
    return {
      watched: false
    }
  }
}
</script>

<style>
</style>



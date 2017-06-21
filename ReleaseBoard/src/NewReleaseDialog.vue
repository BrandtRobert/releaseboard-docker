<template>
	<v-layout row justify-center>
		<v-dialog v-model="showDialog" persistent width="800">
			<v-card>
				<v-card-row>
					<v-card-title>Add New Release</v-card-title>
				</v-card-row>
				<v-card-row>
					<v-card-text>
						<v-text-field label="Package" required v-model="package"></v-text-field>
						<v-text-field label="Release" required v-model="release"></v-text-field>
						<v-text-field label="Version" required v-model="version"></v-text-field>
					</v-card-text>
				</v-card-row>
				<v-card-row actions>
					<v-btn class="primary mr-1 white--text" v-on:click.native="addNewRelease">Save</v-btn>
					<v-btn class="error white--text" v-on:click.native="close">Cancel</v-btn>
				</v-card-row>
			</v-card>
		</v-dialog>
	</v-layout>
</template>
<script>
export default {
	props: {
		showDialog: {type: Boolean},
		submitRelease: {type: Function},
		closeDialog: {type: Function}
	},
	data () {
		return {
			show: false,
			package: "",
			release: "",
			version: ""
		}
	},
	methods: {
		addNewRelease: function () {
			this.submitRelease(this.package, this.release, this.version)
		},
		close: function () {
			this.closeDialog()
		}
	}
}
</script>

export default {
	props: ['saveFunc', 'discardFunc', 'model', 'id_name'],
	computed: {
		inputId: function() {
			return this.id_name + this.model.id;
		}
	},
	mounted: function() {
		document.getElementById(this.inputId).focus();
	},
	template:
			`
			<form class="ui form" v-on:submit.prevent="saveFunc($event)">
				<div class="ui input fluid action">
					<input type="text" name="name" required="true" v-model="model.name" v-bind:id="inputId" />
					<button class="ui button blue" type="submit">Save</button>
					<button class="ui button" v-on:click="discardFunc($event)">Discard</button>
				</div>
			</form>
			`
};
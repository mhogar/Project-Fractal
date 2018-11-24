<template>
	
<div>
	<div class="left floated one wide column">
		<div class="ui left pointing dropdown icon button blue edit-menu">
		  	<i class="icon ellipsis horizontal"></i>
		  	<div class="menu">
		  		<div class="item" v-on:click="editFunc($event)">
		  			<i class="edit icon"></i> Edit
	  			</div>
	  			<div class="item" v-on:click="deleteClicked($event)">
	  				<i class="delete icon"></i> Delete
  				</div>
				</div>
	  	</div>
	</div>
	<div class="ui tiny basic modal" v-bind:id="confirmDeleteModalId">
		<div class="content">
			<h3>{{confirmDeleteMessage}}</h3>
	  	</div>
	  	<div class="actions">
			<div class="ui red ok inverted button" v-on:click="deleteFunc($event)">
				<i class="remove icon"></i> Delete
			</div>
			<div class="ui white basic cancel inverted button">
		      Cancel
		    </div>
	    </div>
	</div>
</div>

</template>

<script>

import uidManager from './uidManager.vue';

export default {
	mixins: [uidManager],
	props: ['editFunc', 'deleteFunc', 'confirmDelete', 'confirmDeleteMessage'],
	computed: {
		confirmDeleteModalId: function() {
			return 'confirm-delete-modal-' + this.uid;
		}
	},
	methods: {
		deleteClicked: function(event) {
			if (this.confirmDelete) {
				$('#' + this.confirmDeleteModalId).modal('show');
			}
			else {
				this.deleteFunc(event);
			}
		}
	},
	mounted: function() {
		$('.ui.dropdown.delete-confirm-menu').dropdown({ action: 'hide' });
	}
};

</script>

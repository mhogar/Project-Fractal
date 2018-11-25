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
		<div class="ui small basic modal" v-bind:id="confirmDeleteNormalModalId">
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
		<div class="ui small basic modal" v-bind:id="confirmDeleteExtraModalId">
			<div class="content">
				<h3>{{confirmDeleteMessage}}</h3>
				<div class="ui inverted form">
					<h4>Enter the {{confirmDeleteStringLength}} digit code to confirm delete: {{confirmDeleteString}}</h4>
					<input type="text" v-on:input="checkDeleteConfrimString($event)" v-bind:id="confirmDeleteExtraInputId" />
				</div>
		  	</div>
		  	<div class="actions">
				<div class="ui red ok inverted button disabled" v-bind:id="confirmDeleteExtraBtnId" v-on:click="deleteFunc($event)">
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
		data: function() {
			return {
				DELETE_CONFIRM_LEVEL: {
					NONE: 0,
					NORMAL: 1,
					EXTRA: 2
				},
				confirmDeleteString: '',
				confirmDeleteStringLength: 6
			};
		},
		mixins: [uidManager],
		props: ['editFunc', 'deleteFunc', 'confirmDelete', 'confirmDeleteMessage'],
		computed: {
			confirmDeleteNormalModalId: function() {
				return 'confirm-delete-normal-modal-' + this.uid;
			},
			confirmDeleteExtraModalId: function() {
				return 'confirm-delete-extra-modal-' + this.uid;
			},
			confirmDeleteExtraBtnId: function() {
				return 'confirm-delete-extra-btn-' + this.uid;
			},
			confirmDeleteExtraInputId: function() {
				return 'confirm-delete-extra-input-' + this.uid;
			}
		},
		methods: {
			deleteClicked: function(event) {
				switch (this.confirmDelete) {
					case this.DELETE_CONFIRM_LEVEL.NORMAL:
						$('#' + this.confirmDeleteNormalModalId).modal('show');
						break;
					case this.DELETE_CONFIRM_LEVEL.EXTRA:
						this.showConfirmDeleteExtraModal();
						break;
					default: //NONE
						this.deleteFunc(event);
				}
			},
			showConfirmDeleteExtraModal: function() {
				this.confirmDeleteString = this.generateDeleteString();

				document.getElementById(this.confirmDeleteExtraInputId).value = '';
				$('#' + this.confirmDeleteExtraBtnId).addClass('disabled');

				$('#' + this.confirmDeleteExtraModalId).modal('show');
			},
			checkDeleteConfrimString: function(event) {
				let text = event.srcElement.value;
				let el = $('#' + this.confirmDeleteExtraBtnId);

				if (text === this.confirmDeleteString) {
					el.removeClass('disabled');
				}
				else {
					el.addClass('disabled');
				}
			},
			generateDeleteString: function() {
				let str = Math.round(Math.random() * (Math.pow(10, this.confirmDeleteStringLength) - 1)).toString();

				//if the generated number starts with 1 or more zeros then they will be truncated, so pad the string if it is too short
				if (str.length < this.confirmDeleteStringLength) {
					str = (Math.pow(10, this.confirmDeleteStringLength - 1)).toString() + str;
					str = str.substring(str.length - this.confirmDeleteStringLength);
				}
				
				return str;
			}
		},
		mounted: function() {
			$('.ui.dropdown.edit-menu').dropdown({ action: 'hide' });
		}
	};
</script>

import editMenuComponent from './editMenu';
import editFormComponent from './editForm';

export default {
	props: ['task'],
	components: {
		'EditMenu': editMenuComponent,
		'EditForm': editFormComponent
	},
	data: function() {
		return {
			state: this.task.name === '' ? 'create' : '',
			editTask: this.task
		};
	},
	methods: {
		toggleDone: function (event) {
			this.task.completed = !this.task.completed;
			this.$parent.updateProgressBar();
		},
		edit: function(event) {
			if (this.state === 'create') {
				return;
			}

			this.state = 'edit';

			this.editTask = {
				id: this.task.id,
				name: this.task.name
			};
		},
		update: function(event) {
			this.state = '';

			this.task.name = this.editTask.name;
		},
		destroy: function(event) {
			this.$parent.deleteFromTasks(this.task.id);
		}
	},
	mounted: function() {
		$('.ui.dropdown.edit-menu').dropdown({ action: 'hide' });
	},
	template: 
			`
			<div class="ui segments">
				<div v-bind:class="'ui segment ' + (task.completed ? 'green task-complete' : 'yellow task-todo')">
					<div class="ui grid">
						<div class="left floated twelve wide column">
							<div v-if="state === ''">
								<i class="thumbtack icon"></i> {{task.name}}
							</div>
							<EditForm v-if="state !== ''"
								v-bind:saveFunc="function(event) { state !== '' && update(event) }"
								v-bind:discardFunc="function(event) {state === 'create' ? destroy(event) : state = ''}"
								v-bind:model="editTask"
								v-bind:id_name="'task-name-input-'">
							</EditForm>
						</div>
						<div class="left floated two wide column">
							<div class="ui checkbox right floated">
								<input type="checkbox" v-on:click.prevent="toggleDone($event)" v-bind:checked="task.completed">
								<label>Completed</label>
							</div>
						</div>
						<div class="left floated one wide column">
							<EditMenu v-bind:editFunc="edit" v-bind:deleteFunc="destroy"></EditMenu>
						</div>
					</div>
				</div>
			</div>
			`
};
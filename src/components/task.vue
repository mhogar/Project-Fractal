<template>
	<div class="ui segments">
		<div v-bind:class="'ui segment ' + (task.completed ? 'green task-complete' : 'yellow task-todo')">
			<div v-if="loading" class="ui active inverted dimmer">
				<div class="ui loader"></div>
			</div>
			<div class="ui grid" v-if="state === ''">
				<div class="left floated twelve wide column">
					<div v-if="state === ''">
						<i class="thumbtack icon"></i> {{task.name}}
					</div>
				</div>
				<div class="right floated one wide column">
					<strong>{{task.timeEstimate}}h</strong>
				</div>
				<div class="right floated two wide column">
					<div class="ui checkbox right floated">
						<input type="checkbox" v-on:click.prevent="toggleDone($event)" v-bind:checked="task.completed">
						<label>Completed</label>
					</div>
				</div>
				<div class="left floated one wide column">
					<EditMenu
						v-bind:editFunc="edit" 
						v-bind:deleteFunc="destroy" 
						v-bind:options="{ menuPointDir: 'top left' }">
					</EditMenu>
				</div>
			</div>
			<form v-else class="ui form" v-on:submit.prevent="">
				<div class="fields">
					<div class="twelve wide field">
				        <input type="text" name="name" v-model="editTask.name" v-bind:id="nameInputId" />
					</div>
					<div class="one wide field">
						<input type="text" name="timeEstimate" v-model="editTask.timeEstimate" v-bind:id="timeEstimateInputId" />
					</div>
					<div class="field">
						<div class="ui buttons">
							<button class="ui button blue" name="save" v-on:click="onSave($event)">Save</button>
							<button class="ui button" name="discard" v-on:click="onDiscard($event)">Discard</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<style>
	.task-todo {
		background-color: lightgoldenrodyellow !important;
	}

	.task-complete {
		background-color: palegreen !important;
	}
</style>

<script>
	const Api = require('../api/taskApi');

	import editMenuComponent from './editMenu.vue';
	import {requiredValidator, stringValidator, intValidator} from '../mixins/formValidator.js'

	export default {
		props: ['task'],
		mixins: [requiredValidator, stringValidator, intValidator],
		components: {
			'EditMenu': editMenuComponent
		},
		data: function() {
			return {
				loading: false,
				state: this.task.name === '' ? 'create' : '',
				editTask: {
					id: this.task.id,
					name: this.task.name,
					timeEstimate: this.task.timeEstimate
				}
			};
		},
		computed: {
			nameInputId: function() {
				return 'task-name-input-' + this.task.id;
			},
			timeEstimateInputId: function() {
				return 'task-time-estimate-input-' + this.task.id;
			},
			validateName: function() {
				let id = this.nameInputId;
				let field = this.editTask.name;

				return this.validateRequired(id, field) && this.validateString(id, field, taskConfig.minNameLength, taskConfig.maxNameLength);
			},
			validateTimeEstimate: function() {
				let id = this.timeEstimateInputId;
				let field = this.editTask.timeEstimate;

				return this.validateRequired(id, field) && this.validateInt(id, field, taskConfig.minTimeEstimateValue, taskConfig.maxTimeEstimateValue);
			}
		},
		methods: {
			onSave: function(event) {
				if (this.validateName && this.validateTimeEstimate) {
					this.update(event);
				}
			},
			onDiscard: function(event) {
				if (this.state === 'create') {
					this.$parent.deleteFromTasks(this.task.id);
				}

				this.state = '';
			},
			toggleDone: function (event) {
				this.task.completed = !this.task.completed;
				this.$parent.updateProgressBar();

				if (this.state !== 'create') {
					this.loading = true;
					Api.createOrUpdateTask(
						this.task,
						function(data) {
							this.loading = false;
						}.bind(this),
						function(error) {
							console.log(error);
						}
					);
				}
			},
			edit: function(event) {
				if (this.state === 'create') {
					return;
				}

				this.state = 'edit';

				this.editTask = {
					id: this.task.id,
					name: this.task.name,
					timeEstimate: this.task.timeEstimate
				};
			},
			update: function(event) {
				this.state = '';

				this.task.name = this.editTask.name;
				this.task.timeEstimate = parseInt(this.editTask.timeEstimate);

				this.loading = true;
				Api.createOrUpdateTask(
					this.task,
					function(data) {
						let newTask = data;
						this.task.id = newTask.id;
						this.loading = false;
					}.bind(this),
					function(error) {
						console.log(error);
					}
				);
			},
			destroy: function(event) {
				this.loading = true;
				Api.deleteTask(
					this.task.id,
					function(response) {
						this.$parent.deleteFromTasks(this.task.id);
						this.loading = false;
					}.bind(this),
					function(error) {
						console.log(error);
					}
				);
			}
		}
	};
</script>
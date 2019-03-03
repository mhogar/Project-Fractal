<template>
	<div class="story-segment ui segments">
		<div class="story-segment-header ui purple segment">
			<div v-if="loading" class="ui active inverted dimmer">
				<div class="ui loader"></div>
			</div>
			<div class="ui grid">
				<div class="left floated eleven wide column">
					<h3 v-if="state === ''" class="ui header">
						<i class="tasks icon"></i> 
						<div class="content">{{story.name}}</div>
					</h3>
					<form v-else class="ui form" v-on:submit.prevent="">
						<div class="ui input fluid action">
							<input type="text" name="name" v-model="editStory.name" v-bind:id="nameInputId" />
							<button class="ui button blue" v-on:click="onSave($event)">Save</button>
							<button class="ui button" v-on:click="onDiscard($event)">Discard</button>
						</div>
					</form>
				</div>
				<div class="right floated four wide column">
					<div class="ui purple progress" v-if="numTasks > 0">
					  	<div class="bar completion-bar" v-bind:id="progressBarId"></div>
			   			<div class="label">{{percent}}% Completed; {{completedTimeEstimate}}/{{totalTimeEsitmate}} h</div>
					</div>
					<div v-if="numTasks === 0">
						<span class="ui small header">No Tasks</span>
					</div>
				</div>
				<div class="one wide column">
					<EditMenu v-if="state !== 'create'"
						v-bind:editFunc="edit" 
						v-bind:deleteFunc="destroy" 
						v-bind:options="{ confirmDelete: deleteConfirmLevel, confirmDeleteMessage: deleteConfirmMessage, menuPointDir: 'top right' }">
					</EditMenu>
				</div>
			</div>
			<div v-if="state !== 'create'" class="ui accordion task-list">
				<div class="title active">
					<i class="dropdown icon"></i> <span class="ui sub header">toggle task list</span>
				</div>
				<div class="content active">
					<Task v-for="task in story.tasks" :key="task.id" v-bind:task="task"></Task>
					<div class="ui segments">
						<div class="ui segment new-task" v-on:click="createTask($event)">
							<i class="plus circle icon"></i> Add a new task
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.story-segment {
		margin-top: 3em !important;
	}

	.story-segment-header {
		background-color: lavender !important;
	}

	.completion-bar {
		transition-duration: 300ms !important;
	}

	.new-task:hover {
		cursor: pointer;
		background-color: lightblue !important;
	}
</style>

<script>
	const Api = require('../api/storyApi');

	import editMenuComponent from './editMenu.vue';
	import taskComponent from './task.vue';

	import {requiredValidator, stringValidator} from '../mixins/formValidator.js'

	export default {
		props: ['story'],
		mixins: [requiredValidator, stringValidator],
		components: {
			'Task': taskComponent,
			'EditMenu': editMenuComponent
		},
		data: function() {
			return {
				loading: false,
				state: this.story.name === '' ? 'create' : '',
				editStory: this.story,
				percent: 0
			};
		},
		computed: {
			nameInputId: function() {
				return 'story-name-input-' + this.story.id;
			},
			validateName: function() {
				let id = this.nameInputId;
				let field = this.editStory.name;

				return this.validateRequired(id, field) && this.validateString(id, field, storyConfig.minNameLength, storyConfig.maxNameLength);
			},
			numTasks: function () {
				let tasks = this.story.tasks;
				return tasks ? tasks.length : 0;
			},
			totalTimeEsitmate: function() {
				let totalTime = 0;
				this.story.tasks.filter((task) => totalTime += task.timeEstimate);
				return totalTime;
			},
			completedTimeEstimate: function() {
				let completedTime = 0;
				this.story.tasks.filter((task) => completedTime += (task.completed ? task.timeEstimate : 0));
				return completedTime;
			},
			progressBarId: function() {
				return 'story-progress-bar-' + this.story.id;
			},
			deleteConfirmLevel: function() {
				let deleteConfirmLevel = editMenuComponent.data().DELETE_CONFIRM_LEVEL;
				if (this.numTasks > 0) {
					return deleteConfirmLevel.NORMAL;
				}

				return deleteConfirmLevel.NONE;
			},
			deleteConfirmMessage: function () {
				let message = 'Are you sure you want to delete this story and its ';

				if (this.numTasks === 1) {
					return message + 'task?';
				}
				return message + this.numTasks + ' tasks?';
			}
		},
		methods: {
			onSave: function(event) {
				if (this.validateName) {
					this.update(event);
				}
			},
			onDiscard: function(event) {
				if (this.state === 'create') {
					this.$parent.deleteFromStories(this.story.id);
				}

				this.state = '';
			},
			edit: function(event) {
				this.state = 'edit';

				this.editStory = {
					id: this.story.id,
					name: this.story.name
				};
			},
			update: function(event) {
				this.state = '';

				this.story.name = this.editStory.name;

				this.loading = true;
				Api.createOrUpdateStory(
					this.story,
					function(data) {
						let newStory = data;
						this.story.id = newStory.id;
						this.loading = false;
					}.bind(this),
					function(error) {
						console.log(error);
					}
				);
			},
			destroy: function(event) {
				this.loading = true;
				Api.deleteStory(
					this.story.id,
					function(response) {
						this.$parent.deleteFromStories(this.story.id);
						this.loading = false;
					}.bind(this),
					function(error) {
						console.log(error);
					}
				);
			},
			createTask: function(event) {
				let task = {
					id: -1,
					storyId: this.story.id,
					name: '',
					completed: false,
					timeEstimate: 0
				};

				this.addToTasks(task);
				this.updateProgressBar();
			},
			addToTasks: function(task) {
				this.story.tasks.push(task);
			},
			deleteFromTasks: function(taskId) {
				let taskIndex = this.story.tasks.findIndex(item => item.id === taskId);
				if (taskIndex !== -1) {
					this.$delete(this.story.tasks, taskIndex);

					this.updateProgressBar();
				}
			},
			updateProgressBar: function() {
				this.percent = Math.round(this.completedTimeEstimate / this.totalTimeEsitmate * 100);

				let progressBar = $('#' + this.progressBarId);
				progressBar.css('width', this.percent + '%');
			}
		},
		mounted: function() {
			this.updateProgressBar();
			$('.ui.accordion.task-list').accordion();
		}
	};
</script>

<template>
	<div class="story-segment ui segments">
		<div class="story-segment-header ui purple segment">
			<div class="ui grid">
				<div class="left floated eleven wide column">
					<div v-if="state === ''">
						<i class="tasks icon"></i> <span class="ui header">{{story.name}}</span>
					</div>
					<EditForm v-if="state !== ''"
						v-bind:saveFunc="function(event) { state !== '' && update(event) }"
						v-bind:discardFunc="function(event) {state === 'create' ? destroy(event) : state = ''}"
						v-bind:model="editStory"
						v-bind:id_name="'story-name-input-'">
					</EditForm>
				</div>
				<div class="right floated four wide column">
					<div class="ui purple progress" v-if="numTasks > 0">
					  	<div class="bar completion-bar" v-bind:id="progressBarId"></div>
			   			<div class="label">{{percent}}% Completed</div>
					</div>
					<div v-if="numTasks === 0">
						<span class="ui small header">No Tasks</span>
					</div>
				</div>
				<div class="one wide column">
					<EditMenu v-bind:editFunc="edit" v-bind:deleteFunc="destroy" v-bind:confirmDelete="deleteConfirmLevel" v-bind:confirmDeleteMessage="deleteConfirmMessage"></EditMenu>
				</div>
			</div>
			<div class="ui accordion task-list">
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
	import editFormComponent from './editForm.vue';
	import taskComponent from './task.vue';

	var taskData = [
		{ id: 1, storyId: 1, name: "Task 1", completed: false },
		{ id: 2, storyId: 1, name: "Another Task", completed: true },
		{ id: 3, storyId: 2, name: "One More Task", completed: false }
	];

	export default {
		props: ['story'],
		components: {
			'Task': taskComponent,
			'EditMenu': editMenuComponent,
			'EditForm': editFormComponent
		},
		data: function() {
			return {
				state: this.story.name === '' ? 'create' : '',
				editStory: this.story,
				percent: 0
			};
		},
		computed: {
			numTasks: function () {
				let tasks = this.story.tasks;
				return tasks ? tasks.length : 0;
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

				Api.createOrUpdateStory(this.story);
			},
			destroy: function(event) {
				this.$parent.deleteFromStories(this.story.id);
				Api.deleteStory(this.story.id);
			},
			createTask: function(event) {
				let task = {
					id: -1,
					storyId: this.story.id,
					name: '',
					completed: false
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
				this.percent = Math.round(this.story.tasks.filter(task => task.completed === true).length / this.numTasks * 100);

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

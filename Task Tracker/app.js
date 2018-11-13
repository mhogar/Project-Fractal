var taskData = [
	{ id: 1, storyId: 1, name: "Task 1", completed: false },
	{ id: 2, storyId: 1, name: "Another Task", completed: true },
	{ id: 3, storyId: 2, name: "One More Task", completed: false }
];

var storyData = [
	{ id: 1, name: "Story", percent: 0},
	{ id: 2, name: "Story 2", percent: 0}
];

//=============================================================================

var taskComponent = {
	props: ['task'],
	data: function() {
		return {
			state: this.task.name === '' ? 'create' : '',
			editTask: {}
		};
	},
	methods: {
		toggleDone: function (event) {
			this.task.completed = !this.task.completed;
			this.$parent.updateProgressBar();
		},
		edit: function(event) {
			this.state = 'edit';

			this.editTask = {
				id: this.task.id,
				name: this.task.name
			};
		},
		update: function($event) {
			this.state = '';

			this.task.name = this.editTask.name;
		},
		destroy: function(event) {
			this.$parent.deleteFromTasks(this.task.id);
		}
	},
	mounted: function() {
		if (this.state === 'create') {
			document.getElementById('task-name-input-' + this.task.id).focus();
		}
	},
	updated: function() {
		if (this.state === 'edit') {
			document.getElementById('task-name-input-' + this.task.id).focus();
		}
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
							<form class="ui form" v-on:submit.prevent="state !== '' && update($event)" v-if="state !== ''">
								<div class="ui input fluid action">
									<input type="text" name="name" required="true" v-model="editTask.name" v-bind:id="'task-name-input-' + task.id"/>
									<button class="ui button blue" type="submit">Save</button>
									<button class="ui button" v-on:click="state === 'create' ? destroy($event) : state = ''">Discard</button>
								</div>
							</form>
						</div>
						<div class="left floated two wide column">
							<div class="ui checkbox right floated">
								<input type="checkbox" v-on:click.prevent="toggleDone($event)" v-bind:checked="task.completed">
								<label>Completed</label>
							</div>
						</div>
						<div class="left floated one wide column">
							<div class="ui icon small buttons">
							  <button class="ui icon circular blue button" v-on:click="edit($event)">
							    <i class="pencil icon"></i>
							  </button>
							  <button class="delete-button ui icon circular red button">
							    <i class="trash icon"></i>
							  </button>
							  <div class="delete-confirm-popup ui fluid popup bottom right transition hidden">
							  	<div class="ui grid">
							  		<div class="left floated eleven wide column">
							  			Are you sure you want to delete this task?
						  			</div>
						  			<div class="right floated five wide column">
							  			<button class="ui button red" v-on:click="destroy($event)">Delete</button>
						  			</div>
					  			</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			`
};

//=============================================================================

var storyComponent = {
	props: ['story'],
	components: {
		'Task': taskComponent
	},
	data: function() {
		return {
			tasks: [],
		};
	},
	methods: {
		getTasks: function() {
			return taskData.filter(task => task.storyId === this.story.id);
		},
		createTask: function(event) {
			let nextId = (this.tasks.sort((a, b) => a.id - b.id))[this.tasks.length - 1].id + 1;
			let task = {
				id: nextId,
				storyId: this.story.id,
				name: '',
				completed: false
			};

			this.addToTasks(task);
		},
		addToTasks: function(task) {
			this.tasks.push(task);

			//this.updatePopups(); //TODO: fix timings
		},
		deleteFromTasks: function(taskId) {
			let taskIndex = this.tasks.findIndex(item => item.id === taskId);
			if (taskIndex !== -1) {
				let task = this.tasks[taskIndex];
				this.$delete(this.tasks, taskIndex);

				this.updateProgressBar();
			}
		},
		updateProgressBar: function() {
			this.story.percent = Math.round(this.tasks.filter(task => task.completed === true).length / this.tasks.length * 100);

			let progressBar = $('#story-progress-bar-' + this.story.id);
			progressBar.css('width', this.story.percent + '%');
		}
	},
	beforeMount: function() { 
		this.tasks = this.getTasks();
	},
	mounted: function() {
		this.updateProgressBar();
	},
	template: 
			`
			<div class="story-segment ui segments">
				<div class="story-segment-header ui purple segment">
					<div class="ui accordion">
						<div class="title active">
							<div class="ui grid">
								<div class="left floated seven wide column">
									<i class="dropdown icon"></i>								
									<i class="tasks icon"></i> <span class="ui header">{{story.name}}</span>
								</div>
								<div class="right floated four wide column">
									<div class="ui purple progress">
									  <div class="bar completion-bar" v-bind:id="'story-progress-bar-' + story.id">
									  </div>
								   	<div class="label">{{story.percent}}% Completed</div>
									</div>
								</div>
							</div>
						</div>
						<div class="content active">
							<Task v-for="task in tasks" :key="task.id" v-bind:task="task"></Task>
							<div class="ui segments">
								<div class="ui segment new-task" v-on:click="createTask($event, story.id)">
									<i class="plus circle icon"></i> Add a new task
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			`
}

//=============================================================================

	var app = new Vue({
	el: '#app',
	components: {
		'Story': storyComponent
	},
	data: {
		stories: storyData,
	},
	methods: {
		updatePopups: function() {
			$('.delete-button').popup({
				popup: $('.delete-confirm-popup'),
				position: "bottom right",
				on: 'click'
			});
		}
	},
	mounted: function() {
		this.updatePopups();
		$('.ui.accordion').accordion();
	}
});

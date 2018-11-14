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

var editMenuComponent = {
	props: ['editFunc', 'deleteFunc'],
	template:
			`
			<div class="left floated one wide column">
				<div class="ui left pointing dropdown icon button blue edit-menu">
				  	<i class="icon ellipsis horizontal"></i>
				  	<div class="menu">
				  		<div class="item" v-on:click="editFunc($event)">
				  			<i class="edit icon"></i> Edit
			  			</div>
			  			<div class="item" v-on:click="deleteFunc($event)">
			  				<i class="delete icon"></i> Delete
		  				</div>
	  				</div>
			  	</div>
			</div>
			`
}

var taskComponent = {
	props: ['task'],
	components: {
		'EditMenu': editMenuComponent
	},
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
			if (this.state === 'create') {
				this.focusNameInput();
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
		},
		focusNameInput: function() {
			let editInput = document.getElementById('task-name-input-' + this.task.id);
			if (editInput) {
				editInput.focus();
			}
		}
	},
	mounted: function() {
		if (this.state === 'create') {
			this.focusNameInput();
		}

		$('.ui.dropdown.edit-menu').dropdown({ action: 'hide' });
	},
	updated: function() {
		if (this.state === 'edit') {
			this.focusNameInput();
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
							<EditMenu v-bind:editFunc="edit" v-bind:deleteFunc="destroy"></EditMenu>
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
		'Task': taskComponent,
		'EditMenu': editMenuComponent
	},
	data: function() {
		return {
			tasks: []
		};
	},
	methods: {
		edit: function(event) {

		},
		destroy: function(event) {

		},
		getTasks: function() {
			return taskData.filter(task => task.storyId === this.story.id);
		},
		createTask: function(event) {
			let nextId = this.tasks.length ? (this.tasks.sort((a, b) => a.id - b.id))[this.tasks.length - 1].id + 1 : 0;
			let task = {
				id: nextId,
				storyId: this.story.id,
				name: '',
				completed: false
			};

			this.addToTasks(task);
			this.updateProgressBar();
		},
		addToTasks: function(task) {
			this.tasks.push(task);
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
			<div class="story-segment ui segments" v-bind:id="'story-segment-' + story.id">
				<div class="story-segment-header ui purple segment">
					<div class="ui grid">
						<div class="left floated seven wide column">
							<i class="tasks icon"></i> <span class="ui header">{{story.name}}</span>
						</div>
						<div class="right floated four wide column">
							<div class="ui purple progress" v-if="tasks.length > 0">
							  	<div class="bar completion-bar" v-bind:id="'story-progress-bar-' + story.id"></div>
					   			<div class="label">{{story.percent}}% Completed</div>
							</div>
							<div v-if="tasks.length === 0">
								<span class="ui small header">No Tasks</span>
							</div>
						</div>
						<div class="one wide column">
							<EditMenu v-bind:editFunc="edit" v-bind:deleteFunc="destroy"></EditMenu>
						</div>
					</div>
					<div class="ui accordion">
						<div class="title active">
							<i class="dropdown icon"></i> <span class="ui sub header">toggle task list</span>
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

var projectComponent = {
	components: {
		'Story': storyComponent,
	},
	data: function() {
		return {
			state: '',
			stories: []
		};
	},
	methods: {
		getStories: function() {
			return storyData;
		},
		createStory: function(event) {
			this.state = 'create';

			let nextId = this.stories.length ? (this.stories.sort((a, b) => a.id - b.id))[this.stories.length - 1].id + 1 : 0;
			let story = {
				id: nextId,
				name: 'New Story',
				percent: 0
			};

			this.stories.push(story);
		},
		updateAccordion: function() {
			$('.ui.accordion').accordion();
		}
	},
	beforeMount: function() {
		this.stories = this.getStories();
	},
	mounted: function() {
		this.updateAccordion();
	},
	updated: function() {
		if (this.state === 'create'){
			this.state = '';

			this.updateAccordion();
			window.scrollTo(0, document.body.scrollHeight);
		}
	},
	template:
			`
			<div>
				<div class="ui grid">
					<div class="ten wide column">
						<h2 class="ui header">
						  	<i class="folder open icon"></i>
						  	<div class="content">
						    	Project Name
						    	<div class="sub header">Project Description</div>
						  	</div>
						</h2>
					</div>
					<div class="right floated three wide column">
						<button class="ui labeled icon purple button" v-on:click="createStory($event)">
						  <i class="plus icon"></i>
						  Add a new story
						</button>
					</div>
				</div>
				<Story v-for="story in stories" :key="story.id" v-bind:story="story"></Story>
			</div>
			`
}

//=============================================================================

var app = new Vue({
	el: '#app',
	components: {
		'Project': projectComponent
	},
	template: `<Project></Project>`
	
});

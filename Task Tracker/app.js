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
	props: ['editFunc', 'deleteFunc', 'confirmDelete', 'confirmDeleteMessage'],
	computed: {
		confirmDeleteModalId: function() {
			return 'confirm-delete-modal-' + this._uid; //TODO: use other method of unique id
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
	},
	template:
			`
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
			`
}

var editFormComponent = {
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
}

var taskComponent = {
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

//=============================================================================

var storyComponent = {
	props: ['story'],
	components: {
		'Task': taskComponent,
		'EditMenu': editMenuComponent,
		'EditForm': editFormComponent
	},
	data: function() {
		return {
			tasks: [],
			state: this.story.name === '' ? 'create' : '',
			editStory: this.story
		};
	},
	computed: {
		numTasks: function () {
			return this.tasks ? this.tasks.length : 0;
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
		},
		destroy: function(event) {
			this.$parent.deleteFromStories(this.story.id);
		},
		getTasks: function() {
			return taskData.filter(task => task.storyId === this.story.id);
		},
		createTask: function(event) {
			let nextId = this.numTasks ? (this.tasks.sort((a, b) => a.id - b.id))[this.numTasks - 1].id + 1 : 0;
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
			this.story.percent = Math.round(this.tasks.filter(task => task.completed === true).length / this.numTasks * 100);

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
							  	<div class="bar completion-bar" v-bind:id="'story-progress-bar-' + story.id"></div>
					   			<div class="label">{{story.percent}}% Completed</div>
							</div>
							<div v-if="numTasks === 0">
								<span class="ui small header">No Tasks</span>
							</div>
						</div>
						<div class="one wide column">
							<EditMenu v-bind:editFunc="edit" v-bind:deleteFunc="destroy" v-bind:confirmDelete="numTasks > 0" v-bind:confirmDeleteMessage="deleteConfirmMessage"></EditMenu>
						</div>
					</div>
					<div class="ui accordion">
						<div class="title active">
							<i class="dropdown icon"></i> <span class="ui sub header">toggle task list</span>
						</div>
						<div class="content active">
							<Task v-for="task in tasks" :key="task.id" v-bind:task="task"></Task>
							<div class="ui segments">
								<div class="ui segment new-task" v-on:click="createTask($event)">
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
				name: '',
				percent: 0
			};

			this.stories.push(story);
		},
		deleteFromStories: function(storyId) {
			let index = this.stories.findIndex(item => item.id === storyId);
			if (index !== -1) {
				this.$delete(this.stories, index);
			}
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
				<h2 class="ui center aligned header" v-if="!stories.length">
				  <span class="sub header">You don't have any stories yet. Create some.</span>
				</h2>
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

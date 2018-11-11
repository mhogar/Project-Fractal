var taskComponent = {
	props: ['task'],
	template: `
						<div class="ui segments">
							<div v-bind:class="'ui segment ' + (task.completed ? 'green task-complete' : 'yellow task-todo')">
								<div class="ui grid">
									<div class="left floated eleven wide column">
										<i class="thumbtack icon"></i> {{task.name}}
									</div>
									<div class="right floated two wide column">
										<div class="ui checkbox right floated">
											<input type="checkbox" v-on:click="$parent.$parent.toggleDone($event, task.id)" v-bind:checked="task.completed">
											<label>Completed</label>
										</div>
									</div>
									<div class="left floated one wide column">
										<div class="ui icon small buttons">
										  <button class="ui icon circular blue button" v-on:click="$parent.$parent.editTask($event, task.id)">
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
										  			<button class="ui button red" v-on:click="$parent.$parent.deleteTask($event, task.id)">Delete</button>
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

var storyComponent = {
	components: {
		'Task': taskComponent
	},
	props: ['story'],
	template: `
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
										<Task v-for="task in $parent.getStoryTasks(story.id)" :key="task.id" v-bind:task="task"></Task>
										<div class="ui segments">
											<div class="ui segment new-task" v-on:click="$parent.addNewTask($event, story.id)">
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

	var app = new Vue({
	el: '#app',
	components: {
		'Story': storyComponent
	},
	data: {
		tasks: taskData,
		stories: storyData
	},
	methods: {
		getStoryTasks: function(storyId) {
			return this.tasks.filter(task => task.storyId === storyId);
		},
		updateProgressBars: function(storyId = false) {
			let stories = this.stories;
			let getStoryTasks = this.getStoryTasks;

			let updateProgressBar = function(storyId) {
				let story = stories.find(item => item.id === storyId);
				if (story) {
					tasks = getStoryTasks(story.id);
					story.percent = Math.round(tasks.filter(task => task.completed === true).length / tasks.length * 100);

					let progressBar = $('#story-progress-bar-' + story.id);
					progressBar.css('width', story.percent + '%');
				}
			};

			if (storyId !== false) {
				updateProgressBar(storyId);
			}
			else {
				this.stories.forEach(function(story) {
					updateProgressBar(story.id);
				});
			}
		},
		toggleDone: function (event, id) {
			event.preventDefault();

			let task = this.tasks.find(item => item.id === id);
			if (task) {
				task.completed = !task.completed;

				this.updateProgressBars(task.storyId);
			}
		},
		updatePopups: function() {
			$('.delete-button').popup({
				popup: $('.delete-confirm-popup'),
				position: "bottom right",
				on: 'click'
			});
		},
		addNewTask: function(event, storyId) {
			let nextId = (this.tasks.sort((a, b) => a.id - b.id))[this.tasks.length - 1].id + 1;

			taskData.push({
				id: nextId,
				storyId: storyId,
				name: "New Task",
				completed: false
			});

			this.updateProgressBars(storyId);
			this.updatePopups(); //TODO: fix timings
		},
		editTask: function(event, id) {
			console.log('edit clicked: ' + id);
		},
		deleteTask: function(event, id) {
			let taskIndex = this.tasks.findIndex(item => item.id === id);
			if (taskIndex !== -1) {
				let task = this.tasks[taskIndex];
				this.$delete(this.tasks, taskIndex);
				this.updateProgressBars(task.storyId);
			}
		}
	},
	mounted: function() {
		this.updateProgressBars();
		this.updatePopups();
		$('.ui.accordion').accordion();
	}
});

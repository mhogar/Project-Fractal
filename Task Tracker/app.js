var taskComponent = {
	props: ['task'],
	template: `
						<div class="ui segments">
							<div v-bind:class="'ui segment ' + (task.completed ? 'green task-complete' : 'yellow task-todo')">
								<div class="ui grid">
									<div class="left floated seven wide column">
										<i class="thumbtack icon"></i>{{task.name}}
									</div>
									<div class="right floated three wide column">
										<div class="ui checkbox">
											<input type="checkbox" v-on:click="$parent.$parent.toggleDone($event, task.id)" v-bind:checked="task.completed">
											<label>Completed</label>
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
												    <div class="progress"></div>
												  </div>
											   	<div class="label">{{story.percent}}% Completed</div>
												</div>
											</div>
										</div>
									</div>
									<div class="content active">
										<Task v-for="task in $parent.getStoryTasks(story.id)" v-bind:task="task" />
										<div class="ui segments">
											<div class="ui segment">
												<i class="plus circle icon"></i>Add a new task
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
					story.percent = tasks.filter(task => task.completed === true).length / tasks.length * 100;

					let progressBar = $('#story-progress-bar-' + story.id);
					progressBar.css('width', story.percent + '%');
				}
			};

			if (storyId !== false) {
				updateProgressBar(storyId);
			}
			else
			{
				this.stories.forEach(function(story) {
					updateProgressBar(story.id);
				});
			}
			
		},
		toggleDone: function (event, id) {
			event.stopImmediatePropagation();

			let task = this.tasks.find(item => item.id === id);
			if (task) {
				task.completed = !task.completed;

				this.updateProgressBars(task.storyId);
			}
		}
	},
	mounted: function() {
		this.updateProgressBars();

		$('.ui.accordion').accordion();
	}
});

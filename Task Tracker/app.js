var taskComponent = {
	props: ['task'],
	template: `
						<div class="ui segments">
							<div class="ui yellow segment">
								<i class="thumbtack icon"></i>{{task.name}}
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
									<div class="title">
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
									<div class="content">
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
	{ id: 1, storyId: 1, name: "Task 1" },
	{ id: 1, storyId: 1, name: "Another Task" },
	{ id: 1, storyId: 2, name: "One More Task" }
];

var storyData = [
	{ id: 1, name: "Story", percent: 47},
	{ id: 2, name: "Story 2", percent: 80}
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
		updateProgressBars: function() {
			this.stories.forEach(function(story) {
				let progressBar = $('#story-progress-bar-' + story.id);
				progressBar.css('width', story.percent + '%');
			});
		}
	},
	mounted: function() {
		this.updateProgressBars();

		$('.ui.accordion').accordion();
	}
});

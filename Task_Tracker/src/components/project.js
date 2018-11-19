import storyComponent from './story';

var storyData = [
	{ id: 1, name: "Story", percent: 0},
	{ id: 2, name: "Story 2", percent: 0}
];

export default {
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
};
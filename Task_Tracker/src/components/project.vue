<template>
	<div>
		<div class="ui grid">
			<div class="twelve wide column">
				<h2 class="ui header" v-if="state === ''">
				  	<i class="folder open icon"></i>
				  	<div class="content">
				    	{{project.name}}
				    	<div class="sub header">{{project.description}}</div>
				  	</div>
				</h2>
				<form class="ui form" v-on:submit.prevent="update($event)" v-else>
					<div class="fields">
						<div class="four wide field">
							<label>Name</label>
							<input id="project-name-input" type="text" name="name" required="true" placeholder="Name (required)" v-model="editProject.name" />
						</div>
						<div class="ten wide field">
							<label>Description</label>
							<input id="project-description-input" type="text" name="description" placeholder="Add a description" v-model="editProject.description" />
						</div>
					</div>
					<button class="ui button blue" type="submit">Save</button>
					<button class="ui button" v-on:click="state = ''">Discard</button>
			  	</form>
			</div>
			<div class="right floated three wide column">
				<button class="ui labeled icon purple button" v-on:click="createStory($event)">
				  <i class="plus icon"></i>
				  Add a new story
				</button>
			</div>
			<div class="one wide column">
				<EditMenu v-bind:editFunc="edit" v-bind:deleteFunc="destroy" v-bind:confirmDelete="deleteConfirmLevel" v-bind:confirmDeleteMessage="deleteConfirmMessage"></EditMenu>
			</div>
		</div>
		<h2 class="ui center aligned header" id="no-stories-message" v-if="!project.stories.length">
		  <span class="sub header">You don't have any stories yet. Create some.</span>
		</h2>
		<Story v-for="story in project.stories" :key="story.id" v-bind:story="story"></Story>
		<button class="ui labeled icon teal button" id="back-button" v-on:click="goBackToProjectSelect()">
			<i class="ui icon arrow left"></i> Back
		</button>
	</div>
</template>

<style scoped>
	#back-button {
		margin-top: 0.5em;
	}

	#no-stories-message {
		padding-top: 3em;
		padding-bottom: 3em;

		background: #e9e9e9;
		border-radius: 10px;
	}
</style>

<script>
	const Api = require('../api/projectApi');

	import storyComponent from './story.vue';
	import editMenuComponent from './editMenu.vue';

	export default {
		props: ['projectId'],
		components: {
			'Story': storyComponent,
			'EditMenu': editMenuComponent
		},
		data: function() {
			return {
				state: '',
				project: {},
				editProject: {}
			};
		},
		computed: {
			numStories: function () {
				let stories = this.project.stories;
				return stories ? stories.length : 0;
			},
			deleteConfirmLevel: function() {
				let DELETE_CONFIRM_LEVEL = editMenuComponent.data().DELETE_CONFIRM_LEVEL;
				return this.numStories > 0 ? DELETE_CONFIRM_LEVEL.EXTRA : DELETE_CONFIRM_LEVEL.NORMAL;
			},
			deleteConfirmMessage: function() {
				let msg = 'Are you sure you want to this project';
				if (this.numStories > 0) {
					msg += ' and all of its stories';
				}

				return msg + '?';
			}
		},
		methods: {
			loadProject: function() {
				return Api.getProjectById(this.projectId);
			},
			createStory: function(event) {
				let story = {
					id: -1,
					projectId: this.projectId,
					name: '',
					tasks: []
				};

				this.project.stories.push(story);

				window.scrollTo(0, document.body.scrollHeight);
			},
			deleteFromStories: function(storyId) {
				let index = this.project.stories.findIndex(item => item.id === storyId);
				if (index !== -1) {
					this.$delete(this.project.stories, index);
				}
			},
			goBackToProjectSelect: function() {
				this.$parent.showView();
			},
			edit: function(event) {
				this.state = 'edit';

				this.editProject = {
					id: this.project.id,
					name: this.project.name,
					description: this.project.description
				};
			},
			update: function(event) {
				this.state = '';

				this.project.name = this.editProject.name;
				this.project.description = this.editProject.description;

				Api.updateProject(this.project);
			},
			destroy: function(event) {
				this.$parent.deleteFromProjects(this.project.id);
				Api.deleteProject(this.project.id);

				this.goBackToProjectSelect();
			}
		},
		beforeMount: function() {
			this.project = this.loadProject();
		}
	};
</script>

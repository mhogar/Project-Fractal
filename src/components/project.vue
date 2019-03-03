<template>
	<div>
		<div v-if="loading" class="ui active inverted dimmer">
			<div class="ui loader"></div>
		</div>
		<div v-if="firstLoad">
			<div class="ui grid">
				<div class="twelve wide column">
					<h2 class="ui header" v-if="state === ''">
					  	<i class="folder open icon"></i>
					  	<div class="content">
					    	{{project.name}}
					    	<div class="sub header">{{project.description}}</div>
					  	</div>
					</h2>
					<form v-else class="ui form" v-on:submit.prevent="">
						<div class="fields">
							<div class="four wide field">
								<label>Name</label>
								<input v-bind:id="nameInputId" type="text" name="name" placeholder="Name (required)" v-model="editProject.name" />
							</div>
							<div class="ten wide field">
								<label>Description</label>
								<input v-bind:id="descInputId" type="text" name="description" placeholder="Add a description" v-model="editProject.description" />
							</div>
						</div>
						<button class="ui button blue" v-on:click="onSave($event)">Save</button>
						<button class="ui button" v-on:click="onDiscard($event)">Discard</button>
				  	</form>
				</div>
				<div class="right floated three wide column">
					<button class="ui labeled icon purple button" v-on:click="createStory($event)">
					  <i class="plus icon"></i>
					  Add a new story
					</button>
				</div>
				<div class="one wide column">
					<EditMenu 
						v-bind:editFunc="edit" 
						v-bind:deleteFunc="destroy" 
						v-bind:options="{ confirmDelete: deleteConfirmLevel, confirmDeleteMessage: deleteConfirmMessage, menuPointDir: 'top right' }">
					</EditMenu>
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

	import {requiredValidator, stringValidator} from '../mixins/formValidator.js'

	export default {
		props: ['projectId'],
		mixins: [requiredValidator, stringValidator],
		components: {
			'Story': storyComponent,
			'EditMenu': editMenuComponent
		},
		data: function() {
			return {
				firstLoad: false,
				loading: false,
				state: '',
				project: {},
				editProject: {}
			};
		},
		computed: {
			config: function() {
				return projectConfig;
			},
			nameInputId: function() {
				return 'project-name-input-' + this.projectId;
			},
			descInputId: function() {
				return 'project-desc-input-' + this.projectId;
			},
			validateName: function() {
				let id = this.nameInputId;
				let field = this.editProject.name;

				return this.validateRequired(id, field) && this.validateString(id, field, projectConfig.minNameLength, projectConfig.maxNameLength);
			},
			validateDesc: function() {
				let id = this.descInputId;
				let field = this.editProject.description;

				if (field === '') {
					return true;
				}

				return this.validateString(id, field, projectConfig.minDescLength, projectConfig.maxDescLength);
			},
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
			onSave: function(event) {
				if (this.validateName && this.validateDesc) {
					this.update(event);
				}
			},
			onDiscard: function(event) {
				this.state = '';
			},
			loadProject: function() {
				this.loading = true;
				Api.getProjectById(this.projectId, function(data) {
					this.project = data;
					this.firstLoad = true;
					this.loading = false;
				}.bind(this),
				function(error) {
					console.log(error);
				});
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

				this.loading = true;
				Api.updateProject(
					this.project,
					function(data) {
						this.loading = false;
					}.bind(this),
					function(error) {
						console.log(error);
					}
				);
			},
			destroy: function(event) {
				this.$parent.deleteFromProjects(this.project.id);

				this.goBackToProjectSelect();
			}
		},
		beforeMount: function() {
			this.loadProject();
		}
	};
</script>

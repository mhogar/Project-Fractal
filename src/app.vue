<template>
	<div>
		<div v-if="loading" class="ui active inverted dimmer">
			<div class="ui loader"></div>
		</div>
		<div class="ui three cards" v-if="selectedProject === null">
			<ProjectCard class="ui cards" v-for="project in projects" :key="project.id" v-bind:project="project"></ProjectCard>
			<div v-if="projectLoading" class="ui raised card">
				<div class="content">
					<div class="ui placeholder">
						<div class="image header">
						  	<div class="short line"></div>
							<div class="long line"></div>
						</div>
					</div>
				</div>
				<div class="content">
					<div class="ui placeholder">
						<div class="paragraph">
						    <div class="line"></div>
						    <div class="line"></div>
						</div>
					</div>
				</div>
				<div class="extra content">
					<div class="ui placeholder">
						<div class="short line"></div>
					</div>
				</div>
				<div class="ui bottom attached indicating progress">
				    <div class="bar"></div>
			  	</div>
			</div>
			<div class="ui link raised card" v-on:click="createProject($event)">
				<div class="content">
					<i class ="icon plus circle"></i> Add a new project
				</div>
			</div>
		</div>
		<Project v-else v-bind:projectId="selectedProject.id"></Project>
	</div>
</template>

<script>
	const Api = require('./api/projectApi');

	import projectComponent from './components/project.vue'
	import projectCardComponent from './components/projectCard.vue'

	export default {
		components: {
			'Project': projectComponent,
			'ProjectCard': projectCardComponent
		},
		data: function() {
			return {
				loading: false,
				projects: [],
				projectLoading: false,
				selectedProject: null
			};
		},
		methods: {
			showView: function() {
				this.selectedProject = null;
				window.scrollTo(0, 0);

				if (!this.projectLoading) {
					this.loadProjects();
				}
			},
			loadProjects: function() {
				this.loading = true;
				Api.getProjectStats(function(data) {
					this.projects = data;
					this.loading = false;
				}.bind(this),
				function(error) {
					console.log(error);
				});
			},
			selectProject: function(project) {
				this.selectedProject = project;
				window.scrollTo(0, 0);
			},
			createProject: function(event) {
				this.projectLoading = true;
				Api.createProject(
					{
						name: 'New Project',
						description: ''
					},
					function(data) {
						data.numStories = 0;
						data.numTasks = 0;
						data.percent = 0;

						this.projects.push(data);
						this.projectLoading = false;
					}.bind(this),
					function(error) {
						console.log(error);
					}
				);
			},
			deleteFromProjects: function(projectId) {
				let index = this.projects.findIndex(item => item.id === projectId);
				if (index !== -1) {
					this.$delete(this.projects, index);
					this.projectLoading = true;
					Api.deleteProject(
						projectId,
						function(response) {
							this.projectLoading = false;
						}.bind(this),
						function(error) {
							console.log(error);
						}
					);
				}
			}
		},
		beforeMount: function() {
			this.loadProjects();
		}
	};
</script>
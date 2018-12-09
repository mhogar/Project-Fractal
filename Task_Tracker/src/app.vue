<template>
	<div>
		<div class="ui three cards" v-if="selectedProject === null">
			<ProjectCard class="ui cards" v-for="project in projects" :key="project.id" v-bind:project="project"></ProjectCard>
			<div class="ui link raised card" v-on:click="createProject($event)">
				<div class="content">
					<i class ="icon plus circle"></i> Add a new project
				</div>
			</div>
		</div>
		<Project v-bind:projectId="selectedProject.id" v-else></Project>
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
				projects: [],
				selectedProject: null
			};
		},
		methods: {
			showView: function() {
				this.selectedProject = null;
				window.scrollTo(0, 0);

				this.loadProjects();
			},
			loadProjects: function() {
				this.projects = Api.getProjectStats();
			},
			selectProject: function(project) {
				this.selectedProject = project;
				window.scrollTo(0, 0);
			},
			createProject: function(event) {
				let project = Api.createProject(
					{
						name: 'New Project',
						description: '',
						numStories: 0,
						numTasks: 0,
						percent: 0
					}
				);

				this.loadProjects();

				let index = this.projects.findIndex(item => item.id === project.id);
				if (index !== -1) {
					this.projects[index].isNew = true;
				}
			},
			deleteFromProjects: function(projectId) {
				let index = this.projects.findIndex(item => item.id === projectId);
				if (index !== -1) {
					this.$delete(this.projects, index);
					Api.deleteProject(projectId);
				}
			}
		},
		beforeMount: function() {
			this.loadProjects();
		}
	};
</script>
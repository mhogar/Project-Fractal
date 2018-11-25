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
		<Project v-bind:project="selectedProject" v-else></Project>
	</div>
</template>

<script>
	import projectComponent from './components/project.vue'
	import projectCardComponent from './components/projectCard.vue'

	var projectData = [
		{
			id: 1,
			name: 'Project Name',
			description: 'Project Description',
			numStories: 3,
			numTasks: 5,
			percent: 100
		},
		{
			id: 2,
			name: 'Another Project',
			description: 'Another Description',
			numStories: 6,
			numTasks: 20,
			percent: 24
		},
		{
			id: 3,
			name: 'Yet Another Project',
			description: 'Yet Another Description',
			numStories: 5,
			numTasks: 15,
			percent: 58
		},
		{
			id: 4,
			name: 'More Projects',
			description: 'Just a Description',
			numStories: 9,
			numTasks: 30,
			percent: 75
		},
	];

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
			loadProjects: function() {
				return projectData;
			},
			selectProject: function(project) {
				this.selectedProject = project;
				window.scrollTo(0, 0);
			},
			deselectProject: function() {
				this.selectedProject = null;
				window.scrollTo(0, 0);
			},
			createProject: function(event) {
				let nextId = this.projects.length ? (this.projects.sort((a, b) => a.id - b.id))[this.projects.length - 1].id + 1 : 0;
				let project = {
					id: nextId,
					name: 'New Project',
					description: '',
					numStories: 0,
					numTasks: 0,
					percent: 0
				};

				this.projects.push(project);
			},
			deleteFromProjects: function(projectId) {
				let index = this.projects.findIndex(item => item.id === projectId);
				if (index !== -1) {
					this.$delete(this.projects, index);
				}
			}
		},
		beforeMount: function() {
			this.projects = this.loadProjects();
		}
	};
</script>
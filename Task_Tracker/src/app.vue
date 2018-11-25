<template>
	<div>
		<div class="ui three cards" v-if="selectedProject === null">
			<ProjectCard class="ui cards" v-for="project in projects" :key="project.id" v-bind:project="project"></ProjectCard>
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
			},
			deselectProject: function() {
				this.selectedProject = null;
			}
		},
		beforeMount: function() {
			this.projects = this.loadProjects();
		}
	};
</script>
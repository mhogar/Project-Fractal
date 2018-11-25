<template>
	<Project v-bind:project="selectedProject"></Project>
</template>

<script>
	import projectComponent from './components/project.vue'

	var project = {
		id: 1,
		name: 'Project Name',
		description: 'Project Description'
	};

	export default {
		components: {
			'Project': projectComponent
		},
		data: function() {
			return {
				selectedProject: project
			};
		}
	};
</script>
<template>
	<div class="ui link raised card" v-on:click="$parent.selectProject(project)">
		<div class="content">
			<div class="ui header">
			  	<i v-bind:class="'icon ' + (project.percent === 100 ? 'check circle green' : 'yellow thumbtack')"></i>
			  	<div class="content">
			    	{{project.name}}
			    	<div class="sub header">{{project.description}}</div>
			  	</div>
			</div>
		</div>
		<div class="content">
			<div class="ui horizontal list">
				<div class="item">Stories: {{project.numStories}}</div>
				<div class="item">Tasks: {{project.numTasks}}</div>
			</div>
		</div>
		<div class="extra content">
			Completion: {{project.percent}}%
		</div>
		<div class="ui bottom attached indicating progress" v-bind:id="progressBarId">
		    <div class="bar"></div>
	  	</div>
	</div>
</template>

<script>
	export default {
		props: ['project'],
		computed: {
			progressBarId: function() {
				return 'project-progress-bar-' + this.project.id;
			}
		},
		mounted: function() {
			$('#' + this.progressBarId).progress({
				percent: this.project.percent
			});
		}
	};
</script>
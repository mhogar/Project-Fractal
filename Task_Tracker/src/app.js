//import Vue from 'vue'
import projectComponent from './components/project'

var app = new Vue({
	el: '#app',
	components: {
		'Project': projectComponent
	},
	template: `<Project></Project>`
});

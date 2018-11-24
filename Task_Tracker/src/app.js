import Vue from '../node_modules/vue/dist/vue.js'
import projectComponent from './components/project.vue'

var app = new Vue({
	el: '#app',
	components: {
		'Project': projectComponent
	},
	template: `<Project></Project>`
});

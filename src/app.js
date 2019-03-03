import Vue from '../node_modules/vue/dist/vue.js'
import appComponent from './app.vue'

var app = new Vue({
	el: '#app',
	components: {
		'App': appComponent
	},
	template: `<App></App>`
});

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_uidManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/uidManager */ "./src/components/uidManager.js");


var taskData = [
	{ id: 1, storyId: 1, name: "Task 1", completed: false },
	{ id: 2, storyId: 1, name: "Another Task", completed: true },
	{ id: 3, storyId: 2, name: "One More Task", completed: false }
];

var storyData = [
	{ id: 1, name: "Story", percent: 0},
	{ id: 2, name: "Story 2", percent: 0}
];

//=============================================================================

var editMenuComponent = {
	mixins: [_components_uidManager__WEBPACK_IMPORTED_MODULE_0__["default"]],
	props: ['editFunc', 'deleteFunc', 'confirmDelete', 'confirmDeleteMessage'],
	computed: {
		confirmDeleteModalId: function() {
			return 'confirm-delete-modal-' + this.uid; //TODO: use other method of unique id
		}
	},
	methods: {
		deleteClicked: function(event) {
			if (this.confirmDelete) {
				$('#' + this.confirmDeleteModalId).modal('show');
			}
			else {
				this.deleteFunc(event);
			}
		}
	},
	mounted: function() {
		$('.ui.dropdown.delete-confirm-menu').dropdown({ action: 'hide' });
	},
	template:
			`
			<div>
				<div class="left floated one wide column">
					<div class="ui left pointing dropdown icon button blue edit-menu">
					  	<i class="icon ellipsis horizontal"></i>
					  	<div class="menu">
					  		<div class="item" v-on:click="editFunc($event)">
					  			<i class="edit icon"></i> Edit
				  			</div>
				  			<div class="item" v-on:click="deleteClicked($event)">
				  				<i class="delete icon"></i> Delete
			  				</div>
		  				</div>
				  	</div>
				</div>
				<div class="ui tiny basic modal" v-bind:id="confirmDeleteModalId">
					<div class="content">
						<h3>{{confirmDeleteMessage}}</h3>
				  	</div>
				  	<div class="actions">
    					<div class="ui red ok inverted button" v-on:click="deleteFunc($event)">
    						<i class="remove icon"></i> Delete
    					</div>
    					<div class="ui white basic cancel inverted button">
					      Cancel
					    </div>
				    </div>
				</div>
			</div>
			`
}

var editFormComponent = {
	props: ['saveFunc', 'discardFunc', 'model', 'id_name'],
	computed: {
		inputId: function() {
			return this.id_name + this.model.id;
		}
	},
	mounted: function() {
		document.getElementById(this.inputId).focus();
	},
	template:
			`
			<form class="ui form" v-on:submit.prevent="saveFunc($event)">
				<div class="ui input fluid action">
					<input type="text" name="name" required="true" v-model="model.name" v-bind:id="inputId" />
					<button class="ui button blue" type="submit">Save</button>
					<button class="ui button" v-on:click="discardFunc($event)">Discard</button>
				</div>
			</form>
			`
}

var taskComponent = {
	props: ['task'],
	components: {
		'EditMenu': editMenuComponent,
		'EditForm': editFormComponent
	},
	data: function() {
		return {
			state: this.task.name === '' ? 'create' : '',
			editTask: this.task
		};
	},
	methods: {
		toggleDone: function (event) {
			this.task.completed = !this.task.completed;
			this.$parent.updateProgressBar();
		},
		edit: function(event) {
			if (this.state === 'create') {
				return;
			}

			this.state = 'edit';

			this.editTask = {
				id: this.task.id,
				name: this.task.name
			};
		},
		update: function(event) {
			this.state = '';

			this.task.name = this.editTask.name;
		},
		destroy: function(event) {
			this.$parent.deleteFromTasks(this.task.id);
		}
	},
	mounted: function() {
		$('.ui.dropdown.edit-menu').dropdown({ action: 'hide' });
	},
	template: 
			`
			<div class="ui segments">
				<div v-bind:class="'ui segment ' + (task.completed ? 'green task-complete' : 'yellow task-todo')">
					<div class="ui grid">
						<div class="left floated twelve wide column">
							<div v-if="state === ''">
								<i class="thumbtack icon"></i> {{task.name}}
							</div>
							<EditForm v-if="state !== ''"
								v-bind:saveFunc="function(event) { state !== '' && update(event) }"
								v-bind:discardFunc="function(event) {state === 'create' ? destroy(event) : state = ''}"
								v-bind:model="editTask"
								v-bind:id_name="'task-name-input-'">
							</EditForm>
						</div>
						<div class="left floated two wide column">
							<div class="ui checkbox right floated">
								<input type="checkbox" v-on:click.prevent="toggleDone($event)" v-bind:checked="task.completed">
								<label>Completed</label>
							</div>
						</div>
						<div class="left floated one wide column">
							<EditMenu v-bind:editFunc="edit" v-bind:deleteFunc="destroy"></EditMenu>
						</div>
					</div>
				</div>
			</div>
			`
};

//=============================================================================

var storyComponent = {
	props: ['story'],
	components: {
		'Task': taskComponent,
		'EditMenu': editMenuComponent,
		'EditForm': editFormComponent
	},
	data: function() {
		return {
			tasks: [],
			state: this.story.name === '' ? 'create' : '',
			editStory: this.story
		};
	},
	computed: {
		numTasks: function () {
			return this.tasks ? this.tasks.length : 0;
		},
		deleteConfirmMessage: function () {
			let message = 'Are you sure you want to delete this story and its ';

			if (this.numTasks === 1) {
				return message + 'task?';
			}
			return message + this.numTasks + ' tasks?';
		}
	},
	methods: {
		edit: function(event) {
			this.state = 'edit';

			this.editStory = {
				id: this.story.id,
				name: this.story.name
			};
		},
		update: function(event) {
			this.state = '';

			this.story.name = this.editStory.name;
		},
		destroy: function(event) {
			this.$parent.deleteFromStories(this.story.id);
		},
		getTasks: function() {
			return taskData.filter(task => task.storyId === this.story.id);
		},
		createTask: function(event) {
			let nextId = this.numTasks ? (this.tasks.sort((a, b) => a.id - b.id))[this.numTasks - 1].id + 1 : 0;
			let task = {
				id: nextId,
				storyId: this.story.id,
				name: '',
				completed: false
			};

			this.addToTasks(task);
			this.updateProgressBar();
		},
		addToTasks: function(task) {
			this.tasks.push(task);
		},
		deleteFromTasks: function(taskId) {
			let taskIndex = this.tasks.findIndex(item => item.id === taskId);
			if (taskIndex !== -1) {
				let task = this.tasks[taskIndex];
				this.$delete(this.tasks, taskIndex);

				this.updateProgressBar();
			}
		},
		updateProgressBar: function() {
			this.story.percent = Math.round(this.tasks.filter(task => task.completed === true).length / this.numTasks * 100);

			let progressBar = $('#story-progress-bar-' + this.story.id);
			progressBar.css('width', this.story.percent + '%');
		}
	},
	beforeMount: function() { 
		this.tasks = this.getTasks();
	},
	mounted: function() {
		this.updateProgressBar();
	},
	template: 
			`
			<div class="story-segment ui segments" v-bind:id="'story-segment-' + story.id">
				<div class="story-segment-header ui purple segment">
					<div class="ui grid">
						<div class="left floated eleven wide column">
							<div v-if="state === ''">
								<i class="tasks icon"></i> <span class="ui header">{{story.name}}</span>
							</div>
							<EditForm v-if="state !== ''"
								v-bind:saveFunc="function(event) { state !== '' && update(event) }"
								v-bind:discardFunc="function(event) {state === 'create' ? destroy(event) : state = ''}"
								v-bind:model="editStory"
								v-bind:id_name="'story-name-input-'">
							</EditForm>
						</div>
						<div class="right floated four wide column">
							<div class="ui purple progress" v-if="numTasks > 0">
							  	<div class="bar completion-bar" v-bind:id="'story-progress-bar-' + story.id"></div>
					   			<div class="label">{{story.percent}}% Completed</div>
							</div>
							<div v-if="numTasks === 0">
								<span class="ui small header">No Tasks</span>
							</div>
						</div>
						<div class="one wide column">
							<EditMenu v-bind:editFunc="edit" v-bind:deleteFunc="destroy" v-bind:confirmDelete="numTasks > 0" v-bind:confirmDeleteMessage="deleteConfirmMessage"></EditMenu>
						</div>
					</div>
					<div class="ui accordion">
						<div class="title active">
							<i class="dropdown icon"></i> <span class="ui sub header">toggle task list</span>
						</div>
						<div class="content active">
							<Task v-for="task in tasks" :key="task.id" v-bind:task="task"></Task>
							<div class="ui segments">
								<div class="ui segment new-task" v-on:click="createTask($event)">
									<i class="plus circle icon"></i> Add a new task
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			`
}

var projectComponent = {
	components: {
		'Story': storyComponent,
	},
	data: function() {
		return {
			state: '',
			stories: []
		};
	},
	methods: {
		getStories: function() {
			return storyData;
		},
		createStory: function(event) {
			this.state = 'create';

			let nextId = this.stories.length ? (this.stories.sort((a, b) => a.id - b.id))[this.stories.length - 1].id + 1 : 0;
			let story = {
				id: nextId,
				name: '',
				percent: 0
			};

			this.stories.push(story);
		},
		deleteFromStories: function(storyId) {
			let index = this.stories.findIndex(item => item.id === storyId);
			if (index !== -1) {
				this.$delete(this.stories, index);
			}
		},
		updateAccordion: function() {
			$('.ui.accordion').accordion();
		}
	},
	beforeMount: function() {
		this.stories = this.getStories();
	},
	mounted: function() {
		this.updateAccordion();
	},
	updated: function() {
		if (this.state === 'create'){
			this.state = '';

			this.updateAccordion();
			window.scrollTo(0, document.body.scrollHeight);
		}
	},
	template:
			`
			<div>
				<div class="ui grid">
					<div class="ten wide column">
						<h2 class="ui header">
						  	<i class="folder open icon"></i>
						  	<div class="content">
						    	Project Name
						    	<div class="sub header">Project Description</div>
						  	</div>
						</h2>
					</div>
					<div class="right floated three wide column">
						<button class="ui labeled icon purple button" v-on:click="createStory($event)">
						  <i class="plus icon"></i>
						  Add a new story
						</button>
					</div>
				</div>
				<h2 class="ui center aligned header" v-if="!stories.length">
				  <span class="sub header">You don't have any stories yet. Create some.</span>
				</h2>
				<Story v-for="story in stories" :key="story.id" v-bind:story="story"></Story>
			</div>
			`
}

//=============================================================================

var app = new Vue({
	el: '#app',
	components: {
		'Project': projectComponent
	},
	template: `<Project></Project>`
	
});


/***/ }),

/***/ "./src/components/uidManager.js":
/*!**************************************!*\
  !*** ./src/components/uidManager.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let uid = 0;

/* harmony default export */ __webpack_exports__["default"] = ({
	beforeCreate: function () {
		this.uid = uid.toString();
		uid += 1;
	}
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy91aWRNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFpRDs7QUFFakQ7QUFDQSxFQUFFLHNEQUFzRDtBQUN4RCxFQUFFLDJEQUEyRDtBQUM3RCxFQUFFO0FBQ0Y7O0FBRUE7QUFDQSxFQUFFLGtDQUFrQztBQUNwQyxFQUFFO0FBQ0Y7O0FBRUE7O0FBRUE7QUFDQSxVQUFVLDhEQUFVO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxrREFBa0QsaUJBQWlCO0FBQ25FLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHNCQUFzQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBLHdDQUF3QyxpQkFBaUI7QUFDekQsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQSwwQ0FBMEMsZ0NBQWdDO0FBQzFFLDZDQUE2QyxpREFBaUQ7QUFDOUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGLDBCO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCxZQUFZO0FBQ3pFO0FBQ0E7QUFDQSwwQ0FBMEMsZ0NBQWdDO0FBQzFFLDZDQUE2QyxpREFBaUQ7QUFDOUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsZUFBZTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7OztBQy9YRDtBQUFBOztBQUVlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEUiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2FwcC5qc1wiKTtcbiIsImltcG9ydCB1aWRNYW5hZ2VyIGZyb20gJy4vY29tcG9uZW50cy91aWRNYW5hZ2VyJztcclxuXHJcbnZhciB0YXNrRGF0YSA9IFtcclxuXHR7IGlkOiAxLCBzdG9yeUlkOiAxLCBuYW1lOiBcIlRhc2sgMVwiLCBjb21wbGV0ZWQ6IGZhbHNlIH0sXHJcblx0eyBpZDogMiwgc3RvcnlJZDogMSwgbmFtZTogXCJBbm90aGVyIFRhc2tcIiwgY29tcGxldGVkOiB0cnVlIH0sXHJcblx0eyBpZDogMywgc3RvcnlJZDogMiwgbmFtZTogXCJPbmUgTW9yZSBUYXNrXCIsIGNvbXBsZXRlZDogZmFsc2UgfVxyXG5dO1xyXG5cclxudmFyIHN0b3J5RGF0YSA9IFtcclxuXHR7IGlkOiAxLCBuYW1lOiBcIlN0b3J5XCIsIHBlcmNlbnQ6IDB9LFxyXG5cdHsgaWQ6IDIsIG5hbWU6IFwiU3RvcnkgMlwiLCBwZXJjZW50OiAwfVxyXG5dO1xyXG5cclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxudmFyIGVkaXRNZW51Q29tcG9uZW50ID0ge1xyXG5cdG1peGluczogW3VpZE1hbmFnZXJdLFxyXG5cdHByb3BzOiBbJ2VkaXRGdW5jJywgJ2RlbGV0ZUZ1bmMnLCAnY29uZmlybURlbGV0ZScsICdjb25maXJtRGVsZXRlTWVzc2FnZSddLFxyXG5cdGNvbXB1dGVkOiB7XHJcblx0XHRjb25maXJtRGVsZXRlTW9kYWxJZDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJldHVybiAnY29uZmlybS1kZWxldGUtbW9kYWwtJyArIHRoaXMudWlkOyAvL1RPRE86IHVzZSBvdGhlciBtZXRob2Qgb2YgdW5pcXVlIGlkXHJcblx0XHR9XHJcblx0fSxcclxuXHRtZXRob2RzOiB7XHJcblx0XHRkZWxldGVDbGlja2VkOiBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRpZiAodGhpcy5jb25maXJtRGVsZXRlKSB7XHJcblx0XHRcdFx0JCgnIycgKyB0aGlzLmNvbmZpcm1EZWxldGVNb2RhbElkKS5tb2RhbCgnc2hvdycpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuZGVsZXRlRnVuYyhldmVudCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cdG1vdW50ZWQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0JCgnLnVpLmRyb3Bkb3duLmRlbGV0ZS1jb25maXJtLW1lbnUnKS5kcm9wZG93bih7IGFjdGlvbjogJ2hpZGUnIH0pO1xyXG5cdH0sXHJcblx0dGVtcGxhdGU6XHJcblx0XHRcdGBcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwibGVmdCBmbG9hdGVkIG9uZSB3aWRlIGNvbHVtblwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInVpIGxlZnQgcG9pbnRpbmcgZHJvcGRvd24gaWNvbiBidXR0b24gYmx1ZSBlZGl0LW1lbnVcIj5cclxuXHRcdFx0XHRcdCAgXHQ8aSBjbGFzcz1cImljb24gZWxsaXBzaXMgaG9yaXpvbnRhbFwiPjwvaT5cclxuXHRcdFx0XHRcdCAgXHQ8ZGl2IGNsYXNzPVwibWVudVwiPlxyXG5cdFx0XHRcdFx0ICBcdFx0PGRpdiBjbGFzcz1cIml0ZW1cIiB2LW9uOmNsaWNrPVwiZWRpdEZ1bmMoJGV2ZW50KVwiPlxyXG5cdFx0XHRcdFx0ICBcdFx0XHQ8aSBjbGFzcz1cImVkaXQgaWNvblwiPjwvaT4gRWRpdFxyXG5cdFx0XHRcdCAgXHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0ICBcdFx0XHQ8ZGl2IGNsYXNzPVwiaXRlbVwiIHYtb246Y2xpY2s9XCJkZWxldGVDbGlja2VkKCRldmVudClcIj5cclxuXHRcdFx0XHQgIFx0XHRcdFx0PGkgY2xhc3M9XCJkZWxldGUgaWNvblwiPjwvaT4gRGVsZXRlXHJcblx0XHRcdCAgXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdCAgXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQgIFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBjbGFzcz1cInVpIHRpbnkgYmFzaWMgbW9kYWxcIiB2LWJpbmQ6aWQ9XCJjb25maXJtRGVsZXRlTW9kYWxJZFwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImNvbnRlbnRcIj5cclxuXHRcdFx0XHRcdFx0PGgzPnt7Y29uZmlybURlbGV0ZU1lc3NhZ2V9fTwvaDM+XHJcblx0XHRcdFx0ICBcdDwvZGl2PlxyXG5cdFx0XHRcdCAgXHQ8ZGl2IGNsYXNzPVwiYWN0aW9uc1wiPlxyXG4gICAgXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ1aSByZWQgb2sgaW52ZXJ0ZWQgYnV0dG9uXCIgdi1vbjpjbGljaz1cImRlbGV0ZUZ1bmMoJGV2ZW50KVwiPlxyXG4gICAgXHRcdFx0XHRcdFx0PGkgY2xhc3M9XCJyZW1vdmUgaWNvblwiPjwvaT4gRGVsZXRlXHJcbiAgICBcdFx0XHRcdFx0PC9kaXY+XHJcbiAgICBcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInVpIHdoaXRlIGJhc2ljIGNhbmNlbCBpbnZlcnRlZCBidXR0b25cIj5cclxuXHRcdFx0XHRcdCAgICAgIENhbmNlbFxyXG5cdFx0XHRcdFx0ICAgIDwvZGl2PlxyXG5cdFx0XHRcdCAgICA8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHRcdGBcclxufVxyXG5cclxudmFyIGVkaXRGb3JtQ29tcG9uZW50ID0ge1xyXG5cdHByb3BzOiBbJ3NhdmVGdW5jJywgJ2Rpc2NhcmRGdW5jJywgJ21vZGVsJywgJ2lkX25hbWUnXSxcclxuXHRjb21wdXRlZDoge1xyXG5cdFx0aW5wdXRJZDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmlkX25hbWUgKyB0aGlzLm1vZGVsLmlkO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0bW91bnRlZDogZnVuY3Rpb24oKSB7XHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmlucHV0SWQpLmZvY3VzKCk7XHJcblx0fSxcclxuXHR0ZW1wbGF0ZTpcclxuXHRcdFx0YFxyXG5cdFx0XHQ8Zm9ybSBjbGFzcz1cInVpIGZvcm1cIiB2LW9uOnN1Ym1pdC5wcmV2ZW50PVwic2F2ZUZ1bmMoJGV2ZW50KVwiPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJ1aSBpbnB1dCBmbHVpZCBhY3Rpb25cIj5cclxuXHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJuYW1lXCIgcmVxdWlyZWQ9XCJ0cnVlXCIgdi1tb2RlbD1cIm1vZGVsLm5hbWVcIiB2LWJpbmQ6aWQ9XCJpbnB1dElkXCIgLz5cclxuXHRcdFx0XHRcdDxidXR0b24gY2xhc3M9XCJ1aSBidXR0b24gYmx1ZVwiIHR5cGU9XCJzdWJtaXRcIj5TYXZlPC9idXR0b24+XHJcblx0XHRcdFx0XHQ8YnV0dG9uIGNsYXNzPVwidWkgYnV0dG9uXCIgdi1vbjpjbGljaz1cImRpc2NhcmRGdW5jKCRldmVudClcIj5EaXNjYXJkPC9idXR0b24+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZm9ybT5cclxuXHRcdFx0YFxyXG59XHJcblxyXG52YXIgdGFza0NvbXBvbmVudCA9IHtcclxuXHRwcm9wczogWyd0YXNrJ10sXHJcblx0Y29tcG9uZW50czoge1xyXG5cdFx0J0VkaXRNZW51JzogZWRpdE1lbnVDb21wb25lbnQsXHJcblx0XHQnRWRpdEZvcm0nOiBlZGl0Rm9ybUNvbXBvbmVudFxyXG5cdH0sXHJcblx0ZGF0YTogZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzdGF0ZTogdGhpcy50YXNrLm5hbWUgPT09ICcnID8gJ2NyZWF0ZScgOiAnJyxcclxuXHRcdFx0ZWRpdFRhc2s6IHRoaXMudGFza1xyXG5cdFx0fTtcclxuXHR9LFxyXG5cdG1ldGhvZHM6IHtcclxuXHRcdHRvZ2dsZURvbmU6IGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHR0aGlzLnRhc2suY29tcGxldGVkID0gIXRoaXMudGFzay5jb21wbGV0ZWQ7XHJcblx0XHRcdHRoaXMuJHBhcmVudC51cGRhdGVQcm9ncmVzc0JhcigpO1xyXG5cdFx0fSxcclxuXHRcdGVkaXQ6IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGlmICh0aGlzLnN0YXRlID09PSAnY3JlYXRlJykge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5zdGF0ZSA9ICdlZGl0JztcclxuXHJcblx0XHRcdHRoaXMuZWRpdFRhc2sgPSB7XHJcblx0XHRcdFx0aWQ6IHRoaXMudGFzay5pZCxcclxuXHRcdFx0XHRuYW1lOiB0aGlzLnRhc2submFtZVxyXG5cdFx0XHR9O1xyXG5cdFx0fSxcclxuXHRcdHVwZGF0ZTogZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0dGhpcy5zdGF0ZSA9ICcnO1xyXG5cclxuXHRcdFx0dGhpcy50YXNrLm5hbWUgPSB0aGlzLmVkaXRUYXNrLm5hbWU7XHJcblx0XHR9LFxyXG5cdFx0ZGVzdHJveTogZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0dGhpcy4kcGFyZW50LmRlbGV0ZUZyb21UYXNrcyh0aGlzLnRhc2suaWQpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0bW91bnRlZDogZnVuY3Rpb24oKSB7XHJcblx0XHQkKCcudWkuZHJvcGRvd24uZWRpdC1tZW51JykuZHJvcGRvd24oeyBhY3Rpb246ICdoaWRlJyB9KTtcclxuXHR9LFxyXG5cdHRlbXBsYXRlOiBcclxuXHRcdFx0YFxyXG5cdFx0XHQ8ZGl2IGNsYXNzPVwidWkgc2VnbWVudHNcIj5cclxuXHRcdFx0XHQ8ZGl2IHYtYmluZDpjbGFzcz1cIid1aSBzZWdtZW50ICcgKyAodGFzay5jb21wbGV0ZWQgPyAnZ3JlZW4gdGFzay1jb21wbGV0ZScgOiAneWVsbG93IHRhc2stdG9kbycpXCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwidWkgZ3JpZFwiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibGVmdCBmbG9hdGVkIHR3ZWx2ZSB3aWRlIGNvbHVtblwiPlxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgdi1pZj1cInN0YXRlID09PSAnJ1wiPlxyXG5cdFx0XHRcdFx0XHRcdFx0PGkgY2xhc3M9XCJ0aHVtYnRhY2sgaWNvblwiPjwvaT4ge3t0YXNrLm5hbWV9fVxyXG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdDxFZGl0Rm9ybSB2LWlmPVwic3RhdGUgIT09ICcnXCJcclxuXHRcdFx0XHRcdFx0XHRcdHYtYmluZDpzYXZlRnVuYz1cImZ1bmN0aW9uKGV2ZW50KSB7IHN0YXRlICE9PSAnJyAmJiB1cGRhdGUoZXZlbnQpIH1cIlxyXG5cdFx0XHRcdFx0XHRcdFx0di1iaW5kOmRpc2NhcmRGdW5jPVwiZnVuY3Rpb24oZXZlbnQpIHtzdGF0ZSA9PT0gJ2NyZWF0ZScgPyBkZXN0cm95KGV2ZW50KSA6IHN0YXRlID0gJyd9XCJcclxuXHRcdFx0XHRcdFx0XHRcdHYtYmluZDptb2RlbD1cImVkaXRUYXNrXCJcclxuXHRcdFx0XHRcdFx0XHRcdHYtYmluZDppZF9uYW1lPVwiJ3Rhc2stbmFtZS1pbnB1dC0nXCI+XHJcblx0XHRcdFx0XHRcdFx0PC9FZGl0Rm9ybT5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJsZWZ0IGZsb2F0ZWQgdHdvIHdpZGUgY29sdW1uXCI+XHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInVpIGNoZWNrYm94IHJpZ2h0IGZsb2F0ZWRcIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiB2LW9uOmNsaWNrLnByZXZlbnQ9XCJ0b2dnbGVEb25lKCRldmVudClcIiB2LWJpbmQ6Y2hlY2tlZD1cInRhc2suY29tcGxldGVkXCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8bGFiZWw+Q29tcGxldGVkPC9sYWJlbD5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJsZWZ0IGZsb2F0ZWQgb25lIHdpZGUgY29sdW1uXCI+XHJcblx0XHRcdFx0XHRcdFx0PEVkaXRNZW51IHYtYmluZDplZGl0RnVuYz1cImVkaXRcIiB2LWJpbmQ6ZGVsZXRlRnVuYz1cImRlc3Ryb3lcIj48L0VkaXRNZW51PlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdFx0YFxyXG59O1xyXG5cclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxudmFyIHN0b3J5Q29tcG9uZW50ID0ge1xyXG5cdHByb3BzOiBbJ3N0b3J5J10sXHJcblx0Y29tcG9uZW50czoge1xyXG5cdFx0J1Rhc2snOiB0YXNrQ29tcG9uZW50LFxyXG5cdFx0J0VkaXRNZW51JzogZWRpdE1lbnVDb21wb25lbnQsXHJcblx0XHQnRWRpdEZvcm0nOiBlZGl0Rm9ybUNvbXBvbmVudFxyXG5cdH0sXHJcblx0ZGF0YTogZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR0YXNrczogW10sXHJcblx0XHRcdHN0YXRlOiB0aGlzLnN0b3J5Lm5hbWUgPT09ICcnID8gJ2NyZWF0ZScgOiAnJyxcclxuXHRcdFx0ZWRpdFN0b3J5OiB0aGlzLnN0b3J5XHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Y29tcHV0ZWQ6IHtcclxuXHRcdG51bVRhc2tzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLnRhc2tzID8gdGhpcy50YXNrcy5sZW5ndGggOiAwO1xyXG5cdFx0fSxcclxuXHRcdGRlbGV0ZUNvbmZpcm1NZXNzYWdlOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGxldCBtZXNzYWdlID0gJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBzdG9yeSBhbmQgaXRzICc7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5udW1UYXNrcyA9PT0gMSkge1xyXG5cdFx0XHRcdHJldHVybiBtZXNzYWdlICsgJ3Rhc2s/JztcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gbWVzc2FnZSArIHRoaXMubnVtVGFza3MgKyAnIHRhc2tzPyc7XHJcblx0XHR9XHJcblx0fSxcclxuXHRtZXRob2RzOiB7XHJcblx0XHRlZGl0OiBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHR0aGlzLnN0YXRlID0gJ2VkaXQnO1xyXG5cclxuXHRcdFx0dGhpcy5lZGl0U3RvcnkgPSB7XHJcblx0XHRcdFx0aWQ6IHRoaXMuc3RvcnkuaWQsXHJcblx0XHRcdFx0bmFtZTogdGhpcy5zdG9yeS5uYW1lXHJcblx0XHRcdH07XHJcblx0XHR9LFxyXG5cdFx0dXBkYXRlOiBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHR0aGlzLnN0YXRlID0gJyc7XHJcblxyXG5cdFx0XHR0aGlzLnN0b3J5Lm5hbWUgPSB0aGlzLmVkaXRTdG9yeS5uYW1lO1xyXG5cdFx0fSxcclxuXHRcdGRlc3Ryb3k6IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdHRoaXMuJHBhcmVudC5kZWxldGVGcm9tU3Rvcmllcyh0aGlzLnN0b3J5LmlkKTtcclxuXHRcdH0sXHJcblx0XHRnZXRUYXNrczogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJldHVybiB0YXNrRGF0YS5maWx0ZXIodGFzayA9PiB0YXNrLnN0b3J5SWQgPT09IHRoaXMuc3RvcnkuaWQpO1xyXG5cdFx0fSxcclxuXHRcdGNyZWF0ZVRhc2s6IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGxldCBuZXh0SWQgPSB0aGlzLm51bVRhc2tzID8gKHRoaXMudGFza3Muc29ydCgoYSwgYikgPT4gYS5pZCAtIGIuaWQpKVt0aGlzLm51bVRhc2tzIC0gMV0uaWQgKyAxIDogMDtcclxuXHRcdFx0bGV0IHRhc2sgPSB7XHJcblx0XHRcdFx0aWQ6IG5leHRJZCxcclxuXHRcdFx0XHRzdG9yeUlkOiB0aGlzLnN0b3J5LmlkLFxyXG5cdFx0XHRcdG5hbWU6ICcnLFxyXG5cdFx0XHRcdGNvbXBsZXRlZDogZmFsc2VcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHRoaXMuYWRkVG9UYXNrcyh0YXNrKTtcclxuXHRcdFx0dGhpcy51cGRhdGVQcm9ncmVzc0JhcigpO1xyXG5cdFx0fSxcclxuXHRcdGFkZFRvVGFza3M6IGZ1bmN0aW9uKHRhc2spIHtcclxuXHRcdFx0dGhpcy50YXNrcy5wdXNoKHRhc2spO1xyXG5cdFx0fSxcclxuXHRcdGRlbGV0ZUZyb21UYXNrczogZnVuY3Rpb24odGFza0lkKSB7XHJcblx0XHRcdGxldCB0YXNrSW5kZXggPSB0aGlzLnRhc2tzLmZpbmRJbmRleChpdGVtID0+IGl0ZW0uaWQgPT09IHRhc2tJZCk7XHJcblx0XHRcdGlmICh0YXNrSW5kZXggIT09IC0xKSB7XHJcblx0XHRcdFx0bGV0IHRhc2sgPSB0aGlzLnRhc2tzW3Rhc2tJbmRleF07XHJcblx0XHRcdFx0dGhpcy4kZGVsZXRlKHRoaXMudGFza3MsIHRhc2tJbmRleCk7XHJcblxyXG5cdFx0XHRcdHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHVwZGF0ZVByb2dyZXNzQmFyOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5zdG9yeS5wZXJjZW50ID0gTWF0aC5yb3VuZCh0aGlzLnRhc2tzLmZpbHRlcih0YXNrID0+IHRhc2suY29tcGxldGVkID09PSB0cnVlKS5sZW5ndGggLyB0aGlzLm51bVRhc2tzICogMTAwKTtcclxuXHJcblx0XHRcdGxldCBwcm9ncmVzc0JhciA9ICQoJyNzdG9yeS1wcm9ncmVzcy1iYXItJyArIHRoaXMuc3RvcnkuaWQpO1xyXG5cdFx0XHRwcm9ncmVzc0Jhci5jc3MoJ3dpZHRoJywgdGhpcy5zdG9yeS5wZXJjZW50ICsgJyUnKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGJlZm9yZU1vdW50OiBmdW5jdGlvbigpIHsgXHJcblx0XHR0aGlzLnRhc2tzID0gdGhpcy5nZXRUYXNrcygpO1xyXG5cdH0sXHJcblx0bW91bnRlZDogZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLnVwZGF0ZVByb2dyZXNzQmFyKCk7XHJcblx0fSxcclxuXHR0ZW1wbGF0ZTogXHJcblx0XHRcdGBcclxuXHRcdFx0PGRpdiBjbGFzcz1cInN0b3J5LXNlZ21lbnQgdWkgc2VnbWVudHNcIiB2LWJpbmQ6aWQ9XCInc3Rvcnktc2VnbWVudC0nICsgc3RvcnkuaWRcIj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwic3Rvcnktc2VnbWVudC1oZWFkZXIgdWkgcHVycGxlIHNlZ21lbnRcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ1aSBncmlkXCI+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJsZWZ0IGZsb2F0ZWQgZWxldmVuIHdpZGUgY29sdW1uXCI+XHJcblx0XHRcdFx0XHRcdFx0PGRpdiB2LWlmPVwic3RhdGUgPT09ICcnXCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8aSBjbGFzcz1cInRhc2tzIGljb25cIj48L2k+IDxzcGFuIGNsYXNzPVwidWkgaGVhZGVyXCI+e3tzdG9yeS5uYW1lfX08L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0PEVkaXRGb3JtIHYtaWY9XCJzdGF0ZSAhPT0gJydcIlxyXG5cdFx0XHRcdFx0XHRcdFx0di1iaW5kOnNhdmVGdW5jPVwiZnVuY3Rpb24oZXZlbnQpIHsgc3RhdGUgIT09ICcnICYmIHVwZGF0ZShldmVudCkgfVwiXHJcblx0XHRcdFx0XHRcdFx0XHR2LWJpbmQ6ZGlzY2FyZEZ1bmM9XCJmdW5jdGlvbihldmVudCkge3N0YXRlID09PSAnY3JlYXRlJyA/IGRlc3Ryb3koZXZlbnQpIDogc3RhdGUgPSAnJ31cIlxyXG5cdFx0XHRcdFx0XHRcdFx0di1iaW5kOm1vZGVsPVwiZWRpdFN0b3J5XCJcclxuXHRcdFx0XHRcdFx0XHRcdHYtYmluZDppZF9uYW1lPVwiJ3N0b3J5LW5hbWUtaW5wdXQtJ1wiPlxyXG5cdFx0XHRcdFx0XHRcdDwvRWRpdEZvcm0+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicmlnaHQgZmxvYXRlZCBmb3VyIHdpZGUgY29sdW1uXCI+XHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInVpIHB1cnBsZSBwcm9ncmVzc1wiIHYtaWY9XCJudW1UYXNrcyA+IDBcIj5cclxuXHRcdFx0XHRcdFx0XHQgIFx0PGRpdiBjbGFzcz1cImJhciBjb21wbGV0aW9uLWJhclwiIHYtYmluZDppZD1cIidzdG9yeS1wcm9ncmVzcy1iYXItJyArIHN0b3J5LmlkXCI+PC9kaXY+XHJcblx0XHRcdFx0XHQgICBcdFx0XHQ8ZGl2IGNsYXNzPVwibGFiZWxcIj57e3N0b3J5LnBlcmNlbnR9fSUgQ29tcGxldGVkPC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0PGRpdiB2LWlmPVwibnVtVGFza3MgPT09IDBcIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwidWkgc21hbGwgaGVhZGVyXCI+Tm8gVGFza3M8L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwib25lIHdpZGUgY29sdW1uXCI+XHJcblx0XHRcdFx0XHRcdFx0PEVkaXRNZW51IHYtYmluZDplZGl0RnVuYz1cImVkaXRcIiB2LWJpbmQ6ZGVsZXRlRnVuYz1cImRlc3Ryb3lcIiB2LWJpbmQ6Y29uZmlybURlbGV0ZT1cIm51bVRhc2tzID4gMFwiIHYtYmluZDpjb25maXJtRGVsZXRlTWVzc2FnZT1cImRlbGV0ZUNvbmZpcm1NZXNzYWdlXCI+PC9FZGl0TWVudT5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ1aSBhY2NvcmRpb25cIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInRpdGxlIGFjdGl2ZVwiPlxyXG5cdFx0XHRcdFx0XHRcdDxpIGNsYXNzPVwiZHJvcGRvd24gaWNvblwiPjwvaT4gPHNwYW4gY2xhc3M9XCJ1aSBzdWIgaGVhZGVyXCI+dG9nZ2xlIHRhc2sgbGlzdDwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjb250ZW50IGFjdGl2ZVwiPlxyXG5cdFx0XHRcdFx0XHRcdDxUYXNrIHYtZm9yPVwidGFzayBpbiB0YXNrc1wiIDprZXk9XCJ0YXNrLmlkXCIgdi1iaW5kOnRhc2s9XCJ0YXNrXCI+PC9UYXNrPlxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ1aSBzZWdtZW50c1wiPlxyXG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInVpIHNlZ21lbnQgbmV3LXRhc2tcIiB2LW9uOmNsaWNrPVwiY3JlYXRlVGFzaygkZXZlbnQpXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxpIGNsYXNzPVwicGx1cyBjaXJjbGUgaWNvblwiPjwvaT4gQWRkIGEgbmV3IHRhc2tcclxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdFx0YFxyXG59XHJcblxyXG52YXIgcHJvamVjdENvbXBvbmVudCA9IHtcclxuXHRjb21wb25lbnRzOiB7XHJcblx0XHQnU3RvcnknOiBzdG9yeUNvbXBvbmVudCxcclxuXHR9LFxyXG5cdGRhdGE6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0c3RhdGU6ICcnLFxyXG5cdFx0XHRzdG9yaWVzOiBbXVxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdG1ldGhvZHM6IHtcclxuXHRcdGdldFN0b3JpZXM6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZXR1cm4gc3RvcnlEYXRhO1xyXG5cdFx0fSxcclxuXHRcdGNyZWF0ZVN0b3J5OiBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHR0aGlzLnN0YXRlID0gJ2NyZWF0ZSc7XHJcblxyXG5cdFx0XHRsZXQgbmV4dElkID0gdGhpcy5zdG9yaWVzLmxlbmd0aCA/ICh0aGlzLnN0b3JpZXMuc29ydCgoYSwgYikgPT4gYS5pZCAtIGIuaWQpKVt0aGlzLnN0b3JpZXMubGVuZ3RoIC0gMV0uaWQgKyAxIDogMDtcclxuXHRcdFx0bGV0IHN0b3J5ID0ge1xyXG5cdFx0XHRcdGlkOiBuZXh0SWQsXHJcblx0XHRcdFx0bmFtZTogJycsXHJcblx0XHRcdFx0cGVyY2VudDogMFxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dGhpcy5zdG9yaWVzLnB1c2goc3RvcnkpO1xyXG5cdFx0fSxcclxuXHRcdGRlbGV0ZUZyb21TdG9yaWVzOiBmdW5jdGlvbihzdG9yeUlkKSB7XHJcblx0XHRcdGxldCBpbmRleCA9IHRoaXMuc3Rvcmllcy5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLmlkID09PSBzdG9yeUlkKTtcclxuXHRcdFx0aWYgKGluZGV4ICE9PSAtMSkge1xyXG5cdFx0XHRcdHRoaXMuJGRlbGV0ZSh0aGlzLnN0b3JpZXMsIGluZGV4KTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHVwZGF0ZUFjY29yZGlvbjogZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQoJy51aS5hY2NvcmRpb24nKS5hY2NvcmRpb24oKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGJlZm9yZU1vdW50OiBmdW5jdGlvbigpIHtcclxuXHRcdHRoaXMuc3RvcmllcyA9IHRoaXMuZ2V0U3RvcmllcygpO1xyXG5cdH0sXHJcblx0bW91bnRlZDogZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLnVwZGF0ZUFjY29yZGlvbigpO1xyXG5cdH0sXHJcblx0dXBkYXRlZDogZnVuY3Rpb24oKSB7XHJcblx0XHRpZiAodGhpcy5zdGF0ZSA9PT0gJ2NyZWF0ZScpe1xyXG5cdFx0XHR0aGlzLnN0YXRlID0gJyc7XHJcblxyXG5cdFx0XHR0aGlzLnVwZGF0ZUFjY29yZGlvbigpO1xyXG5cdFx0XHR3aW5kb3cuc2Nyb2xsVG8oMCwgZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0dGVtcGxhdGU6XHJcblx0XHRcdGBcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwidWkgZ3JpZFwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInRlbiB3aWRlIGNvbHVtblwiPlxyXG5cdFx0XHRcdFx0XHQ8aDIgY2xhc3M9XCJ1aSBoZWFkZXJcIj5cclxuXHRcdFx0XHRcdFx0ICBcdDxpIGNsYXNzPVwiZm9sZGVyIG9wZW4gaWNvblwiPjwvaT5cclxuXHRcdFx0XHRcdFx0ICBcdDxkaXYgY2xhc3M9XCJjb250ZW50XCI+XHJcblx0XHRcdFx0XHRcdCAgICBcdFByb2plY3QgTmFtZVxyXG5cdFx0XHRcdFx0XHQgICAgXHQ8ZGl2IGNsYXNzPVwic3ViIGhlYWRlclwiPlByb2plY3QgRGVzY3JpcHRpb248L2Rpdj5cclxuXHRcdFx0XHRcdFx0ICBcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8L2gyPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicmlnaHQgZmxvYXRlZCB0aHJlZSB3aWRlIGNvbHVtblwiPlxyXG5cdFx0XHRcdFx0XHQ8YnV0dG9uIGNsYXNzPVwidWkgbGFiZWxlZCBpY29uIHB1cnBsZSBidXR0b25cIiB2LW9uOmNsaWNrPVwiY3JlYXRlU3RvcnkoJGV2ZW50KVwiPlxyXG5cdFx0XHRcdFx0XHQgIDxpIGNsYXNzPVwicGx1cyBpY29uXCI+PC9pPlxyXG5cdFx0XHRcdFx0XHQgIEFkZCBhIG5ldyBzdG9yeVxyXG5cdFx0XHRcdFx0XHQ8L2J1dHRvbj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDxoMiBjbGFzcz1cInVpIGNlbnRlciBhbGlnbmVkIGhlYWRlclwiIHYtaWY9XCIhc3Rvcmllcy5sZW5ndGhcIj5cclxuXHRcdFx0XHQgIDxzcGFuIGNsYXNzPVwic3ViIGhlYWRlclwiPllvdSBkb24ndCBoYXZlIGFueSBzdG9yaWVzIHlldC4gQ3JlYXRlIHNvbWUuPC9zcGFuPlxyXG5cdFx0XHRcdDwvaDI+XHJcblx0XHRcdFx0PFN0b3J5IHYtZm9yPVwic3RvcnkgaW4gc3Rvcmllc1wiIDprZXk9XCJzdG9yeS5pZFwiIHYtYmluZDpzdG9yeT1cInN0b3J5XCI+PC9TdG9yeT5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHRcdGBcclxufVxyXG5cclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxudmFyIGFwcCA9IG5ldyBWdWUoe1xyXG5cdGVsOiAnI2FwcCcsXHJcblx0Y29tcG9uZW50czoge1xyXG5cdFx0J1Byb2plY3QnOiBwcm9qZWN0Q29tcG9uZW50XHJcblx0fSxcclxuXHR0ZW1wbGF0ZTogYDxQcm9qZWN0PjwvUHJvamVjdD5gXHJcblx0XHJcbn0pO1xyXG4iLCJsZXQgdWlkID0gMDtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRiZWZvcmVDcmVhdGU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHRoaXMudWlkID0gdWlkLnRvU3RyaW5nKCk7XHJcblx0XHR1aWQgKz0gMTtcclxuXHR9XHJcbn07Il0sInNvdXJjZVJvb3QiOiIifQ==